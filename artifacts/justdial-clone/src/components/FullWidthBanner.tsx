import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";

export default function FullWidthBanner() {
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.005 }}
      transition={{ duration: 0.3 }}
      className="block w-full rounded-xl overflow-hidden shadow-md cursor-pointer"
      data-testid="fullwidth-banner"
    >
      <div className="relative h-24 md:h-28 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 flex items-center justify-between px-6 md:px-10 gap-4">
        {/* decorative circles */}
        <div className="absolute -left-6 -top-6 w-32 h-32 bg-white/10 rounded-full pointer-events-none" />
        <div className="absolute right-20 -bottom-8 w-40 h-40 bg-white/10 rounded-full pointer-events-none" />
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full pointer-events-none" />

        {/* Left content */}
        <div className="relative flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md flex-shrink-0">
            <Star className="w-6 h-6 text-orange-500 fill-orange-400" />
          </div>
          <div className="min-w-0">
            <p className="text-white font-black text-lg md:text-xl leading-tight">
              Grow Your Business with Thozil.com
            </p>
            <p className="text-yellow-100 text-sm hidden sm:block">
              Join 2 lakh+ businesses already listed — 100% free, forever
            </p>
          </div>
        </div>

        {/* Right content */}
        <div className="relative flex items-center gap-4 flex-shrink-0">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-white font-black text-2xl leading-none">FREE</span>
            <span className="text-yellow-200 text-xs font-semibold">No hidden charges</span>
          </div>
          <span className="flex items-center gap-2 bg-white text-orange-600 font-black text-sm px-5 py-3 rounded-xl shadow-lg hover:bg-yellow-50 transition-colors whitespace-nowrap">
            Register Now
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </motion.a>
  );
}
