import { motion } from "framer-motion";
import { Plane, Bus, TrainFront, Building, Car, Navigation } from "lucide-react";

const services = [
  { icon: Plane,      label: "Flights",    color: "bg-blue-50 text-blue-600 border-blue-100",       hover: "hover:bg-blue-100 hover:border-blue-200" },
  { icon: TrainFront, label: "Trains",     color: "bg-orange-50 text-orange-500 border-orange-100", hover: "hover:bg-orange-100 hover:border-orange-200" },
  { icon: Bus,        label: "Bus",        color: "bg-green-50 text-green-600 border-green-100",     hover: "hover:bg-green-100 hover:border-green-200" },
  { icon: Building,   label: "Hotels",     color: "bg-purple-50 text-purple-600 border-purple-100", hover: "hover:bg-purple-100 hover:border-purple-200" },
  { icon: Car,        label: "Car Rental", color: "bg-indigo-50 text-indigo-600 border-indigo-100", hover: "hover:bg-indigo-100 hover:border-indigo-200" },
  { icon: Navigation, label: "Cabs",       color: "bg-rose-50 text-rose-500 border-rose-100",       hover: "hover:bg-rose-100 hover:border-rose-200" },
];

export default function TravelBookings() {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-800">Travel &amp; Bookings</h2>
        <a href="#" className="text-sm text-primary font-semibold hover:underline">
          View All
        </a>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {services.map((svc, i) => (
          <motion.a
            key={i}
            href="#"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -3 }}
            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all group cursor-pointer ${svc.color} ${svc.hover}`}
            data-testid={`travel-${svc.label.replace(" ", "-").toLowerCase()}`}
          >
            <svc.icon className="w-7 h-7 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold text-gray-700 text-center leading-tight">
              {svc.label}
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
