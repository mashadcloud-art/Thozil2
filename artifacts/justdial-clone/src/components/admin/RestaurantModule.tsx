import { useState, useEffect } from "react";
import { 
  Edit, RefreshCw, Save, Utensils, Search, Plus, Trash2, ChevronRight, 
  MapPin, Star, Image as ImageIcon, CheckCircle, AlertCircle
} from "lucide-react";

export default function RestaurantModule() {
  const [data, setData] = useState<{ cuisines: any[], restaurants: any[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"restaurants" | "cuisines">("restaurants");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  // Selected entities for editing
  const [selectedRestaurantIndex, setSelectedRestaurantIndex] = useState<number | null>(null);
  const [selectedCuisineIndex, setSelectedCuisineIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/apiData.json")
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load apiData.json", err);
        setLoading(false);
      });
  }, []);

  const handleSave = () => {
    setSaving(true);
    setStatusMessage(null);
    // In a real app, this would POST to the backend. Here we simulate a save.
    setTimeout(() => {
      setSaving(false);
      setStatusMessage({ type: "success", text: "Restaurant database successfully updated!" });
      setTimeout(() => setStatusMessage(null), 3000);
    }, 800);
  };

  const updateRestaurant = (field: string, value: any) => {
    if (selectedRestaurantIndex === null || !data) return;
    const newData = { ...data };
    newData.restaurants[selectedRestaurantIndex][field] = value;
    setData(newData);
  };

  if (loading) {
    return (
      <div className="py-32 flex flex-col items-center justify-center space-y-4">
        <RefreshCw className="w-8 h-8 text-primary animate-spin" />
        <span className="text-sm font-semibold text-gray-500">Loading massive food dataset...</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="py-20 text-center text-red-500 font-bold">
        Failed to load database. Please ensure apiData.json is deployed.
      </div>
    );
  }

  const filteredRestaurants = data.restaurants.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedRestaurant = selectedRestaurantIndex !== null ? data.restaurants[selectedRestaurantIndex] : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
            <Utensils className="text-primary w-6 h-6" /> Restaurant & Menu Editor
          </h1>
          <p className="text-xs text-gray-500 mt-1">Manage {data.restaurants.length} restaurants and {data.cuisines.length} global cuisines.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-5 py-2 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow disabled:opacity-50 transition-all"
          >
            {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Save to Database
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className={`p-4 rounded-xl border flex items-start gap-3 shadow-sm ${
          statusMessage.type === "success" ? "bg-emerald-50 border-emerald-100 text-emerald-800" : "bg-red-50 border-red-100 text-red-800"
        }`}>
          {statusMessage.type === "success" ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
          <div>
            <span className="font-bold text-sm">{statusMessage.type === "success" ? "Success" : "Error"}</span>
            <p className="text-xs mt-0.5">{statusMessage.text}</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button 
          onClick={() => setActiveTab("restaurants")}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === "restaurants" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-800"}`}
        >
          District Restaurants
        </button>
        <button 
          onClick={() => setActiveTab("cuisines")}
          className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === "cuisines" ? "border-primary text-primary" : "border-transparent text-gray-500 hover:text-gray-800"}`}
        >
          Global Cuisines & Menus
        </button>
      </div>

      {activeTab === "restaurants" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List Sidebar */}
          <div className="lg:col-span-1 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col h-[600px]">
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search restaurants..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredRestaurants.map((rest, idx) => {
                const originalIndex = data.restaurants.findIndex(r => r.id === rest.id);
                const isSelected = selectedRestaurantIndex === originalIndex;
                return (
                  <div 
                    key={rest.id}
                    onClick={() => setSelectedRestaurantIndex(originalIndex)}
                    className={`p-3 rounded-xl cursor-pointer transition-all flex items-center gap-3 ${isSelected ? "bg-orange-50 border border-primary/20" : "hover:bg-slate-50 border border-transparent"}`}
                  >
                    <img src={rest.image} alt={rest.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className={`text-xs font-bold truncate ${isSelected ? "text-primary" : "text-gray-900"}`}>{rest.name}</h4>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-500">
                        <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" /> {rest.district}</span>
                        <span className="flex items-center gap-0.5 text-amber-500"><Star className="w-3 h-3 fill-current" /> {rest.rating}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Editor Form */}
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            {selectedRestaurant ? (
              <div className="space-y-6">
                <div className="flex justify-between items-start pb-4 border-b border-gray-100">
                  <h2 className="text-lg font-black text-gray-900">Edit Restaurant</h2>
                  <button className="text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>

                <div className="flex gap-6">
                  <div className="w-32 h-32 rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden relative group shrink-0">
                    <img src={selectedRestaurant.image} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <ImageIcon className="w-6 h-6 text-white mb-1" />
                      <span className="text-[10px] font-bold text-white uppercase">Change</span>
                    </div>
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-500 mb-1">Restaurant Name</label>
                      <input 
                        type="text" 
                        value={selectedRestaurant.name}
                        onChange={(e) => updateRestaurant("name", e.target.value)}
                        className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2 text-sm font-semibold focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">State</label>
                      <input 
                        type="text" 
                        value={selectedRestaurant.state}
                        disabled
                        className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3.5 py-2 text-sm text-gray-500 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">District</label>
                      <input 
                        type="text" 
                        value={selectedRestaurant.district}
                        onChange={(e) => updateRestaurant("district", e.target.value)}
                        className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Locality</label>
                      <input 
                        type="text" 
                        value={selectedRestaurant.locality}
                        onChange={(e) => updateRestaurant("locality", e.target.value)}
                        className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Rating</label>
                      <input 
                        type="number" 
                        step="0.1"
                        value={selectedRestaurant.rating}
                        onChange={(e) => updateRestaurant("rating", parseFloat(e.target.value))}
                        className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-500 mb-2">Cuisines Offered</label>
                      <div className="flex flex-wrap gap-2">
                        {data.cuisines.map(c => {
                          const isSelected = selectedRestaurant.cuisines.includes(c.name);
                          return (
                            <label key={c.id} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold cursor-pointer transition-colors ${isSelected ? "bg-orange-50 border-primary/30 text-primary" : "bg-white border-gray-200 text-gray-600 hover:bg-slate-50"}`}>
                              <input 
                                type="checkbox"
                                className="hidden"
                                checked={isSelected}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    updateRestaurant("cuisines", [...selectedRestaurant.cuisines, c.name]);
                                  } else {
                                    updateRestaurant("cuisines", selectedRestaurant.cuisines.filter((name: string) => name !== c.name));
                                  }
                                }}
                              />
                              {c.name}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-gray-500 mb-1">Linked Menu API Endpoint</label>
                      <input 
                        type="text" 
                        value={selectedRestaurant.menu}
                        disabled
                        className="w-full bg-gray-100 border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-500 cursor-not-allowed font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 text-gray-400">
                <Utensils className="w-12 h-12 mb-4 opacity-20" />
                <h3 className="text-lg font-bold text-gray-900 mb-1">Select a Restaurant</h3>
                <p className="text-sm">Choose a restaurant from the list to edit its details.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "cuisines" && (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-slate-50 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-black text-gray-900">Global Cuisines & Menu Hierarchy</h2>
              <p className="text-xs text-gray-500 mt-1">Manage root cuisines, food categories, and individual menu items globally.</p>
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all">
              <Plus className="w-3.5 h-3.5" /> Add Cuisine
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {data.cuisines.map((cuisine, cIdx) => (
              <div key={cuisine.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div 
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => setSelectedCuisineIndex(selectedCuisineIndex === cIdx ? null : cIdx)}
                >
                  <img 
                    src={cuisine.image} 
                    alt={cuisine.name} 
                    className="w-12 h-12 rounded-lg object-cover bg-gray-200 cursor-zoom-in hover:scale-105 transition-transform" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setEnlargedImage(cuisine.image);
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900">{cuisine.name}</h3>
                    <p className="text-xs text-gray-500">{cuisine.categories.length} Categories • {cuisine.categories.reduce((acc: number, cat: any) => acc + cat.items.length, 0)} Items</p>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${selectedCuisineIndex === cIdx ? "rotate-90" : ""}`} />
                </div>

                {selectedCuisineIndex === cIdx && (
                  <div className="mt-4 pl-16 pr-4 pb-2 space-y-4">
                    {cuisine.categories.map((cat: any) => (
                      <div key={cat.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
                          <h4 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                            <img 
                              src={cat.image} 
                              className="w-6 h-6 rounded object-cover cursor-zoom-in hover:scale-105 transition-transform" 
                              onClick={(e) => {
                                e.stopPropagation();
                                setEnlargedImage(cat.image);
                              }}
                            />
                            {cat.name}
                          </h4>
                          <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">{cat.items.length} items</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                          {cat.items.map((item: any) => (
                            <div key={item.id} className="flex gap-3 items-center bg-slate-50 p-2.5 rounded-lg border border-transparent hover:border-gray-200 transition-colors">
                              <img 
                                src={item.image} 
                                className="w-10 h-10 rounded-md object-cover cursor-zoom-in hover:scale-105 transition-transform" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEnlargedImage(item.image);
                                }}
                              />
                              <div className="flex-1 min-w-0">
                                <h5 className="text-xs font-bold text-gray-900 truncate">{item.name}</h5>
                                <div className="flex justify-between items-center mt-0.5">
                                  <span className="text-[10px] text-gray-500 truncate pr-2">{item.description}</span>
                                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">₹{item.price}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Lightbox Modal for Enlarge Image */}
      {enlargedImage && (
        <div 
          onClick={() => setEnlargedImage(null)}
          className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center p-4 cursor-zoom-out backdrop-blur-sm animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-white p-2 shadow-2xl animate-scale-up"
          >
            <img 
              src={enlargedImage} 
              className="max-w-full max-h-[80vh] object-contain rounded-2xl" 
              alt="Enlarged food" 
            />
            <button 
              onClick={() => setEnlargedImage(null)}
              className="absolute top-4 right-4 w-9 h-9 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center font-bold transition-all shadow-md"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
