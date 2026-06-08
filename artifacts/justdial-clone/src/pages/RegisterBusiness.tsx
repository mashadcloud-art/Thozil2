import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { districtsData, stateNames } from "@/lib/locationData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Building2, Upload, CheckCircle2, ChevronRight, Store, Hotel, MapPin, 
  ArrowLeft, RefreshCw, AlertCircle, Info, Sparkles
} from "lucide-react";

export default function RegisterBusiness() {
  const [, setLocation] = useLocation();
  const [category, setCategory] = useState("Restaurants");
  const [stateKey, setStateKey] = useState("KL");
  const [district, setDistrict] = useState("");
  const [title, setTitle] = useState("");
  const [locality, setLocality] = useState("");
  const [image, setImage] = useState("");
  
  // Category-specific fields
  const [cuisine, setCuisine] = useState("");
  const [famousFor, setFamousFor] = useState("");
  const [price, setPrice] = useState("");
  const [touristCategory, setTouristCategory] = useState("Tourist Places");
  const [timing, setTiming] = useState("Opens at 09:00 AM");
  const [desc, setDesc] = useState("");

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successData, setSuccessData] = useState<any>(null);

  // Reset district when state changes
  useEffect(() => {
    setDistrict("");
  }, [stateKey]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setErrorMsg("");
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
        setImage(result.url);
      } else {
        throw new Error(result.error || "Invalid response");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Image upload failed. Please verify the file format and try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !locality || !district || !image || !desc) {
      setErrorMsg("Please fill in all required fields and upload an image.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    // Prepare category-specific data
    let businessData: any = {
      title,
      locality,
      district,
      image,
      desc
    };

    if (category === "Restaurants") {
      businessData.cuisine = cuisine || "Kerala Style";
      businessData.famousFor = famousFor || "Special Kerala Meals";
    } else if (category === "Hotels") {
      businessData.price = price || "₹3,500/night";
    } else if (category === "Tourist Places") {
      businessData.category = touristCategory;
      businessData.timing = timing;
    }

    try {
      const res = await fetch("/api/api/v1/register-business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stateKey,
          category,
          businessData
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Registration failed");
      }

      const result = await res.json();
      if (result.success) {
        setSuccessData(result.data);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to submit listing. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSuccessRedirect = () => {
    // Redirect to the state tourism page with district query param to show the new listing
    const query = district ? `?district=${encodeURIComponent(district)}` : "";
    setLocation(`/state/${stateKey.toLowerCase()}${query}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <style>{`
        .gradient-bg {
          background: linear-gradient(135deg, #FF6B2C 0%, #ff8c53 100%);
        }
        .form-shadow {
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 8px 20px -6px rgba(0, 0, 0, 0.05);
        }
      `}</style>
      <Navbar />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-10">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <button 
            onClick={() => setLocation("/")}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4.5 h-4.5" /> Back to Home
          </button>
        </div>

        {successData ? (
          /* Success Screen */
          <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-3xl form-shadow text-center max-w-xl mx-auto space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Your Business is Listed!</h2>
              <p className="text-sm text-gray-500 mt-2">
                Congratulations! <strong>{title}</strong> has been successfully added to our Thozil directory.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex gap-4 text-left items-center max-w-md mx-auto">
              <img 
                src={image} 
                alt={title} 
                className="w-16 h-16 object-cover rounded-xl border border-slate-200" 
              />
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-extrabold text-primary uppercase tracking-wider bg-orange-50 px-2 py-0.5 rounded-md">
                  {category.slice(0, -1)}
                </span>
                <h4 className="font-bold text-sm text-gray-900 truncate mt-1">{title}</h4>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  {locality}, {stateNames[stateKey]}
                </p>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button
                onClick={handleSuccessRedirect}
                className="w-full py-3 px-6 bg-primary hover:bg-primary/95 text-white font-bold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                View Your Listing Live <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setSuccessData(null);
                  setTitle("");
                  setLocality("");
                  setImage("");
                  setDesc("");
                  setCuisine("");
                  setFamousFor("");
                  setPrice("");
                }}
                className="w-full py-3 px-6 bg-slate-50 hover:bg-slate-100 text-gray-700 font-bold text-sm rounded-2xl transition-all cursor-pointer"
              >
                List Another Business
              </button>
            </div>
          </div>
        ) : (
          /* Registration Form Screen */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Form Column */}
            <div className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl p-8 form-shadow space-y-6">
              
              <div>
                <span className="text-[10px] font-extrabold text-primary tracking-widest uppercase bg-orange-50 px-2.5 py-1 rounded-md">
                  Register
                </span>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight mt-2.5 flex items-center gap-2">
                  List Your Business for FREE
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                  Fill in the details below to publish your business profile and connect with local clients.
                </p>
              </div>

              {errorMsg && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-800 rounded-2xl flex items-start gap-3 text-xs">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
                  <div>
                    <span className="font-bold">Missing Information</span>
                    <p className="mt-0.5">{errorMsg}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Category Selection */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">Business Category</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "Restaurants", label: "Restaurant", icon: Store },
                      { id: "Hotels", label: "Hotel & Stay", icon: Hotel },
                      { id: "Tourist Places", label: "Tourist Place", icon: MapPin }
                    ].map((item) => {
                      const IconComp = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setCategory(item.id)}
                          className={`flex flex-col items-center justify-center p-4 border rounded-2xl transition-all cursor-pointer ${
                            category === item.id 
                              ? "bg-orange-50 border-primary text-primary font-bold shadow-sm"
                              : "bg-white border-gray-200 text-gray-600 hover:bg-slate-50"
                          }`}
                        >
                          <IconComp className="w-5 h-5 mb-2" />
                          <span className="text-xs text-center">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">Basic Information</h3>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">Business Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Paragon Seafood Special"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary focus:bg-white transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">State *</label>
                      <select 
                        value={stateKey}
                        onChange={(e) => setStateKey(e.target.value)}
                        className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary focus:bg-white transition-all"
                      >
                        {Object.entries(stateNames).map(([code, name]) => (
                          <option key={code} value={code}>{name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">District *</label>
                      <select 
                        required
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary focus:bg-white transition-all"
                      >
                        <option value="">Select District</option>
                        {(districtsData[stateKey] || []).map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">Locality / Address *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. M.G. Road, Opp Metro Station"
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* 3. Category Specific Details */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">Category Specifics</h3>
                  
                  {category === "Restaurants" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5">Cuisine Type</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Malabar Seafood, North Indian"
                          value={cuisine}
                          onChange={(e) => setCuisine(e.target.value)}
                          className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5">Famous For</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Biryani, Fish Pollichathu"
                          value={famousFor}
                          onChange={(e) => setFamousFor(e.target.value)}
                          className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {category === "Hotels" && (
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5">Average Price per Night</label>
                      <input 
                        type="text" 
                        placeholder="e.g. ₹4,500/night"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary focus:bg-white transition-all"
                      />
                    </div>
                  )}

                  {category === "Tourist Places" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5">Attraction Sub-category</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Lakes & Rivers, Historic Temple"
                          value={touristCategory}
                          onChange={(e) => setTouristCategory(e.target.value)}
                          className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-600 mb-1.5">Timings / Availability</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Opens at 09:00 AM"
                          value={timing}
                          onChange={(e) => setTiming(e.target.value)}
                          className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5">Description *</label>
                    <textarea 
                      required
                      placeholder="Provide a detailed description of your services, amenities, history, or specials..."
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary focus:bg-white transition-all h-28 resize-none"
                    />
                  </div>
                </div>

                {/* 4. Photo Upload */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">Business Image</h3>
                  
                  <div className="flex flex-col md:flex-row gap-4 items-center bg-slate-50 p-6 rounded-2xl border border-dashed border-gray-200">
                    {image ? (
                      <div className="relative group w-32 h-24 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                        <img src={image} alt="Upload preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setImage("")}
                          className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          Change Photo
                        </button>
                      </div>
                    ) : (
                      <div className="w-32 h-24 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center text-slate-400">
                        <Building2 className="w-8 h-8" />
                      </div>
                    )}

                    <div className="flex-1 w-full text-center md:text-left">
                      <h4 className="text-xs font-bold text-gray-800">Choose a Banner Image *</h4>
                      <p className="text-[10px] text-gray-400 mt-0.5">JPEG, PNG formats supported. Recommended ratio 4:3.</p>
                      
                      <label className="inline-flex items-center justify-center gap-1.5 px-5 py-2 mt-3 bg-white border border-gray-200 text-xs font-bold text-gray-700 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors shadow-sm">
                        {uploading ? (
                          <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                        ) : (
                          <Upload className="w-4 h-4 text-gray-400" />
                        )}
                        {uploading ? "Uploading image..." : "Upload Business Photo"}
                        <input 
                          type="file" 
                          accept="image/*" 
                          disabled={uploading}
                          className="hidden" 
                          onChange={handleFileUpload}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit Section */}
                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting || uploading}
                    className="py-3 px-8 bg-primary hover:bg-primary/95 text-white font-bold text-xs rounded-2xl shadow-md disabled:opacity-50 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {submitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    {submitting ? "Publishing listing..." : "Publish Business Listing"}
                  </button>
                </div>

              </form>

            </div>

            {/* Sidebar Columns (Friction points & Benefits info) */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="gradient-bg text-white p-6 rounded-3xl space-y-4 shadow-md">
                <h3 className="font-black text-base tracking-tight flex items-center gap-2">
                  Why Register on Thozil?
                </h3>
                <ul className="space-y-3.5 text-xs text-orange-50/90 font-medium">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                    <span><strong>100% Free:</strong> No hidden costs or commission cuts.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                    <span><strong>State & District Filters:</strong> Local customers can easily find you.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                    <span><strong>SEO Automated:</strong> Built-in optimization ensures your business is discoverable.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                    <span><strong>Instant Live Status:</strong> Listing appears live on state profiles instantly.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-100 p-6 rounded-3xl form-shadow space-y-3">
                <h4 className="font-bold text-xs text-gray-800 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-orange-400" /> Listing Guidelines
                </h4>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  Provide high resolution, horizontal images of your business premises or specialties. Double check your locality details so local clients can locate you.
                </p>
              </div>

            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
