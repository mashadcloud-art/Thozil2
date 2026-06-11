import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cuisineData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../src/data/cuisineCategories.json'), 'utf8'));

const structure = {};
for (const cuisine of cuisineData) {
  structure[cuisine.id] = {
    name: cuisine.name,
    categories: {}
  };
  for (const mainCat of cuisine.main_categories) {
    structure[cuisine.id].categories[mainCat.name] = mainCat.child_categories.map(c => c.name);
  }
}

console.log(JSON.stringify(structure, null, 2));
