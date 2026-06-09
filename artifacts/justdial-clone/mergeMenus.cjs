const fs = require('fs');

const currentData = JSON.parse(fs.readFileSync('public/apiData.json', 'utf8').replace(/^\uFEFF/, ''));
const oldDataStr = fs.readFileSync('public/oldApiData.json', 'utf8').replace(/^\uFEFF/, '');
const oldData = JSON.parse(oldDataStr);

// 1. Add all old cuisines back if they don't exist
const currentCuisineIds = new Set(currentData.cuisines.map(c => c.id));

oldData.cuisines.forEach(oldC => {
  if (!currentCuisineIds.has(oldC.id)) {
    currentData.cuisines.push(oldC);
  }
});

// 2. Restore restaurant cuisine mappings from old data
const oldRestMap = new Map(oldData.restaurants.map(r => [r.id, r.cuisines]));

currentData.restaurants.forEach(rest => {
  const oldCuisines = oldRestMap.get(rest.id);
  if (oldCuisines) {
    // Merge existing (which has tasty & real menus) with old (which has 1000+ dummies)
    rest.cuisines = Array.from(new Set([...rest.cuisines, ...oldCuisines]));
  }
});

fs.writeFileSync('public/apiData.json', JSON.stringify(currentData, null, 2));
console.log(`Successfully merged menus! Total cuisines now: ${currentData.cuisines.length}`);
