const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/thozil_db').then(async () => {
  const FoodImage = require('../models/FoodImage');
  const emptyCount = await FoodImage.countDocuments({ $or: [{ parent_category: '' }, { parent_category: { $exists: false } }] });
  console.log('Total documents with empty parent_category:', emptyCount);
  
  const categories = await FoodImage.aggregate([
    { $match: { $or: [{ parent_category: '' }, { parent_category: { $exists: false } }] } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  console.log('Categories and counts:');
  console.log(JSON.stringify(categories, null, 2));
  process.exit(0);
}).catch(err => { console.error(err); process.exit(1); });
