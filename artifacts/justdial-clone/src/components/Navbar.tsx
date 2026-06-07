import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { districtsData, stateNames } from "@/lib/locationData";


export default function Navbar() {
  const [currentPath, setLocation] = useLocation();
  
  // Parse query params for initialization and syncing
  const getParam = (key: string, fallback = "") => {
    const params = new URLSearchParams(window.location.search);
    return params.get(key) || fallback;
  };

  const [selectedState, setSelectedState] = useState(() => getParam("state", "KL"));
  const [selectedDistrict, setSelectedDistrict] = useState(() => getParam("district", ""));
  const [searchQuery, setSearchQuery] = useState(() => getParam("q", ""));
  
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [activeLocationTab, setActiveLocationTab] = useState<"state" | "district">("state");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync state with URL parameter changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSelectedState(params.get("state") || "KL");
    setSelectedDistrict(params.get("district") || "");
    setSearchQuery(params.get("q") || "");
  }, [currentPath, window.location.search]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLocationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (overrideParams?: { state?: string; district?: string }) => {
    const params = new URLSearchParams();
    
    // Determine the query
    if (searchQuery) params.set("q", searchQuery);
    
    // Determine the state
    const stateVal = overrideParams && "state" in overrideParams ? overrideParams.state : selectedState;
    if (stateVal) params.set("state", stateVal);
    
    // Determine the district
    const districtVal = overrideParams && "district" in overrideParams ? overrideParams.district : selectedDistrict;
    if (districtVal) params.set("district", districtVal);
    
    setLocation(`/search?${params.toString()}`);
  };

  const handleStateSelect = (code: string) => {
    setSelectedState(code);
    setSelectedDistrict("");
    // Switch to district selector tab so user can refine further
    setActiveLocationTab("district");
  };

  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district);
    setIsLocationOpen(false);
  };



  return (
    <>
      <style>{`
        .tw { font-family: 'Outfit', sans-serif; }
        .hdr { background: #fff; border-bottom: 1px solid #e5e5e5; padding: 0 16px; height: 62px; display: flex; align-items: center; gap: 12px; width: 100%; }
        .logo { display: flex; align-items: center; gap: 8px; text-decoration: none; flex-shrink: 0; }
        .lmark { width: 38px; height: 38px; background: #FF6B2C; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 20px; color: #fff; flex-shrink: 0; }
        .lname { font-size: 17px; font-weight: 700; color: #111; letter-spacing: -0.3px; line-height: 1; }
        .lsub { font-size: 9px; font-weight: 600; color: #bbb; letter-spacing: 1.3px; text-transform: uppercase; margin-top: 2px; }
        .search-bar { flex: 1; max-width: 800px; margin: 0 auto; display: flex; align-items: center; border: 1px solid #e2e8f0; border-radius: 10px; overflow: visible; background: #fff; height: 42px; transition: all .2s; min-width: 0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); position: relative; }
        .search-bar:focus-within { border-color: #FF6B2C; box-shadow: 0 0 0 3px rgba(255, 107, 44, 0.15); }
        .sf { display: flex; align-items: center; flex: 1; padding: 0 11px; height: 100%; border-right: 1px solid #ebebeb; min-width: 0; }
        .sf i { color: #FF6B2C; font-size: 15px; flex-shrink: 0; margin-right: 7px; }
        .sf input { border: none; outline: none; font-family: 'DM Sans', sans-serif; font-size: 13.5px; color: #222; background: transparent; width: 100%; min-width: 0; }
        .sf input::placeholder { color: #bbb; }
        .lf { display: flex; align-items: center; padding: 0 10px; height: 100%; gap: 4px; min-width: 0; flex-shrink: 0; position: relative; }
        .lf i.ti-map-pin { color: #FF6B2C; font-size: 15px; flex-shrink: 0; }
        .lf .sep { color: #ddd; font-size: 12px; flex-shrink: 0; }
        .sbtn { height: 42px; width: 44px; background: #FF6B2C; border: none; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border-top-right-radius: 8px; border-bottom-right-radius: 8px; transition: background .15s; }
        .sbtn:hover { background: #e55e24; }
        .sbtn i { font-size: 17px; }
        .actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .rbtn { height: 38px; padding: 0 12px; background: #fff7f4; border: 1.5px solid #ffd3be; border-radius: 9px; font-family: 'Outfit', sans-serif; font-size: 12.5px; font-weight: 600; color: #FF6B2C; cursor: pointer; display: flex; align-items: center; gap: 6px; position: relative; white-space: nowrap; transition: background .15s; flex-shrink: 0; text-align: left; }
        .rbtn:hover { background: #fff0e8; }
        .fbadge { position: absolute; top: -8px; right: -5px; background: #22C55E; color: #fff; font-size: 9px; font-weight: 700; padding: 2px 5px; border-radius: 100px; letter-spacing: .2px; }
        .rbtn-text { display: flex; flex-direction: column; line-height: 1.2; }
        .rbtn-title { font-size: 12.5px; font-weight: 600; }
        .rbtn-sub { font-size: 10px; color: #FF9A6C; font-weight: 400; }
        .lbtn { height: 38px; padding: 0 16px; background: #FF6B2C; border: none; border-radius: 9px; font-family: 'Outfit', sans-serif; font-size: 13px; font-weight: 600; color: #fff; cursor: pointer; white-space: nowrap; transition: background .15s; flex-shrink: 0; }
        .lbtn:hover { background: #e55e24; }
        .mbtn { width: 36px; height: 36px; border: 1.5px solid #e5e5e5; border-radius: 8px; background: #fff; display: none; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; }
        .mbtn i { font-size: 18px; color: #555; }

        /* Custom Scrollbar for Dropdowns */
        .custom-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #FF6B2C;
        }

        @media(max-width:900px){
          .lsub { display:none }
          .rbtn-sub { display:none }
          .rbtn-title { font-size: 12px }
        }
        @media(max-width:720px){
          .hdr { height:56px; padding:0 12px; gap:10px }
          .lname { font-size:15px }
          .lf .sep, .lf .custom-district-select-btn { display:none !important }
        }
        @media(max-width:560px){
          .rbtn .rbtn-text { display:none }
          .rbtn { width:36px; height:36px; padding:0; justify-content:center; border-radius:50% }
          .rbtn i { font-size:17px }
          .fbadge { top:-7px; right:-7px }
          .lbtn { padding:0 12px; font-size:12px }
        }
        @media(max-width:420px){
          .lmark { width:32px; height:32px; font-size:17px; border-radius:8px }
          .lname { font-size:14px }
          .sf input { font-size:12px }
          .hdr { gap:8px; padding:0 10px }
        }
      `}</style>

      <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="tw w-full max-w-[1600px] mx-auto">
          <h2 className="sr-only">Thozil.com header — search with state and district selector</h2>
          <div className="hdr">

            <a className="logo" href="#">
              <div className="lmark">T</div>
              <div>
                <div className="lname">Thozil<span style={{ color: "#FF6B2C" }}>.com</span></div>
                <div className="lsub">Local Directory</div>
              </div>
            </a>

            <div className="search-bar">
              <div className="sf">
                <i className="ti ti-search" aria-hidden="true"></i>
                <input
                  type="text"
                  placeholder="E.g. restaurants, plumber, doctor…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  data-testid="input-search-what"
                />
              </div>
              <div className="lf" ref={dropdownRef}>
                <i className="ti ti-map-pin" aria-hidden="true"></i>
                
                <div className="relative flex items-center gap-1.5">
                  {/* State selector button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (isLocationOpen && activeLocationTab === "state") {
                        setIsLocationOpen(false);
                      } else {
                        setIsLocationOpen(true);
                        setActiveLocationTab("state");
                      }
                    }}
                    className="flex items-center justify-between w-[130px] text-[13px] font-semibold text-gray-700 hover:text-primary transition-colors cursor-pointer outline-none select-none py-1.5 px-2 hover:bg-slate-50 rounded-lg text-left"
                    data-testid="select-state-btn"
                  >
                    <span className="truncate">{selectedState ? stateNames[selectedState] : "State"}</span>
                    <i className="ti ti-chevron-down text-gray-400 text-[10px] flex-shrink-0"></i>
                  </button>

                  <span className="sep">/</span>

                  {/* District selector button */}
                  <button
                    type="button"
                    disabled={!selectedState}
                    onClick={() => {
                      if (isLocationOpen && activeLocationTab === "district") {
                        setIsLocationOpen(false);
                      } else {
                        setIsLocationOpen(true);
                        setActiveLocationTab("district");
                      }
                    }}
                    className={`flex items-center justify-between w-[150px] text-[13px] font-semibold transition-colors cursor-pointer outline-none select-none py-1.5 px-2 hover:bg-slate-50 rounded-lg text-left ${
                      !selectedState ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:text-primary"
                    }`}
                    data-testid="select-district-btn"
                  >
                    <span className="truncate">{selectedDistrict || "District"}</span>
                    <i className="ti ti-chevron-down text-gray-400 text-[10px] flex-shrink-0"></i>
                  </button>
                </div>

                {/* Unified Dropdown Popup - showing one list at a time */}
                {isLocationOpen && (
                  <div className="absolute left-0 right-0 top-full mt-[0.5px] h-[220px] md:h-[260px] bg-white border border-[#FF6B2C] rounded-b-xl shadow-2xl z-50 flex flex-col overflow-hidden">
                    
                    {activeLocationTab === "state" ? (
                      /* States Menu */
                      <div className="w-full h-full overflow-y-auto custom-scroll py-1.5">
                        <div className="text-[10px] font-bold text-gray-400 px-3 py-1 bg-slate-50 sticky top-0 uppercase tracking-wider z-10">Select State</div>
                        {Object.entries(stateNames).map(([code, name]) => (
                          <button
                            key={code}
                            onClick={() => handleStateSelect(code)}
                            className={`w-full text-left px-3 py-2 text-[13px] transition-colors flex items-center justify-between ${
                              selectedState === code ? "bg-orange-50 text-primary font-semibold" : "text-gray-700 hover:bg-slate-50"
                            }`}
                          >
                            <span className="truncate">{name}</span>
                            {selectedState === code && <i className="ti ti-check text-[11px] text-primary"></i>}
                          </button>
                        ))}
                      </div>
                    ) : (
                      /* Districts Menu */
                      <div className="w-full h-full overflow-y-auto custom-scroll py-1.5 bg-slate-50">
                        <div className="text-[10px] font-bold text-gray-400 px-3 py-1 bg-slate-100 sticky top-0 uppercase tracking-wider z-10 flex items-center justify-between">
                          <span>Select District</span>
                          {selectedDistrict && (
                            <button
                              onClick={() => handleDistrictSelect("")}
                              className="text-[9px] text-gray-400 hover:text-primary normal-case font-medium"
                            >
                              Clear
                            </button>
                          )}
                        </div>
                        <button
                          onClick={() => handleDistrictSelect("")}
                          className={`w-full text-left px-3 py-2 text-[13px] text-gray-400 hover:bg-slate-200 transition-colors ${!selectedDistrict ? "font-bold text-gray-500" : ""}`}
                        >
                          All Districts
                        </button>
                        {selectedState && (districtsData[selectedState] || []).map((d) => (
                          <button
                            key={d}
                            onClick={() => handleDistrictSelect(d)}
                            className={`w-full text-left px-3 py-2 text-[13px] transition-colors flex items-center justify-between ${
                              selectedDistrict === d ? "bg-orange-100/50 text-primary font-semibold" : "text-gray-700 hover:bg-slate-200/50"
                            }`}
                          >
                            <span className="truncate">{d}</span>
                            {selectedDistrict === d && <i className="ti ti-check text-[11px] text-primary"></i>}
                          </button>
                        ))}
                      </div>
                    )}

                  </div>
                )}

              </div>
              <button className="sbtn" aria-label="Search" onClick={() => handleSearch()} data-testid="button-search">
                <i className="ti ti-search" aria-hidden="true"></i>
              </button>
            </div>

            <div className="actions">
              <button className="rbtn" aria-label="Register your Business" data-testid="button-register-business">
                <span className="fbadge">FREE</span>
                <i className="ti ti-building-store" aria-hidden="true" style={{ fontSize: "16px" }}></i>
                <div className="rbtn-text">
                  <span className="rbtn-title">Register your Business</span>
                  <span className="rbtn-sub">Boost Your Visibility Today!</span>
                </div>
              </button>
              <button className="lbtn" data-testid="button-login">Login / Sign Up</button>
            </div>

          </div>
        </div>
      </header>
    </>
  );
}

