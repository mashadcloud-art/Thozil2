import { Plane, Bus, TrainFront, Building, Car, Navigation } from "lucide-react";

const services = [
  { icon: Plane,      label: "Flights",    color: "bg-blue-50 text-blue-600 border-blue-100",     hover: "hover:bg-blue-100" },
  { icon: TrainFront, label: "Trains",     color: "bg-orange-50 text-orange-500 border-orange-100", hover: "hover:bg-orange-100" },
  { icon: Bus,        label: "Bus",        color: "bg-green-50 text-green-600 border-green-100",   hover: "hover:bg-green-100" },
  { icon: Building,   label: "Hotels",     color: "bg-purple-50 text-purple-600 border-purple-100", hover: "hover:bg-purple-100" },
  { icon: Car,        label: "Car Rental", color: "bg-indigo-50 text-indigo-600 border-indigo-100", hover: "hover:bg-indigo-100" },
  { icon: Navigation, label: "Cabs",       color: "bg-rose-50 text-rose-500 border-rose-100",     hover: "hover:bg-rose-100" },
];

export default function TravelBookings() {
  return (
    <div className="h-full flex flex-col border border-gray-100 rounded-xl shadow-md overflow-hidden bg-white">
      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-indigo-700 flex-shrink-0">
        <h3 className="text-base font-bold text-white">Travel &amp; Bookings</h3>
        <p className="text-blue-100 text-xs">Book your next journey</p>
      </div>

      <div className="flex-1 p-3 grid grid-cols-3 gap-2 content-start">
        {services.map((svc, i) => (
          <a
            key={i}
            href="#"
            className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all group ${svc.color} ${svc.hover}`}
            data-testid={`travel-${svc.label.replace(" ", "-").toLowerCase()}`}
          >
            <svc.icon className="w-6 h-6 mb-1.5 group-hover:scale-110 transition-transform" />
            <span className="text-[11px] font-semibold text-gray-700 text-center leading-tight">
              {svc.label}
            </span>
          </a>
        ))}
      </div>

      <div className="px-3 pb-3 flex-shrink-0">
        <a
          href="#"
          className="block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm py-2.5 rounded-lg transition-all"
          data-testid="link-explore-travel"
        >
          Explore All Travel Options
        </a>
      </div>
    </div>
  );
}
