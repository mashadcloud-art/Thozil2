import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const cities = [
  { name: "Mumbai",    img: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=300&h=300&fit=crop" },
  { name: "Delhi",     img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=300&h=300&fit=crop" },
  { name: "Bangalore", img: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=300&h=300&fit=crop" },
  { name: "Chennai",   img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300&h=300&fit=crop" },
  { name: "Hyderabad", img: "https://images.unsplash.com/photo-1569395776474-5cf6defc6b4c?w=300&h=300&fit=crop" },
  { name: "Pune",      img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=300&h=300&fit=crop" },
  { name: "Kolkata",   img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop" },
  { name: "Jaipur",    img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=300&h=300&fit=crop" },
  { name: "Kochi",     img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300&h=300&fit=crop" },
  { name: "Ahmedabad", img: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=300&h=300&fit=crop" },
  { name: "Surat",     img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=300&h=300&fit=crop" },
  { name: "Lucknow",   img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=300&h=300&fit=crop" },
];

export default function DiscoverByCity() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-gray-800">Discover by City</h2>
          <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
            New
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
            data-testid="city-scroll-left"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
            data-testid="city-scroll-right"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        {cities.map((city, i) => (
          <motion.a
            key={i}
            href="#"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ y: -3 }}
            className="flex-shrink-0 flex flex-col items-center gap-2 group"
            data-testid={`city-${city.name.toLowerCase()}`}
          >
            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md border-2 border-transparent group-hover:border-primary transition-all duration-300">
              <img
                src={city.img}
                alt={city.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400"
                loading="lazy"
              />
            </div>
            <span className="text-xs font-semibold text-gray-600 group-hover:text-primary transition-colors whitespace-nowrap uppercase tracking-wide">
              {city.name}
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
