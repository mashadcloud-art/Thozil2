import { Search, MapPin, Grid, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary shadow-md">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-primary text-xl shadow-inner">
            JD
          </div>
          <span className="text-white font-extrabold text-2xl tracking-tight hidden sm:inline-block">JustDial</span>
        </div>

        {/* Center Search Bar */}
        <div className="flex-1 max-w-3xl flex items-center">
          <div className="flex w-full bg-white rounded-lg shadow-sm overflow-hidden border-2 border-transparent focus-within:border-orange-400 transition-colors">
            
            {/* City Selector */}
            <div className="hidden md:flex items-center pl-3 pr-2 border-r border-gray-200 bg-gray-50 text-gray-700 min-w-[140px]">
              <MapPin className="w-4 h-4 mr-2 text-primary" />
              <select className="bg-transparent border-none outline-none text-sm font-medium w-full focus:ring-0 cursor-pointer appearance-none">
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bangalore</option>
                <option>Hyderabad</option>
                <option>Chennai</option>
              </select>
            </div>

            {/* Category Dropdown */}
            <div className="hidden lg:flex items-center px-3 border-r border-gray-200 bg-gray-50 text-gray-700">
              <Grid className="w-4 h-4 mr-2 text-primary" />
              <select className="bg-transparent border-none outline-none text-sm font-medium focus:ring-0 cursor-pointer appearance-none">
                <option>All Categories</option>
                <option>B2B</option>
                <option>B2C</option>
              </select>
            </div>

            {/* Main Search Input */}
            <div className="flex-1 relative">
              <Input 
                type="text" 
                placeholder="Search for Restaurants, Hotels, Doctors..." 
                className="w-full h-12 border-none shadow-none focus-visible:ring-0 px-4 text-base rounded-none"
              />
            </div>

            {/* Search Button */}
            <button className="bg-primary hover:bg-primary/90 text-white px-6 md:px-8 h-12 font-bold transition-colors flex items-center justify-center">
              <Search className="w-5 h-5" />
              <span className="ml-2 hidden sm:inline-block">Search</span>
            </button>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex-shrink-0 flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white rounded-full">
            <Bell className="w-5 h-5" />
          </Button>
          
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="text-white hover:bg-white/20 hover:text-white font-semibold">
              Login
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white border-none font-bold shadow-sm">
              Sign Up
            </Button>
          </div>
          
          {/* Mobile User Icon */}
          <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/20 hover:text-white rounded-full">
            <User className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
