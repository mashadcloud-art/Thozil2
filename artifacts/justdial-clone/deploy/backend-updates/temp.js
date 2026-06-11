
const API = '/api/v1/food-images';
const UPLOAD_API = '/api/v1/food-images/upload';
const CAT_API = '/api/v1/categories';
const SCRAPER_API = '/api/v1/scraper';

let allImages = [], filteredImages = [], page = 0;
const PAGE_SIZE = 20;

let categories = [];
let cuisineHierarchy = [];

const pageTitles = {overview:'Overview',images:'Images',upload:'Bulk Upload',categories:'Categories',scraper:'Scraper'};

const pageTitles = {overview:'Overview',images:'Images',upload:'Bulk Upload',categories:'Categories',scraper:'Scraper'};

function showPanel(id) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('panel-'+id).classList.add('active');
  event.currentTarget.classList.add('active');
  document.getElementById('pageTitle').textContent = pageTitles[id];
  if (id==='overview') loadOverview();
  if (id==='images') loadImages();
  if (id==='categories') renderCategories();
}

async function loadOverview() {
  try {
    const res = await fetch(API+'?limit=200');
    const data = await res.json();
    const imgs = data.images || [];
    document.getElementById('m-total').textContent = (data.total||imgs.length).toLocaleString();
    const pexels = imgs.filter(i=>i.source==='pexels').length;
    const uploads = imgs.filter(i=>i.source!=='pexels').length;
    document.getElementById('m-pexels').textContent = pexels;
    document.getElementById('m-uploads').textContent = uploads;

    const catCounts = {};
    imgs.forEach(i => { catCounts[i.category] = (catCounts[i.category]||0)+1; });
    const catDiv = document.getElementById('catStats');
    catDiv.innerHTML = Object.entries(catCounts).sort((a,b)=>b[1]-a[1]).map(([cat,cnt])=>`
      <div onclick="filterCategoryFromDashboard('${cat}')" style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;background:var(--card2);border-radius:8px;cursor:pointer;transition:background .15s" onmouseenter="this.style.background='var(--border)'" onmouseleave="this.style.background='var(--card2)'">
        <span style="font-size:0.875rem;text-transform:capitalize">${cat}</span>
        <span class="badge badge-orange">${cnt}</span>
      </div>`).join('');

    const recent = imgs.slice(-10).reverse();
    document.getElementById('recentTable').innerHTML = recent.length ? recent.map(img=>`
      <tr>
        <td><img class="thumb" src="${img.image_thumb||img.image_url}" onerror="this.src='https://placehold.co/48x48/191919/555?text=?'" style="cursor:zoom-in" onclick="enlargeImage('${img.image_url||img.image_thumb}')" alt=""/></td>
        <td style="max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:500">${img.name||'Untitled'}</td>
        <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:0.8rem;color:var(--muted)">${img.description||'—'}</td>
        <td><span class="badge badge-orange" style="cursor:pointer" onclick="filterCategoryFromDashboard('${img.category}')">${img.parent_category ? img.parent_category+' › '+img.child_category : img.category||'—'}</span></td>
        <td style="font-size:0.8rem;text-transform:capitalize">${img.cuisine||'—'}</td>
        <td><span class="badge badge-${img.source==='pexels'?'blue':'green'}">${img.source||'upload'}</span></td>
        <td style="color:var(--muted);font-size:0.8rem">${img.createdAt ? new Date(img.createdAt).toLocaleDateString() : '—'}</td>
      </tr>`).join('') : '<tr><td colspan="7" style="text-align:center;color:var(--muted);padding:2rem">No images yet</td></tr>';
  } catch(e) { showToast('Failed to load overview','error'); }
}

async function loadImages() {
  try {
    const res = await fetch(API+'?limit=500');
    const data = await res.json();
    allImages = data.images || [];
    filteredImages = [...allImages];
    page = 0;
    populateFilterDropdowns();
    renderImageTable();
  } catch(e) { showToast('Failed to load images','error'); }
}

