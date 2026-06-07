export interface WeatherInfo {
  temp: string;
  condition: string;
  icon: string;
}

export interface SeasonInfo {
  months: string;
  title: string;
  temp: string;
  points: string[];
}

export interface AttractionItem {
  id: string;
  title: string;
  locality: string;
  rating: number;
  reviews: string;
  desc: string;
  timing: string;
  category: string;
  image: string;
}

export interface HotelItem {
  id: string;
  title: string;
  locality: string;
  rating: number;
  reviews: string;
  price: string;
  image: string;
}

export interface HustleStep {
  time: string;
  spot: string;
  desc: string;
}

export interface OneDayHustle {
  tagline: string;
  steps: HustleStep[];
}

export interface RestaurantItem {
  id: string;
  title: string;
  locality: string;
  cuisine: string;
  rating: number;
  reviews: string;
  famousFor: string;
  image: string;
}

export interface StateTourismData {
  stateName: string;
  city: string;
  alternativeCity: string;
  tagline: string;
  about: string;
  weather: WeatherInfo;
  gallery: string[];
  seasons: {
    peak: SeasonInfo;
    moderate: SeasonInfo;
    off: SeasonInfo;
  };
  attractions: AttractionItem[];
  hotels: HotelItem[];
  oneDayHustle: OneDayHustle;
  restaurants: RestaurantItem[];
  didYouKnow: string[];
}

