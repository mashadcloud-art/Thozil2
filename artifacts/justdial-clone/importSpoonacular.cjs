const fs = require('fs');

const API_KEY = '54f8b6949ac04898b08db6462485e876';

const file = 'public/apiData.json';
const apiData = JSON.parse(fs.readFileSync(file, 'utf8'));

async function importSpoonacular() {
  console.log("Fetching recipes from Spoonacular...");
  const res = await fetch(`https://api.spoonacular.com/recipes/random?number=100&apiKey=${API_KEY}`);
  
  if (!res.ok) {
    console.error("Failed to fetch Spoonacular API:", res.status);
    return;
  }
  
  const data = await res.json();
  const recipes = data.recipes || [];
  
  console.log(`Fetched ${recipes.length} recipes.`);
  
  const cuisineId = "spoonacular_picks";
  const categoryId = "spoonacular_recipes";
  
  // Remove existing Spoonacular cuisine if any
  apiData.cuisines = apiData.cuisines.filter(c => c.id !== cuisineId);
  
  const items = recipes.map(recipe => {
    // Clean summary HTML tags
    let description = recipe.summary ? recipe.summary.replace(/<[^>]*>?/gm, '') : "";
    if (description.length > 100) description = description.substring(0, 97) + "...";
    
    return {
      id: `sp_${recipe.id}`,
      name: recipe.title,
      description: description,
      price: Math.max(50, Math.round(recipe.pricePerServing / 2)),
      image: recipe.image || "https://images.unsplash.com/photo-1495147466023-e6a925cd9294?w=500&q=80"
    };
  });
  
  const spoonCuisine = {
    id: cuisineId,
    name: "Chef's Specials",
    image: items[0]?.image || "https://images.unsplash.com/photo-1495147466023-e6a925cd9294?w=500&q=80",
    categories: [
      {
        id: categoryId,
        name: "Trending Recipes",
        image: items[1]?.image || items[0]?.image || "https://images.unsplash.com/photo-1495147466023-e6a925cd9294?w=500&q=80",
        items: items
      }
    ]
  };
  
  apiData.cuisines.push(spoonCuisine);
  
  // Randomly assign to a few restaurants
  let count = 0;
  for (let i = 0; i < 5; i++) {
    const randomRest = apiData.restaurants[Math.floor(Math.random() * apiData.restaurants.length)];
    if (!randomRest.cuisines.includes(cuisineId)) {
      randomRest.cuisines.push(cuisineId);
      count++;
    }
  }
  
  fs.writeFileSync(file, JSON.stringify(apiData, null, 2));
  console.log(`Successfully added Spoonacular recipes to our database and assigned to ${count} restaurants!`);
}

importSpoonacular().catch(console.error);
