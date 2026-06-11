const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/thozil_db').then(async () => {
  const FoodImage = require('../models/FoodImage');
  const sample = await FoodImage.findOne({ description: { $ne: '' } });
  console.log('Sample with description:', JSON.stringify(sample, null, 2));
  process.exit(0);
}).catch(err => { console.error(err); process.exit(1); });
