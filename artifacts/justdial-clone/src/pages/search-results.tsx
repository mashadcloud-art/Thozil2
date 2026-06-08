import { useState, useEffect, useMemo } from "react";
import { useLocation, Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, MapPin, Phone, MessageSquare, ShieldCheck, Clock, ChevronRight, SlidersHorizontal, Grid, List as ListIcon, Filter, Search } from "lucide-react";
import { stateNames } from "@/lib/locationData";
import { motion, AnimatePresence } from "framer-motion";
import { Drawer } from "vaul";

// Mock search results data
const mockResults = [
  {
    id: 1,
    name: "Golden Fork Restaurant",
    category: "Restaurants",
    state: "KL",
    district: "Ernakulam",
    rating: 4.8,
    reviewsCount: 312,
    address: "MG Road, Near Metro Pillar 120, Kochi, Kerala",
    phone: "+91 98765 43210",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    verified: true,
    timing: "Open now: 11:00 AM - 11:00 PM",
    featured: true,
  },
  {
    id: 2,
    name: "Elite Electricians & Plumbers",
    category: "Plumber",
    state: "KL",
    district: "Ernakulam",
    rating: 4.6,
    reviewsCount: 184,
    address: "Vyttila Junction, Kochi, Kerala",
    phone: "+91 98765 43211",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
    verified: true,
    timing: "Open now: 8:00 AM - 8:00 PM",
    featured: false,
  },
  {
    id: 3,
    name: "Dr. Anjali Menon (Menon Dental Care)",
    category: "Doctors",
    state: "KL",
    district: "Ernakulam",
    rating: 4.9,
    reviewsCount: 420,
    address: "Palarivattom Bypass, Kochi, Kerala",
    phone: "+91 98765 43212",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80",
    verified: true,
    timing: "Closes soon: 9:00 AM - 6:00 PM",
    featured: true,
  },
  {
    id: 4,
    name: "Grand Palace Wedding Planners",
    category: "Event Organizers",
    state: "KL",
    district: "Thrissur",
    rating: 4.7,
    reviewsCount: 95,
    address: "Swaraj Round, Thrissur, Kerala",
    phone: "+91 98765 43213",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
    verified: false,
    timing: "Open 24 Hours",
    featured: false,
  },
  {
    id: 5,
    name: "Kochi Automobile Hub & Service",
    category: "Car Services",
    state: "KL",
    district: "Ernakulam",
    rating: 4.4,
    reviewsCount: 206,
    address: "Kalamassery, Kochi, Kerala",
    phone: "+91 98765 43214",
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80",
    verified: true,
    timing: "Open now: 9:00 AM - 7:00 PM",
    featured: false,
  },
  {
    id: 6,
    name: "Saravana Bhavan",
    category: "Restaurants",
    state: "TN",
    district: "Chennai",
    rating: 4.7,
    reviewsCount: 1205,
    address: "T. Nagar, Chennai, Tamil Nadu",
    phone: "+91 98765 43215",
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80",
    verified: true,
    timing: "Open now: 7:00 AM - 10:30 PM",
    featured: true,
  },
  {
    id: 7,
    name: "Bengaluru IT Hub Solutions",
    category: "Car Services",
    state: "KA",
    district: "Bengaluru Urban",
    rating: 4.5,
    reviewsCount: 98,
    address: "Whitefield, Bengaluru, Karnataka",
    phone: "+91 98765 43216",
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80",
    verified: true,
    timing: "Open now: 9:00 AM - 6:00 PM",
    featured: false,
  }
];

