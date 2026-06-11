const fs = require('fs');

const data = JSON.parse(fs.readFileSync('../../src/data/cuisineCategories.json', 'utf8'));

// Expand function: adds dummy or extended items to each child category
data.forEach(cuisine => {
  cuisine.main_categories.forEach(mainCat => {
    mainCat.child_categories.forEach(childCat => {
      // Add 5 more items to each child category based on the name
      const prefix = childCat.name.replace(/ Varieties| Types| Dishes/gi, '');
      const existingIds = childCat.items.map(i => i.id);
      
      const newItems = [
        "Special", "Premium", "Spicy", "Authentic", "Classic", 
        "Traditional", "Family", "Combo", "Chef's Special", "Supreme"
      ];
      
      newItems.forEach(modifier => {
        const newName = `${modifier} ${prefix}`;
        const newId = newName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
        if (!existingIds.includes(newId)) {
          childCat.items.push({ id: newId, name: newName });
          existingIds.push(newId);
        }
      });
    });
  });
});

fs.writeFileSync('expandedCuisineCategories.json', JSON.stringify(data, null, 2));
console.log('Successfully expanded cuisineCategories.json');
