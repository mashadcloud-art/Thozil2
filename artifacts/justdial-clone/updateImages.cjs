const fs = require('fs');

const file = 'public/apiData.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

let imageCounter = 0;

const getImg = (keyword1, keyword2) => {
  imageCounter++;
  const sanitized1 = keyword1.toLowerCase().replace(/[^a-z0-9]/g, '');
  const sanitized2 = keyword2 ? keyword2.toLowerCase().replace(/[^a-z0-9]/g, '') : 'food';
  // Use loremflickr with two keywords. Add lock to ensure different images for same keywords
  return `https://loremflickr.com/400/400/${sanitized1},${sanitized2}?lock=${imageCounter}`;
};

data.cuisines.forEach(cuisine => {
  cuisine.image = getImg(cuisine.name, 'food');
  
  cuisine.categories.forEach(cat => {
    cat.image = getImg(cuisine.name, cat.name);
    
    cat.items.forEach(item => {
      // e.g. "Sushi", "Japanese"
      item.image = getImg(item.name.split(' ').pop(), cuisine.name);
    });
  });
});

data.restaurants.forEach(rest => {
  rest.image = getImg(rest.cuisines[0] || 'restaurant', 'food');
});

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('Successfully updated all images in apiData.json to use loremflickr with dynamic keywords!');