function populateFilterDropdowns() {
  const cuisines = [...new Set(allImages.map(i => i.cuisine).filter(Boolean))].sort();
  const cats = [...new Set(allImages.map(i => i.category).filter(Boolean))].sort();
  const cuisineSelect = document.getElementById('imgCuisineFilter');
  const catSelect = document.getElementById('imgCatFilter');
  cuisineSelect.innerHTML = '<option value="">All cuisines</option>' + cuisines.map(c => `<option value="${c}" style="text-transform:capitalize">${c}</option>`).join('');
  catSelect.innerHTML = '<option value="">All categories</option>' + cats.map(c => `<option value="${c}" style="text-transform:capitalize">${c}</option>`).join('');
}

function filterImages() {
  const q = document.getElementById('imgSearch').value.toLowerCase();
  const cat = document.getElementById('imgCatFilter').value;
  const cuisine = document.getElementById('imgCuisineFilter').value;
  filteredImages = allImages.filter(img => {
    const matchCat = !cat || img.category === cat;
    const matchCuisine = !cuisine || img.cuisine === cuisine;
    const matchQ = !q || (img.name||'').toLowerCase().includes(q) || (img.description||'').toLowerCase().includes(q) || (img.category||'').includes(q) || (img.cuisine||'').includes(q) || (img.parent_category||'').toLowerCase().includes(q) || (img.child_category||'').toLowerCase().includes(q) || (img.tags||[]).some(t=>t.includes(q));
    return matchCat && matchCuisine && matchQ;
  });
  page = 0;
  renderImageTable();
}

function renderImageTable() {
  const start = page * PAGE_SIZE, end = start + PAGE_SIZE;
  const slice = filteredImages.slice(start, end);
  document.getElementById('imgCount').textContent = `Showing ${Math.min(start+1, filteredImages.length)}–${Math.min(end, filteredImages.length)} of ${filteredImages.length}`;
  document.getElementById('prevBtn').disabled = page === 0;
  document.getElementById('nextBtn').disabled = end >= filteredImages.length;
  document.getElementById('imagesTable').innerHTML = slice.length ? slice.map(img=>`
    <tr>
      <td><input type="checkbox" class="img-check" value="${img._id}"/></td>
      <td><img class="thumb" src="${img.image_thumb||img.image_url}" onerror="this.src='https://placehold.co/48x48/191919/555?text=?'" style="cursor:zoom-in" onclick="enlargeImage('${img.image_url||img.image_thumb}')" alt=""/></td>
      <td style="max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:500;font-size:0.875rem">${img.name||'Untitled'}</td>
      <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:0.8rem;color:var(--muted)">${img.description||'—'}</td>
      <td style="font-size:0.8rem"><span class="badge badge-orange">${img.parent_category||img.category||'—'}</span></td>
      <td style="font-size:0.8rem"><span class="badge" style="background:rgba(59,130,246,0.1);color:var(--blue)">${img.child_category||'—'}</span></td>
      <td style="font-size:0.8rem;text-transform:capitalize">${img.cuisine||'—'}</td>
      <td><span class="badge badge-${img.source==='pexels'?'blue':'green'}">${img.source||'upload'}</span></td>
      <td>
        <button class="btn btn-danger" style="padding:5px 10px;font-size:0.78rem" onclick="deleteImage('${img._id}')">Delete</button>
      </td>
    </tr>`).join('') : '<tr><td colspan="9" style="text-align:center;color:var(--muted);padding:2rem">No images found</td></tr>';
}

function changePage(dir) { page += dir; renderImageTable(); }
function toggleSelectAll() {
  const checked = document.getElementById('selectAll').checked;
  document.querySelectorAll('.img-check').forEach(c => c.checked = checked);
}