export const tourismData: Record<string, StateTourismData> = {
  TN: {
    stateName: "Tamil Nadu",
    city: "Coimbatore",
    alternativeCity: "Ooty",
    tagline: "Manchester of South India & Gateway to the Blue Hills",
    about: "Nestled in the rain shadow region of the Western Ghats, Tamil Nadu's industrial powerhouse Coimbatore blends traditional heritage with rapid innovation. Together with its sister hill station, Ooty, this region offers deep spiritual shrines, legendary cotton looms, lush tea estates, and cascading hill streams.",
    weather: {
      temp: "23.6 °C",
      condition: "Overcast Clouds",
      icon: "cloud"
    },
    gallery: [
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
    ],
    seasons: {
      peak: {
        months: "December - March",
        title: "Winter & Cool Spice Harvest",
        temp: "15°C to 30°C",
        points: [
          "Pleasant cool weather, highly popular for hill-station exploration",
          "Aesthetic foggy mornings perfect for tea garden trekking",
          "Vibrant celebrations for Pongal, Navaratri and regional festivals",
          "Ideal moderate breeze and excellent mountain pass driving conditions"
        ]
      },
      moderate: {
        months: "October - November",
        title: "Vibrant Monsoon Season",
        temp: "20°C to 28°C",
        points: [
          "Lush green landscapes revived by early winter monsoons",
          "Fewer tourist queues, pristine waterfalls in full force",
          "Local temple festivals and Diwali celebrations are highly active",
          "Enjoyable breezy hikes through secondary mountain trails"
        ]
      },
      off: {
        months: "April - September",
        title: "Warm Summer Season",
        temp: "25°C to 35°C",
        points: [
          "Hot and humid in plains, though Ooty remains a scenic rescue",
          "Peaceful travel with heavily discounted hotel bookings",
          "Avail amazing local shopping deals on Coimbatore cotton & fabrics",
          "Relaxing nature walks and tranquil Ayurvedic wellness visits"
        ]
      }
    },
    attractions: [
      {
        id: "tn_att_1",
        title: "Adiyogi Shiva Statue",
        locality: "Isha Foundation, Velliangiri Foothills",
        rating: 4.8,
        reviews: "74.9k",
        desc: "Magnificent temple complex dedicated to Lord Shiva, featuring the 112-foot tall bust statue of Shiva, recognized by Guinness Records as the largest in the world.",
        timing: "Opens at 06:00 am",
        category: "Tourist Places",
        image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "tn_att_2",
        title: "Dhyanalinga Meditation Dome",
        locality: "Thondamuthur Road, Coimbatore",
        rating: 4.7,
        reviews: "74.5k",
        desc: "A unique meditative shrine that does not ascribe to any particular belief system. Features a massive dome housing a single stone linga immersed in pristine silence.",
        timing: "Opens at 06:00 am",
        category: "Tourist Places",
        image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "tn_att_3",
        title: "Gedee Car Museum",
        locality: "Avinashi Road, Central Coimbatore",
        rating: 4.6,
        reviews: "5.3k",
        desc: "A remarkable museum showcasing a brilliant private collection of vintage, classic, and rare global cars, exploring the chronological development of automobiles.",
        timing: "Opens at 10:00 am",
        category: "Malls",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "tn_att_4",
        title: "Velliangiri Sacred Mountains",
        locality: "Poondi, Coimbatore Outskirts",
        rating: 4.7,
        reviews: "4.4k",
        desc: "Referred to as the 'Kailash of the South', this challenging trek across seven hills leads to a scenic mountaintop temple of Shiva surrounded by clouds.",
        timing: "Opens at 06:00 am",
        category: "Tourist Places",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "tn_att_5",
        title: "Ooty Botanical Gardens",
        locality: "Vannarapettai, Ooty Hill Station",
        rating: 4.5,
        reviews: "18.2k",
        desc: "Stunning gardens laid out in 1848 featuring terraced lawns, rare tree species, fossil tree trunks estimated at 20 million years old, and exotic flower show houses.",
        timing: "Opens at 09:00 am",
        category: "Tourist Places",
        image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80"
      }
    ],
    hotels: [
      {
        id: "tn_hot_1",
        title: "Vivanta Coimbatore",
        locality: "Gopalapuram, Central",
        rating: 4.5,
        reviews: "16.9k",
        price: "₹6,500/night",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "tn_hot_2",
        title: "Welcomhotel By ITC Hotels",
        locality: "Race Course Road",
        rating: 4.6,
        reviews: "10.2k",
        price: "₹7,200/night",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "tn_hot_3",
        title: "Le Meridien Coimbatore",
        locality: "Neelambur Bypass",
        rating: 4.4,
        reviews: "16.3k",
        price: "₹8,000/night",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80"
      }
    ],
    oneDayHustle: {
      tagline: "Perfect One Day Hustle in Coimbatore",
      steps: [
        { time: "07:00 AM", spot: "Filter Coffee & Idli at Annapoorna", desc: "Start with Coimbatore's signature ghee roast and a traditional hot brass tumbler coffee." },
        { time: "09:30 AM", spot: "Gedee Automobile History Museum", desc: "Explore early German, British, and rare Indian vintage cars up close with expert curators." },
        { time: "01:30 PM", spot: "Authentic Kongunadu Lunch at Hari Bhavanam", desc: "Feast on iconic spice-laden native mutton biryani, Pallipalayam chicken, and regional curries." },
        { time: "04:30 PM", spot: "Scenic Drive to Isha Adiyogi Shiva Statue", desc: "Take a beautiful country road drive to the foothills. Walk around the giant statue." },
        { time: "07:00 PM", spot: "Adiyogi Laser Sound & Light Show", desc: "Witness the state-of-the-art spectacular projection mapping show charting the origins of Yoga." }
      ]
    },
    restaurants: [
      {
        id: "tn_rest_1",
        title: "Sree Annapoorna Gowrishankar",
        locality: "Ram Nagar & Multiple Locations",
        cuisine: "South Indian Vegetarian",
        rating: 4.5,
        reviews: "28.0k",
        famousFor: "Sambar Idli & Ghee Roast Dosa",
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "tn_rest_2",
        title: "Hari Bhavanam",
        locality: "Peelamedu",
        cuisine: "Kongunadu Non-Veg Specialty",
        rating: 4.4,
        reviews: "19.5k",
        famousFor: "Mutton Pallipalayam & Nattu Kozhi Biryani",
        image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=400&q=80"
      }
    ],
    didYouKnow: [
      "Known as the 'Manchester of South India' due to hosting over 25,000 textile mills and weaving units.",
      "The Siruvani water supply is widely heralded as the second tastiest drinking water in the world, enriched with forest minerals.",
      "The Adiyogi Shiva bust statue stands at exactly 112 feet, symbolizing the 112 unique methods given by Shiva to attain liberation.",
      "Ooty features a 115-year old Mountain Railway toy train operating on a steam rack system, which is a UNESCO Heritage site."
    ]
  },
  KL: {
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
      "https://images.unsplash.com/photo-1516690561799-46d8f74f90f6?auto=format&fit=crop&w=600&q=80",
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
        rating: 4.8,
        reviews: "22.8k",
        desc: "Known as 'The Niagara of India', this majestic 80-foot waterfall is surrounded by dense forests home to rare Hornbill species.",
        timing: "Opens at 08:00 am",
        category: "Tourist Places",
        image: "https://images.unsplash.com/photo-1516690561799-46d8f74f90f6?auto=format&fit=crop&w=600&q=80"
      }
    ],
    hotels: [
      {
        id: "kl_hot_1",
        title: "Blanket Hotel & Spa",
        locality: "Attukad Waterfalls Road, Munnar",
        rating: 4.7,
        reviews: "8.4k",
        price: "₹9,500/night",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "kl_hot_2",
        title: "Kumarakom Lake Resort",
        locality: "Kottayam Backwaters",
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
        locality: "Calicut / Kochi Outlets",
        cuisine: "Malabar Seafood & Biryani",
        rating: 4.6,
        reviews: "42.0k",
        famousFor: "Malabar Mutton Biryani & Prawn Mango Curry",
        image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=400&q=80"
      }
    ],
    didYouKnow: [
      "Kerala is known as India's 'Spice Garden', having traded cardamoms, pepper, and cinnamon with ancient Romans.",
      "The houseboats (Kettuvallams) are bound together using coir knots and cashew-nut resin without a single metal nail.",
      "Munnar's purple 'Neelakurinji' wild flower blooms collectively only once in 12 years, turning mountains violet.",
      "Ayurveda has been practiced continuously in Kerala for over 5,000 years, supported by the state's humid climate."
    ]
  },
  RJ: {
    stateName: "Rajasthan",
    city: "Jaipur",
    alternativeCity: "Udaipur",
    tagline: "The Land of Kings, Forts, & Royal Lakes",
    about: "Step into an era of legendary kings, massive sandstone palaces, and stunning desert landscapes. From the pink stucco facades of Jaipur's Old City to the glowing white marble palaces of Udaipur resting over calm lakes.",
    weather: {
      temp: "31.4 °C",
      condition: "Sunny & Golden Skies",
      icon: "sun"
    },
    gallery: [
      "https://images.unsplash.com/photo-1477584322904-48618db530c2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1615551043360-33de8b5f410c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80"
    ],
    seasons: {
      peak: {
        months: "November - February",
        title: "Royal Winter Season",
        temp: "10°C to 24°C",
        points: [
          "Perfect dry sunny days with chilly bonfire-lit desert nights",
          "Ideal for exploring giant open forts without dealing with heavy heat",
          "Enjoy hot spicy local kachoris, desert camel safaris, and folk puppet festivals",
          "Lively atmosphere, royal heritage hotels host gorgeous open-air musical acts"
        ]
      },
      moderate: {
        months: "July - September",
        title: "Monsoon Oasis Season",
        temp: "24°C to 30°C",
        points: [
          "Dry sand valleys are transformed with fresh seasonal mountain streams",
          "Peacocks sing and dance across palace walls in celebration of light rain",
          "Perfect time to experience romantic boat rides on Udaipur's rising lakes",
          "Lesser crowd, letting you capture empty royal architecture photographs"
        ]
      },
      off: {
        months: "March - June",
        title: "Warm Desert Summer",
        temp: "32°C to 44°C",
        points: [
          "Extremely hot midday hours, though early morning walks are very peaceful",
          "Heritage properties offer massive five-star luxury suites at absolute budget prices",
          "Spend calm, air-conditioned afternoons exploring royal jewelry and gemstone markets",
          "Unparalleled opportunities to capture majestic golden sunset silhouettes over dunes"
        ]
      }
    },
    attractions: [
      {
        id: "rj_att_1",
        title: "Amber Fort & Palace",
        locality: "Amer, Jaipur Hills",
        rating: 4.8,
        reviews: "55.9k",
        desc: "A massive fortress blending Hindu and Mughal styles, featuring the iconic Sheesh Mahal (mirror palace) made of millions of tiny glass fragments.",
        timing: "Opens at 08:00 am",
        category: "Tourist Places",
        image: "https://images.unsplash.com/photo-1477584322904-48618db530c2?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "rj_att_2",
        title: "The Hawa Mahal",
        locality: "Badi Choupad, Old Jaipur",
        rating: 4.6,
        reviews: "38.1k",
        desc: "Constructed of red and pink sandstone, this legendary 5-story honeycomb facade features 953 intricate tiny windows designed for royal women to observe daily street life unseen.",
        timing: "Opens at 09:00 am",
        category: "History",
        image: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "rj_att_3",
        title: "Udaipur Lake Palace",
        locality: "Lake Pichola, Udaipur",
        rating: 4.9,
        reviews: "18.4k",
        desc: "A majestic floating marble dream built in 1746. Now a luxury hotel, it sits centered on the calm blue waters of Lake Pichola.",
        timing: "Accessible via Boat",
        category: "Tourist Places",
        image: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=600&q=80"
      }
    ],
    hotels: [
      {
        id: "rj_hot_1",
        title: "The Taj Rambagh Palace",
        locality: "Bhawani Singh Road, Jaipur",
        rating: 4.9,
        reviews: "9.2k",
        price: "₹32,000/night",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "rj_hot_2",
        title: "Trident Udaipur Resort",
        locality: "Haridasji Ki Magri, Udaipur",
        rating: 4.7,
        reviews: "6.5k",
        price: "₹12,500/night",
        image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=400&q=80"
      }
    ],
    oneDayHustle: {
      tagline: "Golden One Day Tour of the Pink City",
      steps: [
        { time: "08:30 AM", spot: "Wind View Cafe opposite Hawa Mahal", desc: "Sip aromatic cardamon chai on a high rooftop directly overlooking the historic wind palace facade." },
        { time: "10:00 AM", spot: "Amber Fort Elephant Gate Trek", desc: "Climb up the majestic fort complex. Admire the royal chambers and massive courtyards." },
        { time: "01:30 PM", spot: "Traditional Rajasthani Thali at Chokhi Dhani", desc: "Indulge in Dal Baati Churma, Gatte Ki Sabzi, and hot rotis laced with ghee." },
        { time: "04:30 PM", spot: "The City Palace Museum & Jantar Mantar", desc: "Behold royal robes, giant silver urns, and the world's largest stone sundials." },
        { time: "06:30 PM", spot: "Golden Hour at Nahargarh Fort", desc: "Witness the entire sprawling city of Jaipur light up in neon gold as the sun sets." }
      ]
    },
    restaurants: [
      {
        id: "rj_rest_1",
        title: "1135 AD",
        locality: "Amber Fort Level 2",
        cuisine: "Royal Rajput Cuisine",
        rating: 4.7,
        reviews: "3.2k",
        famousFor: "Laal Maas (Spicy Royal Mutton) & Shahi Tukda",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80"
      }
    ],
    didYouKnow: [
      "Jaipur is India's first fully planned city, mapped out in 1727 using Vedic Vastu Shastra principles.",
      "The entire city was painted Terracotta Pink in 1876 to welcome Prince Albert, symbolizing warm hospitality.",
      "Udaipur's Lake Palace is built of white marble and was famously featured in the James Bond film 'Octopussy'.",
      "The Jantar Mantar houses the world's largest stone sundial, which tells local time with 2 seconds precision."
    ]
  },
  GA: {
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
  },
  KA: {
    stateName: "Karnataka",
    city: "Coorg",
    alternativeCity: "Bangalore",
    tagline: "The Scotland of India - Coffee, Palaces, & Technology",
    about: "Karnataka is a diverse land of rolling coffee plantations in Coorg, grand palaces in Mysore, and cutting-edge tech parks in Bangalore. Perfect for coffee lovers and history buffs.",
    weather: {
      temp: "22.1 °C",
      condition: "Clear Mountain Air",
      icon: "wind"
    },
    gallery: [
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80"
    ],
    seasons: {
      peak: {
        months: "October - March",
        title: "Winter & Cool Coffee Harvest",
        temp: "12°C to 25°C",
        points: [
          "Perfect pleasant mountain climate with misty valleys and morning dew",
          "Smell the sweet fragrance of coffee cherry harvests across estates",
          "Observe wild elephants at Dubare Camp and explore Tibetan monasteries",
          "Perfect time to camp under stars or explore Coorg's falls"
        ]
      },
      moderate: {
        months: "June - September",
        title: "Vibrant Monsoon Season",
        temp: "16°C to 22°C",
        points: [
          "Clouds descend over coffee estates, perfect for hot filter coffee",
          "Abbey and Iruppu falls swell into roaring white waterfalls",
          "Excellent season for river rafting and jungle trail walking",
          "Lush mossy backdrops make every hill curve highly scenic"
        ]
      },
      off: {
        months: "April - May",
        title: "Warm Summer Season",
        temp: "22°C to 30°C",
        points: [
          "Coffee plants break out in fragrant white flowers resembling snow",
          "Cool escape when surrounding cities are experiencing high heat",
          "Spend pleasant afternoons inside traditional Kodava homestays",
          "Excellent bird-watching sessions and private pool villas"
        ]
      }
    },
    attractions: [
      {
        id: "ka_att_1",
        title: "Abbey Falls",
        locality: "Madikeri, Coorg",
        rating: 4.5,
        reviews: "15.8k",
        desc: "A gorgeous waterfall nestled inside coffee estates and spice gardens. A hanging bridge offers a perfect close-up photo spot.",
        timing: "Opens at 09:00 am",
        category: "Tourist Places",
        image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "ka_att_2",
        title: "Golden Temple Namdroling",
        locality: "Bylakuppe, Coorg Border",
        rating: 4.8,
        reviews: "21.3k",
        desc: "The largest Tibetan settlement in South India, housing a majestic temple with three giant, 40-foot tall statues of Buddha.",
        timing: "Opens at 09:00 am",
        category: "Tourist Places",
        image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=600&q=80"
      },
      {
        id: "ka_att_3",
        title: "Dubare Elephant Camp",
        locality: "Kaveri Bank, Coorg",
        rating: 4.4,
        reviews: "14.1k",
        desc: "An eco-tourism site on the Kaveri River where visitors can participate in elephant grooming, bathing, and feeding.",
        timing: "Opens at 09:00 am",
        category: "Tourist Places",
        image: "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=600&q=80"
      }
    ],
    hotels: [
      {
        id: "ka_hot_1",
        title: "The Tamara Coorg",
        locality: "Kabbinakad Estate, Coorg",
        rating: 4.9,
        reviews: "6.2k",
        price: "₹14,500/night",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80"
      },
      {
        id: "ka_hot_2",
        title: "Evolve Back Kabini",
        locality: "HD Kote Taluk, Kabini",
        rating: 4.9,
        reviews: "5.8k",
        price: "₹24,000/night",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=400&q=80"
      }
    ],
    oneDayHustle: {
      tagline: "The Ultimate Mountain Coffee Trail",
      steps: [
        { time: "08:00 AM", spot: "Bylakuppe Golden Temple", desc: "Immerse yourself in peaceful morning chants and monastery murals." },
        { time: "10:30 AM", spot: "Dubare Elephant River Crossing", desc: "Cross the Kaveri river on a raft and groom friendly elephants." },
        { time: "01:30 PM", spot: "Traditional Kodava Lunch: Pandi Curry & Kadambuttu", desc: "Feast on the famous slow-cooked spicy pork in wild Garcinia sour paste." },
        { time: "04:00 PM", spot: "Coffee Estate Walk & Spice Tasting", desc: "Stroll along arabica plants, learning how raw coffee cherries are roasted." },
        { time: "06:00 PM", spot: "Sunset View at Raja's Seat", desc: "Stand on the cliff edge, looking out at the sun dipping over green hills." }
      ]
    },
    restaurants: [
      {
        id: "ka_rest_1",
        title: "Coorg Cuisine",
        locality: "Madikeri Central",
        cuisine: "Traditional Kodava Specialty",
        rating: 4.5,
        reviews: "8.5k",
        famousFor: "Coorg Pandi (Pork) Curry & Bamboo Shoot Dry Fry",
        image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=400&q=80"
      }
    ],
    didYouKnow: [
      "Coorg is the largest coffee producer in India, yielding nearly 35% of the country's crop.",
      "The warriors of Coorg, the Kodavas, are the only community in India legally permitted to carry firearms without a license.",
      "Bylakuppe is the second-largest Tibetan refugee settlement in the world.",
      "The Kaveri River originates at Talakaveri on the slopes of the Brahmagiri hills."
    ]
  },
  LA: {
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
  }
};

