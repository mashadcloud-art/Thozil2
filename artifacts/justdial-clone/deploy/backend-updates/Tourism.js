const mongoose = require("mongoose");
const TourismSchema = new mongoose.Schema({}, { strict: false });
module.exports = mongoose.models.Tourism || mongoose.model("Tourism", TourismSchema, "districts");
