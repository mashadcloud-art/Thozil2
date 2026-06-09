import { useState, useMemo, useEffect } from "react";
import { useLocation } from "wouter";
import { tourismData } from "@/data/tourismData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Star, MapPin, Phone, MessageSquare, ShieldCheck, Clock, Share2, 
  ChevronRight, Calendar, Users, Send, Image, Map, ThumbsUp 
} from "lucide-react";

export default function ListingDetail({ params }: { params: { id: string } }) {
  const [, setLocation] = useLocation();
  const listingId = params.id;

  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [apiMenus, setApiMenus] = useState<any[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    let foundListing: any = null;

    // Search across all states, attractions, hotels, and restaurants to find our listing
    for (const stateCode of Object.keys(tourismData)) {
      const stateObj = tourismData[stateCode];
      
      // Check attractions
      const attraction = stateObj.attractions.find(a => a.id === listingId);
      if (attraction) {
        foundListing = {
          ...attraction,
          type: "Attraction",
          stateCode,
          stateName: stateObj.stateName,
          address: `${attraction.locality}, ${stateObj.stateName}, India`,
          details: attraction.desc,
          additionalInfo: [
            `Best season: ${stateObj.seasons.peak.months} (${stateObj.seasons.peak.title})`,
            `Weather: ${stateObj.weather.temp} - ${stateObj.weather.condition}`,
            `Recommended time to spend: 2-3 hours`
          ]
        };
        break;
      }

      // Check hotels
      const hotel = stateObj.hotels.find(h => h.id === listingId);
      if (hotel) {
        foundListing = {
          ...hotel,
          type: "Hotel",
          stateCode,
          stateName: stateObj.stateName,
          address: `${hotel.locality}, ${stateObj.stateName}, India`,
          details: `Premium luxury stay in ${hotel.locality}. Enjoy world-class hospitality, great amenities, and stunning views of the surrounding area.`,
          timing: "24 Hours Check-in",
          additionalInfo: [
            `Average Price: ${hotel.price}`,
            `Ideal for: Families, couples, and solo travelers`,
            `Key amenities: Free Wi-Fi, Room Service, Air Conditioning`
          ]
        };
        break;
      }

      // Check restaurants
      const restaurant = stateObj.restaurants.find(r => r.id === listingId);
      if (restaurant) {
        foundListing = {
          ...restaurant,
          type: "Restaurant",
          stateCode,
          stateName: stateObj.stateName,
          address: `${restaurant.locality}, ${stateObj.stateName}, India`,
          details: `Famous for serving authentic ${restaurant.cuisine} specialties. A popular dining spot in ${restaurant.locality} known for great taste and ambiance.`,
          timing: "11:00 AM - 11:00 PM",
          additionalInfo: [
            `Famous For: ${restaurant.famousFor}`,
            `Cuisine type: ${restaurant.cuisine}`,
            `Ambiance: Family friendly, casual dining`
          ]
        };
        break;
      }
    }

    // Fallback if not found (specifically for Magnetic Hill)
    if (!foundListing && listingId === "la_att_1") {
      foundListing = {
        id: "la_att_1",
        title: "Magnetic Hill",
        locality: "Leh-Kargil National Highway (NH 1), Leh",
        rating: 4.5,
        reviews: "2.4k",
        desc: "A legendary gravity hill where vehicles parked within the marked box appear to move uphill against gravity. This famous spot creates a striking optical illusion due to the surrounding rising hills.",
        timing: "Available 24 Hours",
        category: "Tourist Places",
        image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80",
        type: "Attraction",
        stateCode: "LA",
        stateName: "Ladakh",
        address: "Leh-Kargil National Highway (NH 1), Leh, Ladakh - 194101",
        details: "Magnetic Hill is a gravity hill located near Leh in Ladakh, India. The layout of the area and surrounding hills creates the optical illusion of a hill. The hill road is actually a downhill road. Objects and cars on the hill road may appear to roll uphill in defiance of gravity when they are, in fact, rolling downhill. It is a highly popular stopover for tourists taking the road trip from Leh to Kargil or Srinagar.",
        additionalInfo: [
          "Located at an altitude of 14,000 feet above sea level.",
          "Maintained and highlighted by the Indian Army with designated parking boxes.",
          "Best visited between May and September for clear roads and pleasant views."
        ]
      };
    }

    if (foundListing) {
      setListing(foundListing);
      setLoading(false);
      return;
    }

    // Check apiData.json for global API restaurants
    fetch("/apiData.json")
      .then(res => res.json())
      .then(json => {
        // ID could be "kasaragod_1" so we check against "restaurant_kasaragod_1"
        const apiRest = json.restaurants?.find((r: any) => r.id === listingId || r.id === `restaurant_${listingId}`);
        if (apiRest) {
          setListing({
            ...apiRest,
            title: apiRest.name,
            type: "Restaurant",
            stateCode: "KL",
            stateName: "Kerala", // Mocked as Kerala
            address: `${apiRest.locality}, ${apiRest.district}, India`,
            details: `A top-rated dining spot located in ${apiRest.locality}, ${apiRest.district}. Known for offering exquisite ${apiRest.cuisines.join(", ")} cuisines.`,
            timing: "11:00 AM - 11:30 PM",
            additionalInfo: [
              `Cuisines: ${apiRest.cuisines.join(", ")}`,
              `Ambiance: Casual Dining, Family Friendly`,
              `Payment: Cash, Cards, UPI Accepted`
            ]
          });

          // Fetch the menus that match the cuisines
          const restaurantCuisines = json.cuisines.filter((c: any) => apiRest.cuisines.includes(c.name));
          setApiMenus(restaurantCuisines);
        } else {
          setListing(null);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch apiData.json", err);
        setListing(null);
        setLoading(false);
      });

  }, [listingId]);

  // Form states
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", date: "", message: "" });
  
  // Review submission state
  const [reviewsList, setReviewsList] = useState([
    { name: "Rahul Sharma", rating: 5, date: "2 days ago", comment: "Absolutely mind blowing experience! Parked my vehicle inside the box, put it in neutral, and it actually started moving forward slowly. A must-visit when in Leh!" },
    { name: "Priya Patel", rating: 4, date: "1 week ago", comment: "Great experience and beautiful mountain backdrops. Very interesting optical illusion that works perfectly. Make sure to read the sign boards placed by the Army." },
    { name: "John Doe", rating: 5, date: "2 weeks ago", comment: "Surreal landscape! The drive itself from Leh to this hill is extremely scenic. The gravity phenomenon is quite fun to test out with your friends." }
  ]);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "" });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<"overview" | "photos" | "reviews" | "menu">("overview");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Listing Not Found</h2>
            <p className="text-gray-500">The listing you are trying to view does not exist or has been removed.</p>
            <button onClick={() => setLocation("/")} className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-sm">
              Back to Home
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setFormData({ name: "", phone: "", date: "", message: "" });
    }, 3000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    setReviewsList([
      { name: newReview.name, rating: newReview.rating, date: "Just now", comment: newReview.comment },
      ...reviewsList
    ]);
    setReviewSubmitted(true);
    setTimeout(() => {
      setReviewSubmitted(false);
      setNewReview({ name: "", rating: 5, comment: "" });
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50 font-sans overflow-x-hidden">
      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer backdrop-blur-sm"
          onClick={() => setLightboxImage(null)}
        >
          <img src={lightboxImage} className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" alt="Enlarged" />
        </div>
      )}

      <Navbar />

      {/* Breadcrumbs */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-5">
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
          <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => setLocation("/")}>Home</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => setLocation(`/state/${listing.stateCode}`)}>{listing.stateName} Tourism</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 font-medium">{listing.title}</span>
        </div>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 space-y-8">
        
        {/* ==========================================
            HERO GALLERY BANNER
            ========================================== */}
        <section className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 h-auto lg:h-[450px]">
          {/* Main Large Image */}
          <div className="lg:col-span-8 h-[250px] sm:h-[350px] lg:h-full relative overflow-hidden group">
            <img 
              src={listing.image} 
              alt={listing.title} 
              onClick={() => setLightboxImage(listing.image)}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 cursor-pointer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
            
            {/* Overlay Info */}
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="bg-primary text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-md">
                {(listing as any).category || ((listing as any).type === "Hotel" ? "Hotels" : "Restaurants")}
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-2">
                {listing.title}
                <span title="Verified Listing">
                  <ShieldCheck className="w-6 h-6 text-green-400 fill-green-400/20 flex-shrink-0" />
                </span>
              </h1>
              <div className="flex items-center gap-3 text-sm flex-wrap">
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold">{listing.rating}</span>
                </div>
                <span className="font-semibold text-gray-200">({listing.reviews} Verified Reviews)</span>
                <span className="text-gray-300">•</span>
                <span className="flex items-center gap-1 text-gray-200">
                  <MapPin className="w-3.5 h-3.5" />
                  {listing.locality}
                </span>
              </div>
            </div>
          </div>

          {/* Secondary Collage/Grid Images */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-2 p-2 bg-slate-50 h-[120px] lg:h-full">
            {[0, 1, 2, 3].map(i => {
              const allItems = apiMenus.length > 0 ? apiMenus.flatMap(c => c.categories).flatMap(c => c.items) : [];
              const imgSrc = allItems[i] ? allItems[i].image : (
                i === 0 ? "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=400&q=80" :
                i === 1 ? "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=80" :
                i === 2 ? "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80" :
                "https://images.unsplash.com/photo-1582878826629-29b7ad1cb438?auto=format&fit=crop&w=400&q=80"
              );
              return (
                <div key={i} className="rounded-2xl overflow-hidden relative group cursor-pointer" onClick={() => setLightboxImage(imgSrc)}>
                  <img 
                    src={imgSrc} 
                    alt={`Gallery ${i}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {i === 3 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-xs hover:bg-black/50 transition-colors">
                      <Image className="w-4 h-4 mr-1.5" />
                      View Gallery
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>


        {/* ==========================================
            QUICK ACTION BUTTONS
            ========================================== */}
        <section className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <a 
              href="tel:+919999999999" 
              className="bg-primary hover:bg-primary/95 text-white font-bold text-sm px-5 py-3 rounded-2xl shadow-sm hover:shadow transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
            <a 
              href="https://wa.me/919999999999" 
              target="_blank" rel="noreferrer"
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm px-5 py-3 rounded-2xl shadow-sm hover:shadow transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              WhatsApp
            </a>
            <button 
              className="bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold text-sm px-5 py-3 rounded-2xl shadow-sm transition-all flex items-center gap-2"
              onClick={() => alert("Claim request sent!")}
            >
              <ShieldCheck className="w-4 h-4" />
              Claim this Business
            </button>
            <button 
              onClick={() => setActiveTab("reviews")}
              className="bg-slate-50 border border-gray-100 hover:bg-slate-100 text-gray-700 font-bold text-sm px-5 py-3 rounded-2xl transition-all flex items-center gap-2"
            >
              <Star className="w-4 h-4 text-yellow-500" />
              Write a Review
            </button>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
              }}
              className="bg-slate-50 border border-gray-100 hover:bg-slate-100 text-gray-700 font-bold text-sm px-5 py-3 rounded-2xl transition-all flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 bg-slate-50 border border-gray-100 px-4 py-2.5 rounded-2xl">
            <Clock className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-bold">{listing.timing || "Open 24 Hours"}</span>
          </div>
        </section>


        {/* ==========================================
            MAIN CONTENT & SIDEBAR
            ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Overview, Details, Reviews */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Tabs Selector */}
            <div className="flex border-b border-gray-200 gap-6">
              <button 
                onClick={() => setActiveTab("overview")}
                className={`pb-3 font-extrabold text-sm border-b-2 transition-all ${
                  activeTab === "overview" ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab("photos")}
                className={`pb-3 font-extrabold text-sm border-b-2 transition-all ${
                  activeTab === "photos" ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                Photos ({(listing as any).gallery ? (listing as any).gallery.length : 3})
              </button>
              <button 
                onClick={() => setActiveTab("reviews")}
                className={`pb-3 font-extrabold text-sm border-b-2 transition-all ${
                  activeTab === "reviews" ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                Reviews ({reviewsList.length})
              </button>
              {apiMenus.length > 0 && (
                <button 
                  onClick={() => setActiveTab("menu")}
                  className={`pb-3 font-extrabold text-sm border-b-2 transition-all ${
                    activeTab === "menu" ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Menu Highlights
                </button>
              )}
            </div>

            {/* TAB CONTENTS */}
            {activeTab === "overview" && (
              <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">About {listing.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {listing.details}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h3 className="text-base font-bold text-gray-900 mb-3">Important Information</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {listing.additionalInfo?.map((info, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-start gap-2.5 bg-slate-50 border border-gray-100/50 p-3 rounded-xl">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{info}</span>
                      </li>
                    )) || (
                      <li className="text-xs text-gray-600 flex items-start gap-2.5 bg-slate-50 border border-gray-100/50 p-3 rounded-xl">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>Highly recommended local destination to visit.</span>
                      </li>
                    )}
                  </ul>
                </div>

                {apiMenus.length > 0 && (
                  <>
                    <div className="pt-6 border-t border-gray-100">
                      <h3 className="text-base font-bold text-gray-900 mb-3">Cuisines Offered</h3>
                      <div className="flex overflow-x-auto gap-4 pb-2 snap-x" style={{ scrollbarWidth: 'none' }}>
                        {apiMenus.map(cuisine => (
                          <div 
                            key={cuisine.id} 
                            onClick={() => setActiveTab("menu")}
                            className="min-w-[140px] bg-slate-50 border border-gray-100 rounded-2xl p-3 cursor-pointer hover:shadow-md transition-shadow snap-start flex flex-col items-center text-center gap-2"
                          >
                            <img src={cuisine.image} className="w-14 h-14 rounded-full object-cover" alt={cuisine.name} />
                            <span className="font-bold text-sm text-gray-800">{cuisine.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                      <h3 className="text-base font-bold text-gray-900 mb-3">Top Selling Items</h3>
                      <div className="flex overflow-x-auto gap-4 pb-2 snap-x" style={{ scrollbarWidth: 'none' }}>
                        {apiMenus.flatMap(c => c.categories).flatMap(c => c.items).slice(0, 5).map(item => (
                          <div 
                            key={item.id} 
                            onClick={() => setLightboxImage(item.image)}
                            className="min-w-[180px] w-[180px] bg-slate-50 border border-gray-100 rounded-2xl p-3 cursor-pointer hover:shadow-md transition-shadow snap-start flex flex-col gap-2"
                          >
                            <img src={item.image} className="w-full h-24 rounded-xl object-cover" alt={item.name} />
                            <div>
                              <h4 className="font-bold text-sm text-gray-900 truncate">{item.name}</h4>
                              <div className="font-black text-emerald-600 bg-emerald-50 w-fit px-2 py-0.5 rounded-md text-xs mt-1">₹{item.price}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === "photos" && (
              <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Photos Gallery</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {((listing as any).gallery || [listing.image]).map((imgUrl: string, i: number) => (
                    <div key={i} className="h-32 sm:h-40 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group relative">
                      <img src={imgUrl} alt={`${listing.title} ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                {/* Write a Review Section */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Write a Review</h3>
                  
                  {reviewSubmitted ? (
                    <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold rounded-2xl p-4 text-center">
                      Thank you! Your review has been submitted successfully.
                    </div>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div className="flex gap-4 items-center">
                        <span className="text-xs font-bold text-gray-500">Your Rating:</span>
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button 
                              key={star}
                              type="button"
                              onClick={() => setNewReview({ ...newReview, rating: star })}
                              className="focus:outline-none"
                            >
                              <Star className={`w-6 h-6 ${star <= newReview.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <input 
                          type="text" 
                          placeholder="Your Name"
                          value={newReview.name}
                          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                          className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary"
                          required
                        />
                        <textarea 
                          placeholder="Share your experience details..."
                          rows={4}
                          value={newReview.comment}
                          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                          className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary"
                          required
                        />
                      </div>

                      <button type="submit" className="bg-primary hover:bg-primary/95 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm">
                        Submit Review
                      </button>
                    </form>
                  )}
                </div>

                {/* Reviews List */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
                  <h3 className="text-lg font-bold text-gray-900">User Reviews</h3>
                  <div className="divide-y divide-gray-100 space-y-6">
                    {reviewsList.map((rev, i) => (
                      <div key={i} className={`pt-6 ${i === 0 ? "pt-0" : ""}`}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-slate-100 border border-gray-100 flex items-center justify-center font-bold text-xs text-gray-700">
                              {rev.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-gray-900">{rev.name}</h4>
                              <span className="text-[10px] text-gray-400 font-semibold">{rev.date}</span>
                            </div>
                          </div>

                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className={`w-3.5 h-3.5 ${s <= rev.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed font-medium">
                          {rev.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {activeTab === "menu" && (
              <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm space-y-8">
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Menu Highlights</h3>
                  <p className="text-sm text-gray-500">Explore the exquisite cuisines and dishes offered at {listing.title}.</p>
                </div>
                
                <div className="space-y-10">
                  {apiMenus.map(cuisine => (
                    <div key={cuisine.id} className="space-y-6">
                      <div className="flex items-center gap-4">
                        <img src={cuisine.image} alt={cuisine.name} className="w-12 h-12 rounded-full object-cover shadow-sm" />
                        <h4 className="text-lg font-bold text-gray-900 border-b-2 border-primary/20 pb-1">{cuisine.name} Cuisine</h4>
                      </div>
                      
                      <div className="space-y-8 pl-4 border-l-2 border-gray-100">
                        {cuisine.categories.map((cat: any) => (
                          <div key={cat.id} className="space-y-4">
                            <h5 className="font-bold text-gray-700 flex items-center gap-2">
                              <img src={cat.image} className="w-6 h-6 rounded-md object-cover" />
                              {cat.name}
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {cat.items.map((item: any) => (
                                <div key={item.id} className="bg-slate-50 border border-gray-100 rounded-2xl p-4 flex gap-4 hover:shadow-md transition-shadow">
                                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-gray-200" />
                                  <div className="flex-1 flex flex-col justify-center">
                                    <h6 className="font-bold text-sm text-gray-900">{item.name}</h6>
                                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                                    <div className="mt-2 font-black text-emerald-600 bg-emerald-50 w-fit px-2 py-0.5 rounded-md text-xs">
                                      ₹{item.price}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Inquiry / Booking Sidebar & Map Mockup */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Top Selling Product Card (Only for Restaurants) */}
            {listing.type === "Restaurant" && apiMenus.length > 0 && apiMenus[0].categories?.[0]?.items?.[0] && (
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-6 shadow-lg text-white space-y-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <span className="bg-black/20 text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded mb-2 inline-block">Top Selling</span>
                    <h3 className="text-xl font-black">{apiMenus[0].categories[0].items[0].name}</h3>
                  </div>
                  <div className="bg-white text-red-600 font-black text-sm px-2 py-1 rounded shadow-sm">
                    ₹{apiMenus[0].categories[0].items[0].price}
                  </div>
                </div>
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-inner h-32 border-2 border-white/20">
                  <img src={apiMenus[0].categories[0].items[0].image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Top Product" />
                </div>
                <p className="relative z-10 text-xs text-white/90 font-medium line-clamp-2">
                  {apiMenus[0].categories[0].items[0].description}
                </p>
                <button className="relative z-10 w-full bg-white hover:bg-gray-50 text-red-600 font-black text-sm py-3 rounded-xl shadow-sm transition-colors">
                  Order Now
                </button>
              </div>
            )}

            {/* Inquiry Widget Card */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-5">
              <div>
                <h3 className="text-base font-bold text-gray-900">Send Instant Inquiry</h3>
                <p className="text-xs text-gray-400 mt-1">Submit your details to get special packages and details.</p>
              </div>

              {inquirySubmitted ? (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold rounded-2xl p-6 text-center space-y-2">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <Send className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold">Inquiry Sent!</h4>
                  <p className="text-[10px] text-emerald-600/90 leading-tight">We have received your details and will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary"
                      required
                    />
                    <input 
                      type="tel" 
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary"
                      required
                    />
                    <div className="relative">
                      <input 
                        type="date" 
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary text-gray-500"
                        required
                      />
                    </div>
                    <textarea 
                      placeholder="Any specific questions or remarks?"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/95 text-white font-bold text-xs py-3 rounded-2xl shadow-sm flex items-center justify-center gap-1.5 transition-all"
                  >
                    Send Inquiry Detail
                  </button>
                </form>
              )}
            </div>

            {/* Map Preview Card */}
            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <Map className="w-4 h-4 text-primary" />
                Location &amp; Directions
              </h3>
              
              {/* Map visual mockup */}
              <div className="w-full h-44 rounded-2xl overflow-hidden relative border border-gray-100 shadow-inner bg-slate-100 flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />
                
                {/* Visual road/contour lines mockup */}
                <svg className="absolute inset-0 w-full h-full text-slate-200 stroke-current" fill="none">
                  <path d="M 0,20 Q 80,40 120,100 T 250,130" strokeWidth="6" />
                  <path d="M 50,0 Q 120,80 180,90 T 350,180" strokeWidth="4" />
                  <path d="M 0,150 C 150,120 200,60 300,0" strokeWidth="5" strokeDasharray="4,4" />
                </svg>

                {/* Location Marker */}
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-lg text-white animate-bounce">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="bg-slate-900/90 text-white font-bold text-[9px] px-2 py-0.5 rounded shadow-sm">
                    {listing.title}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-gray-400 block uppercase leading-none">ADDRESS</span>
                <p className="text-xs text-gray-600 font-semibold leading-relaxed">
                  {listing.address}
                </p>
              </div>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
