const mongoose = require('mongoose');
require('dotenv').config();

const FoodImage = require('../models/FoodImage');
const cuisineData = require('./cuisineCategories.json');

async function main() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/thozil_db');
  console.log('Connected to MongoDB');

  // Build a lookup: item_id -> { name, cuisine_name, parent_category, child_category }
  const itemLookup = {};
  for (const cuisine of cuisineData) {
    for (const mainCat of cuisine.main_categories) {
      for (const childCat of mainCat.child_categories) {
        for (const item of childCat.items) {
          itemLookup[item.id] = {
            itemName: item.name,
            cuisineId: cuisine.id,
            cuisineName: cuisine.name,
            parentCategory: mainCat.name,
            childCategory: childCat.name,
          };
        }
      }
    }
  }

  console.log(`Built lookup for ${Object.keys(itemLookup).length} items.`);

  // Update all documents
  const docs = await FoodImage.find({});
  let updated = 0;
  for (const doc of docs) {
    const info = itemLookup[doc.category];
    if (info) {
      const updateFields = {};
      // Set the name to the proper item name (e.g. "Masala Dosa")
      if (doc.name !== info.itemName) {
        updateFields.description = doc.name; // old long text becomes description
        updateFields.name = info.itemName;
      }
      // Set parent and child category
      updateFields.parent_category = info.parentCategory;
      updateFields.child_category = info.childCategory;

      if (Object.keys(updateFields).length > 0) {
        await FoodImage.updateOne({ _id: doc._id }, { $set: updateFields });
        updated++;
      }
    }
  }

  console.log(`Updated ${updated} documents with proper names, parent/child categories.`);

  // Show a sample
  const sample = await FoodImage.findOne({ parent_category: { $ne: '' } });
  if (sample) {
    console.log('\nSample document:');
    console.log(`  Name: ${sample.name}`);
    console.log(`  Description: ${sample.description}`);
    console.log(`  Category (item_id): ${sample.category}`);
    console.log(`  Cuisine: ${sample.cuisine}`);
    console.log(`  Parent Category: ${sample.parent_category}`);
    console.log(`  Child Category: ${sample.child_category}`);
  }

  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
