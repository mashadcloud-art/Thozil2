import { Utensils, Building2, Sparkles, Stethoscope, Armchair, Brush, Zap, Wrench, PackageSearch, Truck, Dumbbell, Flower2, Camera, CalendarHeart, Scale, Home, Cat, CarFront } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { icon: Utensils, label: "Restaurants", color: "text-red-500", bg: "bg-red-50" },
  { icon: Building2, label: "Hotels", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: Sparkles, label: "Beauty Spa", color: "text-pink-500", bg: "bg-pink-50" },
  { icon: Stethoscope, label: "Doctors", color: "text-teal-500", bg: "bg-teal-50" },
  { icon: Armchair, label: "Home Decor", color: "text-orange-500", bg: "bg-orange-50" },
  { icon: Brush, label: "Cleaning", color: "text-cyan-500", bg: "bg-cyan-50" },
  { icon: Zap, label: "Electricians", color: "text-yellow-600", bg: "bg-yellow-50" },
  { icon: Wrench, label: "Plumbers", color: "text-slate-500", bg: "bg-slate-50" },
  { icon: PackageSearch, label: "Packers", color: "text-indigo-500", bg: "bg-indigo-50" },
  { icon: Truck, label: "Courier", color: "text-amber-500", bg: "bg-amber-50" },
  { icon: Dumbbell, label: "Gyms", color: "text-zinc-800", bg: "bg-zinc-100" },
  { icon: Flower2, label: "Yoga", color: "text-green-500", bg: "bg-green-50" },
  { icon: Camera, label: "Photographers", color: "text-purple-500", bg: "bg-purple-50" },
  { icon: CalendarHeart, label: "Events", color: "text-rose-500", bg: "bg-rose-50" },
  { icon: Scale, label: "Lawyers", color: "text-gray-700", bg: "bg-gray-100" },
  { icon: Home, label: "Real Estate", color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Cat, label: "Pet Shops", color: "text-fuchsia-500", bg: "bg-fuchsia-50" },
  { icon: CarFront, label: "Car Service", color: "text-sky-500", bg: "bg-sky-50" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

export default function QuickCategories() {
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const selectedState = searchParams.get("state") || "KL";

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-900">Explore Services</h3>
      </div>
      
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3 sm:gap-4"
      >
        {categories.map((cat, i) => (
          <motion.a 
            key={i} 
            variants={item}
            href={
              cat.label === "Restaurants"
                ? `/${selectedState}/restaurant-collections`
                : `/search?q=${encodeURIComponent(cat.label)}&state=${selectedState}`
            }
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${cat.bg} group-hover:scale-110 transition-transform duration-200`}>
              <cat.icon className={`w-6 h-6 ${cat.color}`} />
            </div>
            <span className="text-xs font-semibold text-center text-gray-700 leading-tight">
              {cat.label}
            </span>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
