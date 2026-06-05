import { Search, MapPin, Building2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-3">

        {/* Logo */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center font-bold text-white text-lg shadow">
            T
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-primary font-extrabold text-lg tracking-tight leading-none">Thozil.com</span>
            <span className="text-gray-400 text-[10px] font-medium tracking-wide">LOCAL BUSINESS DIRECTORY</span>
          </div>
        </div>

        {/* Dual Search Bar */}
        <div className="flex-1 max-w-2xl hidden md:flex items-center bg-white border-2 border-gray-200 rounded-lg overflow-hidden focus-within:border-primary transition-colors shadow-sm">

          {/* What to search */}
          <div className="flex items-center flex-1 px-3 border-r border-gray-200">
            <Search className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
            <Input
              type="text"
              placeholder="E.g. restaurants, electricians, doctors..."
              className="border-none shadow-none focus-visible:ring-0 h-10 px-0 text-sm placeholder:text-gray-400"
              data-testid="input-search-what"
            />
          </div>

          {/* Location */}
          <div className="flex items-center w-52 px-3 border-r border-gray-200">
            <MapPin className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" />
            <select
              className="bg-transparent border-none outline-none text-sm font-medium w-full focus:ring-0 cursor-pointer appearance-none text-gray-700 h-10"
              data-testid="select-city"
            >
              <option>Mumbai</option>
              <option>Delhi</option>
              <option>Bangalore</option>
              <option>Hyderabad</option>
              <option>Chennai</option>
              <option>Pune</option>
              <option>Kolkata</option>
              <option>Ahmedabad</option>
            </select>
          </div>

          {/* Search Button */}
          <button
            className="bg-primary hover:bg-primary/90 text-white px-5 h-10 font-semibold text-sm flex items-center gap-2 transition-colors flex-shrink-0"
            data-testid="button-search"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>

        {/* Mobile search icon */}
        <button className="md:hidden p-2 text-primary" data-testid="button-mobile-search">
          <Search className="w-5 h-5" />
        </button>

        {/* Right Actions */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <Button
            variant="outline"
            className="hidden lg:flex items-center gap-2 border-orange-400 text-orange-500 hover:bg-orange-50 font-semibold text-sm relative"
            data-testid="button-register-business"
          >
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">FREE</span>
            <Building2 className="w-4 h-4" />
            Register your Business
          </Button>

          <Button
            className="bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-4"
            data-testid="button-login"
          >
            Login / Sign Up
          </Button>

          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-primary" data-testid="button-menu">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
