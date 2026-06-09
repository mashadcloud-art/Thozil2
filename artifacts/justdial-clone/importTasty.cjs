const fs = require('fs');

const API_KEY = '219cb6dd57mshade28004b8f12cfp12a153jsnc7f53ea593b0';
const HOST = 'tasty.p.rapidapi.com';

const file = 'public/apiData.json';
const apiData = JSON.parse(fs.readFileSync(file, 'utf8'));

async function importTasty() {
  console.log('Fetching Tasty recipes...');
  const res = await fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes', {
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': HOST
    }
  });

  if (!res.ok) {
    throw new Error(`Tasty API failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  const recipes = json.results;

  // Create a new Cuisine for Tasty
  const tastyCuisine = {
    id: "tasty_under_30",
    name: "Tasty (Under 30 Mins)",
    image: recipes[0]?.thumbnail_url || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
    categories: [
      {
        id: "tasty_recipes",
        name: "Quick Recipes",
        image: recipes[1]?.thumbnail_url || "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0",
        items: []
      }
    ]
  };

  recipes.forEach(recipe => {
    // Some tasty items are compilations which don't have all fields, skip if no name
    if (!recipe.name) return;

    tastyCuisine.categories[0].items.push({
      id: `tasty_${recipe.id}`,
      name: recipe.name || "Tasty Recipe",
      description: recipe.description ? recipe.description.substring(0, 100) + '...' : "Delicious quick recipe from Tasty.",
      price: Math.floor(Math.random() * 200) + 150, // mock price
      image: recipe.thumbnail_url || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1"
    });
  });

  // Check if it already exists to prevent duplicates
  const existingIndex = apiData.cuisines.findIndex(c => c.id === 'tasty_under_30');
  if (existingIndex > -1) {
    apiData.cuisines[existingIndex] = tastyCuisine;
  } else {
    apiData.cuisines.push(tastyCuisine);
  }

  // Also randomly add "tasty_under_30" to a few restaurants
  for (let i = 0; i < 5; i++) {
    const randomRest = apiData.restaurants[Math.floor(Math.random() * apiData.restaurants.length)];
    if (!randomRest.cuisines.includes('tasty_under_30')) {
      randomRest.cuisines.push('tasty_under_30');
    }
  }

  fs.writeFileSync(file, JSON.stringify(apiData, null, 2));
  console.log(`Successfully added ${tastyCuisine.categories[0].items.length} Tasty recipes to apiData.json!`);
}

importTasty().catch(console.error);
