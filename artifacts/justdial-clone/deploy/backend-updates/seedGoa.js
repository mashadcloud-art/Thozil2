const mongoose = require('mongoose');
require('dotenv').config();

// Define connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/thozil_db')
  .then(() => console.log('📁 Connected to MongoDB for seeding Goa'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const Tourism = require('./models/Tourism');

const goaData = {
  stateKey: "goa",
  stateName: "Goa",
  city: "Panaji",
  alternativeCity: "Calangute",
  tagline: "Sun-Kissed Beaches, Portuguese History, & Coastal Feasts",
  about: "A vibrant blend of coastal ease, dynamic nightlife, and Portuguese cultural heritage. Goa is characterized by beautiful colonial-era whitewashed churches, spice farms, sandy shorelines, and fresh, fiery fish curry.",
  weather: {
    temp: "29.8 °C",
    condition: "Tropical Sea Breeze",
    icon: "sun"
  },
  gallery: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1548625361-155de0cbb55a?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1560242964-b903328e1d28?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80"
  ],
  seasons: {
    peak: {
      months: "November - February",
      title: "Winter Beach & Carnival Season",
      temp: "22°C to 31°C",
      points: [
        "Perfect clear blue waters and pristine beaches across North & South Goa",
        "Dynamic beach shacks are fully built up, hosting late-night barbecues",
        "Ideal for windsurfing, parasailing, scuba diving, and boat tours",
        "Grand Christmas and New Year carnival celebrations illuminate the streets"
      ]
    },
    moderate: {
      months: "June - September",
      title: "Vibrant Monsoon Season",
      temp: "24°C to 28°C",
      points: [
        "Goa's hidden waterfalls like Dudhsagar swell into majestic white walls of water",
        "Spice plantations come alive with fresh cardamom and rich green foliage",
        "Enjoy peaceful coastal views with dramatic dark clouds over empty beaches",
        "The ideal season for travelers seeking silent, eco-conscious wellness stays"
      ]
    },
    off: {
      months: "March - May",
      title: "Warm Summer Season",
      temp: "28°C to 36°C",
      points: [
        "Warm humid air is broken by refreshing evening dips in the Arabian Sea",
        "Luxury boutique beach villas offer private pools at extremely low prices",
        "Fewer tourists mean intimate beach dinners with absolute privacy",
        "Enjoy legendary mango harvests and local summer village fairs"
      ]
    }
  },
  attractions: [
    {
      id: "goa_att_1",
      title: "Basilica of Bom Jesus",
      locality: "Old Goa, Panaji",
      rating: 4.7,
      reviews: "22.5k",
      desc: "A UNESCO World Heritage site, this 16th-century baroque basilica houses the preserved remains of Saint Francis Xavier.",
      timing: "Opens at 09:00 am",
      category: "History",
      image: "https://images.unsplash.com/photo-1548625361-155de0cbb55a?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "goa_att_2",
      title: "Dudhsagar Waterfalls",
      locality: "Sanguem Taluka, East Goa",
      rating: 4.8,
      reviews: "15.4k",
      desc: "A four-tiered waterfall descending from 1017 feet, resembling a cascade of milk flowing over the mountain side.",
      timing: "Opens at 08:30 am",
      category: "Tourist Places",
      image: "https://images.unsplash.com/photo-1560242964-b903328e1d28?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "goa_att_3",
      title: "Palolem Beach",
      locality: "Canacona, South Goa",
      rating: 4.6,
      reviews: "28.1k",
      desc: "A crescent-shaped beach known for its shallow waters, coconut groves, wooden cabins, and quiet vibe.",
      timing: "Available 24 Hours",
      category: "Tourist Places",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
    }
  ],
  hotels: [
    {
      id: "goa_hot_1",
      title: "The Taj Exotica Resort & Spa",
      locality: "Benaulim, South Goa",
      rating: 4.8,
      reviews: "8.9k",
      price: "₹16,500/night",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "goa_hot_2",
      title: "Alila Diwa Eco Resort",
      locality: "Majorda, South Goa",
      rating: 4.7,
      reviews: "7.1k",
      price: "₹11,000/night",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80"
    }
  ],
  oneDayHustle: {
    tagline: "The Ideal Sun & Spice Coastal Route",
    steps: [
      { time: "08:00 AM", spot: "Cycle Tour around Latin Quarter Fontainhas", desc: "Ride past bright yellow, orange, and blue Portuguese houses." },
      { time: "10:30 AM", spot: "Basilica of Bom Jesus & Old Goa", desc: "Admire beautiful altars, massive paintings, and granite pillars." },
      { time: "01:00 PM", spot: "Spicy Goan Fish Thali at Mum's Kitchen", desc: "Enjoy fish recheado, coconut curry, red rice, and sour solkadhi." },
      { time: "03:30 PM", spot: "Dolphin Spotting & Sinquerim Boat Cruise", desc: "Take a speed boat ride around the fort walls to spot dolphins." },
      { time: "06:00 PM", spot: "Sunset & Live Music at Anjuna Beach", desc: "Relax on sandy shores, listening to local bands as the sun sets." }
    ]
  },
  restaurants: [
    {
      id: "goa_rest_1",
      title: "Martin's Corner",
      locality: "Betalbatim, South Goa",
      cuisine: "Authentic Goan Seafood",
      rating: 4.5,
      reviews: "18.3k",
      famousFor: "Butter Garlic Calamari & Pork Vindaloo",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80"
    }
  ],
  didYouKnow: [
    "Goa is India's smallest state, yet boasts over 100 kilometers of tropical coastline.",
    "The state remained a colony of Portugal for 450 years, liberated in 1961.",
    "Panaji features Fontainhas, the only functional Latin Quarter in Asia.",
    "The Dudhsagar waterfall is located inside the sanctuary, providing pathways for leopards."
  ]
};

async function seed() {
  await Tourism.findOneAndUpdate(
    { stateKey: "goa" },
    goaData,
    { upsert: true, new: true }
  );
  console.log('🌴 Goa state successfully seeded into MongoDB!');
  process.exit(0);
}

seed();
