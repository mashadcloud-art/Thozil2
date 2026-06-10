import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { tourismData } from "@/data/tourismData";
import { districtsData } from "@/lib/locationData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Save, Upload, Plus, Trash2, ArrowLeft, RefreshCw, CheckCircle, AlertCircle, Edit, FileText
} from "lucide-react";

interface UploadingState {
  fieldPath: string;
  index?: number;
  listName?: string;
}

export default function TourismModule() {
  const [, setLocation] = useLocation();
  const [selectedStateKey, setSelectedStateKey] = useState("KL");
  const [formState, setFormState] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<UploadingState | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  const stateKeys = ["KL", "TN", "RJ", "GA", "KA"];

  const stateNameMap: Record<string, string> = {
    KL: "kerala",
    TN: "tamil_nadu",
    RJ: "rajasthan",
    GA: "goa",
    KA: "karnataka"
  };

  // Fetch state data from server or fall back to static data
  useEffect(() => {
    setLoading(true);
    setStatusMessage(null);
    const apiStateKey = stateNameMap[selectedStateKey] || selectedStateKey.toLowerCase();
    
    fetch(`/api/api/v1/tourism?state=${apiStateKey}`)
      .then(res => {
        if (!res.ok) throw new Error("Not found in database");
        return res.json();
      })
      .then(data => {
        // Ensure arrays exist
        setFormState({
          ...data,
          stateKey: apiStateKey,
          gallery: data.gallery || ["", "", ""],
          attractions: data.attractions || [],
          hotels: data.hotels || [],
          restaurants: data.restaurants || [],
          didYouKnow: data.didYouKnow || ["", "", "", ""]
        });
        setLoading(false);
      })
      .catch(() => {
        // Fallback to static mock data
        const fallback = tourismData[selectedStateKey];
        if (fallback) {
          setFormState({
            stateKey: apiStateKey,
            stateName: fallback.stateName,
            city: fallback.city,
            alternativeCity: fallback.alternativeCity,
            tagline: fallback.tagline,
            about: fallback.about,
            weather: fallback.weather || { temp: "", condition: "", icon: "sun" },
            gallery: fallback.gallery || ["", "", ""],
            seasons: fallback.seasons || {
              peak: { months: "", title: "", temp: "", points: ["", "", "", ""] },
              moderate: { months: "", title: "", temp: "", points: ["", "", "", ""] },
              off: { months: "", title: "", temp: "", points: ["", "", "", ""] }
            },
            attractions: fallback.attractions || [],
            hotels: fallback.hotels || [],
            restaurants: fallback.restaurants || [],
            oneDayHustle: fallback.oneDayHustle || { tagline: "", steps: [] },
            didYouKnow: fallback.didYouKnow || ["", "", "", ""]
          });
        }
        setLoading(false);
      });
  }, [selectedStateKey]);

  const updateFormField = (value: any, path: string, index?: number, listName?: string) => {
    setFormState((prev: any) => {
      const updated = { ...prev };
      if (listName && typeof index === "number") {
        updated[listName] = [...updated[listName]];
        updated[listName][index] = { ...updated[listName][index], [path]: value };
      } else if (typeof index === "number") {
        // Array of primitives (like didYouKnow or gallery)
        updated[path] = [...updated[path]];
        updated[path][index] = value;
      } else if (path.includes(".")) {
        const parts = path.split(".");
        updated[parts[0]] = { ...updated[parts[0]], [parts[1]]: value };
      } else {
        updated[path] = value;
      }
      return updated;
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, path: string, index?: number, listName?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField({ fieldPath: path, index, listName });
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData
      });
      if (!res.ok) throw new Error("Upload failed");
      const result = await res.json();
      if (result.success && result.url) {
        updateFormField(result.url, path, index, listName);
      }
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: "error", text: "Image upload failed. Check file uploader size limits." });
    } finally {
      setUploadingField(null);
    }
  };

  const addListItem = (listName: string, defaultObject: any) => {
    setFormState((prev: any) => ({
      ...prev,
      [listName]: [...(prev[listName] || []), defaultObject]
    }));
  };

  const removeListItem = (listName: string, index: number) => {
    setFormState((prev: any) => ({
      ...prev,
      [listName]: prev[listName].filter((_: any, idx: number) => idx !== index)
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/api/v1/tourism", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState)
      });
      if (!res.ok) throw new Error("Save request failed");
      setStatusMessage({ type: "success", text: "State data successfully saved to MongoDB database!" });
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: "error", text: "Failed to save data. Please check server logs." });
    } finally {
      setSaving(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-gray-100 p-6 rounded-2xl shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <Edit className="text-primary w-6 h-6" /> State Tourism Editor
            </h1>
            <p className="text-xs text-gray-500 mt-1">Manage attractions, hotels, weather, and galleries in the database.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setLocation("/")}
              className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-xs font-bold text-gray-600 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </button>
            <button 
              onClick={handleSave}
              disabled={saving || loading}
              className="flex items-center gap-1.5 px-5 py-2 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-xl shadow-sm hover:shadow disabled:opacity-50 transition-all"
            >
              {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              Save to Database
            </button>
          </div>
        </div>

        {/* Status Messages */}
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Sidebar - State Selector */}
          <div className="lg:col-span-1 bg-white border border-gray-100 p-5 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-800 tracking-tight">Selected State</h3>
            <div className="flex flex-col gap-2">
              {stateKeys.map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedStateKey(key)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between border ${
                    selectedStateKey === key 
                      ? "bg-orange-50 border-primary/20 text-primary shadow-sm" 
                      : "bg-white border-gray-100 text-gray-600 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    {stateNameMap[key] ? stateNameMap[key].toUpperCase().replace("_", " ") : key}
                  </span>
                  <span className="text-[10px] text-gray-400">({key})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Editor Form */}
          <div className="lg:col-span-3 bg-white border border-gray-100 p-8 rounded-2xl shadow-sm space-y-8">
            {loading ? (
              <div className="py-20 flex flex-col items-center gap-3">
                <RefreshCw className="w-8 h-8 text-primary animate-spin" />
                <span className="text-xs text-gray-500 font-semibold">Loading state data...</span>
              </div>
            ) : formState && (
              <>
                {/* Basic Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-gray-900 pb-2 border-b border-gray-100">1. Basic Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">State Name</label>
                      <input 
                        type="text" 
                        value={formState.stateName || ""} 
                        onChange={(e) => updateFormField(e.target.value, "stateName")}
                        className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Primary City</label>
                      <input 
                        type="text" 
                        value={formState.city || ""} 
                        onChange={(e) => updateFormField(e.target.value, "city")}
                        className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Alternative City</label>
                      <input 
                        type="text" 
                        value={formState.alternativeCity || ""} 
                        onChange={(e) => updateFormField(e.target.value, "alternativeCity")}
                        className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Tagline</label>
                    <input 
                      type="text" 
                      value={formState.tagline || ""} 
                      onChange={(e) => updateFormField(e.target.value, "tagline")}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">About Description</label>
                    <textarea 
                      value={formState.about || ""} 
                      onChange={(e) => updateFormField(e.target.value, "about")}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-primary h-24 resize-none"
                    />
                  </div>
                </div>

                {/* Weather details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-gray-900 pb-2 border-b border-gray-100">2. Weather Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Temperature (e.g. 25 °C)</label>
                      <input 
                        type="text" 
                        value={formState.weather?.temp || ""} 
                        onChange={(e) => updateFormField(e.target.value, "weather.temp")}
                        className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Condition (e.g. Sunny)</label>
                      <input 
                        type="text" 
                        value={formState.weather?.condition || ""} 
                        onChange={(e) => updateFormField(e.target.value, "weather.condition")}
                        className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1">Icon (sun, cloud, cloud-rain, wind)</label>
                      <select 
                        value={formState.weather?.icon || "sun"} 
                        onChange={(e) => updateFormField(e.target.value, "weather.icon")}
                        className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-primary"
                      >
                        <option value="sun">Sun</option>
                        <option value="cloud">Cloud</option>
                        <option value="cloud-rain">Cloud Rain</option>
                        <option value="wind">Wind</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Photo Gallery Banner */}
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-gray-900 pb-2 border-b border-gray-100">3. Banner Photo Gallery</h3>
                  <div className="space-y-4">
                    {formState.gallery.map((url: string, idx: number) => (
                      <div key={idx} className="flex flex-col md:flex-row gap-3 items-end bg-slate-50 p-4 rounded-xl border border-gray-100">
                        <div className="flex-1 w-full">
                          <label className="block text-xs font-bold text-gray-500 mb-1">Image URL {idx + 1}</label>
                          <input 
                            type="text" 
                            value={url} 
                            onChange={(e) => updateFormField(e.target.value, "gallery", idx)}
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                          <label className="flex items-center justify-center gap-1.5 px-4 py-1.5 bg-white border border-gray-200 text-xs font-bold text-gray-600 rounded-lg cursor-pointer hover:bg-slate-50 w-full md:w-auto">
                            {uploadingField?.fieldPath === "gallery" && uploadingField?.index === idx ? (
                              <RefreshCw className="w-3.5 h-3.5 animate-spin text-primary" />
                            ) : (
                              <Upload className="w-3.5 h-3.5" />
                            )}
                            Upload File
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => handleFileUpload(e, "gallery", idx)}
                            />
                          </label>
                           {url && (
                            <img 
                              src={url} 
                              alt="Preview" 
                              className="w-10 h-10 object-cover rounded-lg border border-gray-200 cursor-zoom-in hover:scale-105 transition-transform" 
                              onClick={() => setEnlargedImage(url)}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attractions Editor */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <h3 className="text-lg font-black text-gray-900">4. Attractions &amp; Tourist Spots</h3>
                    <button 
                      onClick={() => addListItem("attractions", { id: `att_${Date.now()}`, title: "", locality: "", rating: 4.5, reviews: "1.2k", desc: "", timing: "", category: "Tourist Places", image: "" })}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Attraction
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    {formState.attractions.map((att: any, idx: number) => (
                      <div key={att.id || idx} className="bg-slate-50 border border-gray-100 p-6 rounded-2xl relative space-y-4">
                        <button 
                          onClick={() => removeListItem("attractions", idx)}
                          className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Attraction Title</label>
                            <input 
                              type="text" 
                              value={att.title || ""} 
                              onChange={(e) => updateFormField(e.target.value, "title", idx, "attractions")}
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Locality (e.g. Munnar Hills)</label>
                            <input 
                              type="text" 
                              value={att.locality || ""} 
                              onChange={(e) => updateFormField(e.target.value, "locality", idx, "attractions")}
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">District</label>
                            <select 
                              value={att.district || ""} 
                              onChange={(e) => updateFormField(e.target.value, "district", idx, "attractions")}
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                            >
                              <option value="">Select District</option>
                              {(districtsData[selectedStateKey] || []).map((d) => (
                                <option key={d} value={d}>{d}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Category</label>
                            <input 
                              type="text" 
                              value={att.category || ""} 
                              onChange={(e) => updateFormField(e.target.value, "category", idx, "attractions")}
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Rating (e.g. 4.7)</label>
                            <input 
                              type="number" 
                              step="0.1" 
                              value={att.rating || 0} 
                              onChange={(e) => updateFormField(parseFloat(e.target.value) || 0, "rating", idx, "attractions")}
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Reviews count (e.g. 10.2k)</label>
                            <input 
                              type="text" 
                              value={att.reviews || ""} 
                              onChange={(e) => updateFormField(e.target.value, "reviews", idx, "attractions")}
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Timings (e.g. Opens at 09:00 am)</label>
                            <input 
                              type="text" 
                              value={att.timing || ""} 
                              onChange={(e) => updateFormField(e.target.value, "timing", idx, "attractions")}
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 mb-1">Short Description</label>
                          <textarea 
                            value={att.desc || ""} 
                            onChange={(e) => updateFormField(e.target.value, "desc", idx, "attractions")}
                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none h-16 resize-none"
                          />
                        </div>
                        <div className="flex flex-col md:flex-row gap-3 items-end">
                          <div className="flex-1 w-full">
                            <label className="block text-xs font-bold text-gray-500 mb-1">Image URL</label>
                            <input 
                              type="text" 
                              value={att.image || ""} 
                              onChange={(e) => updateFormField(e.target.value, "image", idx, "attractions")}
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                            />
                          </div>
                          <div className="flex items-center gap-3 w-full md:w-auto">
                            <label className="flex items-center justify-center gap-1.5 px-4 py-1.5 bg-white border border-gray-200 text-xs font-bold text-gray-600 rounded-lg cursor-pointer hover:bg-slate-50 w-full md:w-auto">
                              {uploadingField?.fieldPath === "image" && uploadingField?.index === idx && uploadingField?.listName === "attractions" ? (
                                <RefreshCw className="w-3.5 h-3.5 animate-spin text-primary" />
                              ) : (
                                <Upload className="w-3.5 h-3.5" />
                              )}
                              Upload Image
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => handleFileUpload(e, "image", idx, "attractions")}
                              />
                            </label>
                             {att.image && (
                              <img 
                                src={att.image} 
                                alt="Preview" 
                                className="w-10 h-10 object-cover rounded-lg border border-gray-200 cursor-zoom-in hover:scale-105 transition-transform" 
                                onClick={() => setEnlargedImage(att.image)}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hotels and Stays Editor */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <h3 className="text-lg font-black text-gray-900">5. Hotels &amp; Homestays</h3>
                    <button 
                      onClick={() => addListItem("hotels", { id: `hot_${Date.now()}`, title: "", locality: "", rating: 4.5, reviews: "1.2k", price: "₹6,000/night", image: "", district: "" })}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Hotel
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    {formState.hotels.map((hotel: any, idx: number) => (
                      <div key={hotel.id || idx} className="bg-slate-50 border border-gray-100 p-6 rounded-2xl relative space-y-4">
                        <button 
                          onClick={() => removeListItem("hotels", idx)}
                          className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Hotel Name</label>
                            <input 
                              type="text" 
                              value={hotel.title || ""} 
                              onChange={(e) => updateFormField(e.target.value, "title", idx, "hotels")}
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Locality</label>
                            <input 
                              type="text" 
                              value={hotel.locality || ""} 
                              onChange={(e) => updateFormField(e.target.value, "locality", idx, "hotels")}
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">District</label>
                            <select 
                              value={hotel.district || ""} 
                              onChange={(e) => updateFormField(e.target.value, "district", idx, "hotels")}
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                            >
                              <option value="">Select District</option>
                              {(districtsData[selectedStateKey] || []).map((d) => (
                                <option key={d} value={d}>{d}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Rating</label>
                            <input 
                              type="number" 
                              step="0.1" 
                              value={hotel.rating || 0} 
                              onChange={(e) => updateFormField(parseFloat(e.target.value) || 0, "rating", idx, "hotels")}
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Reviews count</label>
                            <input 
                              type="text" 
                              value={hotel.reviews || ""} 
                              onChange={(e) => updateFormField(e.target.value, "reviews", idx, "hotels")}
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Price per night (e.g. ₹9,500/night)</label>
                            <input 
                              type="text" 
                              value={hotel.price || ""} 
                              onChange={(e) => updateFormField(e.target.value, "price", idx, "hotels")}
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-3 items-end">
                          <div className="flex-1 w-full">
                            <label className="block text-xs font-bold text-gray-500 mb-1">Hotel Image URL</label>
                            <input 
                              type="text" 
                              value={hotel.image || ""} 
                              onChange={(e) => updateFormField(e.target.value, "image", idx, "hotels")}
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                            />
                          </div>
                          <div className="flex items-center gap-3 w-full md:w-auto">
                            <label className="flex items-center justify-center gap-1.5 px-4 py-1.5 bg-white border border-gray-200 text-xs font-bold text-gray-600 rounded-lg cursor-pointer hover:bg-slate-50 w-full md:w-auto">
                              {uploadingField?.fieldPath === "image" && uploadingField?.index === idx && uploadingField?.listName === "hotels" ? (
                                <RefreshCw className="w-3.5 h-3.5 animate-spin text-primary" />
                              ) : (
                                <Upload className="w-3.5 h-3.5" />
                              )}
                              Upload Image
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => handleFileUpload(e, "image", idx, "hotels")}
                              />
                            </label>
                             {hotel.image && (
                              <img 
                                src={hotel.image} 
                                alt="Preview" 
                                className="w-10 h-10 object-cover rounded-lg border border-gray-200 cursor-zoom-in hover:scale-105 transition-transform" 
                                onClick={() => setEnlargedImage(hotel.image)}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Restaurants Editor */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                    <h3 className="text-lg font-black text-gray-900">6. Popular Restaurants</h3>
                    <button 
                      onClick={() => addListItem("restaurants", { id: `rest_${Date.now()}`, title: "", locality: "", cuisine: "", rating: 4.5, reviews: "1.2k", famousFor: "", image: "", district: "" })}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Restaurant
                    </button>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    {formState.restaurants?.map((rest: any, idx: number) => (
                      <div key={rest.id || idx} className="bg-slate-50 border border-gray-100 p-6 rounded-2xl relative space-y-4">
                        <button 
                          onClick={() => removeListItem("restaurants", idx)}
                          className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Restaurant Name</label>
                            <input 
                              type="text" 
                              value={rest.title || ""} 
                              onChange={(e) => updateFormField(e.target.value, "title", idx, "restaurants")}
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Locality</label>
                            <input 
                              type="text" 
                              value={rest.locality || ""} 
                              onChange={(e) => updateFormField(e.target.value, "locality", idx, "restaurants")}
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">District</label>
                            <select 
                              value={rest.district || ""} 
                              onChange={(e) => updateFormField(e.target.value, "district", idx, "restaurants")}
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                            >
                              <option value="">Select District</option>
                              {(districtsData[selectedStateKey] || []).map((d) => (
                                <option key={d} value={d}>{d}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Cuisine</label>
                            <input 
                              type="text" 
                              value={rest.cuisine || ""} 
                              onChange={(e) => updateFormField(e.target.value, "cuisine", idx, "restaurants")}
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Rating</label>
                            <input 
                              type="number" 
                              step="0.1" 
                              value={rest.rating || 0} 
                              onChange={(e) => updateFormField(parseFloat(e.target.value) || 0, "rating", idx, "restaurants")}
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Reviews count</label>
                            <input 
                              type="text" 
                              value={rest.reviews || ""} 
                              onChange={(e) => updateFormField(e.target.value, "reviews", idx, "restaurants")}
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Famous For</label>
                            <input 
                              type="text" 
                              value={rest.famousFor || ""} 
                              onChange={(e) => updateFormField(e.target.value, "famousFor", idx, "restaurants")}
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-3 items-end">
                          <div className="flex-1 w-full">
                            <label className="block text-xs font-bold text-gray-500 mb-1">Restaurant Image URL</label>
                            <input 
                              type="text" 
                              value={rest.image || ""} 
                              onChange={(e) => updateFormField(e.target.value, "image", idx, "restaurants")}
                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none"
                            />
                          </div>
                          <div className="flex items-center gap-3 w-full md:w-auto">
                            <label className="flex items-center justify-center gap-1.5 px-4 py-1.5 bg-white border border-gray-200 text-xs font-bold text-gray-600 rounded-lg cursor-pointer hover:bg-slate-50 w-full md:w-auto">
                              {uploadingField?.fieldPath === "image" && uploadingField?.index === idx && uploadingField?.listName === "restaurants" ? (
                                <RefreshCw className="w-3.5 h-3.5 animate-spin text-primary" />
                              ) : (
                                <Upload className="w-3.5 h-3.5" />
                              )}
                              Upload Image
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => handleFileUpload(e, "image", idx, "restaurants")}
                              />
                            </label>
                             {rest.image && (
                              <img 
                                src={rest.image} 
                                alt="Preview" 
                                className="w-10 h-10 object-cover rounded-lg border border-gray-200 cursor-zoom-in hover:scale-105 transition-transform" 
                                onClick={() => setEnlargedImage(rest.image)}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Save Section */}
                <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
                  <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-1.5 px-6 py-3 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-xl shadow-md disabled:opacity-50 transition-all"
                  >
                    {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save All Data
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

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
                alt="Enlarged preview" 
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