async function deleteImage(id) {
  if (!confirm('Delete this image?')) return;
  try {
    const res = await fetch(API+'/'+id, {method:'DELETE'});
    if (res.ok) { showToast('Image deleted','success'); loadImages(); loadOverview(); }
    else showToast('Delete failed','error');
  } catch(e) { showToast('Delete failed','error'); }
}

async function deleteSelected() {
  const ids = [...document.querySelectorAll('.img-check:checked')].map(c=>c.value);
  if (!ids.length) { showToast('No images selected'); return; }
  if (!confirm(`Delete ${ids.length} image(s)?`)) return;
  let done = 0;
  for (const id of ids) {
    try { await fetch(API+'/'+id, {method:'DELETE'}); done++; } catch(e){}
  }
  showToast(`Deleted ${done} image(s)`,'success');
  loadImages(); loadOverview();
}

const adminDrop = document.getElementById('adminDropzone');
const bulkInput = document.getElementById('bulkFileInput');
adminDrop.addEventListener('click', () => bulkInput.click());
adminDrop.addEventListener('dragover', e => { e.preventDefault(); adminDrop.classList.add('drag'); });
adminDrop.addEventListener('dragleave', () => adminDrop.classList.remove('drag'));
adminDrop.addEventListener('drop', e => {
  e.preventDefault(); adminDrop.classList.remove('drag');
  handleBulkFiles(e.dataTransfer.files);
});
bulkInput.addEventListener('change', () => handleBulkFiles(bulkInput.files));

function handleBulkFiles(files) {
  const preview = document.getElementById('filePreview');
  preview.innerHTML = '';
  [...files].forEach((f, i) => {
    const url = URL.createObjectURL(f);
    const div = document.createElement('div');
    div.className = 'file-preview-item';
    div.innerHTML = `<img src="${url}" alt=""/><button onclick="removeFile(${i})">✕</button>`;
    preview.appendChild(div);
  });
  adminDrop.querySelector('p').innerHTML = `<strong>${files.length} file(s) ready</strong>`;
}

function removeFile(i) { showToast('Remove files and re-select to update'); }

async function submitBulkUpload() {
  if (!bulkInput.files.length) { showToast('Select files first'); return; }
  const cat = document.getElementById('bulkCat').value;
  if (!cat) { showToast('Select a category'); return; }
  const total = bulkInput.files.length;
  const progress = document.getElementById('uploadProgress');
  const fill = document.getElementById('progressFill');
  const label = document.getElementById('progressLabel');
  progress.style.display = 'block';
  let done = 0;
  for (const file of bulkInput.files) {
    const fd = new FormData();
    fd.append('images', file);
    fd.append('category', cat);
    fd.append('cuisine', document.getElementById('bulkCuisine').value);
    fd.append('tags', document.getElementById('bulkTags').value);
    fd.append('photographer', document.getElementById('bulkPhotog').value);
    try { await fetch(UPLOAD_API, {method:'POST',body:fd}); } catch(e){}
    done++;
    fill.style.width = Math.round((done/total)*100)+'%';
    label.textContent = `Uploading ${done} of ${total}…`;
  }
  label.textContent = `Done! ${done} images uploaded.`;
  showToast(`${done} images uploaded`,'success');
  loadOverview();
}

function resetBulkUpload() {
  bulkInput.value = '';
  document.getElementById('filePreview').innerHTML = '';
  adminDrop.querySelector('p').innerHTML = '<strong>Drop images here</strong> or click to browse<br/><span style="font-size:0.78rem">JPG, PNG, WebP — up to 50 files, 10MB each</span>';
  document.getElementById('uploadProgress').style.display = 'none';
  document.getElementById('progressFill').style.width = '0%';
}

