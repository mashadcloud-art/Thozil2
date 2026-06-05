import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

const groups = [
  {
    title: "Wedding Requisites",
    color: "from-pink-500 to-rose-500",
    links: ["Caterers", "Wedding Photographers", "Decorators", "Wedding Halls", "Bridal Makeup", "DJ Services"]
  },
  {
    title: "Beauty & Spa",
    color: "from-purple-500 to-fuchsia-500",
    links: ["Salons", "Spa & Massage", "Nail Art", "Hair Extensions", "Makeup Artists", "Mehendi"]
  },
  {
    title: "Repairs & Services",
    color: "from-blue-500 to-cyan-500",
    links: ["AC Repair", "Mobile Repair", "Laptop Repair", "TV Repair", "Washing Machine", "Appliance Repair"]
  },
  {
    title: "Daily Needs",
    color: "from-green-500 to-emerald-500",
    links: ["Grocery Stores", "Pharmacies", "Laundry", "Tiffin Services", "Milk Delivery", "Water Suppliers"]
  }
];

export default function CategoryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {groups.map((group, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
            <div className={`h-2 w-full bg-gradient-to-r ${group.color}`} />
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gray-800 flex items-center justify-between">
                {group.title}
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-2 gap-y-3 gap-x-2">
                {group.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-sm text-gray-600 hover:text-primary hover:underline flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
