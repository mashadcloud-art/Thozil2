import { useState, useMemo, useEffect } from "react";
import { useLocation } from "wouter";
import { tourismData, thozilPartners, categoriesMapping } from "@/data/tourismData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  ChevronRight, Star, Clock, MapPin, Phone, MessageSquare, ThumbsUp, ThumbsDown, 
  HelpCircle, Calendar, Users, Info, X, Cloud, CloudRain, Sun, Wind
} from "lucide-react";

export default function StateTourism({ params }: { params: { state: string } }) {
  const [, setLocation] = useLocation();
  const stateKey = params.state.toUpperCase();
  const data = tourismData[stateKey];

  // If no data exists, redirect to home page
  useEffect(() => {
    if (!data) {
      setLocation("/");
    }
  }, [data, setLocation]);

  if (!data) return null;

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Interactive Metrics state
  const [likes, setLikes] = useState(1284);
  const [dislikes, setDislikes] = useState(32);
  const [hasVoted, setHasVoted] = useState(false);

  // Active City Selector inside the State (E.g. Coimbatore vs Ooty)
  const [activeCityToggle, setActiveCityToggle] = useState("primary");

  // Modals & Booking State
  const [activePartnerDetail, setActivePartnerDetail] = useState<any>(null);
  const [bookingFormData, setBookingFormData] = useState({ name: "", phone: "", date: "", guests: 1, remarks: "" });
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Auto city toggle reset when state changes
  useEffect(() => {
    setActiveCityToggle("primary");
    setSearchQuery("");
    setSelectedCategory("All");
  }, [stateKey]);

  // Filtered Attractions - Matches dynamic search & circular category buttons
  const filteredAttractions = useMemo(() => {
    return data.attractions.filter(att => {
      const matchesSearch = att.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            att.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            att.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || att.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [data, searchQuery, selectedCategory]);

  // Filter local tour guides for this state
  const localizedPartners = useMemo(() => {
    return thozilPartners.filter(p => p.state === stateKey);
  }, [stateKey]);

  const handleLike = () => {
    if (!hasVoted) {
      setLikes(prev => prev + 1);
      setHasVoted(true);
    }
  };

  const handleDislike = () => {
    if (!hasVoted) {
      setDislikes(prev => prev + 1);
      setHasVoted(true);
    }
  };

  const submitBookingInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccessModalOpen(true);
    setTimeout(() => {
      setIsSuccessModalOpen(false);
      setActivePartnerDetail(null);
      setBookingFormData({ name: "", phone: "", date: "", guests: 1, remarks: "" });
    }, 2500);
  };

  // Weather Icon renderer
  const renderWeatherIcon = (iconName: string) => {
    switch(iconName) {
      case "cloud": return <Cloud className="w-8 h-8 text-sky-400" />;
      case "cloud-rain": return <CloudRain className="w-8 h-8 text-blue-400" />;
      case "sun": return <Sun className="w-8 h-8 text-amber-500 animate-spin-slow" />;
      case "wind": return <Wind className="w-8 h-8 text-teal-400" />;
      default: return <Sun className="w-8 h-8 text-amber-500" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans overflow-x-hidden">
      <Navbar />

      {/* Breadcrumbs */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-5">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => setLocation("/")}>Home</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">{data.stateName} Tourism</span>
        </div>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 space-y-12">

        {/* ==========================================
            HERO COLLAGE BANNER SECTION
            ========================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info Box */}
          <div className="lg:col-span-1 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-primary tracking-widest uppercase bg-orange-50 px-3 py-1.5 rounded-full inline-block mb-4">
                TOURISM GUIDE
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-none mb-3">
                {data.stateName}
              </h1>
              <p className="text-sm font-semibold text-primary/90 italic mb-6">
                "{data.tagline}"
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                {data.about}
              </p>
            </div>

            {/* Weather & Feedback Widget */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-slate-50 p-2.5 rounded-2xl border border-gray-100 shadow-inner">
                  {renderWeatherIcon(data.weather.icon)}
                </div>
                <div>
                  <span className="block text-lg font-bold text-gray-900 leading-tight">{data.weather.temp}</span>
                  <span className="text-xs text-gray-500 font-medium">{data.weather.condition}</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <button 
                  onClick={handleLike}
                  disabled={hasVoted}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm border ${
                    hasVoted ? 'bg-gray-50 text-gray-400 border-gray-100' : 'bg-white hover:bg-emerald-50 text-emerald-600 border-emerald-100'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  {likes}
                </button>
                <button 
                  onClick={handleDislike}
                  disabled={hasVoted}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm border ${
                    hasVoted ? 'bg-gray-50 text-gray-400 border-gray-100' : 'bg-white hover:bg-red-50 text-red-600 border-red-100'
                  }`}
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                  {dislikes}
                </button>
              </div>
            </div>
          </div>

          {/* Photo Collage Banner */}
          <div className="lg:col-span-2 grid grid-cols-12 gap-3 h-[380px] lg:h-auto min-h-[350px]">
            <div className="col-span-8 h-full rounded-3xl overflow-hidden relative group shadow-sm">
              <img 
                src={data.gallery[0]} 
                alt={`${data.stateName} landscape`} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-5 left-5 text-white">
                <span className="text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">Primary Destination</span>
                <h3 className="text-xl font-bold mt-2">{data.city}</h3>
              </div>
            </div>
            <div className="col-span-4 grid grid-rows-2 gap-3 h-full">
              <div className="rounded-3xl overflow-hidden relative group shadow-sm">
                <img 
                  src={data.gallery[1]} 
                  alt={`${data.stateName} destination`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="rounded-3xl overflow-hidden relative group shadow-sm">
                <img 
                  src={data.gallery[2]} 
                  alt={`${data.stateName} scenic view`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-sm font-bold">{data.alternativeCity}</h4>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ==========================================
            CIRCULAR QUICK CATEGORIES ROW
            ========================================== */}
        <section className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm overflow-hidden">
          <h2 className="text-base font-bold text-gray-900 mb-4 px-2">Discover By Category</h2>
          <div className="flex items-center gap-6 overflow-x-auto pb-2 custom-scroll scroll-smooth">
            <button 
              onClick={() => setSelectedCategory("All")}
              className="flex flex-col items-center gap-2.5 flex-shrink-0 cursor-pointer group"
            >
              <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all ${
                selectedCategory === "All" ? 'border-primary bg-orange-50 text-primary shadow' : 'border-gray-100 bg-slate-50 text-gray-600 hover:border-primary/50'
              }`}>
                All
              </div>
              <span className={`text-xs font-bold tracking-tight ${selectedCategory === "All" ? 'text-primary' : 'text-gray-500'}`}>All Places</span>
            </button>
            {categoriesMapping.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="flex flex-col items-center gap-2.5 flex-shrink-0 cursor-pointer group"
              >
                <div className={`w-16 h-16 rounded-full overflow-hidden border-2 transition-all relative ${
                  selectedCategory === cat.id ? 'border-primary shadow scale-105' : 'border-gray-100 hover:border-primary/50'
                }`}>
                  <img src={cat.image} alt={cat.title} className="w-full h-full object-cover" />
                  <div className={`absolute inset-0 bg-primary/10 transition-opacity ${selectedCategory === cat.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                </div>
                <span className={`text-xs font-bold tracking-tight ${selectedCategory === cat.id ? 'text-primary' : 'text-gray-500'}`}>{cat.title}</span>
              </button>
            ))}
          </div>
        </section>


        {/* ==========================================
            BEST SEASONS RECOMMENDATIONS
            ========================================== */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Best Season to Visit</h2>
            <div className="h-0.5 bg-gray-200 flex-1 ml-4 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Peak */}
            <div className="bg-white border-2 border-primary/20 rounded-3xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl tracking-wider">
                RECOMMENDED
              </div>
              <span className="text-xs font-bold text-primary tracking-wide uppercase">{data.seasons.peak.months}</span>
              <h3 className="text-lg font-bold text-gray-900 mt-1 mb-3">{data.seasons.peak.title}</h3>
              <div className="bg-orange-50 text-primary font-bold text-sm px-3 py-1.5 rounded-xl inline-block mb-5">
                Avg: {data.seasons.peak.temp}
              </div>
              <ul className="space-y-2.5">
                {data.seasons.peak.points.map((pt, i) => (
                  <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Moderate */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
              <span className="text-xs font-bold text-teal-600 tracking-wide uppercase">{data.seasons.moderate.months}</span>
              <h3 className="text-lg font-bold text-gray-900 mt-1 mb-3">{data.seasons.moderate.title}</h3>
              <div className="bg-teal-50 text-teal-700 font-bold text-sm px-3 py-1.5 rounded-xl inline-block mb-5">
                Avg: {data.seasons.moderate.temp}
              </div>
              <ul className="space-y-2.5">
                {data.seasons.moderate.points.map((pt, i) => (
                  <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-1.5 flex-shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Off-Season */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
              <span className="text-xs font-bold text-slate-500 tracking-wide uppercase">{data.seasons.off.months}</span>
              <h3 className="text-lg font-bold text-gray-900 mt-1 mb-3">{data.seasons.off.title}</h3>
              <div className="bg-slate-100 text-slate-700 font-bold text-sm px-3 py-1.5 rounded-xl inline-block mb-5">
                Avg: {data.seasons.off.temp}
              </div>
              <ul className="space-y-2.5">
                {data.seasons.off.points.map((pt, i) => (
                  <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5 flex-shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>


        {/* ==========================================
            ATTRACTIONS / TOURIST PLACES SECTION
            ========================================== */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-1">
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Top Attractions to Explore</h2>
              <div className="h-0.5 bg-gray-200 flex-1 ml-4 rounded hidden sm:block" />
            </div>
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search attractions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 text-xs pl-8 pr-4 py-2 rounded-xl focus:outline-none focus:border-primary shadow-sm"
              />
              <span className="absolute left-2.5 top-2.5 text-gray-400">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </span>
            </div>
          </div>

          {filteredAttractions.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-3xl p-10 text-center text-gray-500 shadow-sm">
              No attractions matching your filters were found. Try clearing category or changing search.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAttractions.map((att) => (
                <div key={att.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
                  <div>
                    <div className="h-48 overflow-hidden relative">
                      <img src={att.image} alt={att.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[10px] font-bold text-primary px-3 py-1 rounded-full shadow-sm">
                        {att.category}
                      </span>
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400 font-semibold flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-gray-400" />
                          {att.locality}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                          <span className="text-xs font-bold text-gray-900">{att.rating}</span>
                          <span className="text-[10px] text-gray-400">({att.reviews})</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {att.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {att.desc}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {att.timing}
                    </span>
                    <button 
                      onClick={() => setLocation(`/search?q=${encodeURIComponent(att.title)}&state=${stateKey}`)}
                      className="text-xs font-bold text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                    >
                      Find Local Listings <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>


        {/* ==========================================
            ONE DAY HUSTLE ITINERARY SECTION
            ========================================== */}
        <section className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />
          <div className="relative space-y-8">
            <div>
              <span className="text-[10px] font-extrabold text-primary tracking-widest uppercase bg-white/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
                PLANNER ITINERARY
              </span>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">{data.oneDayHustle.tagline}</h2>
            </div>
            
            <div className="relative border-l border-white/20 ml-3 md:ml-28 pl-6 md:pl-8 space-y-8">
              {data.oneDayHustle.steps.map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline point */}
                  <div className="absolute -left-[31px] md:-left-[39px] w-4 h-4 rounded-full bg-primary border-4 border-slate-950 group-hover:scale-125 transition-transform" />
                  
                  {/* Time badge */}
                  <div className="md:absolute md:-left-36 md:top-0 md:w-24 md:text-right text-xs font-bold text-primary tracking-wider uppercase mb-1 md:mb-0">
                    {step.time}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors">{step.spot}</h3>
                    <p className="text-xs text-gray-400 max-w-2xl leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ==========================================
            HOTELS & HOMESTAYS SECTION
            ========================================== */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Best Hotels &amp; Homestays</h2>
            <div className="h-0.5 bg-gray-200 flex-1 ml-4 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.hotels.map((hotel) => (
              <div key={hotel.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
                <div>
                  <div className="h-44 overflow-hidden relative">
                    <img src={hotel.image} alt={hotel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute bottom-4 right-4 bg-slate-900/90 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow-sm">
                      {hotel.price}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {hotel.title}
                    </h3>
                    <span className="text-xs text-gray-400 font-semibold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {hotel.locality}
                    </span>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-3 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold text-gray-900">{hotel.rating}</span>
                    <span className="text-[10px] text-gray-400">({hotel.reviews} reviews)</span>
                  </div>
                  <button 
                    onClick={() => setLocation(`/search?q=${encodeURIComponent(hotel.title)}&state=${stateKey}`)}
                    className="text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ==========================================
            POPULAR RESTAURANTS SECTION
            ========================================== */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Popular Restaurants</h2>
            <div className="h-0.5 bg-gray-200 flex-1 ml-4 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.restaurants.map((rest) => (
              <div key={rest.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col md:flex-row">
                <div className="w-full md:w-48 h-40 md:h-auto overflow-hidden flex-shrink-0">
                  <img src={rest.image} alt={rest.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-orange-50 px-2.5 py-1 rounded-md">
                      {rest.cuisine}
                    </span>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {rest.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      <span className="font-semibold text-gray-700">Famous For:</span> {rest.famousFor}
                    </p>
                    <span className="text-xs text-gray-400 font-semibold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      {rest.locality}
                    </span>
                  </div>
                  <div className="pt-4 mt-3 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-bold text-gray-900">{rest.rating}</span>
                      <span className="text-[10px] text-gray-400">({rest.reviews} reviews)</span>
                    </div>
                    <button 
                      onClick={() => setLocation(`/search?q=${encodeURIComponent(rest.title)}&state=${stateKey}`)}
                      className="text-xs font-bold text-primary hover:text-primary/80 transition-colors"
                    >
                      Find Outlets
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ==========================================
            LOCAL TOUR PROS / GUIDES SECTION
            ========================================== */}
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Verified Local Guides</h2>
            <div className="h-0.5 bg-gray-200 flex-1 ml-4 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localizedPartners.map((guide) => (
              <div key={guide.id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex-shrink-0">
                      <img src={guide.avatar} alt={guide.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">{guide.name}</h3>
                      <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{guide.exp}</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-xs text-gray-700 font-semibold leading-tight">{guide.role}</p>
                    <div className="flex items-center gap-1 flex-wrap">
                      {guide.languages.map((l, i) => (
                        <span key={i} className="text-[9px] font-bold text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded">
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold block leading-none">CHARGES</span>
                    <span className="text-sm font-extrabold text-gray-900">{guide.price}</span>
                  </div>
                  <button 
                    onClick={() => setActivePartnerDetail(guide)}
                    className="bg-primary hover:bg-primary/95 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Book Guide
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ==========================================
            DID YOU KNOW? FUN FACTS SECTION
            ========================================== */}
        <section className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="bg-amber-50 p-2 rounded-xl text-amber-500">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Did You Know? (Fun Facts)</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.didYouKnow.map((fact, idx) => (
              <div key={idx} className="bg-slate-50 border border-gray-100/50 rounded-2xl p-5 flex items-start gap-4 hover:bg-amber-50/20 transition-all duration-300">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  {fact}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ==========================================
          BOOKING MODAL DIALOG
          ========================================== */}
      {activePartnerDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-primary text-white p-6 relative">
              <button 
                onClick={() => setActivePartnerDetail(null)}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold">Book Local Guide Inquiry</h3>
              <p className="text-xs text-white/80 mt-1">Send your trip details to {activePartnerDetail.name}</p>
            </div>
            <form onSubmit={submitBookingInquiry} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={bookingFormData.name}
                  onChange={(e) => setBookingFormData({...bookingFormData, name: e.target.value})}
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary"
                  placeholder="E.g. Akash Sharma"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={bookingFormData.phone}
                    onChange={(e) => setBookingFormData({...bookingFormData, phone: e.target.value})}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary"
                    placeholder="E.g. 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Travel Date</label>
                  <input 
                    type="date" 
                    required
                    value={bookingFormData.date}
                    onChange={(e) => setBookingFormData({...bookingFormData, date: e.target.value})}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Number of Guests</label>
                  <input 
                    type="number" 
                    min="1"
                    required
                    value={bookingFormData.guests}
                    onChange={(e) => setBookingFormData({...bookingFormData, guests: parseInt(e.target.value) || 1})}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Service Fee</label>
                  <div className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 font-extrabold flex items-center">
                    {activePartnerDetail.price}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Special Remarks</label>
                <textarea 
                  value={bookingFormData.remarks}
                  onChange={(e) => setBookingFormData({...bookingFormData, remarks: e.target.value})}
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary h-20 resize-none"
                  placeholder="Any preferences or specific sights you want to cover..."
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Calendar className="w-4 h-4" />
                Submit Booking Inquiry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SUCCESS POPUP */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">Inquiry Submitted!</h3>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              We have forwarded your booking details to {activePartnerDetail?.name}. They will contact you shortly on your phone number.
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
