const fs = require('fs');

const file = 'public/apiData.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

// Foodish API categories and roughly how many images they have
const foodish = {
  biryani: 70,
  burger: 80,
  'butter-chicken': 22,
  dessert: 36,
  dosa: 70,
  idly: 70,
  pasta: 34,
  pizza: 90,
  rice: 35,
  samosa: 22
};

const getFoodishImage = (categoryHint) => {
  let cat = 'pizza'; // default
  const lowerHint = categoryHint.toLowerCase();
  
  if (lowerHint.includes('biryani') || lowerHint.includes('rice') || lowerHint.includes('arabian')) cat = 'biryani';
  else if (lowerHint.includes('burger') || lowerHint.includes('american')) cat = 'burger';
  else if (lowerHint.includes('butter') || lowerHint.includes('chicken') || lowerHint.includes('north indian')) cat = 'butter-chicken';
  else if (lowerHint.includes('dessert') || lowerHint.includes('bakery') || lowerHint.includes('sweet')) cat = 'dessert';
  else if (lowerHint.includes('dosa') || lowerHint.includes('kerala') || lowerHint.includes('south indian')) cat = 'dosa';
  else if (lowerHint.includes('idly') || lowerHint.includes('breakfast')) cat = 'idly';
  else if (lowerHint.includes('pasta') || lowerHint.includes('italian') || lowerHint.includes('continental')) cat = 'pasta';
  else if (lowerHint.includes('samosa') || lowerHint.includes('street') || lowerHint.includes('snack')) cat = 'samosa';
  else if (lowerHint.includes('seafood') || lowerHint.includes('healthy')) cat = 'rice';
  else {
    // Pick random category
    const keys = Object.keys(foodish);
    cat = keys[Math.floor(Math.random() * keys.length)];
  }

  const max = foodish[cat];
  const num = Math.floor(Math.random() * max) + 1;
  return `https://foodish-api.com/images/${cat}/${cat}${num}.jpg`;
};

data.cuisines.forEach(cuisine => {
  cuisine.image = getFoodishImage(cuisine.name);
  
  cuisine.categories.forEach(cat => {
    cat.image = getFoodishImage(`${cuisine.name} ${cat.name}`);
    
    cat.items.forEach(item => {
      item.image = getFoodishImage(`${cuisine.name} ${cat.name} ${item.name}`);
    });
  });
});

data.restaurants.forEach(rest => {
  rest.image = getFoodishImage(rest.cuisines[0] || 'restaurant');
});

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Successfully updated all images in apiData.json to use Foodish API with realistic Indian/Global foods!');
