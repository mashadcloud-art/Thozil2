import { useLocation } from "wouter";

const CATEGORY_DICTIONARY = {
  A: ["Afghan", "African", "American", "Andhra", "Arabian", "Asian", "Assamese", "Awadhi"],
  B: ["Bakery", "Barbeque", "Bengali", "Beverages", "Bhutanese", "Biryani", "Breakfast", "British", "Buffets", "Burger", "Burmese"],
  C: ["Cafe", "Cake Shops", "Caters", "Chaats", "Chai Varieties", "Chettinad", "Chicken Appitizer Platter", "Chicken Biryani", "Chicken Fried Rice", "Chicken Hakka Noodles", "Chicken Hot N Sour Soup", "Chicken Stew&Bread", "Chicken Sweet Corn Soup", "Chilli Chicken", "Chinese", "Chinese Dishes", "Coffee Shop", "Coffee Shops", "Continental", "Cream Of Mushroom With Truffle Oil Soup"],
  D: ["Dal Gosht", "Desserts", "Dhaba", "Dosas Varieties", "Drinks"],
  E: ["European"],
  F: ["Family Restaurant", "Fast Food", "Filter Coffee", "Fish Finger", "Fish Tikka Malwani", "French", "Fried Chicken and Arabic Grills", "Full Grill Chicken", "Fusion"],
  G: ["German", "Goan", "Greek", "Gujarati"],
  H: ["Hakka Noodles", "Halal", "Healthy", "Healthy Menu", "Hotel and Bakery", "Hyderabadi"],
  I: ["Ice Cream", "Indian", "Indonesian", "Iranian", "Israeli", "Italian"],
  J: ["Japanese", "Juices", "Juices/Shakes"],
  K: ["Kappa&Poth", "Kashmiri", "Kebab", "Kebab shop", "Kerala", "Kerala Dishes", "KFC Chicken", "Korean"],
  L: ["Lebanese", "Lounge", "Lucknowi"],
  M: ["Maharashtrian", "Malaysian", "Mangalorean", "Mediterranean", "Mexican", "Middle Eastern", "Momos", "Mughlai", "Multi-Cuisine Restaurant", "Multicuisine", "Mutton Badami", "Mutton Chashmeshahi"],
  N: ["Naga", "Nepalese", "Non Veg", "Non Veg Special", "North Eastern", "North Indian", "North Indian Cuisines", "North Indian Curries", "North Indian Restaurant"],
  O: ["Odia", "Organic", "Oriental"],
  P: ["Pan Asian", "Parsi", "Pasta", "Persian", "Pizza", "Portuguese", "Punjabi", "Pure Veg"],
  R: ["Rajasthani", "Restaurant & Caterers", "Restaurant/Conference hall", "Rolls", "Rooftop Banquet Hall/ Coffee Shop", "Russian"],
  S: ["Salads", "Sandwiches", "Seafood", "Sindhi", "Singaporean", "Snacks", "Soups", "South Indian", "South Indian Cafe", "South Indian Dishes", "Spanish", "Sri Lankan", "Steak", "Street Food", "Sushi", "Sweets"],
  T: ["Tandoori", "Tandoori Starters", "Tandoori items", "Tea", "Tex-Mex", "Thai", "Thali", "Tibetan", "Turkish"],
  U: ["Udupi"],
  V: ["Veg & Non Veg Food Items", "Veg Specials", "Vegan", "Vietnamese"],
  W: ["Waffles", "Wraps"]
};

export default function AllCategoriesDirectory({ stateKey }: { stateKey: string }) {
  const [, setLocation] = useLocation();

  return (
    <div style={{ padding: "40px 24px", maxWidth: 1080, margin: "0 auto", fontFamily: "'Inter', sans-serif" }}>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0F1B2D", marginBottom: 32 }}>All Categories</h2>
      
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {Object.entries(CATEGORY_DICTIONARY).map(([letter, categories]) => (
          <div key={letter} style={{ display: "flex", gap: 24, borderBottom: "1px solid #EAE6E0", paddingBottom: 24 }}>
            <div style={{ width: 40, flexShrink: 0 }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#E07526" }}>{letter}</div>
            </div>
            
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 24px", flex: 1 }}>
              {categories.map(cat => (
                <div 
                  key={cat}
                  onClick={() => setLocation(`/${stateKey}/restaurants/${encodeURIComponent(cat.replace(/\s+/g, '-'))}`)}
                  style={{ 
                    fontSize: 15, 
                    color: "#0F1B2D", 
                    cursor: "pointer", 
                    transition: "color 0.2s" 
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "#E07526"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "#0F1B2D"}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
