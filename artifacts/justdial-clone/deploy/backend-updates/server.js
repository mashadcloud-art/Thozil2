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
// LIVE WEATHER AUTOMATION
// =========================
const weatherCache = {};

async function fetchLiveWeather(city) {
  if (!city) return null;
  const cacheKey = city.toLowerCase().trim();
  const now = Date.now();
  
  if (weatherCache[cacheKey] && weatherCache[cacheKey].expiresAt > now) {
    return weatherCache[cacheKey].data;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2s timeout

    const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error("wttr.in response error");

    const data = await res.json();
    const current = data.current_condition?.[0];
    if (!current) throw new Error("Invalid wttr.in format");

    const tempC = current.temp_C || "";
    const desc = current.weatherDesc?.[0]?.value || "";
    
    // Map description to supported icon: "sun", "cloud", "cloud-rain", "wind"
    let icon = "sun";
    const descLower = desc.toLowerCase();
    if (descLower.includes("rain") || descLower.includes("drizzle") || descLower.includes("shower") || descLower.includes("thunder")) {
      icon = "cloud-rain";
    } else if (descLower.includes("cloud") || descLower.includes("overcast") || descLower.includes("mist") || descLower.includes("fog") || descLower.includes("haze")) {
      icon = "cloud";
    } else if (descLower.includes("wind") || descLower.includes("blow") || descLower.includes("storm")) {
      icon = "wind";
    }

    const weatherResult = {
      temp: `${tempC} °C`,
      condition: desc,
      icon: icon
    };

    // Cache it for 15 minutes
    weatherCache[cacheKey] = {
      data: weatherResult,
      expiresAt: now + 15 * 60 * 1000
    };

    return weatherResult;
  } catch (err) {
    console.warn(`Weather fetch failed for ${city}:`, err.message);
    return null;
  }
}

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

    const plainResult = result.toObject();
    const liveWeather = await fetchLiveWeather(plainResult.city);
    if (liveWeather) {
      plainResult.weather = liveWeather;
    }

    return res.status(200).json(plainResult);
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
// PUBLIC BUSINESS REGISTRATION API
// =========================
app.post('/api/v1/register-business', async (req, res) => {
  try {
    const { stateKey, category, businessData } = req.body;
    if (!stateKey || !category || !businessData) {
      return res.status(400).json({ error: 'Missing stateKey, category, or businessData in request body.' });
    }

    const targetStateKey = stateKey.toLowerCase();
    const stateDoc = await Tourism.findOne({ stateKey: targetStateKey });
    if (!stateDoc) {
      return res.status(404).json({ error: `State document not found for: ${stateKey}` });
    }

    let arrayName = '';
    let itemPrefix = '';
    const normCategory = category.toLowerCase();
    
    if (normCategory === 'restaurants' || normCategory === 'restaurant') {
      arrayName = 'restaurants';
      itemPrefix = 'rest';
    } else if (normCategory === 'hotels' || normCategory === 'hotel') {
      arrayName = 'hotels';
      itemPrefix = 'hot';
    } else if (normCategory === 'attractions' || normCategory === 'tourist places' || normCategory === 'tourist place') {
      arrayName = 'attractions';
      itemPrefix = 'att';
    } else {
      return res.status(400).json({ error: `Unsupported business category: ${category}` });
    }

    const uniqueId = `${targetStateKey}_${itemPrefix}_${Date.now()}`;
    const newListing = {
      id: uniqueId,
      ...businessData,
      rating: parseFloat(businessData.rating) || 5.0,
      reviews: businessData.reviews || "1 review"
    };

    // Initialize array if it doesn't exist
    if (!stateDoc[arrayName]) {
      stateDoc[arrayName] = [];
    }

    // Add item and save
    stateDoc[arrayName].push(newListing);
    stateDoc.markModified(arrayName);
    await stateDoc.save();

    return res.status(200).json({ success: true, data: newListing });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Database Error while registering business.' });
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