function populateCategoryDropdowns() {
  const bulkCat = document.getElementById('bulkCat');
  const scraperCat = document.getElementById('scraperCat');
  const bulkCuisine = document.getElementById('bulkCuisine');
  
  if (bulkCat) {
    bulkCat.innerHTML = '<option value="">Select category</option>' + categories.map(c => `<option value="${c.slug}">${c.name}</option>`).join('');
  }
  if (scraperCat) {
    scraperCat.innerHTML = '<option value="all" selected>All categories</option>' + categories.map(c => `<option value="${c.slug}">${c.name}</option>`).join('');
  }
  
  const cuisines = [...new Set(categories.map(c => c.cuisine))].sort();
  if (bulkCuisine) {
    bulkCuisine.innerHTML = '<option value="">Select cuisine</option>' + cuisines.map(c => `<option value="${c.toLowerCase()}">${c}</option>`).join('');
  }
}

function renderCategories() {
  let html = '';
  cuisineHierarchy.forEach((cuisine) => {
    html += `<div style="margin-bottom: 2rem;">
      <h3 style="font-size:1.2rem; font-weight:700; color:var(--accent); margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border);">${cuisine.name}</h3>
      <div style="display:flex; flex-direction:column; gap:1.5rem;">`;
    
    cuisine.main_categories.forEach(mainCat => {
      html += `<div>
        <h4 style="font-size:0.95rem; font-weight:600; color:var(--text); margin-bottom: 0.5rem; display:flex; align-items:center; gap:8px;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="2"><path d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
          ${mainCat.name}
        </h4>
        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:12px;">`;
      
      mainCat.child_categories.forEach(childCat => {
        html += `<div style="background:var(--card2); border:1px solid var(--border); border-radius:8px; padding:1rem;">
          <h5 style="font-size:0.8rem; color:var(--muted); text-transform:uppercase; letter-spacing:1px; margin-bottom:10px;">${childCat.name}</h5>
          <div style="display:flex; flex-wrap:wrap; gap:6px;">`;
        
        childCat.items.forEach(item => {
          html += `<span class="badge" style="background:rgba(255,255,255,0.05); border:1px solid var(--border); color:var(--text);">${item.name}</span>`;
        });
        
        html += `</div></div>`;
      });
      html += `</div></div>`;
    });
    html += `</div></div>`;
  });
  
  const catGrid = document.getElementById('catGrid');
  if(catGrid) {
    catGrid.style.display = 'block';
    catGrid.innerHTML = html;
  }
}

function openCatModal(editIdx) {
  document.getElementById('catModal').classList.add('open');
  document.getElementById('catModalTitle').textContent = editIdx !== undefined ? 'Edit category' : 'Add category';
  if (editIdx !== undefined) {
    const c = categories[editIdx];
    document.getElementById('catSlug').value = c.slug;
    document.getElementById('catName').value = c.name;
    document.getElementById('catCuisine').value = c.cuisine;
    document.getElementById('catQuery').value = c.query;
    document.getElementById('catModal').dataset.editIdx = editIdx;
  } else {
    ['catSlug','catName','catCuisine','catQuery'].forEach(id => document.getElementById(id).value = '');
    delete document.getElementById('catModal').dataset.editIdx;
  }
}

function editCategory(i) { openCatModal(i); }
function closeCatModal() { document.getElementById('catModal').classList.remove('open'); }

function saveCategory() {
  const slug = document.getElementById('catSlug').value.trim();
  const name = document.getElementById('catName').value.trim();
  const cuisine = document.getElementById('catCuisine').value.trim();
  const query = document.getElementById('catQuery').value.trim();
  if (!slug || !name) { showToast('Slug and name are required'); return; }
  const editIdx = document.getElementById('catModal').dataset.editIdx;
  if (editIdx !== undefined) {
    categories[parseInt(editIdx)] = {slug,name,cuisine,query};
  } else {
    if (categories.find(c=>c.slug===slug)) { showToast('Category already exists'); return; }
    categories.push({slug,name,cuisine,query});
  }
  closeCatModal();
  renderCategories();
  showToast('Category saved','success');
}

