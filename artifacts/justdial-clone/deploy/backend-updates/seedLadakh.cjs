const mongoose = require('mongoose');
require('dotenv').config();

// Define connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/thozil_db')
  .then(() => console.log('📁 Connected to MongoDB for seeding Ladakh'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const Tourism = require('./models/Tourism');

const ladakhData = {
  stateKey: "ladakh",
  stateName: "Ladakh",
  city: "Leh",
  alternativeCity: "Kargil",
  tagline: "The Land of High Passes & Mystical Gravity Hills",
  about: "A high-altitude desert region in the Himalayas, Ladakh is renowned for its dramatic mountain landscapes, pristine lakes like Pangong Tso, ancient monasteries, and the enigmatic Magnetic Hill. It offers an unparalleled mix of adventure, Buddhist culture, and raw natural beauty.",
  weather: {
    temp: "15.0 °C",
    condition: "Clear Blue Skies",
    icon: "sun"
  },
  gallery: [
    "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1506461883276-594a12b11db3?auto=format&fit=crop&w=600&q=80"
  ],
  seasons: {
    peak: {
      months: "June - September",
      title: "Summer Adventure Season",
      temp: "15°C to 25°C",
      points: [
        "Pleasant day temperatures and accessible mountain passes (Khardung La, Chang La)",
        "Pangong Tso and Tso Moriri lakes are completely melted and present brilliant blue hues",
        "Vibrant local monastery festivals, including Hemis and Ladakh Festival",
        "Excellent conditions for trekking, river rafting in Zanskar, and road trips"
      ]
    },
    moderate: {
      months: "May & October",
      title: "Crisp Autumn Golden Season",
      temp: "5°C to 15°C",
      points: [
        "Stunning golden-yellow poplars and apricots landscape contrast against blue skies",
        "Cooler temperatures, fewer tourists, and peaceful sightseeing",
        "Perfect time to capture beautiful photography of the snow-dusted peaks",
        "Roads are mostly open, offering crisp mountain drives"
      ]
    },
    off: {
      months: "November - April",
      title: "Extreme Himalayan Winter",
      temp: "-20°C to 5°C",
      points: [
        "Freezing sub-zero temperatures, landscape covered in pristine snow",
        "The famous Chadar Trek (frozen Zanskar River trek) takes place in Jan-Feb",
        "Unique winter monastery festivals and spotting of the elusive Snow Leopard",
        "Perfect for extreme adventurers; most highways are closed, and access is by air"
      ]
    }
  },
  attractions: [
    {
      id: "la_att_1",
      title: "Magnetic Hill",
      locality: "Leh-Kargil National Highway (NH 1), Leh",
      rating: 4.5,
      reviews: "2.4k",
      desc: "A legendary gravity hill where vehicles parked within the marked box appear to move uphill against gravity. This famous spot creates a striking optical illusion due to the surrounding rising hills.",
      timing: "Available 24 Hours",
      category: "Tourist Places",
      image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "la_att_2",
      title: "Pangong Tso Lake",
      locality: "Changtang Region, Leh District",
      rating: 4.9,
      reviews: "12.8k",
      desc: "A breathtaking high-altitude endorheic lake extending from India to China. Known for its brilliant saline water that dramatically changes colors from turquoise to azure.",
      timing: "Available 24 Hours",
      category: "Lakes & Rivers",
      image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "la_att_3",
      title: "Nubra Valley",
      locality: "Diskit, Leh District",
      rating: 4.8,
      reviews: "8.5k",
      desc: "A magnificent high-altitude cold desert valley famous for its unique double-humped Bactrian camels, sand dunes of Hunder, and the historic Diskit Monastery.",
      timing: "Opens at 08:00 am",
      category: "Tourist Places",
      image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "la_att_4",
      title: "Shanti Stupa",
      locality: "Chanspa, Leh",
      rating: 4.7,
      reviews: "9.2k",
      desc: "A white-domed Buddhist monument on a hilltop offering beautiful panoramic views of Leh town and the surrounding mountains. Perfect for sunset photography.",
      timing: "Opens at 05:00 am",
      category: "Tourist Places",
      image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80"
    }
  ],
  hotels: [
    {
      id: "la_hot_1",
      title: "The Grand Dragon Ladakh",
      locality: "Old Road, Sheynam, Leh",
      rating: 4.8,
      reviews: "3.5k",
      price: "₹8,500/night",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "la_hot_2",
      title: "Gomang Boutique Hotel",
      locality: "Upper Changspa Road, Leh",
      rating: 4.7,
      reviews: "1.2k",
      price: "₹6,000/night",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80"
    }
  ],
  oneDayHustle: {
    tagline: "Perfect One Day Leh & Attractions Route",
    steps: [
      { time: "08:30 AM", spot: "Leh Market & Traditional Ladakhi Breakfast", desc: "Enjoy hot butter tea and fresh local khambir bread at a local bakery." },
      { time: "10:00 AM", spot: "Scenic Drive to Shanti Stupa", desc: "Climb up to the white peace dome for a stunning view of Leh town and the Indus Valley." },
      { time: "12:30 PM", spot: "Traditional Ladakhi Lunch at The Tibetan Kitchen", desc: "Indulge in authentic local mutton momos, hot thukpa, and shapta." },
      { time: "02:30 PM", spot: "Enigmatic Drive to Magnetic Hill", desc: "Drive to NH 1. Stop at the marked zone and experience your car rolling uphill against gravity!" },
      { time: "05:00 PM", spot: "Sunset at Confluence of Indus & Zanskar Rivers", desc: "Witness the magnificent view where the emerald Indus meets the muddy Zanskar at Sangam." }
    ]
  },
  restaurants: [
    {
      id: "la_rest_1",
      title: "The Tibetan Kitchen",
      locality: "Fort Road, Leh",
      cuisine: "Tibetan & Ladakhi Specialty",
      rating: 4.6,
      reviews: "5.4k",
      famousFor: "Mutton Momos, Thukpa & Shaphaley",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80"
    }
  ],
  didYouKnow: [
    "Ladakh hosts the highest bridge in the world, the Bailey Bridge, built by the Indian Army in 1982.",
    "The Magnetic Hill is an optical illusion where the layout of the area makes a slight downhill slope appear to be an uphill slope.",
    "Ladakh is home to the endangered Snow Leopard and the unique double-humped Bactrian camels of Nubra Valley.",
    "Leh Palace is modeled on the famous Potala Palace in Lhasa, Tibet, and stands 9 stories tall."
  ]
};

async function seed() {
  try {
    await Tourism.findOneAndUpdate(
      { stateKey: "ladakh" },
      ladakhData,
      { upsert: true, new: true }
    );
    console.log('🏔️ Ladakh successfully seeded into MongoDB!');
  } catch(e) {
    console.error('Failed to seed:', e);
  } finally {
    process.exit(0);
  }
}

seed();
