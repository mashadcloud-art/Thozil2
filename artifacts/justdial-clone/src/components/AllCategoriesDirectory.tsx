import React, { useState, useMemo } from 'react';
import { useLocation } from 'wouter';
import { 
  Globe, Croissant, Coffee, Soup, Map, Flame, Beer, Heart, 
  Snowflake, Leaf, Fish, Beef, Mountain, Target, Pizza, 
  Store, Salad, GripHorizontal, ChevronDown, Search, Smile
} from 'lucide-react';

const D = {
  A: { icon: Globe, label: "World cuisines", items: ["Afghan", "African", "American", "Andhra", "Arabian", "Asian", "Assamese", "Awadhi"] },
  B: { icon: Croissant, label: "Bakery & grills", items: ["Bakery", "Barbeque", "Bengali", "Beverages", "Bhutanese", "Biryani", "Breakfast", "British", "Buffets", "Burger", "Burmese"] },
  C: { icon: Coffee, label: "Cafe & Chinese", items: ["Cafe", "Cake Shops", "Caters", "Chaats", "Chai Varieties", "Chettinad", "Chicken Appitizer Platter", "Chicken Biryani", "Chicken Fried Rice", "Chicken Hakka Noodles", "Chicken Hot N Sour Soup", "Chicken Stew&Bread", "Chicken Sweet Corn Soup", "Chilli Chicken", "Chinese", "Chinese Dishes", "Coffee Shop", "Coffee Shops", "Continental", "Cream Of Mushroom With Truffle Oil Soup"] },
  D: { icon: Soup, label: "Dal & desserts", items: ["Dal Gosht", "Desserts", "Dhaba", "Dosas Varieties", "Drinks"] },
  E: { icon: Map, label: "European", items: ["European"] },
  F: { icon: Flame, label: "Fast food & fusion", items: ["Family Restaurant", "Fast Food", "Filter Coffee", "Fish Finger", "Fish Tikka Malwani", "French", "Fried Chicken and Arabic Grills", "Full Grill Chicken", "Fusion"] },
  G: { icon: Beer, label: "Global", items: ["German", "Goan", "Greek", "Gujarati"] },
  H: { icon: Heart, label: "Healthy & halal", items: ["Hakka Noodles", "Halal", "Healthy", "Healthy Menu", "Hotel and Bakery", "Hyderabadi"] },
  I: { icon: Snowflake, label: "Indian & international", items: ["Ice Cream", "Indian", "Indonesian", "Iranian", "Israeli", "Italian"] },
  J: { icon: Leaf, label: "Japanese & juices", items: ["Japanese", "Juices", "Juices/Shakes"] },
  K: { icon: Fish, label: "Kebab & Kerala", items: ["Kappa&Poth", "Kashmiri", "Kebab", "Kebab shop", "Kerala", "Kerala Dishes", "KFC Chicken", "Korean"] },
  L: { icon: Leaf, label: "Lebanese & more", items: ["Lebanese", "Lounge", "Lucknowi"] },
  M: { icon: Beef, label: "Mughlai & more", items: ["Maharashtrian", "Malaysian", "Mangalorean", "Mediterranean", "Mexican", "Middle Eastern", "Momos", "Mughlai", "Multi-Cuisine Restaurant", "Multicuisine", "Mutton Badami", "Mutton Chashmeshahi"] },
  N: { icon: Mountain, label: "North Indian & more", items: ["Naga", "Nepalese", "Non Veg", "Non Veg Special", "North Eastern", "North Indian", "North Indian Cuisines", "North Indian Curries", "North Indian Restaurant"] },
  O: { icon: Target, label: "Oriental", items: ["Odia", "Organic", "Oriental"] },
  P: { icon: Pizza, label: "Pizza & pan-Asian", items: ["Pan Asian", "Parsi", "Pasta", "Persian", "Pizza", "Portuguese", "Punjabi", "Pure Veg"] },
  R: { icon: Store, label: "Regional", items: ["Rajasthani", "Restaurant & Caterers", "Restaurant/Conference hall", "Rolls", "Rooftop Banquet Hall/ Coffee Shop", "Russian"] },
  S: { icon: Salad, label: "Seafood & street food", items: ["Salads", "Sandwiches", "Seafood", "Sindhi", "Singaporean", "Snacks", "Soups", "South Indian", "South Indian Cafe", "South Indian Dishes", "Spanish", "Sri Lankan", "Steak", "Street Food", "Sushi", "Sweets"] },
  T: { icon: Flame, label: "Tandoori & Thai", items: ["Tandoori", "Tandoori Starters", "Tandoori items", "Tea", "Tex-Mex", "Thai", "Thali", "Tibetan", "Turkish"] },
  U: { icon: Leaf, label: "Udupi", items: ["Udupi"] },
  V: { icon: Salad, label: "Veg & vegan", items: ["Veg & Non Veg Food Items", "Veg Specials", "Vegan", "Vietnamese"] },
  W: { icon: GripHorizontal, label: "Waffles & wraps", items: ["Waffles", "Wraps"] }
};

