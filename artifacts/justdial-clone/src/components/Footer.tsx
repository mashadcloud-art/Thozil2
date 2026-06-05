import { Facebook, Twitter, Instagram, Youtube, Linkedin, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const cityLinks = [
  "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", 
  "Pune", "Ahmedabad", "Kolkata", "Jaipur", "Chandigarh",
  "Coimbatore", "Lucknow", "Surat", "Indore", "Patna"
];

const quickLinks = [
  "About Us", "Contact Us", "Careers", "Investors", "Media",
  "Terms of Use", "Privacy Policy", "Sitemap", "Report a Bug", "FAQ"
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t-4 border-primary">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1400px]">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-bold text-white text-xl">
                JD
              </div>
              <span className="text-white font-extrabold text-2xl tracking-tight">JustDial</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              India's No. 1 Local Search Engine. Find anything, anywhere, anytime. 
              Connecting millions of buyers with sellers daily.
            </p>
            <div className="space-y-2">
              <a href="#" className="flex items-center text-sm hover:text-white transition-colors">
                <Phone className="w-4 h-4 mr-3 text-gray-500" />
                1800-123-4567
              </a>
              <a href="#" className="flex items-center text-sm hover:text-white transition-colors">
                <Mail className="w-4 h-4 mr-3 text-gray-500" />
                support@justdialclone.com
              </a>
              <a href="#" className="flex items-center text-sm hover:text-white transition-colors">
                <MapPin className="w-4 h-4 mr-3 text-gray-500" />
                Palm Court Bldg M, 501/B, 5th Floor
              </a>
            </div>
          </div>

          {/* Cities */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center">
              Top Cities
            </h4>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
              {cityLinks.map((city, i) => (
                <li key={i}>
                  <a href="#" className="text-sm hover:text-orange-400 transition-colors">
                    {city}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-sm hover:text-orange-400 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Business & Social */}
          <div className="space-y-8">
            <div>
              <h4 className="text-white font-bold text-lg mb-4">JustDial for Business</h4>
              <p className="text-sm text-gray-400 mb-4">
                Grow your business with JustDial. Get discovered by millions.
              </p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                List Your Business
              </Button>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Connect With Us</h4>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          
        </div>

        <Separator className="bg-gray-800 mb-8" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} JustDial Clone Built With Replit. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
