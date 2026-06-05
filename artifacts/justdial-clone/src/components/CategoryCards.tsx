import { motion } from "framer-motion";

const groups = [
  {
    title: "Wedding Requisites",
    items: [
      { label: "Banquet Halls", img: "/categories/banquet-halls.png" },
      { label: "Bridal Requisite", img: "/categories/bridal-requisite.png" },
      { label: "Caterers", img: "/categories/caterers.png" },
    ],
  },
  {
    title: "Beauty & Spa",
    items: [
      { label: "Beauty Parlours", img: "/categories/beauty-parlours.png" },
      { label: "Spa & Massages", img: "/categories/spa-massages.png" },
      { label: "Salons", img: "/categories/salons.png" },
    ],
  },
  {
    title: "Repairs & Services",
    items: [
      { label: "AC Service", img: "/categories/ac-service.png" },
      { label: "Car Service", img: "/categories/car-service.png" },
      { label: "Bike Service", img: "/categories/bike-service.png" },
    ],
  },
  {
    title: "Daily Needs",
    items: [
      { label: "Movies", img: "/categories/movies.png" },
      {
        label: "Grocery",
        img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
      },
      {
        label: "Pharmacy",
        img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
      },
    ],
  },
];

export default function CategoryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {groups.map((group, gi) => (
        <motion.div
          key={gi}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: gi * 0.08 }}
          className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
        >
          <div className="px-4 pt-4 pb-3 border-b border-gray-100">
            <h3 className="text-base font-bold text-gray-800">{group.title}</h3>
          </div>
          <div className="grid grid-cols-3 gap-0">
            {group.items.map((item, ii) => (
              <a
                key={ii}
                href="#"
                className="flex flex-col items-center p-3 hover:bg-gray-50 transition-colors group"
                data-testid={`category-item-${gi}-${ii}`}
              >
                <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-2 shadow-sm">
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <span className="text-xs text-center text-gray-600 group-hover:text-primary font-medium leading-tight">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