export default function AllCategoriesDirectory({ stateKey }: { stateKey: string }) {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");
  const [openSet, setOpenSet] = useState<Set<string>>(new Set());

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value.toLowerCase().trim());
  };

  const toggleOpen = (letter: string) => {
    const newSet = new Set(openSet);
    if (newSet.has(letter)) {
      newSet.delete(letter);
    } else {
      newSet.add(letter);
    }
    setOpenSet(newSet);
  };

  const filteredData = useMemo(() => {
    let totalItems = 0;
    const result: Record<string, { icon: any, label: string, items: string[] }> = {};
    
    Object.keys(D).forEach(letter => {
      const cat = D[letter as keyof typeof D];
      const filteredItems = cat.items.filter(item => !query || item.toLowerCase().includes(query));
      if (filteredItems.length > 0) {
        result[letter] = { ...cat, items: filteredItems };
        totalItems += filteredItems.length;
      }
    });
    
    return { data: result, totalItems };
  }, [query]);

  return (
    <div className="py-6 px-0 md:px-6 w-full max-w-[1080px] mx-auto font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-1">
          Browse <em className="text-[#E8722A] not-italic">cuisines</em>
        </h1>
        <div className="text-[13px] text-gray-500 mt-1">Click any category to explore</div>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input 
          type="text" 
          placeholder="Search categories…" 
          value={query}
          onChange={handleSearch}
          className="w-full h-10 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 pl-10 pr-4 text-[13px] outline-none focus:border-[#E8722A] transition-colors"
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-gray-500">
          Showing <b className="text-gray-900 font-medium">{filteredData.totalItems}</b> categories
        </span>
      </div>

      {filteredData.totalItems === 0 ? (
        <div className="text-center py-12 text-gray-400 text-[13px]">
          <Smile className="w-6 h-6 mx-auto mb-2 opacity-50" />
          No results found
        </div>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
          {Object.keys(filteredData.data).map((letter) => {
            const cat = filteredData.data[letter];
            const Icon = cat.icon;
            const isOpen = openSet.has(letter) || query.length > 0;

            return (
              <div key={letter} className="border border-gray-200 rounded-xl overflow-hidden bg-white mb-4 break-inside-avoid shadow-sm hover:shadow-md transition-shadow">
                <div 
                  onClick={() => toggleOpen(letter)}
                  className={`flex items-center gap-3 p-3.5 cursor-pointer select-none transition-colors ${isOpen ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                >
                  <div className={`w-8 h-8 rounded-lg text-[14px] font-medium flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-[#E8722A] text-white' : 'bg-[#FAECE7] text-[#D85A30]'}`}>
                    {letter}
                  </div>
                  <Icon className={`w-4.5 h-4.5 ${isOpen ? 'text-[#E8722A]' : 'text-gray-400'}`} />
                  <span className="text-[14px] font-medium text-gray-900 flex-1">{cat.label}</span>
                  <span className={`text-[11px] rounded-full px-2.5 py-0.5 mr-2 transition-colors ${isOpen ? 'bg-[#FAECE7] text-[#993C1D]' : 'bg-gray-100 text-gray-500'}`}>
                    {cat.items.length}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#E8722A]' : ''}`} />
                </div>

                {isOpen && (
                  <div className="px-4 pb-4 border-t border-gray-200 pt-3.5">
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map(item => (
                        <div 
                          key={item}
                          onClick={(e) => {
                            e.stopPropagation();
                            setLocation(`/${stateKey}/restaurants/${encodeURIComponent(item.replace(/\s+/g, '-'))}`);
                          }}
                          className="text-[12px] text-gray-600 bg-gray-50 border border-gray-200 rounded-md px-3.5 py-1.5 cursor-pointer transition-all hover:border-[#D85A30] hover:text-[#993C1D] hover:bg-[#FAECE7]"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
