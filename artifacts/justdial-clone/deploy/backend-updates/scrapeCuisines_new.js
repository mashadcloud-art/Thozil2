const mongoose = require('mongoose');
const https = require('https');
const http = require('http');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const FoodImage = require('../models/FoodImage');
const cuisineData = require('./cuisineCategories.json');

const BASE_URL   = process.env.BASE_URL || 'https://thozil.com';
const PEXELS_KEY = process.env.PEXELS_API_KEY;
const PIXABAY_KEY= process.env.PIXABAY_API_KEY;
const IMAGES_DIR = '/data/food-images';

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    proto.get(url, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close(); fs.unlink(dest, () => {});
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', err => { fs.unlink(dest, () => {}); reject(err); });
  });
}

async function apiFetch(url, headers) {
  const { default: fetch } = await import('node-fetch');
  const res = await fetch(url, { headers: headers || {} });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function isDuplicate(p) {
  if (p.pexels_id)  return !!(await FoodImage.findOne({ pexels_id: p.pexels_id }));
  if (p.pixabay_id) return !!(await FoodImage.findOne({ pixabay_id: p.pixabay_id }));
  if (p.wiki_title) return !!(await FoodImage.findOne({ wikimedia_title: p.wiki_title }));
  return false;
}

async function fromPexels(q, n) {
  if (!PEXELS_KEY) return [];
  try {
    const d = await apiFetch('https://api.pexels.com/v1/search?query='+encodeURIComponent(q)+'&per_page='+n+'&orientation=landscape', { Authorization: PEXELS_KEY });
    return (d.photos||[]).map(p => ({ source:'pexels', pexels_id:String(p.id), photographer:p.photographer, image_thumb:p.src.medium, image_original:p.src.original, download_url:p.src.large2x }));
  } catch(e) { console.log('[Pexels] '+e.message); return []; }
}

async function fromPixabay(q, n) {
  if (!PIXABAY_KEY) { console.log('[Pixabay] No key'); return []; }
  try {
    const d = await apiFetch('https://pixabay.com/api/?key='+PIXABAY_KEY+'&q='+encodeURIComponent(q)+'&image_type=photo&orientation=horizontal&per_page='+n+'&safesearch=true&category=food&order=popular');
    return (d.hits||[]).map(p => ({ source:'pixabay', pixabay_id:String(p.id), photographer:p.user||'', image_thumb:p.previewURL, image_original:p.largeImageURL, download_url:p.largeImageURL||p.webformatURL }));
  } catch(e) { console.log('[Pixabay] '+e.message); return []; }
}

async function fromWikimedia(q, n) {
  try {
    const d = await apiFetch('https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch='+encodeURIComponent(q+' food')+'&srnamespace=6&srlimit='+(n*2)+'&format=json&origin=*');
    const titles = (d.query&&d.query.search||[]).map(r => r.title);
    const out = [];
    for (const t of titles.slice(0,n)) {
      try {
        const i = await apiFetch('https://commons.wikimedia.org/w/api.php?action=query&titles='+encodeURIComponent(t)+'&prop=imageinfo&iiprop=url|extmetadata&format=json&origin=*');
        const ii = Object.values((i.query&&i.query.pages)||{})[0];
        const info = ii && ii.imageinfo && ii.imageinfo[0];
        if (!info||!info.url||/\.(svg|pdf|ogv|ogg|webm)$/i.test(info.url)) continue;
        const artist = info.extmetadata&&info.extmetadata.Artist&&info.extmetadata.Artist.value;
        out.push({ source:'wikimedia', wiki_title:t, photographer:(artist||'Wikimedia').replace(/<[^>]+>/g,''), image_thumb:info.url, image_original:info.url, download_url:info.url });
      } catch(_) {}
      await sleep(200);
    }
    return out;
  } catch(e) { console.log('[Wikimedia] '+e.message); return []; }
}

async function scrape(item) {
  console.log('\nScraping: "'+item.foodName+'" ['+item.cuisineName+' > '+item.mainCatName+' > '+item.childCatName+']');
  const WANT = 3;
  const collected = [];

  const sources = [() => fromPexels(item.query,5), () => fromPixabay(item.query,5), () => fromWikimedia(item.query,5)];
  for (const fn of sources) {
    if (collected.length >= WANT) break;
    const photos = await fn();
    for (const photo of photos) {
      if (collected.length >= WANT) break;
      const dup = await isDuplicate(photo);
      if (!dup) { collected.push(photo); console.log('  ['+photo.source+'] new: '+(photo.pexels_id||photo.pixabay_id||photo.wiki_title)); }
      else { console.log('  skip(dup) ['+photo.source+']: '+(photo.pexels_id||photo.pixabay_id||photo.wiki_title)); }
    }
    await sleep(300);
  }

  if (!collected.length) { console.log('  No new images.'); return; }

  const desc = item.foodName+' - a popular '+item.childCatName+' dish from '+item.cuisineName+' cuisine, served under '+item.mainCatName+'.';
  let saved = 0;

  for (const photo of collected) {
    const dir = path.join(IMAGES_DIR, photo.source, item.category);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const ext = ((photo.download_url.match(/\.(jpg|jpeg|png|webp)/i)||['','jpg'])[1]).toLowerCase();
    const uid = photo.pexels_id||photo.pixabay_id||encodeURIComponent(photo.wiki_title||Date.now());
    const filename = photo.source+'_'+uid+'.'+ext;
    const dest = path.join(dir, filename);
    try { await downloadFile(photo.download_url, dest); }
    catch(e) { console.log('  download failed: '+e.message); continue; }
    const image_url = BASE_URL+'/food-images/'+photo.source+'/'+item.category+'/'+filename;
    await FoodImage.create({
      name: item.foodName,
      description: desc,
      category: item.category,
      parent_category: item.mainCatName,
      child_category: item.childCatName,
      cuisine: item.cuisine,
      tags: [item.foodName,item.childCatName,item.cuisineName,item.mainCatName].map(t=>t.toLowerCase()),
      source: photo.source,
      pexels_id: photo.pexels_id,
      pixabay_id: photo.pixabay_id,
      wikimedia_title: photo.wiki_title,
      photographer: photo.photographer,
      image_thumb: image_url,
      image_url: image_url,
      image_original: photo.image_original,
      local_path: dest
    });
    saved++;
    console.log('  SAVED ['+photo.source+']: '+item.foodName+' -> '+filename);
  }
  console.log('  done: '+saved+' saved');
}

async function main() {
  await mongoose.connect(process.env.MONGO_URI||'mongodb://127.0.0.1:27017/thozil_db');
  console.log('Connected to MongoDB');
  console.log('Pexels='+!!PEXELS_KEY+' Pixabay='+!!PIXABAY_KEY+' Wikimedia=always');

  const tasks = [];
  for (const cuisine of cuisineData) {
    for (const mainCat of cuisine.main_categories) {
      for (const childCat of mainCat.child_categories) {
        for (const item of childCat.items) {
          tasks.push({ foodName:item.name, category:item.id, cuisine:cuisine.id, cuisineName:cuisine.name, mainCatName:mainCat.name, childCatName:childCat.name, query:item.name+' '+cuisine.name+' food' });
        }
      }
    }
  }

  console.log('Found '+tasks.length+' food items.\n');
  for (const t of tasks) { await scrape(t); await sleep(1500); }
  const total = await FoodImage.countDocuments();
  console.log('\nDONE. Total images in DB: '+total);
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
