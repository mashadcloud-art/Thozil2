import { motion } from "framer-motion";
import { Megaphone } from "lucide-react";

export default function SidebarBanner() {
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="block rounded-xl overflow-hidden shadow-sm cursor-pointer"
      data-testid="sidebar-banner"
    >
      <div className="relative h-20 bg-gradient-to-r from-orange-500 via-red-500 to-rose-600 flex items-center justify-between px-4 gap-3">
        {/* left glow circle */}
        <div className="absolute -left-4 -top-4 w-24 h-24 bg-white/10 rounded-full" />
        <div className="absolute -right-2 -bottom-4 w-20 h-20 bg-white/10 rounded-full" />

        <div className="relative flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Megaphone className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm leading-tight truncate">
              List Your Business FREE
            </p>
            <p className="text-orange-100 text-xs leading-tight">
              Reach crores of buyers today
            </p>
          </div>
        </div>

        <span className="relative flex-shrink-0 bg-white text-orange-600 font-black text-xs px-3 py-1.5 rounded-lg shadow hover:bg-orange-50 transition-colors whitespace-nowrap">
          Register Now
        </span>
      </div>
    </motion.a>
  );
}
