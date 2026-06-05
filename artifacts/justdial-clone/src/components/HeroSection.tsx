import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import hero1 from "@/assets/images/hero-1.png";
import hero2 from "@/assets/images/hero-2.png";
import hero3 from "@/assets/images/hero-3.png";
import hero4 from "@/assets/images/hero-4.png";
import hero5 from "@/assets/images/hero-5.png";

const slides = [
  { id: 1, image: hero1, title: "Expert Plumbers Near You", subtitle: "Fix leaks before they become floods" },
  { id: 2, image: hero2, title: "Dream Wedding Decorators", subtitle: "Make your special day unforgettable" },
  { id: 3, image: hero3, title: "Certified Electricians", subtitle: "Safe and reliable electrical services" },
  { id: 4, image: hero4, title: "Relaxing Spa & Massage", subtitle: "Unwind after a long day in the city" },
  { id: 5, image: hero5, title: "Professional House Cleaning", subtitle: "Sparkling clean homes, hassle-free" },
];

const quickCards = [
  {
    title: "Events Around",
    sub: "Book your Tickets",
    img: "/hero-cards/events.png",
    accent: "from-purple-700/70 to-purple-900/80",
  },
  {
    title: "Home Services",
    sub: "Book Appointment",
    img: "/hero-cards/home-services.png",
    accent: "from-blue-600/70 to-blue-900/80",
  },
  {
    title: "Hospital Booking",
    sub: "Get the Details",
    img: "/hero-cards/hospital.png",
    accent: "from-green-600/70 to-green-900/80",
  },
  {
    title: "Study Abroad",
    sub: "Get the Details",
    img: "/hero-cards/study-abroad.png",
    accent: "from-red-600/60 to-red-900/80",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((p) => (p + 1) % slides.length);
  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);

  return (
    <div className="flex flex-col gap-3">
      {/* Main split hero */}
      <div className="flex gap-3 h-[220px] md:h-[260px]">

        {/* Left — main slideshow */}
        <div className="relative flex-1 rounded-xl overflow-hidden shadow-md group min-w-0">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={slides[current].image}
                alt={slides[current].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 p-5 md:p-7 w-full">
                <motion.h2
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="text-white text-xl md:text-3xl font-bold mb-1 leading-tight"
                >
                  {slides[current].title}
                </motion.h2>
                <motion.p
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="text-gray-200 text-sm md:text-base"
                >
                  {slides[current].subtitle}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="absolute bottom-4 right-4 flex gap-1.5 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "bg-orange-500 w-6" : "bg-white/50 hover:bg-white w-2"
                }`}
                data-testid={`slide-dot-${i}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/35 hover:bg-black/55 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
            data-testid="button-prev-slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/35 hover:bg-black/55 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
            data-testid="button-next-slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Right — 2×2 quick cards */}
        <div className="hidden md:grid grid-cols-2 gap-2 w-[320px] lg:w-[370px] flex-shrink-0">
          {quickCards.map((card, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              whileHover={{ scale: 1.03 }}
              className="relative rounded-xl overflow-hidden shadow-sm group/card cursor-pointer"
              data-testid={`hero-card-${i}`}
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-400"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${card.accent}`} />
              <div className="absolute inset-0 p-3 flex flex-col justify-between">
                <div>
                  <h3 className="text-white font-bold text-sm md:text-base leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-white/80 text-xs mt-0.5">{card.sub}</p>
                </div>
                <span className="text-white text-xs font-semibold flex items-center gap-1 group-hover/card:gap-2 transition-all">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Promo banner */}
      <div className="w-full h-16 md:h-20 rounded-xl overflow-hidden bg-gradient-to-r from-red-600 via-red-700 to-orange-600 flex items-center justify-between px-6 md:px-10 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 shadow">
            <span className="text-red-700 text-lg">☀</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-white font-bold text-sm md:text-base leading-tight">List your business for FREE on Thozil.com</p>
            <p className="text-red-100 text-xs">Reach crores of customers across India — no charges, ever</p>
          </div>
          <div className="sm:hidden">
            <p className="text-white font-bold text-sm">List FREE on Thozil.com</p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right hidden md:block">
            <p className="text-yellow-300 font-black text-lg leading-none">SPECIAL</p>
            <p className="text-yellow-300 font-black text-lg leading-none">SUMMER OFFER</p>
          </div>
          <a
            href="#"
            className="bg-yellow-400 hover:bg-yellow-300 text-red-700 font-black text-sm px-4 py-2 rounded-lg shadow transition-colors whitespace-nowrap"
            data-testid="link-promo-cta"
          >
            Register Now
          </a>
        </div>
      </div>
    </div>
  );
}
