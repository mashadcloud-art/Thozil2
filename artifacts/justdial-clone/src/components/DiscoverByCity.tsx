import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { MapPin, Landmark } from "lucide-react";
import { districtsData, stateNames } from "@/lib/locationData";

// Curated pool of high-quality verified active location images (no broken links)
const locationImages = [
  "https://images.unsplash.com/photo-1596422846543-75c6fc18a52b?w=300&h=300&fit=crop", // Kerala houseboat
  "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300&h=300&fit=crop", // Chennai temple
  "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=300&h=300&fit=crop", // Bangalore green
  "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=300&h=300&fit=crop", // Mumbai gateway
  "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=300&h=300&fit=crop", // Delhi tomb
  "https://images.unsplash.com/photo-1608958415715-fae26c04f9d0?w=300&h=300&fit=crop", // Kochi fort
  "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&h=300&fit=crop", // Kochi backwaters
  "https://images.unsplash.com/photo-1590050752117-238cb0612b1b?w=300&h=300&fit=crop", // Kolkata howrah
  "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=300&h=300&fit=crop", // Jaipur palace
  "https://images.unsplash.com/photo-1506461883276-594a12b11db3?w=300&h=300&fit=crop"  // Indian temple
];

const cities = [
  { name: "Kochi", state: "KL", district: "Ernakulam", img: locationImages[0] },
  { name: "Chennai", state: "TN", district: "Chennai", img: locationImages[1] },
  { name: "Bangalore", state: "KA", district: "Bengaluru Urban", img: locationImages[2] },
  { name: "Mumbai", state: "MH", district: "Mumbai", img: locationImages[3] },
  { name: "Delhi", state: "DL", district: "New Delhi", img: locationImages[4] },
  { name: "Hyderabad", state: "TS", district: "Hyderabad", img: locationImages[5] },
  { name: "Pune", state: "MH", district: "Pune", img: locationImages[6] },
  { name: "Kolkata", state: "WB", district: "Kolkata", img: locationImages[7] },
  { name: "Jaipur", state: "RJ", district: "Jaipur", img: locationImages[8] },
  { name: "Thiruvananthapuram", state: "KL", district: "Thiruvananthapuram", img: locationImages[9] },
  { name: "Coimbatore", state: "TN", district: "Coimbatore", img: locationImages[1] },
  { name: "Thrissur", state: "KL", district: "Thrissur", img: locationImages[9] }
];

// Dynamically generate all 34 states
const states = Object.entries(stateNames).map(([code, name], idx) => ({
  name,
  code,
  img: locationImages[idx % locationImages.length]
}));

// Dynamically generate all districts from the database mapping (hundreds of districts!)
const districts: { name: string; state: string; img: string }[] = [];
Object.entries(districtsData).forEach(([stateCode, list]) => {
  list.forEach((districtName, index) => {
    districts.push({
      name: districtName,
      state: stateCode,
      img: locationImages[(index + stateCode.charCodeAt(0)) % locationImages.length]
    });
  });
});


// Helper component to render a fallback brand gradient if image fails to load
function LocationImage({ item }: { item: any }) {
  const [hasError, setHasError] = useState(false);
  const initials = item.name.substring(0, 2).toUpperCase();

  const getGradient = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
      "from-orange-500 to-amber-500",
      "from-rose-500 to-red-500",
      "from-teal-500 to-emerald-500",
      "from-sky-500 to-blue-500",
      "from-indigo-500 to-purple-500",
      "from-violet-500 to-fuchsia-500",
      "from-cyan-500 to-blue-500",
      "from-emerald-500 to-teal-500"
    ];
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md border-2 border-transparent group-hover:border-primary transition-all duration-300 relative flex items-center justify-center bg-slate-100 flex-shrink-0">
      {hasError ? (
        <div className={`w-full h-full bg-gradient-to-tr ${getGradient(item.name)} flex items-center justify-center text-white font-extrabold text-[15px] uppercase tracking-wider`}>
          {initials}
        </div>
      ) : (
        <img
          src={item.img}
          alt={item.name}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400"
          loading="lazy"
        />
      )}
    </div>
  );
}

