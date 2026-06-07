import { useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, MapPin, Phone, MessageSquare, ShieldCheck, Clock, ChevronRight, SlidersHorizontal, Grid, List as ListIcon } from "lucide-react";
import { stateNames } from "@/lib/locationData";


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
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get("q") || "";
  const state = searchParams.get("state") || "";
  const district = searchParams.get("district") || "";

  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [filterVerified, setFilterVerified] = useState(false);
  const [sortBy, setSortBy] = useState("popular");

  // Filter list based on queries
  const filteredResults = mockResults.filter(item => {
    if (query && !item.name.toLowerCase().includes(query.toLowerCase()) && !item.category.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }
    if (state && item.state !== state) return false;
    if (district && item.district.toLowerCase() !== district.toLowerCase()) return false;
    if (filterVerified && !item.verified) return false;
    return true;
  });

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50 overflow-x-hidden font-sans">
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

      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <span className="hover:text-primary cursor-pointer" onClick={() => setLocation("/")}>Home</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">Search Results</span>
        </div>

        {/* Header summary */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              {query ? `Results for "${query}"` : "All Listings"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Found {filteredResults.length} matching businesses in {
                district 
                  ? `${district}, ${stateNames[state] || state}` 
                  : (state ? (stateNames[state] || state) : "India")
              }
            </p>
          </div>


          {/* Controls */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-orange-50 text-primary" : "text-gray-400 hover:text-gray-600"}`}
                aria-label="List view"
              >
                <ListIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-orange-50 text-primary" : "text-gray-400 hover:text-gray-600"}`}
                aria-label="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg text-sm px-3 py-2 font-medium text-gray-700 shadow-sm focus:outline-none focus:border-primary"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-primary" />
                  Filters
                </h3>
                <button 
                  onClick={() => setFilterVerified(false)} 
                  className="text-xs text-gray-400 hover:text-primary font-medium"
                >
                  Clear All
                </button>
              </div>

              {/* Verified Filter */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Verification</h4>
                <label className="flex items-center gap-3 cursor-pointer group">
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
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Categories</h4>
                <div className="space-y-2">
                  {["Restaurants", "Plumber", "Doctors", "Event Organizers", "Car Services"].map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded text-primary border-gray-300 focus:ring-primary focus:ring-opacity-25"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="pt-6 border-t border-gray-100 space-y-3">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Customer Rating</h4>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5].map((minRate) => (
                    <label key={minRate} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="rating-filter"
                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary focus:ring-opacity-25"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 flex items-center gap-1">
                        {minRate} <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> & above
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Grid/List */}
          <div className="lg:col-span-3">
            {filteredResults.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-3xl p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-orange-50 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">No matching listings found</h3>
                <p className="text-gray-500 max-w-sm mx-auto mb-6">
                  Try adjusting your search query, selecting a different location, or clearing filters.
                </p>
                <button
                  onClick={() => setLocation("/")}
                  className="bg-primary hover:bg-primary/95 text-white font-semibold px-6 py-2.5 rounded-xl text-sm shadow-sm transition-all"
                >
                  Back to Home
                </button>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-5"}>
                {filteredResults.map((item) => (
                  <div
                    key={item.id}
                    className={`result-card bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all flex ${
                      viewMode === "grid" ? "flex-col" : "flex-col md:flex-row"
                    }`}
                  >
                    {/* Image */}
                    <div className={`relative bg-slate-100 overflow-hidden ${
                      viewMode === "grid" 
                        ? "w-full h-48 rounded-t-2xl" 
                        : "w-full md:w-64 h-48 md:h-auto md:rounded-l-2xl flex-shrink-0"
                    }`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {item.featured && (
                        <span className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-[10px] px-2.5 py-1 rounded-full shadow-sm">
                          FEATURED
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Rating and Badges */}
                        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[11px] font-bold text-primary uppercase tracking-wider bg-orange-50 px-2 py-0.5 rounded">
                              {item.category}
                            </span>
                            <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                              {stateNames[item.state] || item.state}
                            </span>
                            {item.district && (
                              <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                                {item.district}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-bold text-gray-900">{item.rating}</span>
                            <span className="text-xs text-gray-400">({item.reviewsCount} reviews)</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                          {item.name}
                          {item.verified && (
                            <span title="Verified Business">
                              <ShieldCheck className="w-5 h-5 text-green-500 fill-green-50 flex-shrink-0" />
                            </span>
                          )}
                        </h2>

                        {/* Address */}
                        <div className="flex items-start gap-1.5 text-sm text-gray-500 mt-2">
                          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <span>{item.address}</span>
                        </div>

                        {/* Timing */}
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-2.5">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span className={item.timing.includes("Open now") ? "text-green-600 font-semibold" : "text-amber-600 font-semibold"}>
                            {item.timing}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 pt-6 mt-4 border-t border-gray-100">
                        <a
                          href={`tel:${item.phone}`}
                          className="flex-1 bg-primary hover:bg-primary/95 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-sm hover:shadow flex items-center justify-center gap-2 transition-all"
                        >
                          <Phone className="w-4 h-4" />
                          Call Now
                        </a>
                        <button className="flex-1 bg-white border border-gray-200 hover:bg-slate-50 text-gray-700 font-bold text-sm px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all">
                          <MessageSquare className="w-4 h-4 text-emerald-500" />
                          Inquire
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
