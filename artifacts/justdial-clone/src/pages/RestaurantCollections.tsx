import { useState } from "react";
import { useLocation, Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  ChevronRight, Calendar, TrendingUp, ShoppingBag, 
  HelpCircle, ChevronDown, ChevronUp, 
  Utensils, Globe, GlassWater, Zap, Candy, ChefHat
} from "lucide-react";
import { stateNames } from "@/lib/locationData";
import BrowseByFlavour from "@/components/BrowseByFlavour";

// Structure for the restaurant collection categories
interface SubCategoryItem {
  name: string;
  query: string;
}

interface CategoryGroup {
  title: string;
  icon: any;
  color: string;
  bg: string;
  image: string;
  items: SubCategoryItem[];
  moreLink: string;
}

export default function RestaurantCollections({ params }: { params?: { state?: string } }) {
  const [, setLocation] = useLocation();
  
  // Extract stateKey from path params or fallback to query param
  const getParam = (key: string, fallback = "") => {
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    return params.get(key) || fallback;
  };

  const stateKey = (params?.state || getParam("state", "KL")).toUpperCase();
  const selectedDistrict = getParam("district", "");
  const stateName = stateNames[stateKey] || stateKey;
  const locationName = selectedDistrict ? `${selectedDistrict}, ${stateName}` : stateName;

  // Accordion active state tracking
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Categories list modeled EXACTLY after the user's pasted HTML and design mock
  const categories: CategoryGroup[] = [
    {
      title: "Indian Flavours",
      icon: Utensils,
      color: "text-orange-500",
      bg: "bg-orange-50",
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&h=240&q=80",
      items: [
        { name: "Sea Food", query: "Sea Food" },
        { name: "Maharashtrian", query: "Maharashtrian" },
        { name: "Mughlai", query: "Mughlai" },
        { name: "Dhaba", query: "Dhaba" }
      ],
      moreLink: "Indian-Flavours"
    },
    {
      title: "Global Cuisines",
      icon: Globe,
      color: "text-blue-500",
      bg: "bg-blue-50",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&h=240&q=80",
      items: [
        { name: "German", query: "German" },
        { name: "Continental", query: "Continental" },
        { name: "American", query: "American" },
        { name: "European", query: "European" }
      ],
      moreLink: "Global-Cuisines"
    },
    {
      title: "Nightlife",
      icon: GlassWater,
      color: "text-purple-500",
      bg: "bg-purple-50",
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=400&h=240&q=80",
      items: [
        { name: "Lounge Bars", query: "Lounge" },
        { name: "Restaurants & Bars", query: "Bar" },
        { name: "Restaurants With Candle Light Dinner", query: "Candle Light" }
      ],
      moreLink: "Nightlife"
    },
    {
      title: "Quick Bites",
      icon: Zap,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&h=240&q=80",
      items: [
        { name: "Bakeries", query: "Bakery" },
        { name: "Coffee Shops", query: "Coffee Shop" },
        { name: "Fast Food", query: "Fast Food" },
        { name: "Pizza Outlets", query: "Pizza" }
      ],
      moreLink: "Quick-Bites"
    },
    {
      title: "Sweet Tooth",
      icon: Candy,
      color: "text-pink-500",
      bg: "bg-pink-50",
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&h=240&q=80",
      items: [
        { name: "Cake Shops", query: "Cake" },
        { name: "Desserts", query: "Dessert" }
      ],
      moreLink: "Sweet-Tooth"
    },
    {
      title: "Foodie",
      icon: ChefHat,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&h=240&q=80",
      items: [
        { name: "Best Momos", query: "Momos" },
        { name: "Breakfast Joints", query: "Breakfast" },
        { name: "Oye Punjab", query: "Punjabi" },
        { name: "Sinful Desserts", query: "Dessert" }
      ],
      moreLink: "Foodie"
    }
  ];

  // FAQ Items tailored dynamically
  const faqs = [
    {
      q: `What are the key factors to consider when choosing a restaurant in ${locationName}?`,
      a: `When selecting a dining venue in ${locationName}, you should consider the style of cuisine you are craving (e.g. traditional seafood, continental, Mughlai), the restaurant's location and accessibility, hygiene standards, customer ratings/reviews, average price range, and facilities like parking spaces, family seating, or home delivery options.`
    },
    {
      q: `How can I find the best local restaurants in ${locationName}?`,
      a: `You can discover top-rated culinary spots by exploring the Thozil.com category search. Checking reviews and ratings from other locals, asking friends for personal recommendations, looking at foodie blogs, or exploring local food streets in ${selectedDistrict || stateName} are also excellent ways to find hidden gems.`
    },
    {
      q: `What should I look for in online reviews of Indian restaurants?`,
      a: "Look for consistency in customer comments regarding taste, hygiene, hospitality, and value for money. Pay attention to feedback on portion sizes, clean drinking water, service speed, and recurrent mentions of signature dishes like authentic local biryanis or seafood curries."
    },
    {
      q: "Are there any safety tips to keep in mind when dining out in India?",
      a: "Always opt for bottled mineral water to prevent waterborne illnesses. Check the hygiene credentials or safety ratings of the eatery, and prefer establishments with high customer turnover as this generally guarantees fresh, hot, and newly prepared ingredients."
    },
    {
      q: "What are some famous regional cuisines to try in different parts of India?",
      a: "In North India, try Punjabi, Kashmiri, and Mughlai cuisines. In South India, popular options include Andhra, Tamil, Kerala, Karnataka, Goan, and Chettinad cuisines. Western regions offer Gujarati or Maharashtrian dishes, while the East is famous for Bengali, Assamese, and Oriya fish curries."
    },
    {
      q: "How can I find restaurants offering authentic Indian street food in a hygienic environment?",
      a: "Search for established indoor eateries or clean, air-conditioned outlets that specialize in street food (like chaats, momos, or local snacks). Many modern shopping mall food courts also house verified street food vendors operating under strict sanitary guidelines."
    },
    {
      q: `What payment methods are commonly accepted at restaurants in ${locationName}?`,
      a: `Major restaurants in ${locationName} accept credit and debit cards (Visa/Mastercard) alongside cash payments. In recent times, digital mobile payment methods (UPI apps like Google Pay, PhonePe, and Paytm) have become widely accepted by almost every local food outlet.`
    },
    {
      q: "What are some unique dining experiences I can try in India?",
      a: "You can experience traditional thali meals served on fresh banana leaves, dine in historic heritage properties, visit floating houseboats, eat at scenic rooftop restaurants with spectacular views, or visit theme-based cafes showcasing regional art and music."
    }
  ];

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#FAF9F6] overflow-x-hidden font-sans">
      <Navbar />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-6">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-950 font-semibold">Restaurant Collections</span>
        </div>

        {/* ==========================================
            HERO COVER BANNER
            ========================================== */}
        <section className="relative rounded-3xl overflow-hidden shadow-lg mb-8 h-[240px] md:h-[320px] lg:h-[360px] group">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80" 
            alt={`Restaurant Collections in ${stateName}`} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[8000ms] ease-out" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 text-white">
            <span className="text-[10px] md:text-xs font-black tracking-widest text-primary bg-orange-50/10 backdrop-blur-md px-3.5 py-1.5 rounded-full inline-block w-fit mb-3">
              PREMIUM FOOD GUIDE
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-100 to-orange-300">
              IT'S ALL ABOUT FOOD
            </h1>
            <p className="text-sm md:text-base text-gray-200 font-medium max-w-md mt-3">
              Discover the absolute best local restaurants, street eateries, bars, and dessert destinations in {locationName}.
            </p>
          </div>
        </section>

        {/* ==========================================
            QUICK ACTION TABS
            ========================================== */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Book A Table */}
          <Link 
            href={`/search?q=Restaurants&state=${stateKey}&district=${selectedDistrict}&bookTable=true`}
            className="flex items-center p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mr-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors">Book A Table</h3>
              <p className="text-xs text-gray-400 font-semibold mt-0.5">Make Reservation</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>

          {/* Trending */}
          <Link 
            href={`/search?q=Restaurants&state=${stateKey}&district=${selectedDistrict}&trending=true`}
            className="flex items-center p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mr-4 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors">What's Trending?</h3>
              <p className="text-xs text-gray-400 font-semibold mt-0.5">Try it Yourself</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>

          {/* Order Food */}
          <Link 
            href={`/search?q=Restaurants&state=${stateKey}&district=${selectedDistrict}&orderFood=true`}
            className="flex items-center p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mr-4 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors">Order Food</h3>
              <p className="text-xs text-gray-400 font-semibold mt-0.5">Fast Home Delivery</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300 ml-auto group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>
        </section>

        {/* ==========================================
            CATEGORIES GRID SECTION (New Animated Design)
            ========================================== */}
        <section className="space-y-6 mb-12">
          <BrowseByFlavour stateKey={stateKey} />          {/* View All Categories Button */}
          <div className="flex justify-center pt-6">
            <Link
              href={`/search?q=Restaurants&state=${stateKey}&district=${selectedDistrict}`}
              className="bg-[#0076d6] hover:bg-[#005fb8] text-white font-medium px-8 py-3 rounded-xl shadow transition-all duration-200 flex items-center justify-center text-base font-semibold"
            >
              View All Categories of Restaurants in {stateName}
            </Link>
          </div>
        </section>

        {/* ==========================================
            DYNAMIC SEO OVERVIEW/ARTICLE
            ========================================== */}
        <section className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm space-y-6 mb-12">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
              Unveiling the Culinary Treasures: Exploring Local Restaurants &amp; Eateries near {locationName}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm text-gray-600 leading-relaxed font-normal">
            <div className="space-y-4">
              <p>
                Welcome to the vibrant world of local restaurants, where every dish tells a story and every bite is an adventure! In this article, we will take a delightful journey through the bustling streets and cozy corners of your neighborhood in <strong>{locationName}</strong> to discover the hidden gems known as eateries, food places, and top-rated restaurants. From savory sensations to sweet delights, there's something for every palate in these food spots that define the essence of culinary excellence.
              </p>
              
              <h3 className="font-extrabold text-gray-800 text-base">Exploring the Local Scene</h3>
              <p>
                When it comes to experiencing the true essence of <strong>{locationName}</strong>, few things rival the joy of indulging in its local cuisine. Local restaurants offer a glimpse into the heart and soul of the community, serving up not just food but also a sense of belonging and heritage. Whether you're craving comforting home-cooked classics or eager to explore exotic fusion flavors, these culinary havens have something to satisfy every single craving.
              </p>
              
              <h3 className="font-extrabold text-gray-800 text-base">Restaurant Menu: A Feast for the Senses</h3>
              <p>
                Step inside any local restaurant in <strong>{locationName}</strong>, and you'll be greeted by a symphony of aromas, colors, and flavors that titillate the senses. From sizzling platters to aromatic traditional curries, the restaurant menu is a treasure trove of culinary delights waiting to be explored. Each dish is carefully crafted to tantalize the taste buds and leave a lasting impression, ensuring that every meal is a memorable experience.
              </p>

              <h3 className="font-extrabold text-gray-800 text-base">Global Cuisines: A World of Flavors at Your Doorstep</h3>
              <p>
                One of the greatest joys of dining locally is the opportunity to embark on a culinary journey around the world without ever leaving your town. From cozy Italian trattorias to aromatic Middle Eastern and Chinese street-style hubs, these establishments offer a diverse array of global cuisines. Whether you're in the mood for a robust taste of India or craving international food, you'll find it all right here in your backyard.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-extrabold text-gray-800 text-base">Nightlife: Where Food Meets Entertainment</h3>
              <p>
                Local restaurants aren't just about great food; they are also hubs of social activity and vibrant nightlife. As the sun sets and the city comes alive, these eateries transform into lively gathering spots where friends come together to eat, drink, and make memories. Whether you're looking for a cozy, dim-lit corner to enjoy a romantic dinner or a lively, music-filled atmosphere, the local scene has you covered.
              </p>

              <h3 className="font-extrabold text-gray-800 text-base">Quick Bites: On-the-Go Gastronomy</h3>
              <p>
                In today's fast-paced world, convenience is key, and local eateries are here to deliver. Whether you're rushing to catch a train or grabbing a quick bite between meetings, these food spots offer a delicious solution. From gourmet sandwiches and fresh wraps to freshly baked pastries and coffees, you'll find an array of quick bites that are as satisfying as they are convenient.
              </p>

              <h3 className="font-extrabold text-gray-800 text-base">Sweet Tooth: Indulge Your Dessert Desires</h3>
              <p>
                No meal is complete without something sweet to satisfy your dessert desires. From decadent chocolate cakes and ice creams to artisanal traditional sweets, there is no shortage of treats to choose from. Whether you're celebrating a special milestone or simply treating yourself to a little weekend indulgence, there's always a local bakery ready to serve you.
              </p>

              <h3 className="font-extrabold text-gray-800 text-base">Foodie's Paradise: A Haven for Culinary Enthusiasts</h3>
              <p>
                For the true food lover, local restaurant collections are nothing short of paradise. With their commitment to quality ingredients, culinary creativity, and innovation, these establishments cater to the discerning palate of the modern foodie. So the next time you're craving a culinary adventure, why not step off the beaten path and discover the culinary treasures waiting to be found in your own neighborhood? Your taste buds will thank you!
              </p>
            </div>
          </div>
        </section>

        {/* ==========================================
            DYNAMIC SEO FAQ ACCORDION
            ========================================== */}
        <section className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm space-y-6 mb-8">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className={`border rounded-2xl transition-all duration-200 ${
                    isOpen ? 'border-primary bg-orange-50/20' : 'border-gray-100 hover:border-gray-200 bg-white'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-bold text-gray-900 text-sm md:text-base outline-none"
                  >
                    <span>{idx + 1}. {faq.q}</span>
                    <span className={`p-1 rounded-xl transition-all ${isOpen ? 'bg-primary text-white' : 'bg-slate-50 text-gray-400'}`}>
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100/50 mt-1">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
