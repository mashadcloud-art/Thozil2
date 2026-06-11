const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

const FoodImage = require('../models/FoodImage');
const cuisineData = require('./cuisineCategories.json');

async function main() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/thozil_db');
  console.log('Connected to MongoDB');

  // Build a map of category_id -> item_name
  const categoryToName = {};
  for (const cuisine of cuisineData) {
    for (const mainCat of cuisine.main_categories) {
      for (const childCat of mainCat.child_categories) {
        for (const item of childCat.items) {
          categoryToName[item.id] = item.name;
        }
      }
    }
  }

  // Update documents
  const docs = await FoodImage.find({});
  let updated = 0;
  for (const doc of docs) {
    const correctName = categoryToName[doc.category];
    if (correctName) {
      // If the name is currently the long description (alt text)
      if (doc.name !== correctName) {
        // We need to store the old name as description.
        // Let's add a description field to the document (using Mongoose or raw update)
        // Since we don't know if 'description' is in the schema, we'll use updateOne
        await FoodImage.updateOne(
          { _id: doc._id },
          { 
            $set: { 
              name: correctName,
              description: doc.name // save the long text here
            } 
          }
        );
        updated++;
      }
    }
  }

  console.log(`Updated ${updated} image documents with correct names and descriptions.`);
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
