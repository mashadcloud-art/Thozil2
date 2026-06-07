import React from "react";
import { CardItem } from "@/data/tourismData";
import { Star } from "lucide-react";

interface CardGridProps {
  title: string;
  items: CardItem[];
}

export default function CardGrid({ title, items }: CardGridProps) {
  if (!items || items.length === 0) return null;
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-900">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-4 flex flex-col justify-between h-48">
              <h3 className="text-lg font-semibold text-gray-800 truncate">{item.title}</h3>
              {item.rating !== undefined && (
                <div className="flex items-center mt-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="ml-1 text-sm font-medium text-gray-600">{item.rating}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
