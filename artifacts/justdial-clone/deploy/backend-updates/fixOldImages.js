const mongoose = require('mongoose');
require('dotenv').config();

const FoodImage = require('../models/FoodImage');

const MAPPINGS = {
  'biriyani': {
    name: 'Biryani',
    cuisine: 'telangana',
    parent_category: 'Hyderabadi Biryani',
    child_category: 'Biryani Types'
  },
  'dosa': {
    name: 'Dosa',
    cuisine: 'kerala',
    parent_category: 'Kerala Breakfast',
    child_category: 'Dosa Varieties'
  },
  'curry': {
    name: 'Curry',
    cuisine: 'punjab',
    parent_category: 'Punjabi Meals',
    child_category: 'Veg Curries'
  },
  'street-food': {
    name: 'Street Food',
    cuisine: 'delhi',
    parent_category: 'Delhi Street Food',
    child_category: 'Chaat'
  },
  'pasta': {
    name: 'Pasta',
    cuisine: 'italian',
    parent_category: 'Pasta',
    child_category: 'Pasta Types'
  },
  'seafood': {
    name: 'Seafood',
    cuisine: 'kerala',
    parent_category: 'Kerala Seafood',
    child_category: 'Fish Curry'
  },
  'shawarma': {
    name: 'Shawarma',
    cuisine: 'arabian',
    parent_category: 'Grill',
    child_category: 'Grill Items'
  },
  'arabic': {
    name: 'Arabic Dishes',
    cuisine: 'arabian',
    parent_category: 'Rice Dishes',
    child_category: 'Rice Items'
  },
  'fried-rice': {
    name: 'Fried Rice',
    cuisine: 'chinese',
    parent_category: 'Main Course',
    child_category: 'Noodles'
  },
  'desserts': {
    name: 'Dessert',
    cuisine: 'desserts',
    parent_category: 'Sweets',
    child_category: 'Sweet Items'
  },
  'soups': {
    name: 'Soup',
    cuisine: 'chinese',
    parent_category: 'Starters',
    child_category: 'Dimsum'
  },
  'sushi': {
    name: 'Sushi',
    cuisine: 'japanese',
    parent_category: 'Sushi',
    child_category: 'Maki Rolls'
  },
  'salads': {
    name: 'Salad',
    cuisine: 'greek',
    parent_category: 'Salads',
    child_category: 'Salad Items'
  },
  'beverages': {
    name: 'Beverage',
    cuisine: 'desserts',
    parent_category: 'Ice Creams',
    child_category: 'Ice Cream Types'
  },
  'pizza': {
    name: 'Pizza',
    cuisine: 'italian',
    parent_category: 'Pizza',
    child_category: 'Pizza Types'
  },
  'breakfast': {
    name: 'Breakfast',
    cuisine: 'kerala',
    parent_category: 'Kerala Breakfast',
    child_category: 'Puttu & Appam'
  },
  'burgers': {
    name: 'Burger',
    cuisine: 'american',
    parent_category: 'Burgers',
    child_category: 'Burger Types'
  },
  'tandoori': {
    name: 'Tandoori',
    cuisine: 'punjab',
    parent_category: 'Punjabi Breads',
    child_category: 'Tandoor Breads'
  },
  'grills': {
    name: 'Grill',
    cuisine: 'turkish',
    parent_category: 'Grill',
    child_category: 'Grill Items'
  },
  'kerala': {
    name: 'Kerala Dish',
    cuisine: 'kerala',
    parent_category: 'Kerala Breads',
    child_category: 'Parotta'
  }
};

async function main() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/thozil_db');
  console.log('Connected to MongoDB');

  const docs = await FoodImage.find({
    $or: [
      { parent_category: '' },
      { parent_category: { $exists: false } }
    ]
  });

  console.log(`Found ${docs.length} documents to fix.`);

  let updated = 0;
  for (const doc of docs) {
    const mapping = MAPPINGS[doc.category];
    if (mapping) {
      const updateFields = {
        cuisine: mapping.cuisine,
        parent_category: mapping.parent_category,
        child_category: mapping.child_category
      };

      // If the current name is a long alt text description, move it to description and set short name
      if (doc.name !== mapping.name) {
        updateFields.description = doc.name;
        updateFields.name = mapping.name;
      }

      await FoodImage.updateOne({ _id: doc._id }, { $set: updateFields });
      updated++;
    } else {
      console.log(`Warning: No mapping found for category "${doc.category}" (ID: ${doc._id})`);
    }
  }

  console.log(`Successfully updated ${updated} documents.`);
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
