const fs = require('fs');

const cuisinesList = [
  "Kerala", "South Indian", "North Indian", "Chinese", "Arabian", "Continental",
  "Italian", "American", "Thai", "Japanese", "Mexican", "Seafood", "Bakery", "Cafe",
  "Healthy", "Street Food"
];

const districts = [
  "Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha", "Kottayam",
  "Idukki", "Ernakulam", "Thrissur", "Palakkad", "Malappuram", "Kozhikode",
  "Wayanad", "Kannur", "Kasaragod"
];

const cuisineImages = [
  "https://images.unsplash.com/photo-1606491956689-2ea866880c84", // Indian
  "https://images.unsplash.com/photo-1563379926898-05f4575a45d8", // Pasta
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1", // BBQ
  "https://images.unsplash.com/photo-1582878826629-29b7ad1cb438", // Burger
  "https://images.unsplash.com/photo-1564834724105-918b73d1b9e0", // Bakery
];

const getImage = (seed) => cuisineImages[Math.abs(seed.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) % cuisineImages.length] + "?auto=format&fit=crop&w=400&q=80";

const generateId = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '_');

const cuisines = cuisinesList.map((cuisine, cIdx) => {
  const catNames = ["Starters", "Main Course", "Specials", "Breads", "Desserts", "Beverages", "Combos", "Chef's Choice"];
  
  const categories = catNames.map((cat, catIdx) => {
    const items = Array.from({ length: 10 }).map((_, itemIdx) => {
      const name = `${cuisine} ${cat} Item ${itemIdx + 1}`;
      return {
        id: generateId(name),
        name: name,
        description: `Authentic ${name.toLowerCase()} prepared with traditional spices.`,
        price: Math.floor(Math.random() * 300) + 150,
        image: getImage(name)
      };
    });

    return {
      id: generateId(`${cuisine}_${cat}`),
      name: cat,
      image: getImage(`${cuisine}_${cat}`),
      items: items
    };
  });

  return {
    id: generateId(cuisine),
    name: cuisine,
    image: getImage(cuisine),
    categories: categories
  };
});

const restaurants = districts.flatMap((district, dIdx) => {
  return Array.from({ length: 10 }).map((_, rIdx) => {
    const name = `Restaurant ${district} ${rIdx + 1}`;
    const restCuisines = [cuisinesList[Math.floor(Math.random() * cuisinesList.length)], cuisinesList[Math.floor(Math.random() * cuisinesList.length)]];
    return {
      id: generateId(name),
      name: `The Great ${district} Eatery ${rIdx + 1}`,
      state: "KL",
      district: district,
      locality: "Downtown",
      cuisines: [...new Set(restCuisines)],
      rating: +(Math.random() * 2 + 3).toFixed(1),
      image: getImage(name),
      menu: `/api/menu/${generateId(name)}`
    };
  });
});

const output = {
  cuisines: cuisines,
  restaurants: restaurants
};

fs.writeFileSync('src/lib/apiData.json', JSON.stringify(output, null, 2));
console.log('Generated apiData.json successfully.');