export interface PartnerItem {
  id: string;
  name: string;
  role: string;
  exp: string;
  languages: string[];
  phone: string;
  rating: number;
  reviews: number;
  state: string;
  price: string;
  avatar: string;
}

export const thozilPartners: PartnerItem[] = [
  {
    id: "pro_1",
    name: "Ramesh Kumar",
    role: "Government Certified Local Tour Guide",
    exp: "8+ Years Experience",
    languages: ["Tamil", "English", "Malayalam"],
    phone: "98765 43210",
    rating: 4.9,
    reviews: 412,
    state: "TN",
    price: "₹1,500/day",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: "pro_2",
    name: "Jency George",
    role: "Premium Backwater & Spice Trail Naturalist",
    exp: "6+ Years Experience",
    languages: ["Malayalam", "English", "Hindi"],
    phone: "98123 45678",
    rating: 4.9,
    reviews: 289,
    state: "KL",
    price: "₹1,800/day",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: "pro_3",
    name: "Harshwardhan Singh",
    role: "Royal Forts & Desert Safaris Specialist",
    exp: "12+ Years Experience",
    languages: ["Hindi", "English", "Rajasthani"],
    phone: "99281 22334",
    rating: 4.8,
    reviews: 654,
    state: "RJ",
    price: "₹2,200/day",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: "pro_4",
    name: "Cajetan D'Souza",
    role: "Heritage Old Goa & Scuba Dive Coordinator",
    exp: "5+ Years Experience",
    languages: ["Konkani", "English", "Portuguese"],
    phone: "91456 78912",
    rating: 4.7,
    reviews: 198,
    state: "GA",
    price: "₹2,000/day",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: "pro_5",
    name: "Manjunath Gowda",
    role: "Dubare Elephant Camp & Coffee Plantation Guide",
    exp: "9+ Years Experience",
    languages: ["Kannada", "English", "Telugu"],
    phone: "94481 99882",
    rating: 4.9,
    reviews: 310,
    state: "KA",
    price: "₹1,600/day",
    avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

export const categoriesMapping = [
  { id: "Restaurants", title: "Restaurants", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=150&h=150&q=80" },
  { id: "Cafes", title: "Cafes", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=150&h=150&q=80" },
  { id: "Tourist Places", title: "Tourist Places", image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=150&h=150&q=80" },
  { id: "Hotels", title: "Hotels", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=150&h=150&q=80" },
  { id: "Home Stays", title: "Home Stays", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=150&h=150&q=80" },
  { id: "Car Rentals", title: "Car Rentals", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=150&h=150&q=80" },
  { id: "Cinema Halls", title: "Cinema Halls", image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=150&h=150&q=80" },
  { id: "Malls", title: "Malls", image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=150&h=150&q=80" }
];
