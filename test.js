const mongoose = require('mongoose');
const https = require('https');
const http = require('http');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const FoodImage = require('../models/FoodImage');
const cuisineData = require('./cuisineCategories.json');

const BASE_URL    = process.env.BASE_URL       || 'https://thozil.com';
const PEXELS_KEY  = process.env.PEXELS_API_KEY;
const UNSPLASH_KEY= process.env.UNSPLASH_ACCESS_KEY;   // Add to .env: UNSPLASH_ACCESS_KEY=...
const PIXABAY_KEY = process.env.PIXABAY_API_KEY;       // Add to .env: PIXABAY_API_KEY=...
const IMAGES_DIR  = '/data/food-images';

// ─── Helpers ────────────────────────────────────────────────────────────────

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    const file  = fs.createWriteStream(dest);
    proto.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlink(dest, () => {});
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function apiFetch(url, headers = {}) {
  const { default: fetch } = await import('node-fetch');
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ─── Source: Pexels ─────────────────────────────────────────────────────────

async function fetchPexels(query, count = 3) {
  if (!PEXELS_KEY) { console.log('  [Pexels] No API key, skipping.'); return []; }
  try {
    const url  = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`;
    const data = await apiFetch(url, { Authorization: PEXELS_KEY });
    return (data.photos || []).map(p => ({
      source:        'pexels',
      pexels_id:     String(p.id),
      name:          p.alt || query,
      photographer:  p.photographer,
      image_thumb:   p.src.medium,
      image_original:p.src.original,
      download_url:  p.src.large2x,
    }));
  } catch (e) {
    console.log('  [Pexels] Error:', e.message);
    return [];
  }
}

// ─── Source: Unsplash ────────────────────────────────────────────────────────

async function fetchUnsplash(query, count = 3) {
  if (!UNSPLASH_KEY) { console.log('  [Unsplash] No API key, skipping.'); return []; }
  try {
    const url  = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`;
    const data = await apiFetch(url, { Authorization: `Client-ID ${UNSPLASH_KEY}` });
    return (data.results || []).map(p => ({
      source:        'unsplash',
      unsplash_id:   p.id,
      name:          p.alt_description || query,
      photographer:  p.user?.name || '',
      image_thumb:   p.urls.small,
      image_original:p.urls.full,
      download_url:  p.urls.regular,
    }));
  } catch (e) {
    console.log('  [Unsplash] Error:', e.message);
    return [];
  }
}

// ─── Source: Pixabay ─────────────────────────────────────────────────────────

async function fetchPixabay(query, count = 3) {
  if (!PIXABAY_KEY) { console.log('  [Pixabay] No API key, skipping.'); return []; }
  try {
    // category=food + image_type=photo gives best food images
    // webformatURL is always available (no approval needed); largeImageURL is 1280px
    const url  = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&per_page=${count}&safesearch=true&category=food&order=popular`;
    const data = await apiFetch(url);
    return (data.hits || []).map(p => ({
      source:        'pixabay',
      pixabay_id:    String(p.id),
      name:          p.tags || query,
      photographer:  p.user || '',
      image_thumb:   p.previewURL,                          // 150px thumbnail
      image_original:p.largeImageURL,                       // 1280px (always available)
      download_url:  p.largeImageURL || p.webformatURL,     // fallback to 640px
    }));
  } catch (e) {
    console.log('  [Pixabay] Error:', e.message);
    return [];
  }
}

// ─── Source: Wikimedia Commons ───────────────────────────────────────────────

async function fetchWikimedia(query, count = 3) {
  try {
    const search = encodeURIComponent(query + ' food');
    const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${search}&srnamespace=6&srlimit=${count * 2}&format=json&origin=*`;
    const data = await apiFetch(url);
    const titles = (data.query?.search || []).map(r => r.title);
    const results = [];
    for (const title of titles.slice(0, count)) {
      try {
        const infoUrl = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=imageinfo&iiprop=url|extmetadata&format=json&origin=*`;
        const info = await apiFetch(infoUrl);
        const pages = Object.values(info.query?.pages || {});
        const page  = pages[0];
        const ii    = page?.imageinfo?.[0];
        if (!ii?.url) continue;
        // Skip SVGs and non-image files
        if (ii.url.match(/\.(svg|pdf|ogv|ogg|webm)$/i)) continue;
        results.push({
          source:          'wikimedia',
          wikimedia_title: title,
          name:            ii.extmetadata?.ObjectName?.value || query,
          photographer:    ii.extmetadata?.Artist?.value?.replace(/<[^>]+>/g, '') || 'Wikimedia',
          image_thumb:     ii.url,
          image_original:  ii.url,
          download_url:    ii.url,
        });
      } catch (_) { /* skip this image */ }
      await sleep(200); // gentle on Wikimedia API
    }
    return results;
  } catch (e) {
    console.log('  [Wikimedia] Error:', e.message);
    return [];
  }
}

// ─── Deduplication check ─────────────────────────────────────────────────────

async function isDuplicate(photo) {
  if (photo.pexels_id)     return !!(await FoodImage.findOne({ pexels_id: photo.pexels_id }));
  if (photo.unsplash_id)   return !!(await FoodImage.findOne({ unsplash_id: photo.unsplash_id }));
  if (photo.pixabay_id)    return !!(await FoodImage.findOne({ pixabay_id: photo.pixabay_id }));
  if (photo.wikimedia_title) return !!(await FoodImage.findOne({ wikimedia_title: photo.wikimedia_title }));
  return false;
}

// ─── Core scraper ────────────────────────────────────────────────────────────

async function scrapeCategory(item) {
  console.log(`\nScraping: "${item.foodName}" [${item.cuisineName} › ${item.mainCatName} › ${item.childCatName}]`);

  // Waterfall: collect from all sources, stop when we have 3 images
  const WANT = 3;
  let collected = [];

  const sources = [
    () => fetchPexels(item.query, WANT),
    () => fetchUnsplash(item.query, WANT),
    () => fetchPixabay(item.query, WANT),
    () => fetchWikimedia(item.query, WANT),
  ];

  for (const srcFn of sources) {
    if (collected.length >= WANT) break;
    const photos = await srcFn();
    collected.push(...photos);
    await sleep(300);
  }

  collected = collected.slice(0, WANT);

  if (collected.length === 0) {
    console.log('  No images found from any source.');
    return;
  }

  // Build a clean description from our own data — not from API
  const description = `${item.foodName} — a popular ${item.childCatName} dish from ${item.cuisineName} cuisine, served under ${item.mainCatName}.`;

  let saved = 0;
  for (const photo of collected) {
    if (await isDuplicate(photo)) {
      console.log(`  skip (dup): ${photo.source} ${photo.pexels_id || photo.unsplash_id || photo.pixabay_id || photo.wikimedia_title}`);
      continue;
    }

    const dir = path.join(IMAGES_DIR, photo.source, item.category);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const ext      = (photo.download_url.match(/\.(jpg|jpeg|png|webp)/i) || ['', 'jpg'])[1].toLowerCase();
    const uid      = photo.pexels_id || photo.unsplash_id || photo.pixabay_id || encodeURIComponent(photo.wikimedia_title || Date.now());
    const filename = `${photo.source}_${uid}.${ext}`;
    const dest     = path.join(dir, filename);

    try {
      await downloadFile(photo.download_url, dest);
    } catch (e) {
      console.log(`  download failed [${photo.source}]: ${e.message}`);
      continue;
    }

    const image_url = `${BASE_URL}/food-images/${photo.source}/${item.category}/${filename}`;

    await FoodImage.create({
      name:            item.foodName,           // ✅ exact name from our JSON
      description:     description,             // ✅ built from cuisine + category hierarchy
      category:        item.category,           // category id e.g. "masala_dosa"
      parent_category: item.mainCatName,        // e.g. "Kerala Breakfast"
      child_category:  item.childCatName,       // e.g. "Dosa Varieties"
      cuisine:         item.cuisine,            // cuisine id e.g. "kerala"
      tags:            [item.foodName, item.childCatName, item.cuisineName, item.mainCatName].map(t => t.toLowerCase()),
      source:          photo.source,
      pexels_id:       photo.pexels_id,
      unsplash_id:     photo.unsplash_id,
      pixabay_id:      photo.pixabay_id,
      wikimedia_title: photo.wikimedia_title,
      photographer:    photo.photographer,
      image_thumb:     image_url,
      image_url,
      image_original:  photo.image_original,
      local_path:      dest,
    });

    saved++;
    console.log(`  ✓ [${photo.source}] saved "${item.foodName}" → ${filename}`);
  }

  console.log(`  done: ${saved} saved from ${collected.length} candidates`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/thozil_db');
  console.log('Connected to MongoDB');

  const sources = [];
  if (PEXELS_KEY)   sources.push('Pexels');
  if (UNSPLASH_KEY) sources.push('Unsplash');
  if (PIXABAY_KEY)  sources.push('Pixabay');
  sources.push('Wikimedia Commons (no key needed)');
  console.log(`Active sources: ${sources.join(', ')}`);

  // Flatten cuisine categories into tasks — carry full name hierarchy
  const tasks = [];
  for (const cuisine of cuisineData) {
    for (const mainCat of cuisine.main_categories) {
      for (const childCat of mainCat.child_categories) {
        for (const item of childCat.items) {
          tasks.push({
            // ─ identity
            foodName:    item.name,                          // exact name: "Masala Dosa"
            category:    item.id,                           // slug: "masala_dosa"
            cuisine:     cuisine.id,                        // slug: "kerala"
            // ─ hierarchy labels (for description)
            cuisineName:  cuisine.name,                     // "Kerala"
            mainCatName:  mainCat.name,                     // "Kerala Breakfast"
            childCatName: childCat.name,                    // "Dosa Varieties"
            // ─ search query: include cuisine for better image results
            query: `${item.name} ${cuisine.name} food`,     // "Masala Dosa Kerala food"
          });
        }
      }
    }
  }

  console.log(`Found ${tasks.length} food items to scrape.\n`);

  for (const task of tasks) {
    await scrapeCategory(task);
    await sleep(1500); // 1.5s between categories
  }

  const total = await FoodImage.countDocuments();
  console.log(`\nDONE. Total images in DB: ${total}`);
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