function deleteCategory(i) {
  if (!confirm(`Delete category "${categories[i].name}"?`)) return;
  categories.splice(i,1);
  renderCategories();
  showToast('Category deleted');
}

async function runScraper() {
  const btn = document.getElementById('runBtn');
  const dot = document.getElementById('scraperDot');
  const statusText = document.getElementById('scraperStatusText');
  const subText = document.getElementById('scraperSubText');
  const log = document.getElementById('logBox');
  const perPage = document.getElementById('perPage').value || 10;

  btn.disabled = true;
  dot.className = 'status-dot running';
  statusText.textContent = 'Scraper running…';
  log.innerHTML = '<span class="log-line-info">Starting scraper…\n</span>';

  try {
    const res = await fetch(SCRAPER_API+'/run', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({perPage: parseInt(perPage)})
    });

    if (res.body) {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while(true) {
        const {done, value} = await reader.read();
        if (done) break;
        const text = decoder.decode(value);
        const lines = text.split('\n').filter(Boolean);
        lines.forEach(line => {
          const cls = line.includes('saved') ? 'log-line-ok' :
                      line.includes('fail')||line.includes('error') ? 'log-line-err' : '';
          log.innerHTML += `<span class="${cls}">${line}\n</span>`;
          log.scrollTop = log.scrollHeight;
        });
      }
    } else {
      const data = await res.json();
      log.innerHTML += `<span class="log-line-ok">Done. ${JSON.stringify(data)}\n</span>`;
    }

    dot.className = 'status-dot done';
    statusText.textContent = 'Scraper finished';
    subText.textContent = 'Last run: ' + new Date().toLocaleTimeString();
    showToast('Scraper completed','success');
    loadOverview();
  } catch(e) {
    dot.className = 'status-dot error';
    statusText.textContent = 'Scraper error';
    log.innerHTML += `<span class="log-line-err">Error: ${e.message}\n</span>`;
    showToast('Scraper failed','error');
  }
  btn.disabled = false;
}

function clearLog() { document.getElementById('logBox').textContent = 'Log cleared.\n'; }

function showToast(msg, type='') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show' + (type?' '+type:'');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function enlargeImage(url) {
  const lightbox = document.getElementById('imageLightbox');
  const img = document.getElementById('lightboxImg');
  img.src = url;
  lightbox.classList.add('open');
}

function closeLightbox() {
  document.getElementById('imageLightbox').classList.remove('open');
}

async function filterCategoryFromDashboard(category) {
  // Switch to the Images tab panel
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  
  // Find the Images nav item and activate it
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(n => {
    if (n.getAttribute('onclick')?.includes('images')) {
      n.classList.add('active');
    }
  });
  
  document.getElementById('panel-images').classList.add('active');
  document.getElementById('pageTitle').textContent = pageTitles['images'];
  
  // Load images and then apply filter
  try {
    const res = await fetch(API+'?limit=500');
    const data = await res.json();
    allImages = data.images || [];
    
    // Set filter select value
    const catSelect = document.getElementById('imgCatFilter');
    if (catSelect) {
      catSelect.value = category;
    }
    
    filteredImages = allImages.filter(img => img.category === category);
    page = 0;
    renderImageTable();
  } catch(e) {
    showToast('Failed to load images','error');
  }
}

async function init() {
  try {
    const res = await fetch('cuisineCategories.json');
    cuisineHierarchy = await res.json();
    
    categories = [];
    cuisineHierarchy.forEach(cuisine => {
      cuisine.main_categories.forEach(mainCat => {
        mainCat.child_categories.forEach(childCat => {
          childCat.items.forEach(item => {
            categories.push({
              slug: item.id,
              name: item.name,
              cuisine: cuisine.name,
              parent_category: mainCat.name,
              child_category: childCat.name,
              query: item.name + ' food'
            });
          });
        });
      });
    });
    
    populateCategoryDropdowns();
  } catch(e) {
    console.error("Failed to load cuisine categories", e);
  }
  loadOverview();
}

init();
