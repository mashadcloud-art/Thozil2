import useEmblaCarousel from "embla-carousel-react";
import { TrendingUp } from "lucide-react";

const trendingSearches = [
  "Restaurants near me", "Pizza delivery", "Electricians", 
  "Plumbers", "AC repair", "Packers movers", "Salons",
  "Dentist", "Car washing", "Gyms near me", "Laundry",
  "Caterers", "Pest control", "Home cleaning", "Carpenters",
  "Interior designers", "Architects", "Banquet halls", "Makeup artists"
];

export default function TrendingSearches() {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps"
  });

  return (
    <section className="py-6 border-t border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-bold text-gray-900">Trending Searches</h3>
      </div>
      
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {trendingSearches.map((search, i) => (
            <a
              key={i}
              href="#"
              className="flex-none px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-colors whitespace-nowrap"
            >
              {search}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
