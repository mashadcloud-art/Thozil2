import { Plane, Bus, TrainFront, Building, Car, Navigation } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  { icon: Plane, label: "Flights", color: "bg-blue-100 text-blue-600" },
  { icon: TrainFront, label: "Trains", color: "bg-orange-100 text-orange-600" },
  { icon: Bus, label: "Bus", color: "bg-green-100 text-green-600" },
  { icon: Building, label: "Hotels", color: "bg-purple-100 text-purple-600" },
  { icon: Car, label: "Car Rental", color: "bg-indigo-100 text-indigo-600" },
  { icon: Navigation, label: "Cabs", color: "bg-rose-100 text-rose-600" },
];

export default function TravelBookings() {
  return (
    <Card className="border-none shadow-md overflow-hidden bg-gradient-to-br from-slate-50 to-white">
      <CardHeader className="pb-4 border-b border-gray-100">
        <CardTitle className="text-lg font-bold text-gray-800">
          Travel & Bookings
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-3">
          {services.map((svc, i) => (
            <a 
              href="#" 
              key={i}
              className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-100 transition-all group"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${svc.color} group-hover:scale-110 transition-transform`}>
                <svc.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-gray-600">
                {svc.label}
              </span>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
