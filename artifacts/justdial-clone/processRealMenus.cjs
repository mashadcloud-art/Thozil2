const fs = require('fs');

const realMenus = JSON.parse(fs.readFileSync('realMenus.json', 'utf8'));
const apiData = JSON.parse(fs.readFileSync('public/apiData.json', 'utf8'));

// Foodish API categories
const foodish = {
  biryani: 70, burger: 80, 'butter-chicken': 22, dessert: 36, dosa: 70, idly: 70, pasta: 34, pizza: 90, rice: 35, samosa: 22
};

const getFoodishImage = (categoryHint) => {
  let cat = 'pizza'; 
  const lowerHint = categoryHint.toLowerCase();
  
  if (lowerHint.includes('biryani') || lowerHint.includes('rice') || lowerHint.includes('arabian') || lowerHint.includes('mandi') || lowerHint.includes('pongal')) cat = 'biryani';
  else if (lowerHint.includes('burger') || lowerHint.includes('american') || lowerHint.includes('sandwich')) cat = 'burger';
  else if (lowerHint.includes('butter') || lowerHint.includes('chicken') || lowerHint.includes('north indian') || lowerHint.includes('tikka') || lowerHint.includes('alfaham') || lowerHint.includes('roast') || lowerHint.includes('fry') || lowerHint.includes('shawarma')) cat = 'butter-chicken';
  else if (lowerHint.includes('dessert') || lowerHint.includes('bakery') || lowerHint.includes('sweet') || lowerHint.includes('cake') || lowerHint.includes('jamun') || lowerHint.includes('ice cream') || lowerHint.includes('payasam') || lowerHint.includes('halwa') || lowerHint.includes('shake')) cat = 'dessert';
  else if (lowerHint.includes('dosa') || lowerHint.includes('kerala') || lowerHint.includes('south indian') || lowerHint.includes('appam') || lowerHint.includes('puttu') || lowerHint.includes('chapathi') || lowerHint.includes('porotta')) cat = 'dosa';
  else if (lowerHint.includes('idly') || lowerHint.includes('breakfast')) cat = 'idly';
  else if (lowerHint.includes('pasta') || lowerHint.includes('italian') || lowerHint.includes('continental') || lowerHint.includes('noodles')) cat = 'pasta';
  else if (lowerHint.includes('samosa') || lowerHint.includes('street') || lowerHint.includes('snack') || lowerHint.includes('vada') || lowerHint.includes('chips')) cat = 'samosa';
  else if (lowerHint.includes('seafood') || lowerHint.includes('fish') || lowerHint.includes('juice') || lowerHint.includes('drink') || lowerHint.includes('tea') || lowerHint.includes('coffee') || lowerHint.includes('cola')) cat = 'rice';
  else {
    const keys = Object.keys(foodish);
    cat = keys[Math.floor(Math.random() * keys.length)];
  }

  const max = foodish[cat];
  const num = Math.floor(Math.random() * max) + 1;
  return `https://foodish-api.com/images/${cat}/${cat}${num}.jpg`;
};

// Process cuisines
const newCuisines = realMenus.cuisines.map(c => {
  c.image = getFoodishImage(c.name);
  c.categories.forEach(cat => {
    cat.image = getFoodishImage(cat.name);
    cat.items.forEach(item => {
      if (item.image && item.image.startsWith('AUTO_IMAGE:')) {
        item.image = getFoodishImage(item.image.split(':')[1]);
      } else {
        item.image = getFoodishImage(item.name);
      }
    });
  });
  return c;
});

// Process global extra categories as separate cuisines
realMenus.global_extra_categories.forEach(ext => {
  const c = {
    id: ext.id,
    name: ext.name,
    image: getFoodishImage(ext.name),
    categories: [
      {
        id: ext.id + "_all",
        name: "All Items",
        image: getFoodishImage(ext.name),
        items: ext.items.map(item => {
          if (item.image && item.image.startsWith('AUTO_IMAGE:')) {
            item.image = getFoodishImage(item.image.split(':')[1]);
          } else {
            item.image = getFoodishImage(item.name);
          }
          return item;
        })
      }
    ]
  };
  newCuisines.push(c);
});

apiData.cuisines = newCuisines;

// For existing restaurants, clean up cuisines if they aren't in newCuisines
const validIds = new Set(newCuisines.map(c => c.id));
apiData.restaurants.forEach(rest => {
  if (rest.cuisines) {
    rest.cuisines = rest.cuisines.filter(cid => validIds.has(cid));
    if (rest.cuisines.length === 0) {
      // Pick random cuisines
      rest.cuisines = [newCuisines[Math.floor(Math.random() * newCuisines.length)].id];
    }
  }
});

fs.writeFileSync('public/apiData.json', JSON.stringify(apiData, null, 2));
console.log('Successfully injected real menus into apiData.json!');
