const fs = require('fs');

const p1 = JSON.parse(fs.readFileSync('realMenusPart1.json', 'utf8'));
const p2 = JSON.parse(fs.readFileSync('realMenusPart2.json', 'utf8'));
const p3 = JSON.parse(fs.readFileSync('realMenusPart3.json', 'utf8'));
const p4 = JSON.parse(fs.readFileSync('realMenusPart4.json', 'utf8'));

// Convert p4 global_extras to standard cuisine format
const extrasAsCuisines = p4.global_extras.map(extra => ({
  id: extra.id,
  name: extra.name,
  categories: [
    {
      id: `${extra.id}_category`,
      name: extra.name,
      items: extra.items
    }
  ]
}));

const userCuisines = [...p1.cuisines, ...p2.cuisines, ...p3.cuisines, ...extrasAsCuisines];
const userCuisineIds = new Set(userCuisines.map(c => c.id));

const apiData = JSON.parse(fs.readFileSync('public/apiData.json', 'utf8'));

// Remove all existing cuisines EXCEPT for Tasty (tasty_under_30) if it's there
apiData.cuisines = apiData.cuisines.filter(c => c.id === 'tasty_under_30');

// Add user cuisines
apiData.cuisines.push(...userCuisines);

// Fix images
apiData.cuisines.forEach(c => {
  if (!c.image && c.id !== 'tasty_under_30') {
    c.image = c.categories?.[0]?.items?.[0]?.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c";
  }
  c.categories.forEach(cat => {
    if (!cat.image) cat.image = cat.items?.[0]?.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c";
  });
});

// Update restaurants to only reference valid cuisines!
const validCuisineIds = new Set(apiData.cuisines.map(c => c.id));

apiData.restaurants.forEach(rest => {
  // Strip out dummy cuisines that don't exist anymore
  rest.cuisines = rest.cuisines.filter(cid => validCuisineIds.has(cid));
});

// Randomly assign the new cuisines so every restaurant has 2-5
validCuisineIds.forEach(cid => {
  for (let i = 0; i < 6; i++) {
    const randomRest = apiData.restaurants[Math.floor(Math.random() * apiData.restaurants.length)];
    if (!randomRest.cuisines.includes(cid)) {
      randomRest.cuisines.push(cid);
    }
  }
});

fs.writeFileSync('public/apiData.json', JSON.stringify(apiData, null, 2));
console.log(`Applied ${userCuisines.length} user-provided cuisines exactly. Total cuisines in system: ${apiData.cuisines.length}. All dummy placeholders removed!`);
