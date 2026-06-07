const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// =========================
// MONGODB CONNECTION
// =========================
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/thozil_db')
  .then(() => console.log('📁 Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// =========================
// ADMIN ROUTES
// =========================
const stateRoutes = require("./routes/admin/stateRoutes");
const districtRoutes = require("./routes/admin/districtRoutes");
const touristRoutes = require("./routes/admin/touristRoutes");
const restaurantRoutes = require("./routes/admin/restaurantRoutes");
const rideRoutes = require("./routes/admin/rideRoutes");
const hotelRoutes = require("./routes/admin/hotelRoutes");
const uploadRoutes = require("./routes/admin/uploadRoutes");

// =========================
// IMPORT MODELS
// =========================
const Tourism = require("./models/Tourism");

// =========================
// EXPRESS SETUP
// =========================
const app = express();
app.use(cors());
app.use(express.json());

// =========================
// USE ADMIN ROUTES
// =========================
app.use("/admin/state", stateRoutes);
app.use("/admin/district", districtRoutes);
app.use("/admin/tourist", touristRoutes);
app.use("/admin/restaurant", restaurantRoutes);
app.use("/admin/ride", rideRoutes);
app.use("/admin/hotel", hotelRoutes);
app.use("/admin/upload", uploadRoutes);

// =========================
// PUBLIC TOURISM API
// =========================
app.get('/api/v1/tourism', async (req, res) => {
  try {
    const { state } = req.query;
    if (!state) {
      return res.status(400).json({ error: 'Please specify a state query parameter.' });
    }

    const result = await Tourism.findOne({ stateKey: state.toLowerCase() });
    if (!result) {
      return res.status(404).json({ error: `No records found for: ${state}` });
    }

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Database Error.' });
  }
});

app.post('/api/v1/tourism', async (req, res) => {
  try {
    const { stateKey } = req.body;
    if (!stateKey) {
      return res.status(400).json({ error: 'Please specify a stateKey in the request body.' });
    }

    const result = await Tourism.findOneAndUpdate(
      { stateKey: stateKey.toLowerCase() },
      req.body,
      { upsert: true, new: true }
    );

    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Database Error.' });
  }
});

// =========================
// ROOT ROUTE
// =========================
app.get("/", (req, res) => {
  res.send("Thozil Backend Running");
});

// =========================
// START SERVER
// =========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`📡 Thozil Backend Server is running on port ${PORT}`);
});
