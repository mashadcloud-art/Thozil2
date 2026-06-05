import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hero1 from "@/assets/images/hero-1.png";
import hero2 from "@/assets/images/hero-2.png";
import hero3 from "@/assets/images/hero-3.png";
import hero4 from "@/assets/images/hero-4.png";
import hero5 from "@/assets/images/hero-5.png";
import { Button } from "@/components/ui/button";

const slides = [
  { id: 1, image: hero1, title: "Expert Plumbers Near You", subtitle: "Fix leaks before they become floods" },
  { id: 2, image: hero2, title: "Dream Wedding Decorators", subtitle: "Make your special day unforgettable" },
  { id: 3, image: hero3, title: "Certified Electricians", subtitle: "Safe and reliable electrical services" },
  { id: 4, image: hero4, title: "Relaxing Spa & Massage", subtitle: "Unwind after a long day in the city" },
  { id: 5, image: hero5, title: "Professional House Cleaning", subtitle: "Sparkling clean homes, hassle-free" },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[250px] md:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden shadow-lg group">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img 
            src={slides[current].image} 
            alt={slides[current].title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white text-2xl md:text-4xl lg:text-5xl font-bold mb-2 shadow-sm"
            >
              {slides[current].title}
            </motion.h2>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-200 text-sm md:text-lg lg:text-xl font-medium"
            >
              {slides[current].subtitle}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 right-6 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
              current === index ? "bg-orange-500 w-6 md:w-8" : "bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
    </div>
  );
}