export default function DiscoverByCity() {
  const [currentPath, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"city" | "state" | "district">("city");

  // Read state from URL search params (default to KL / Kerala)
  const searchParams = new URLSearchParams(window.location.search);
  const selectedState = searchParams.get("state") || "KL";

  const handleCardClick = (item: any) => {
    if (activeTab === "city") {
      const params = new URLSearchParams();
      params.set("state", item.state);
      params.set("district", item.district);
      setLocation(`/search?${params.toString()}`);
    } else if (activeTab === "state") {
      // Update the URL state parameter on the homepage without navigating away
      const params = new URLSearchParams(window.location.search);
      params.set("state", item.code);
      params.delete("district"); // Clear district
      setLocation(`/?${params.toString()}`);
      
      // Auto-select the districts tab to show that state's districts
      setActiveTab("district");
    } else if (activeTab === "district") {
      const params = new URLSearchParams();
      params.set("state", item.state);
      params.set("district", item.name);
      setLocation(`/search?${params.toString()}`);
    }
  };


  // Filter districts dynamically based on selectedState from top search bar
  const filteredDistricts = districts.filter(d => d.state === selectedState);

  const currentList = activeTab === "city" 
    ? cities 
    : activeTab === "state" 
      ? states 
      : filteredDistricts;


  return (
    <section className="bg-white rounded-3xl border border-slate-100 p-6 md:p-8 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">Discover Local Listings</h2>
            <span className="bg-gradient-to-r from-[#FF6B2C] to-[#ff8f5e] text-white text-[9px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-widest shadow-sm">
              EXPLORE
            </span>
          </div>
          <p className="text-sm text-slate-500 font-medium">Find top-rated businesses, shops, and services near you</p>
        </div>

        {/* Beautified Tab switcher */}
        <div className="flex items-center bg-slate-100/90 backdrop-blur-xs rounded-xl p-1 shadow-inner border border-slate-200/50 self-start">
          <button
            onClick={() => setActiveTab("city")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-black tracking-wide transition-all duration-300 ${
              activeTab === "city" 
                ? "bg-gradient-to-r from-[#FF6B2C] to-[#ff8f5e] text-white shadow-md scale-[1.02]" 
                : "text-slate-600 hover:text-[#FF6B2C] hover:bg-slate-200/50"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            Cities
          </button>
          <button
            onClick={() => setActiveTab("state")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-black tracking-wide transition-all duration-300 ${
              activeTab === "state" 
                ? "bg-gradient-to-r from-[#FF6B2C] to-[#ff8f5e] text-white shadow-md scale-[1.02]" 
                : "text-slate-600 hover:text-[#FF6B2C] hover:bg-slate-200/50"
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            States
          </button>
          <button
            onClick={() => setActiveTab("district")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-black tracking-wide transition-all duration-300 ${
              activeTab === "district" 
                ? "bg-gradient-to-r from-[#FF6B2C] to-[#ff8f5e] text-white shadow-md scale-[1.02]" 
                : "text-slate-600 hover:text-[#FF6B2C] hover:bg-slate-200/50"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" fill="none" />
            Districts
          </button>
        </div>
      </div>

      <div
        className="flex flex-wrap gap-5 justify-start pb-4"
      >
        {currentList.map((item, i) => (
          <motion.div
            key={`${activeTab}-${i}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.02 }}
            whileHover={{ y: -4 }}
            onClick={() => handleCardClick(item)}
            className="w-[100px] flex-shrink-0 flex flex-col items-center gap-2.5 group cursor-pointer"
            data-testid={`discover-${activeTab}-${item.name.toLowerCase()}`}
          >
            <LocationImage item={item} />
            <div className="text-center w-full">
              <span className="text-[11px] font-bold text-gray-800 group-hover:text-primary transition-colors block uppercase tracking-wide truncate" title={item.name}>
                {item.name}
              </span>
              {"state" in item && activeTab !== "city" && (
                <span className="text-[9px] text-gray-400 block font-semibold uppercase tracking-wider">
                  State: {item.state}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
