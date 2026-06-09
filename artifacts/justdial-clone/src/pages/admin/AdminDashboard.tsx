import { useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TourismModule from "@/components/admin/TourismModule";
import RestaurantModule from "@/components/admin/RestaurantModule";
import { 
  ArrowLeft, Map, Utensils, LayoutDashboard, Settings
} from "lucide-react";

type ModuleType = "overview" | "tourism" | "restaurants" | "settings";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [activeModule, setActiveModule] = useState<ModuleType>("tourism");

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden sticky top-24">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-lg font-black text-gray-900">Admin Control</h2>
              <p className="text-[11px] text-gray-500 mt-0.5">Manage platform data</p>
            </div>
            
            <nav className="p-3 flex flex-col gap-1">
              <button
                onClick={() => setActiveModule("overview")}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeModule === "overview" 
                    ? "bg-orange-50 text-primary" 
                    : "text-gray-600 hover:bg-slate-50"
                }`}
              >
                <LayoutDashboard className={`w-4 h-4 ${activeModule === "overview" ? "text-primary" : "text-gray-400"}`} />
                Dashboard
              </button>

              <div className="pt-3 pb-1 px-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Content Modules</span>
              </div>

              <button
                onClick={() => setActiveModule("tourism")}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeModule === "tourism" 
                    ? "bg-orange-50 text-primary" 
                    : "text-gray-600 hover:bg-slate-50"
                }`}
              >
                <Map className={`w-4 h-4 ${activeModule === "tourism" ? "text-primary" : "text-gray-400"}`} />
                Tourism Guide
              </button>

              <button
                onClick={() => setActiveModule("restaurants")}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeModule === "restaurants" 
                    ? "bg-orange-50 text-primary" 
                    : "text-gray-600 hover:bg-slate-50"
                }`}
              >
                <Utensils className={`w-4 h-4 ${activeModule === "restaurants" ? "text-primary" : "text-gray-400"}`} />
                Restaurants
              </button>

              <div className="pt-3 pb-1 px-3">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">System</span>
              </div>

              <button
                onClick={() => setActiveModule("settings")}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeModule === "settings" 
                    ? "bg-orange-50 text-primary" 
                    : "text-gray-600 hover:bg-slate-50"
                }`}
              >
                <Settings className={`w-4 h-4 ${activeModule === "settings" ? "text-primary" : "text-gray-400"}`} />
                Settings
              </button>
            </nav>
            
            <div className="p-3 border-t border-gray-100 mt-2">
              <button 
                onClick={() => setLocation("/")}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {activeModule === "tourism" && <TourismModule />}
          {activeModule === "restaurants" && <RestaurantModule />}
          {activeModule === "overview" && (
            <div className="bg-white border border-gray-100 p-12 rounded-2xl shadow-sm text-center">
              <LayoutDashboard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900">Dashboard Overview</h2>
              <p className="text-sm text-gray-500 mt-2">Select a module from the sidebar to manage content.</p>
            </div>
          )}
          {activeModule === "settings" && (
            <div className="bg-white border border-gray-100 p-12 rounded-2xl shadow-sm text-center">
              <Settings className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900">System Settings</h2>
              <p className="text-sm text-gray-500 mt-2">Admin preferences and settings will appear here.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
