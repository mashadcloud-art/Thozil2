const mongoose = require('mongoose');

const FoodImageSchema = new mongoose.Schema({
  name:             { type: String, required: true },
  description:      { type: String, default: '' },
  category:         { type: String, required: true, lowercase: true },
  parent_category:  { type: String, default: '' },
  child_category:   { type: String, default: '' },
  cuisine:          { type: String, default: 'global', lowercase: true },
  tags:             [String],
  source:           { type: String, enum: ['pexels','unsplash','pixabay','wikimedia','restaurant','admin'], required: true },
  pexels_id:        { type: String },
  unsplash_id:      { type: String },
  pixabay_id:       { type: String },
  wikimedia_title:  { type: String },
  photographer:     { type: String },
  image_thumb:      { type: String, required: true },
  image_url:        { type: String, required: true },
  image_original:   { type: String },
  local_path:       { type: String },
  uploaded_by:      { type: String, default: 'system' },
  is_active:        { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('FoodImage', FoodImageSchema);
