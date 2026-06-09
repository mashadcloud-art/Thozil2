import { useState, useMemo } from "react";
import { ChevronRight, ArrowRight, X, Search, Sparkles } from "lucide-react";
import { useLocation } from "wouter";

const FLAVOUR_CATEGORIES = [
  {
    name: "Indian flavours", count: 142,
    img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
    subs: [
      { name: "Sea food",       count: 34, img: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=100&q=70" },
      { name: "Mughlai",        count: 28, img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=100&q=70" },
      { name: "Dhaba",          count: 19, img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=100&q=70" },
      { name: "Maharashtrian",  count: 15, img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=100&q=70" },
    ]
  },
  {
    name: "Kerala specials", count: 76,
    img: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&q=80",
    subs: [
      { name: "Sadya",          count: 22, img: "https://images.unsplash.com/photo-1630383249896-424e482df921?w=100&q=70" },
      { name: "Karimeen",       count: 18, img: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=100&q=70" },
      { name: "Appam & stew",   count: 14, img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=100&q=70" },
      { name: "Puttu & kadala", count: 11, img: "https://images.unsplash.com/photo-1567337710282-00832b415979?w=100&q=70" },
    ]
  },
  {
    name: "Biryani & kebabs", count: 98,
    img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80",
    subs: [
      { name: "Hyderabadi",     count: 31, img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=100&q=70" },
      { name: "Lucknowi",       count: 24, img: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=100&q=70" },
      { name: "Seekh kebab",    count: 20, img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=100&q=70" },
      { name: "Dum pukht",      count: 12, img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=100&q=70" },
    ]
  },
  {
    name: "Asian kitchen", count: 87,
    img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80",
    subs: [
      { name: "Chinese",        count: 38, img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=100&q=70" },
      { name: "Thai",           count: 22, img: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=100&q=70" },
      { name: "Japanese",       count: 17, img: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=100&q=70" },
      { name: "Korean",         count: 10, img: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=100&q=70" },
    ]
  },
  {
    name: "Bakery & cafe", count: 55,
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
    subs: [
      { name: "Pastries",       count: 21, img: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=100&q=70" },
      { name: "Sandwiches",     count: 16, img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=100&q=70" },
      { name: "Waffles",        count: 11, img: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=100&q=70" },
      { name: "Cold brew",      count:  7, img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=100&q=70" },
    ]
  },
  {
    name: "Healthy & veg", count: 63,
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    subs: [
      { name: "Pure veg",       count: 27, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=100&q=70" },
      { name: "Salads",         count: 18, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&q=70" },
      { name: "Juices",         count: 12, img: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=100&q=70" },
      { name: "Sattvic",        count:  6, img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=100&q=70" },
    ]
  },
];

const BRAND_COLOR = "#E07526";
const TEXT_DARK = "#0F1B2D";

export default function BrowseByFlavour({ stateKey }: { stateKey: string }) {
  const [, setLocation] = useLocation();
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [modalCategory, setModalCategory] = useState<any>(null);
  const [modalSearchTerm, setModalSearchTerm] = useState("");

  const filteredModalSubs = useMemo(() => {
    if (!modalCategory) return [];
    if (!modalSearchTerm) return modalCategory.subs;
    return modalCategory.subs.filter((s: any) => 
      s.name.toLowerCase().includes(modalSearchTerm.toLowerCase())
    );
  }, [modalCategory, modalSearchTerm]);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif", WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale" }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
          * { font-family: 'Inter', system-ui, -apple-system, sans-serif; box-sizing: border-box; }
          
          /* Flavour Card Animations */
          .flavour-card { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
          .flavour-card .hero-img { transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
          .flavour-card:hover .hero-img { transform: scale(1.08); }
          
          .sub-item { transition: all 0.2s ease; }
          .sub-item:hover { background: #F5F3F0; transform: translateX(4px); }
          .sub-item:hover .sub-arrow { color: ${BRAND_COLOR} !important; transform: translateX(2px); }
          .sub-arrow { transition: all 0.2s ease; }

          /* Custom Scrollbar for Modal */
          .custom-scroll::-webkit-scrollbar { width: 6px; }
          .custom-scroll::-webkit-scrollbar-track { background: transparent; }
          .custom-scroll::-webkit-scrollbar-thumb { background: #EAE6E0; border-radius: 10px; }
          .custom-scroll::-webkit-scrollbar-thumb:hover { background: #D1CDC7; }
        `}
      </style>

      <div>
        <div style={{ marginBottom: 32, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(224,117,38,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sparkles style={{ color: BRAND_COLOR, width: 20, height: 20 }} />
          </div>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: TEXT_DARK, margin: 0, letterSpacing: "-0.02em" }}>Browse by flavour</h2>
            <p style={{ fontSize: 14, color: "#7A90A8", margin: "4px 0 0", fontWeight: 500 }}>Discover curated tastes and top-rated spots near you</p>
          </div>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
          {FLAVOUR_CATEGORIES.map((cat, idx) => {
            const isActive = activeCard === idx;
            return (
              <div
                key={cat.name}
                className="flavour-card"
                onClick={() => setActiveCard(isActive ? null : idx)}
                style={{
                  background: "#fff",
                  border: `1px solid ${isActive ? BRAND_COLOR : "#EAE6E0"}`,
                  borderRadius: 20,
                  overflow: "hidden",
                  cursor: "pointer",
                  transform: isActive ? "translateY(-6px)" : "none",
                  boxShadow: isActive 
                    ? "0 20px 40px rgba(224,117,38,0.12), 0 1px 3px rgba(0,0,0,0.05)" 
                    : "0 4px 20px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02)"
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "rgba(224,117,38,0.4)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.06)";
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "#EAE6E0";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.03), 0 1px 3px rgba(0,0,0,0.02)";
                  }
                }}
              >
                <div style={{ position: "relative", height: 140, overflow: "hidden" }} onClick={(e) => { e.stopPropagation(); setLocation(`/${stateKey}/restaurants/${encodeURIComponent(cat.name.replace(/\s+/g, '-'))}`); }}>
                  <img src={cat.img} alt={cat.name} className="hero-img" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,27,45,0.85) 0%, rgba(15,27,45,0.2) 50%, rgba(255,255,255,0) 100%)" }} />
                  <div style={{ position: "absolute", bottom: 12, left: 16, right: 16, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                    <span style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.01em", textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>{cat.name}</span>
                  </div>
                  <span style={{ position: "absolute", top: 12, right: 12, background: "rgba(255,255,255,0.9)", color: TEXT_DARK, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>{cat.count} places</span>
                </div>

                <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
                  {cat.subs.map(s => (
                    <div key={s.name} className="sub-item" onClick={(e) => { e.stopPropagation(); setLocation(`/${stateKey}/restaurants/${encodeURIComponent(s.name.replace(/\s+/g, '-'))}`); }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 8px", borderRadius: 10 }}>
                      <img src={s.img} alt={s.name} style={{ width: 40, height: 40, borderRadius: 10, objectFit: "cover", flexShrink: 0, background: "#F5F3F0", border: "1px solid #EAE6E0" }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: TEXT_DARK, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.name}</div>
                        <div style={{ fontSize: 12, color: "#7A90A8", marginTop: 2, fontWeight: 500 }}>{s.count} places</div>
                      </div>
                      <ChevronRight className="sub-arrow" style={{ width: 16, height: 16, color: "#C4CFD8", flexShrink: 0 }} />
                    </div>
                  ))}
                </div>

                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalCategory(cat);
                    setModalSearchTerm("");
                  }}
                  style={{ margin: "4px 16px 16px", padding: "12px", borderRadius: 12, background: "rgba(224,117,38,0.06)", fontSize: 13, fontWeight: 700, color: BRAND_COLOR, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(224,117,38,0.12)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(224,117,38,0.06)"}
                >
                  Explore all {cat.name} <ArrowRight style={{ width: 14, height: 14 }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══ ENHANCED MODAL POPUP ══ */}
      {modalCategory && (
        <div 
          onClick={() => setModalCategory(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(15, 27, 45, 0.7)", backdropFilter: "blur(8px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#fff", borderRadius: 24, width: "100%", maxWidth: 440, maxHeight: "85vh", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.3)", animation: "modalIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.1)" }}
          >
            <style>
              {`
                @keyframes modalIn {
                  from { opacity: 0; transform: scale(0.9) translateY(20px); }
                  to { opacity: 1; transform: scale(1) translateY(0); }
                }
              `}
            </style>
            
            <div style={{ padding: "24px 24px 20px", borderBottom: "1px solid #EAE6E0", background: "#fff" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                <div onClick={(e) => { e.stopPropagation(); setLocation(`/${stateKey}/restaurants/${encodeURIComponent(modalCategory.name.replace(/\s+/g, '-'))}`); setModalCategory(null); }} style={{ cursor: "pointer" }}>
                  <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: TEXT_DARK, letterSpacing: "-0.01em", textDecoration: "underline" }}>{modalCategory.name}</h2>
                  <p style={{ margin: "4px 0 0", fontSize: 14, color: "#7A90A8", fontWeight: 500 }}>{modalCategory.count} amazing places to explore</p>
                </div>
                <button 
                  onClick={() => setModalCategory(null)}
                  style={{ width: 36, height: 36, borderRadius: 18, border: "none", background: "#F5F3F0", color: TEXT_DARK, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#EAE6E0"}
                  onMouseLeave={e => e.currentTarget.style.background = "#F5F3F0"}
                >
                  <X style={{ width: 18, height: 18 }} />
                </button>
              </div>
              
              {/* Modal Search Bar */}
              <div style={{ position: "relative" }}>
                <Search style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#A8967E", width: 18, height: 18 }} />
                <input 
                  type="text" 
                  placeholder={`Search in ${modalCategory.name}...`}
                  value={modalSearchTerm}
                  onChange={(e) => setModalSearchTerm(e.target.value)}
                  style={{ width: "100%", padding: "12px 16px 12px 42px", borderRadius: 12, border: "1px solid #EAE6E0", background: "#FDFCFB", fontSize: 14, color: TEXT_DARK, outline: "none", transition: "border-color 0.2s" }}
                  onFocus={e => e.target.style.borderColor = BRAND_COLOR}
                  onBlur={e => e.target.style.borderColor = "#EAE6E0"}
                />
              </div>
            </div>
            
            <div className="custom-scroll" style={{ padding: "16px 24px 24px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
              {filteredModalSubs.length > 0 ? (
                filteredModalSubs.map((s: any) => (
                  <div key={s.name} onClick={(e) => { e.stopPropagation(); setLocation(`/${stateKey}/restaurants/${encodeURIComponent(s.name.replace(/\s+/g, '-'))}`); setModalCategory(null); }} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px", borderRadius: 16, transition: "background 0.2s, transform 0.2s", cursor: "pointer", border: "1px solid transparent" }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "#FDFCFB";
                      e.currentTarget.style.borderColor = "#EAE6E0";
                      e.currentTarget.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "transparent";
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    <img src={s.img} alt={s.name} style={{ width: 56, height: 56, borderRadius: 12, objectFit: "cover", flexShrink: 0, background: "#F5F3F0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: TEXT_DARK, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.name}</div>
                      <div style={{ fontSize: 13, color: "#7A90A8", marginTop: 4, fontWeight: 500 }}>{s.count} highly-rated spots</div>
                    </div>
                    <div style={{ width: 32, height: 32, borderRadius: 16, background: "#F5F3F0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <ChevronRight style={{ width: 16, height: 16, color: BRAND_COLOR }} />
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: "32px 0", textAlign: "center", color: "#7A90A8" }}>
                  <Search style={{ width: 32, height: 32, margin: "0 auto 12px", opacity: 0.5 }} />
                  <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: TEXT_DARK }}>No flavours found</p>
                  <p style={{ margin: "4px 0 0", fontSize: 13 }}>Try searching for something else.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
