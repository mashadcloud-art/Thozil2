import React, { useState, useRef, useEffect, useMemo } from "react";
import { useLocation, Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { stateNames } from "@/lib/locationData";
import { 
  Star, MapPin, Clock, Search, ChevronDown, Check, Phone, MessageCircle, 
  Send, Flame, Bookmark, SlidersHorizontal, Target, Heart 
} from "lucide-react";

// The user's provided mock data (as a fallback)
const MOCK_RESULTS = [
  { id: 1, name: "Golden Fork Restaurant", category: "Multi-cuisine", rating: 4.8, reviews: 312, address: "MG Road, Kochi", area: "Saboo", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", timing: "Open until 11:00 PM", tags: ["Dine-in", "Delivery", "Takeaway"], priceRange: "₹₹₹", distance: "1.2 km" },
  { id: 2, name: "Saffron Spices", category: "North Indian", rating: 4.6, reviews: 189, address: "Vyttila Junction, Kochi", area: "Nubra", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80", timing: "Open until 8:00 PM", tags: ["Dine-in", "Takeaway"], priceRange: "₹₹", distance: "2.8 km" },
  { id: 3, name: "Malabar Kitchen", category: "Kerala Cuisine", rating: 4.9, reviews: 540, address: "Fort Kochi, Kochi", area: "Horzey", image: "https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=800&q=80", timing: "Open until 10:00 PM", tags: ["Dine-in", "Delivery"], priceRange: "₹₹", distance: "3.5 km" },
  { id: 4, name: "The Asian Wok", category: "Chinese", rating: 4.5, reviews: 210, address: "Infopark Road, Kakkanad", area: "Diskit", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80", timing: "Open until 10:30 PM", tags: ["Dine-in"], priceRange: "₹₹", distance: "4.1 km" },
  { id: 5, name: "Coastal Catch", category: "Seafood", rating: 4.7, reviews: 620, address: "Lulu Mall, Edappally", area: "Saboo", image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80", timing: "Open until 11:00 PM", tags: ["Dine-in", "Takeaway"], priceRange: "₹₹₹", distance: "5.5 km" },
  { id: 6, name: "Bake & Brew", category: "Cafe", rating: 4.6, reviews: 145, address: "Main Avenue, Panampilly", area: "Nubra", image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80", timing: "Open until 9:00 PM", tags: ["Cafe", "Desserts"], priceRange: "₹₹", distance: "2.0 km" },
];

const SORT_OPTIONS = ["Relevance", "Rating", "Popular", "Friends Rating", "Distance", "Price: Low to High", "Price: High to Low"];
const CUISINE_OPTIONS = ["Bengali", "Pure Veg", "Punjabi", "Tibetan", "Gujarati", "Biryani", "Buffet", "Chinese", "South Indian"];
const NEARBY_AREAS = ["Saboo", "Nubra", "Horzey", "Diskit", "Hunder", "Turtuk", "Chuglamsar", "Khalsi", "Panamik", "Spituk", "Thiksay", "Shey", "Alchi", "Shara", "Stok"];

// Design Tokens
const A  = "#E07526";
const AD = "#c45e1a";
const N  = "#0F1B2D";
const N2 = "#1A2B42";
const N3 = "#243650";

/* ── Floating dropdown rendered via portal-style fixed positioning ── */
function Dropdown({ id, active, setActive, trigger, children }: any) {
  const btnRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (active === id && btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + window.scrollY + 8, left: r.left + window.scrollX });
    }
  }, [active, id]);

  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <div ref={btnRef} onClick={() => setActive(active === id ? null : id)}>
        {trigger(active === id)}
      </div>
      {active === id && (
        <div style={{
          position: "fixed",
          top: pos.top,
          left: pos.left,
          zIndex: 99999,
          pointerEvents: "auto",
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

export default function SearchResults() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const query = searchParams.get("q") || "";
  const state = searchParams.get("state") || "KL";

  const [searchTerm, setSearchTerm] = useState(query);
  const [active, setActive] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState("Relevance");
  const [selectedCuisine, setSelectedCuisine] = useState("Bengali");
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [openNow, setOpenNow] = useState(false);
  const [hearts, setHearts] = useState<Record<string, boolean>>({});

  const [dbResults, setDbResults] = useState<any[]>([]);

  // Close dropdown on outside click
  useEffect(() => {
    const fn = (e: any) => {
      if (!e.target.closest("[data-dd]")) setActive(null);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  // Fetch actual data
  useEffect(() => {
    const stateNameMap: Record<string, string> = {
      KL: "kerala", TN: "tamil_nadu", RJ: "rajasthan", GA: "goa", KA: "karnataka", LA: "ladakh"
    };
    
    const apiStateKey = stateNameMap[state.toUpperCase()] || state.toLowerCase();
    
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
              id: `rest_${r.id}`,
              name: r.title,
              category: "Restaurants",
              rating: r.rating || 4.5,
              reviews: parseInt(r.reviews) || 45,
              address: `${r.locality || r.district || ""}, ${fetchedData.stateName || "Kerala"}`,
              area: r.locality || "Saboo", // Default to mock area if none
              image: r.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
              timing: "Open until 11:00 PM",
              tags: ["Dine-in", "Delivery"],
              priceRange: "₹₹",
              distance: "1.5 km",
              phone: r.phone
            });
          });
        }
        
        // Map hotels
        if (fetchedData.hotels) {
          fetchedData.hotels.forEach((h: any) => {
            items.push({
              id: `hotel_${h.id}`,
              name: h.title,
              category: "Hotels",
              rating: h.rating || 4.5,
              reviews: parseInt(h.reviews) || 28,
              address: `${h.locality || h.district || ""}, ${fetchedData.stateName || "Kerala"}`,
              area: h.locality || "Nubra",
              image: h.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
              timing: "24 Hours Check-in",
              tags: ["AC", "Free Wifi"],
              priceRange: h.price || "₹₹₹",
              distance: "2.0 km",
              phone: h.phone
            });
          });
        }

        setDbResults(items);
      })
      .catch(err => {
        console.warn("Failed to fetch search results from MongoDB:", err);
      });
  }, [state]);

  const filtered = useMemo(() => {
    const baseItems = dbResults.length > 0 ? dbResults : MOCK_RESULTS;
    return baseItems.filter(r => {
      const matchSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchArea = selectedArea ? r.area === selectedArea : true;
      return matchSearch && matchArea;
    });
  }, [dbResults, searchTerm, selectedArea]);

  /* ── screenshot-style filter pill ── */
  const filterBtnStyle = (isActive: boolean) => ({
    display: "flex", alignItems: "center", gap: 6,
    padding: "8px 12px", borderRadius: 4,
    fontSize: 14, fontWeight: 500,
    cursor: "pointer", whiteSpace: "nowrap" as const,
    background: "#fff",
    border: isActive ? "1px solid #0066cc" : "1px solid #d1d5db",
    color: isActive ? "#0066cc" : "#374151",
    transition: "all 0.15s ease",
  });

  const NearbyAreasBlock = () => (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #EAE6E0", padding: "16px 20px", marginTop: "14px" }}>
      <h3 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 14px", color: N, display: "flex", alignItems: "center", gap: 8 }}>
        <MapPin style={{ width: 18, height: 18, color: A }} /> Find Results near you
      </h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        <button 
          onClick={() => setSelectedArea(null)}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 24, fontSize: 13, fontWeight: 600, background: selectedArea === null ? "#e8f0fe" : "#fff", color: selectedArea === null ? "#0066cc" : "#374151", border: selectedArea === null ? "1px solid #cce0ff" : "1px solid #d1d5db", cursor: "pointer", whiteSpace: "nowrap" }}
        >
          <Target style={{ width: 14, height: 14 }} /> Use Precise Location
        </button>
        {NEARBY_AREAS.map(area => {
          const isActive = selectedArea === area;
          return (
            <button key={area} 
              onClick={() => setSelectedArea(area)}
              style={{ padding: "8px 18px", borderRadius: 24, fontSize: 13, fontWeight: 500, background: isActive ? "#0066cc" : "#fff", color: isActive ? "#fff" : "#374151", border: isActive ? "1px solid #0066cc" : "1px solid #d1d5db", cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s" }}
            >
              {area}
            </button>
          )
        })}
      </div>
    </div>
  );

  return (
    <div data-dd style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#F5F3F0", fontFamily: "'Inter', system-ui, -apple-system, sans-serif", color: N, WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale" }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          * {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
          }
        `}
      </style>

      {/* Preserve Thozil Navbar */}
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* ══ HEADER ══ */}
        <div style={{ 
          background: `linear-gradient(to right, rgba(15, 27, 45, 0.85), rgba(15, 27, 45, 0.4)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          overflow: "hidden"
        }}>
          <div style={{ maxWidth: 920, margin: "0 auto", padding: "48px 24px 40px", position: "relative", zIndex: 10 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <span style={{ background:A, borderRadius:5, padding:"2px 9px", fontSize:10, fontWeight:800, color:"#fff", letterSpacing:"0.1em", textTransform:"uppercase" }}>
                {stateNames[state] || state}
              </span>
              <span style={{ color:"#4A6280", fontSize:13 }}>/</span>
              <span style={{ color:"#7A90A8", fontSize:13, fontWeight:500 }}>Search</span>
            </div>
            <h1 style={{ color:"#fff", fontSize:28, fontWeight:800, margin:"0 0 18px", letterSpacing:"-0.02em" }}>
              {(query || "").toLowerCase() === "restaurants" ? "Discover the best local dining & food" : "Find what you're looking for"}
            </h1>
            <div style={{ position:"relative", maxWidth:540 }}>
              <Search style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", color:"#5A7A9A", width:17, height:17 }} />
              <input type="text" placeholder="Search restaurants, doctors, services…" value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ width:"100%", boxSizing:"border-box", paddingLeft:42, paddingRight:16, paddingTop:12, paddingBottom:12, background: "rgba(26, 43, 66, 0.6)", backdropFilter: "blur(12px)", border:`1px solid rgba(255,255,255,0.1)`, borderRadius:11, color:"#fff", fontSize:14, outline:"none", transition: "border-color 0.2s" }}
                onFocus={(e: any) => e.target.style.borderColor = A}
                onBlur={(e: any)  => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
              />
            </div>
          </div>
        </div>

        {/* ── FILTER BAR ── */}
          <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "12px 0" }} data-dd>
            <div style={{ maxWidth:920, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>

              {/* SORT */}
              <Dropdown id="sort" active={active} setActive={setActive}
                trigger={(on: boolean) => (
                  <button data-dd style={filterBtnStyle(on)}>
                    Sort by
                    <ChevronDown style={{ width:14, height:14, transform: on ? "rotate(180deg)" : "none", transition:"transform .2s" }} />
                  </button>
                )}
              >
                <div data-dd style={{ width: 200, background: "#fff", border: "1px solid #0066cc", borderRadius: 4, overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", paddingBottom: 8 }}>
                  <div style={{ padding: "4px 0" }}>
                    {SORT_OPTIONS.map((opt) => {
                      const sel = selectedSort === opt;
                      return (
                        <button key={opt} data-dd
                          onClick={() => { setSelectedSort(opt); setActive(null); }}
                          style={{ width:"100%", textAlign:"left", padding:"10px 16px", border:"none", cursor:"pointer", background: "transparent", display:"flex", alignItems:"center", justifyContent:"space-between" }}
                          onMouseEnter={(e: any) => { e.currentTarget.style.background="#f3f4f6"; }}
                          onMouseLeave={(e: any) => { e.currentTarget.style.background="transparent"; }}
                        >
                          <span style={{ fontSize: 14, color: "#374151" }}>{opt}</span>
                          {sel && <div style={{ width:20, height:20, borderRadius:"50%", background:"#7aaaf0", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Check style={{ width:12, height:12, color:"#fff", strokeWidth: 3 }} /></div>}
                        </button>
                      );
                    })}
                  </div>
                  <div style={{ padding: "4px 12px" }}>
                    <button onClick={() => setActive(null)} style={{ width: "100%", padding: "8px", borderRadius: 4, border: "1px solid #0066cc", color: "#0066cc", background: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer", textAlign: "center" }}>
                      Close
                    </button>
                  </div>
                </div>
              </Dropdown>

              {/* CUISINE */}
              <Dropdown id="cuisine" active={active} setActive={setActive}
                trigger={(on: boolean) => (
                  <button data-dd style={filterBtnStyle(on)}>
                    <span style={{ color: "#0066cc", fontWeight: 600 }}>{selectedCuisine}</span>
                    <ChevronDown style={{ width:14, height:14, transform: on ? "rotate(180deg)" : "none", transition:"transform .2s" }} />
                  </button>
                )}
              >
                <div data-dd style={{ width: 200, background: "#fff", border: "1px solid #0066cc", borderRadius: 4, overflow: "hidden", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", paddingBottom: 8 }}>
                  <div style={{ padding: "4px 0", maxHeight: 300, overflowY: "auto" }}>
                    {CUISINE_OPTIONS.map((opt) => {
                      const sel = selectedCuisine === opt;
                      return (
                        <button key={opt} data-dd
                          onClick={() => { setSelectedCuisine(opt); setActive(null); }}
                          style={{ width:"100%", textAlign:"left", padding:"10px 16px", border:"none", cursor:"pointer", background: "transparent", display:"flex", alignItems:"center", justifyContent:"space-between" }}
                          onMouseEnter={(e: any) => { e.currentTarget.style.background="#f3f4f6"; }}
                          onMouseLeave={(e: any) => { e.currentTarget.style.background="transparent"; }}
                        >
                          <span style={{ fontSize: 14, color: "#374151" }}>{opt}</span>
                          {sel && <div style={{ width:20, height:20, borderRadius:"50%", background:"#7aaaf0", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Check style={{ width:12, height:12, color:"#fff", strokeWidth: 3 }} /></div>}
                        </button>
                      );
                    })}
                  </div>
                  <div style={{ padding: "4px 12px" }}>
                    <button onClick={() => setActive(null)} style={{ width: "100%", padding: "8px", borderRadius: 4, border: "1px solid #0066cc", color: "#0066cc", background: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer", textAlign: "center" }}>
                      Close
                    </button>
                  </div>
                </div>
              </Dropdown>

              {/* STATIC BUTTONS */}
              <button onClick={() => setOpenNow(!openNow)} style={filterBtnStyle(openNow)}>
                Open Now
              </button>
              
              <button style={filterBtnStyle(false)}>
                Ratings <ChevronDown style={{ width:14, height:14 }} />
              </button>

              <button style={{ ...filterBtnStyle(false), marginLeft: "auto", border: "none" }}>
                <SlidersHorizontal style={{ width:16, height:16 }} /> All Filters
              </button>
            </div>
          </div>

        {/* ══ RESULTS ══ */}
        <div style={{ maxWidth:920, margin:"0 auto", padding:"24px 24px" }}>
          <p style={{ fontSize:12, color:"#9A8E84", marginBottom:18, fontWeight:500 }}>
            {filtered.length} places {selectedArea ? `in ${selectedArea}` : ''} · sorted by <span style={{ color:AD, fontWeight:700 }}>{selectedSort}</span>
          </p>

          {filtered.length === 0 && (
            <div style={{ padding: "40px", textAlign: "center", background: "#fff", borderRadius: 16 }}>
              <h3 style={{ color: N, fontSize: 18, fontWeight: 700 }}>No results found</h3>
              <p style={{ color: "#7A90A8", marginTop: 8 }}>Try selecting a different location or adjusting your filters.</p>
            </div>
          )}

          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {filtered.map((item, idx) => (
              <React.Fragment key={item.id}>
                <div 
                  style={{ background:"#fff", borderRadius:18, border:"1px solid #EAE6E0", display:"flex", padding: 16, gap: 20, transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={(e: any) => { e.currentTarget.style.boxShadow="0 8px 36px rgba(15,27,45,0.11)"; e.currentTarget.style.transform="translateY(-1px)"; }}
                  onMouseLeave={(e: any) => { e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="none"; }}
                >
                  {/* Fixed Image Container */}
                  <div style={{ position:"relative", flexShrink:0, width:220, height:220, borderRadius:14, overflow:"hidden" }}>
                    <Link href={`/listing/${item.id.replace('rest_', '').replace('hotel_', '')}`}>
                      <img src={item.image} alt={item.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", cursor:"pointer" }} />
                    </Link>
                    {idx===0 && !selectedArea && (
                      <div style={{ position:"absolute", top:12, left:12, background:A, color:"#fff", fontSize:10, fontWeight:800, padding:"4px 9px", borderRadius:6, letterSpacing:"0.07em", textTransform:"uppercase", display:"flex", alignItems:"center", gap:4 }}>
                        <Flame style={{ width:10, height:10 }} /> Top pick
                      </div>
                    )}
                    <button onClick={() => setHearts(h => ({ ...h, [item.id]: !h[item.id] }))}
                      style={{ position:"absolute", bottom:12, right:12, width:32, height:32, borderRadius:"50%", background:"rgba(15,27,45,0.5)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <Heart style={{ width:14, height:14, color: hearts[item.id] ? "#FF6B6B" : "#fff", fill: hearts[item.id] ? "#FF6B6B" : "none" }} />
                    </button>
                  </div>

                  <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"space-between", padding: "4px 0" }}>
                    <div>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                        <div>
                          <span style={{ fontSize:10, fontWeight:800, color:"#A8967E", letterSpacing:"0.08em", textTransform:"uppercase" }}>{item.category}</span>
                          <h2 style={{ fontSize:18, fontWeight:800, margin:"2px 0 0", color:N, letterSpacing:"-0.01em", lineHeight:1.2 }}>
                            <Link href={`/listing/${item.id.replace('rest_', '').replace('hotel_', '')}`} style={{ color: "inherit", textDecoration: "none" }}>
                              {item.name}
                            </Link>
                          </h2>
                        </div>
                        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", background:N, borderRadius:10, padding:"7px 11px", flexShrink:0, marginLeft:12 }}>
                          <span style={{ fontSize:16, fontWeight:800, color:"#fff", lineHeight:1 }}>{item.rating}</span>
                          <div style={{ display:"flex", gap:1, margin:"4px 0 2px" }}>
                            {[1,2,3,4,5].map(s => <Star key={s} style={{ width:8, height:8, fill: s<=Math.round(item.rating) ? A : "#2A3F52", color:"transparent" }} />)}
                          </div>
                          <span style={{ fontSize:10, color:"#4A6A8A", fontWeight:500 }}>{item.reviews}</span>
                        </div>
                      </div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginTop:8 }}>
                        <span style={{ display:"flex", alignItems:"center", gap:4, fontSize:12, color:"#7A7068" }}><MapPin style={{ width:12, height:12, color:A }} />{item.address}</span>
                        <span style={{ display:"flex", alignItems:"center", gap:4, fontSize:12, color:"#7A7068" }}><Clock style={{ width:12, height:12 }} />{item.timing}</span>
                        <span style={{ fontSize:12, color:"#7A7068" }}>{item.distance} away</span>
                        <span style={{ fontSize:12, color:"#7A7068", fontWeight:700 }}>{item.priceRange}</span>
                      </div>
                      <div style={{ display:"flex", gap:5, marginTop:11 }}>
                        {item.tags.map((tag: string) => (
                          <span key={tag} style={{ fontSize:11, fontWeight:600, padding:"3px 9px", borderRadius:5, background:"#F0EDE8", color:"#6A6058" }}>{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display:"flex", gap:8, marginTop:16 }}>
                      <a href={`tel:${item.phone || "+919902900900"}`} style={{ display:"flex", alignItems:"center", gap:6, padding:"9px 16px", borderRadius:9, fontSize:13, fontWeight:700, background:N, color:"#fff", border:"none", cursor:"pointer", textDecoration: "none" }}>
                        <Phone style={{ width:13, height:13 }} /> Call
                      </a>
                      <a href={`https://wa.me/919902900900`} target="_blank" rel="noreferrer" style={{ display:"flex", alignItems:"center", gap:6, padding:"9px 16px", borderRadius:9, fontSize:13, fontWeight:700, background:"#25D366", color:"#fff", border:"none", cursor:"pointer", textDecoration: "none" }}>
                        <MessageCircle style={{ width:13, height:13 }} /> WhatsApp
                      </a>
                      <button style={{ display:"flex", alignItems:"center", gap:6, padding:"9px 16px", borderRadius:9, fontSize:13, fontWeight:700, background:"#fff", color:N, border:"1.5px solid #DDD8D0", cursor:"pointer" }}>
                        <Send style={{ width:12, height:12 }} /> Enquire
                      </button>
                      <button style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:6, padding:"9px 14px", borderRadius:9, fontSize:12, fontWeight:600, background:"#F5F3F0", color:"#8A7E72", border:"1px solid #E8E4DE", cursor:"pointer" }}>
                        <Bookmark style={{ width:13, height:13 }} /> Save
                      </button>
                    </div>
                  </div>
                </div>

                {/* Render Nearby Areas block dynamically after the 4th result */}
                {idx === 3 && <NearbyAreasBlock />}
              </React.Fragment>
            ))}
            
            {/* Fallback to show Nearby Areas at the bottom if we have fewer than 4 results */}
            {filtered.length <= 3 && filtered.length > 0 && <NearbyAreasBlock />}
          </div>
        </div>
      </main>

      {/* Preserve Thozil Footer */}
      <Footer />
    </div>
  );
}
