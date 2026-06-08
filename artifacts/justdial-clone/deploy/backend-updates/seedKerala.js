const mongoose = require('mongoose');
require('dotenv').config();

// Define connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/thozil_db')
  .then(() => console.log('📁 Connected to MongoDB for seeding Kerala'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const Tourism = require('./models/Tourism');

const keralaData = {
  stateKey: "kerala",
  stateName: "Kerala",
  city: "Munnar",
  alternativeCity: "Alleppey",
  tagline: "God's Own Country - Spices, Tranquil Canals & Tea Estates",
  about: "A sublime paradise of emerald mountains, Kerala is defined by its serene tea fields in Munnar and tranquil palm-fringed backwater canals in Alleppey. Rich in spice plantations, classical Kathakali art, and traditional wooden houseboats.",
  weather: {
    temp: "21.2 °C",
    condition: "Gentle Mist & Drizzle",
    icon: "cloud-rain"
  },
  gallery: [
    "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=600&q=80"
  ],
  seasons: {
    peak: {
      months: "September - March",
      title: "Winter & Cool Spice Harvest",
      temp: "14°C to 26°C",
      points: [
        "Delightfully chilly evenings in hill stations like Munnar & Wayanad",
        "Water levels are perfect for overnight luxury houseboat cruises in Alleppey",
        "Watch grand snake boat races and local Kathakali performances",
        "Perfect time to witness blooming tea valleys and pick cardamom pods"
      ]
    },
    moderate: {
      months: "June - August",
      title: "Vibrant Monsoon Season",
      temp: "18°C to 25°C",
      points: [
        "Primal nature in full glory: waterfalls cascade down rocky cliffs",
        "Widely recognized as the premier season for Ayurvedic rejuvenation therapies",
        "Experience romantic misty drives on winding Western Ghat passes",
        "Backwaters glow with neon green paddy fields along the edges"
      ]
    },
    off: {
      months: "April - May",
      title: "Warm Summer Season",
      temp: "26°C to 34°C",
      points: [
        "Ideal for trekking to higher cloud forests where it remains cool",
        "Exceptional coastal seafood and fresh toddy parlor delicacies",
        "Enjoy peaceful backwater lagoons devoid of tourist crowds",
        "Incredibly affordable rates across boutique eco-lodges & luxury resorts"
      ]
    }
  },
  attractions: [
    {
      id: "kl_att_1",
      title: "Eravikulam National Park",
      locality: "Rajamalai, Munnar Hills",
      district: "Idukki",
      rating: 4.7,
      reviews: "32.1k",
      desc: "Sanctuary home to the rare, endangered Nilgiri Tahr (mountain goat). It offers a panoramic 360-degree view of the tea estates blanketed in morning mist.",
      timing: "Opens at 07:30 am",
      category: "Tourist Places",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "kl_att_2",
      title: "Alleppey Houseboat Backwaters",
      locality: "Punnamada Jetty, Alappuzha",
      district: "Alappuzha",
      rating: 4.8,
      reviews: "45.2k",
      desc: "Cruise along ancient labyrinthine canals lined with coconut palms inside a beautifully hand-crafted traditional Kettuvallam (wooden houseboat).",
      timing: "Available 24 Hours",
      category: "Lakes & Rivers",
      image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "kl_att_3",
      title: "Athirappilly Waterfalls",
      locality: "Chalakkudy River, Thrissur",
      district: "Thrissur",
      rating: 4.8,
      reviews: "22.8k",
      desc: "Known as 'The Niagara of India', this majestic 80-foot waterfall is surrounded by dense forests home to rare Hornbill species.",
      timing: "Opens at 08:00 am",
      category: "Tourist Places",
      image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=600&q=80"
    }
  ],
  hotels: [
    {
      id: "kl_hot_1",
      title: "Blanket Hotel & Spa",
      locality: "Attukad Waterfalls Road, Munnar",
      district: "Idukki",
      rating: 4.7,
      reviews: "8.4k",
      price: "₹9,500/night",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "kl_hot_2",
      title: "Kumarakom Lake Resort",
      locality: "Kottayam Backwaters",
      district: "Kottayam",
      rating: 4.9,
      reviews: "11.2k",
      price: "₹18,500/night",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80"
    }
  ],
  oneDayHustle: {
    tagline: "Unforgettable 24 Hours in Munnar & Surrounds",
    steps: [
      { time: "06:00 AM", spot: "Sunrise Trek at Lockhart Gap", desc: "Witness the golden sun breaking through deep fog layers over Munnar's vast valley slope." },
      { time: "09:30 AM", spot: "Tea Estate Walk & Museum Safari", desc: "Learn the intricate hand-processing techniques of rare orthodox tea leaves at the Tata Museum." },
      { time: "01:00 PM", spot: "Traditional Sadhya Meal on Banana Leaf", desc: "Feast on 24 gourmet vegetarian items, parboiled brown rice, and hot payasam with coconut milk." },
      { time: "03:30 PM", spot: "Elephant Junction Reserve Visit", desc: "Stroll along spice plantations with spice experts, tasting fresh cloves, vanilla, and green peppercorns." },
      { time: "06:30 PM", spot: "Kathakali Performance & Martial Arts Show", desc: "Enjoy a showcase of ancient dance-drama and Kalaripayattu, the oldest martial art." }
    ]
  },
  restaurants: [
    {
      id: "kl_rest_1",
      title: "Paragon Restaurant",
      locality: "CH Bypass, Calicut",
      district: "Kozhikode",
      cuisine: "Malabar Seafood & Biryani",
      rating: 4.7,
      reviews: "42.0k",
      famousFor: "Malabar Mutton Biryani & Prawn Mango Curry",
      image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "kl_rest_2",
      title: "Villa Maya",
      locality: "Enchakkal, Thiruvananthapuram",
      district: "Thiruvananthapuram",
      cuisine: "Premium Heritage Fine Dining",
      rating: 4.8,
      reviews: "9.5k",
      famousFor: "Stuffed Crab & Fish Pollichathu",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "kl_rest_3",
      title: "Rahmath Hotel",
      locality: "KP Kesava Menon Road, Calicut",
      district: "Kozhikode",
      cuisine: "Authentic Kozhikode Non-Veg",
      rating: 4.6,
      reviews: "22.3k",
      famousFor: "Mutton Biryani & Beef Fry",
      image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "kl_rest_4",
      title: "Dhe Puttu",
      locality: "Edappally, Kochi",
      district: "Ernakulam",
      cuisine: "Modern Fusion Puttu Specialities",
      rating: 4.5,
      reviews: "15.1k",
      famousFor: "Erachi Puttu & Chemmeen Puttu",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "kl_rest_5",
      title: "Grand Pavilion",
      locality: "M.G. Road, Ernakulam",
      district: "Ernakulam",
      cuisine: "Traditional Kerala Seafood & Syrian Christian Cuisine",
      rating: 4.6,
      reviews: "12.8k",
      famousFor: "Karimeen Pollichathu & Prawn Curry",
      image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "kl_rest_6",
      title: "Restaurant by Chef Pillai",
      locality: "The Gateway Hotel, Kochi",
      district: "Ernakulam",
      cuisine: "Signature Fusion Kerala Seafood",
      rating: 4.7,
      reviews: "8.2k",
      famousFor: "Fish Nirvana & Unniyappam Pudding",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "kl_rest_7",
      title: "Sree Krishna Inn",
      locality: "Warriam Road, Kochi",
      district: "Ernakulam",
      cuisine: "Pure South Indian Vegetarian",
      rating: 4.4,
      reviews: "6.3k",
      famousFor: "Kerala Sadhya & Ghee Dosa",
      image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "kl_rest_8",
      title: "Kashi Art Cafe",
      locality: "Burger Street, Fort Kochi",
      district: "Ernakulam",
      cuisine: "European Cafe & Continental Breakfast",
      rating: 4.5,
      reviews: "8.9k",
      famousFor: "Chocolate Cake, Fresh Juices & French Toast",
      image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "kl_rest_9",
      title: "Rapsy Restaurant",
      locality: "Munnar Bazaar, Munnar",
      district: "Idukki",
      cuisine: "Budget Multi-cuisine & Breakfast",
      rating: 4.3,
      reviews: "7.1k",
      famousFor: "Spanish Omelette, Beef Biryani & Parotta",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "kl_rest_10",
      title: "The Rice Boat",
      locality: "Taj Malabar Resort, Willingdon Island, Kochi",
      district: "Ernakulam",
      cuisine: "Luxury Seafood Fine Dining",
      rating: 4.8,
      reviews: "3.2k",
      famousFor: "Tigert Prawns & Crab Masala",
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=400&q=80"
    }
  ],
  didYouKnow: [
    "Kerala is known as India's 'Spice Garden', having traded cardamoms, pepper, and cinnamon with ancient Romans.",
    "The houseboats (Kettuvallams) are bound together using coir knots and cashew-nut resin without a single metal nail.",
    "Munnar's purple 'Neelakurinji' wild flower blooms collectively only once in 12 years, turning mountains violet.",
    "Ayurveda has been practiced continuously in Kerala for over 5,000 years, supported by the state's humid climate."
  ]
};

async function seed() {
  await Tourism.findOneAndUpdate(
    { stateKey: "kerala" },
    keralaData,
    { upsert: true, new: true }
  );
  console.log('🌴 Kerala state successfully seeded into MongoDB!');
  process.exit(0);
}

seed();