export default function SearchResults() {
  const [, setLocation] = useLocation();
  
  // Parse query params (simple client-side parser)
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const query = searchParams.get("q") || "";
  const state = searchParams.get("state") || "";
  const district = searchParams.get("district") || "";

  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [filterVerified, setFilterVerified] = useState(false);
  const [sortBy, setSortBy] = useState("popular");

  const [dbResults, setDbResults] = useState<any[]>([]);
  const [loadingDb, setLoadingDb] = useState(false);

  useEffect(() => {
    const activeState = state || "KL";
    setLoadingDb(true);
    
    const stateNameMap: Record<string, string> = {
      KL: "kerala",
      TN: "tamil_nadu",
      RJ: "rajasthan",
      GA: "goa",
      KA: "karnataka",
      LA: "ladakh"
    };
    
    const apiStateKey = stateNameMap[activeState.toUpperCase()] || activeState.toLowerCase();
    
    fetch(`/api/api/v1/tourism?state=${apiStateKey}`)
      .then(res => {
        if (!res.ok) throw new Error("State data not found");
        return res.json();
      })
      .then(fetchedData => {
        const items: any[] = [];
        
        // Map restaurants
        if (fetchedData.restaurants) {
          fetchedData.restaurants.forEach((r: any) => {
            items.push({
              id: r.id,
              name: r.title,
              category: "Restaurants",
              state: activeState.toUpperCase(),
              district: r.district || "",
              rating: r.rating || 4.5,
              reviewsCount: parseInt(r.reviews) || 45,
              address: `${r.locality}, ${fetchedData.stateName || "Kerala"}, India`,
              phone: r.phone || "+91 99029 00900",
              image: r.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
              verified: true,
              timing: "Open now: 11:00 AM - 11:00 PM",
              featured: false,
              famousFor: r.famousFor
            });
          });
        }
        
        // Map hotels
        if (fetchedData.hotels) {
          fetchedData.hotels.forEach((h: any) => {
            items.push({
              id: h.id,
              name: h.title,
              category: "Hotels",
              state: activeState.toUpperCase(),
              district: h.district || "",
              rating: h.rating || 4.5,
              reviewsCount: parseInt(h.reviews) || 28,
              address: `${h.locality}, ${fetchedData.stateName || "Kerala"}, India`,
              phone: h.phone || "+91 99029 00900",
              image: h.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
              verified: true,
              timing: "24 Hours Check-in",
              featured: false,
              price: h.price
            });
          });
        }

        // Map attractions
        if (fetchedData.attractions) {
          fetchedData.attractions.forEach((a: any) => {
            items.push({
              id: a.id,
              name: a.title,
              category: a.category || "Tourist Places",
              state: activeState.toUpperCase(),
              district: a.district || "",
              rating: a.rating || 4.5,
              reviewsCount: parseInt(a.reviews) || 120,
              address: `${a.locality}, ${fetchedData.stateName || "Kerala"}, India`,
              phone: "+91 99029 00900",
              image: a.image || "https://images.unsplash.com/photo-1596422846543-75c6fc18a52b?w=300&h=300&fit=crop",
              verified: true,
              timing: a.timing || "Open: 9:00 AM - 6:00 PM",
              featured: false
            });
          });
        }

        setDbResults(items);
        setLoadingDb(false);
      })
      .catch(err => {
        console.warn("Failed to fetch search results from MongoDB:", err);
        setLoadingDb(false);
      });
  }, [state]);

  // Combine and filter list based on queries
  const filteredResults = useMemo(() => {
    const activeState = state || "KL";
    const combined = [...dbResults, ...mockResults];

    return combined.filter(item => {
      // 1. Query matching
      if (query) {
        const queryLower = query.toLowerCase();
        const matchesQuery = 
          item.name.toLowerCase().includes(queryLower) || 
          item.category.toLowerCase().includes(queryLower);
        if (!matchesQuery) return false;
      }
      
      // 2. State matching
      if (item.state !== activeState.toUpperCase()) return false;
      
      // 3. District matching
      if (district && item.district.toLowerCase() !== district.toLowerCase()) return false;
      
      // 4. Verification matching
      if (filterVerified && !item.verified) return false;
      
      return true;
    });
  }, [dbResults, query, state, district, filterVerified]);

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
        <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          Filters
        </h3>
        <button 
          onClick={() => setFilterVerified(false)} 
          className="text-xs text-primary bg-orange-50 px-3 py-1.5 rounded-full hover:bg-orange-100 font-medium transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Verified Filter */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Verification</h4>
        <label className="flex items-center gap-3 cursor-pointer group p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors">
          <input
            type="checkbox"
            checked={filterVerified}
            onChange={(e) => setFilterVerified(e.target.checked)}
            className="w-4 h-4 rounded text-primary border-gray-300 focus:ring-primary focus:ring-opacity-25"
          />
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-green-500 fill-green-50" />
            Verified Listings only
          </span>
        </label>
      </div>

      {/* Quick Categories */}
      <div className="pt-6 border-t border-gray-100 space-y-3">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Categories</h4>
        <div className="space-y-1">
          {["Restaurants", "Plumber", "Doctors", "Event Organizers", "Car Services"].map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors">
              <input
                type="checkbox"
                className="w-4 h-4 rounded text-primary border-gray-300 focus:ring-primary focus:ring-opacity-25"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 font-medium">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="pt-6 border-t border-gray-100 space-y-3">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Customer Rating</h4>
        <div className="space-y-1">
          {[4.5, 4.0, 3.5].map((minRate) => (
            <label key={minRate} className="flex items-center gap-3 cursor-pointer group p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors">
              <input
                type="radio"
                name="rating-filter"
                className="w-4 h-4 text-primary border-gray-300 focus:ring-primary focus:ring-opacity-25"
              />
              <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 flex items-center gap-1">
                {minRate} <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> & above
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50/50 overflow-x-hidden font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar />

      <style>{`
        .result-card {
          height: auto !important;
          overflow: visible !important;
          white-space: normal !important;
          width: 100% !important;
        }
        .result-card * {
          white-space: normal !important;
          overflow: visible !important;
          text-overflow: unset !important;
        }
      `}</style>

      {/* Enhanced Header Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-10 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-6">
            <span className="hover:text-white transition-colors cursor-pointer" onClick={() => setLocation("/")}>Home</span>
            <ChevronRight className="w-4 h-4 text-gray-500" />
            <span className="text-gray-100 font-medium">Search Results</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-2">
                {query ? (
                  <span className="flex items-center gap-3">
                    <Search className="w-8 h-8 text-primary" />
                    Results for <span className="text-primary">"{query}"</span>
                  </span>
                ) : (
                  "All Listings"
                )}
              </h1>
              <p className="text-lg text-gray-300 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                Showing {filteredResults.length} matching businesses in {
                  district 
                    ? `${district}, ${stateNames[state] || state}` 
                    : (state ? (stateNames[state] || state) : "India")
                }
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 relative z-10 -mt-6">
        
        {/* Controls Bar */}
        <div className="bg-white/80 backdrop-blur-md border border-gray-200/60 rounded-2xl p-4 shadow-sm mb-8 flex flex-wrap items-center justify-between gap-4">
          
          {/* Mobile Filter Trigger */}
          <div className="lg:hidden block w-full sm:w-auto">
            <Drawer.Root>
              <Drawer.Trigger asChild>
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-gray-800 font-semibold px-4 py-2.5 rounded-xl transition-colors">
                  <Filter className="w-4 h-4" />
                  Filters & Sorting
                </button>
              </Drawer.Trigger>
              <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
                <Drawer.Content className="bg-white flex flex-col rounded-t-[24px] mt-24 max-h-[96vh] fixed bottom-0 left-0 right-0 z-50 outline-none">
                  <div className="p-4 bg-white rounded-t-[24px] flex-1 overflow-y-auto">
                    <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-6" />
                    <FilterSidebar />
                  </div>
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          </div>

          <div className="hidden lg:block text-sm font-semibold text-gray-500">
            {filteredResults.length} Results Found
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto sm:ml-auto">
            <div className="flex items-center bg-slate-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white text-primary shadow-sm font-bold" : "text-gray-500 hover:text-gray-700"}`}
                aria-label="List view"
              >
                <ListIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white text-primary shadow-sm font-bold" : "text-gray-500 hover:text-gray-700"}`}
                aria-label="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-100 hover:bg-slate-200 cursor-pointer border-none rounded-xl text-sm px-4 py-2.5 font-semibold text-gray-800 transition-colors focus:ring-2 focus:ring-primary/20 outline-none"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-white/80 backdrop-blur-xl border border-gray-200/60 rounded-3xl p-6 shadow-sm">
              <FilterSidebar />
            </div>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-3">
            {filteredResults.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-gray-200 rounded-[2rem] p-16 text-center shadow-sm"
              >
                <div className="w-20 h-20 bg-orange-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">No matching listings found</h3>
                <p className="text-gray-500 text-lg max-w-md mx-auto mb-8">
                  We couldn't find any results matching your criteria. Try adjusting your filters or searching for something else.
                </p>
                <button
                  onClick={() => setLocation("/")}
                  className="bg-primary hover:bg-primary/95 text-white font-bold px-8 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                  Back to Home
                </button>
              </motion.div>
            ) : (
              <motion.div 
                layout
                className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-6"}
              >
                <AnimatePresence mode="popLayout">
                  {filteredResults.map((item, index) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
                      key={item.id}
                      className={`result-card group bg-white border border-gray-100 rounded-[1.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex overflow-hidden ${
                        viewMode === "grid" ? "flex-col" : "flex-col md:flex-row"
                      }`}
                    >
                      {/* Image Container */}
                      <Link
                        href={`/listing/${item.id}`}
                        className={`relative bg-slate-100 overflow-hidden cursor-pointer ${
                          viewMode === "grid" 
                            ? "w-full h-56 block" 
                            : "w-full md:w-72 h-56 md:h-auto flex-shrink-0 block"
                        }`}
                      >
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        {item.featured && (
                          <span className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black tracking-wider text-[10px] px-3 py-1.5 rounded-full shadow-lg z-20">
                            FEATURED
                          </span>
                        )}
                        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap gap-2">
                          <span className="text-[11px] font-bold text-gray-900 uppercase tracking-wider bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-sm">
                            {item.category}
                          </span>
                        </div>
                      </Link>

                      {/* Content Details */}
                      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Top Meta Info */}
                          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-1 rounded-lg">
                                <Star className="w-4 h-4 fill-green-600 text-green-600" />
                                <span className="text-sm font-black">{item.rating}</span>
                              </div>
                              <span className="text-sm font-medium text-gray-400 underline decoration-gray-300 underline-offset-2 cursor-pointer hover:text-gray-700 transition-colors">
                                {item.reviewsCount} reviews
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-1.5">
                              {item.verified && (
                                <span className="flex items-center gap-1 text-[11px] font-bold text-green-700 bg-green-50 px-2 py-1 rounded-md">
                                  <ShieldCheck className="w-3.5 h-3.5" />
                                  VERIFIED
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Title */}
                          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 flex items-start gap-2 group-hover:text-primary transition-colors cursor-pointer leading-tight mb-3">
                            <Link href={`/listing/${item.id}`} className="hover:text-primary w-full">
                              {item.name}
                            </Link>
                          </h2>

                          {/* Address */}
                          <div className="flex items-start gap-2 text-sm md:text-base font-medium text-gray-500">
                            <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            <span className="leading-relaxed">{item.address}</span>
                          </div>

                          {/* Timing */}
                          <div className="flex items-center gap-2 text-sm font-medium mt-4 bg-slate-50 w-fit px-3 py-1.5 rounded-lg border border-slate-100">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className={item.timing.includes("Open now") ? "text-green-600" : "text-amber-600"}>
                              {item.timing}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-6 mt-6 border-t border-gray-100">
                          <a
                            href={`tel:${item.phone}`}
                            className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold text-sm md:text-base px-4 py-3 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                          >
                            <Phone className="w-4 h-4 md:w-5 md:h-5" />
                            Call Now
                          </a>
                          <button className="flex-1 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-sm md:text-base px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5">
                            <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                            Inquire
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
