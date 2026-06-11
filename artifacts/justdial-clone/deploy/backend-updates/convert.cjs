const fs = require('fs');

const inputStr = `
{
  "GlobalCuisine": {
    "Indian": {
      "Breads": ["Parotta", "Chapati", "Naan", "Poori", "Bhatura", "Kulcha", "Rumali Roti"],
      "Rice & Biryani": ["Hyderabadi Biryani", "Malabar Biryani", "Lucknowi Biryani", "Veg Pulao", "Curd Rice"],
      "Curries": ["Butter Chicken", "Paneer Masala", "Dal Tadka", "Chole", "Fish Curry", "Avial"],
      "Snacks": ["Samosa", "Pakora", "Cutlet", "Vada Pav", "Bhel Puri"],
      "Desserts": ["Payasam", "Gulab Jamun", "Rasmalai", "Halwa", "Barfi", "Jalebi"],
      "Juices & Drinks": ["Mango Lassi", "Masala Chai", "Filter Coffee", "Tender Coconut", "Badam Milk"]
    },
    "Arabic": {
      "Main Dishes": ["Mandi", "Kabsa", "Shawarma", "Falafel", "Majboos"],
      "Breads": ["Khubz", "Samoon", "Pita"],
      "Desserts": ["Kunafa", "Baklava", "Basbousa"],
      "Juices & Drinks": ["Mint Lemonade", "Jallab", "Qamar Al-Deen"]
    },
    "Chinese": {
      "Main Dishes": ["Chow Mein", "Fried Rice", "Kung Pao Chicken", "Manchurian"],
      "Soups": ["Hot & Sour Soup", "Sweet Corn Soup"],
      "Desserts": ["Sesame Balls", "Mango Pudding"],
      "Juices & Drinks": ["Lychee Juice", "Green Tea"]
    },
    "Italian": {
      "Pasta": ["Spaghetti Carbonara", "Penne Arrabbiata", "Lasagna"],
      "Pizza": ["Margherita", "Pepperoni", "Four Cheese"],
      "Desserts": ["Tiramisu", "Panna Cotta", "Cannoli"],
      "Juices & Drinks": ["Lemon Soda", "Espresso", "Cappuccino"]
    },
    "American": {
      "Fast Food": ["Burger", "Fries", "Hot Dog", "Fried Chicken"],
      "BBQ": ["Ribs", "Brisket", "Pulled Pork"],
      "Desserts": ["Cheesecake", "Brownie", "Apple Pie"],
      "Juices & Drinks": ["Orange Juice", "Milkshake", "Iced Coffee"]
    },
    "Mediterranean": {
      "Greek": ["Gyros", "Moussaka", "Greek Salad"],
      "Spanish": ["Paella", "Tapas", "Churros"],
      "Desserts": ["Baklava", "Loukoumades"],
      "Juices & Drinks": ["Fresh Orange", "Pomegranate Juice"]
    },
    "Thai": {
      "Curries": ["Green Curry", "Red Curry", "Massaman Curry"],
      "Street Food": ["Pad Thai", "Som Tam"],
      "Desserts": ["Mango Sticky Rice", "Coconut Ice Cream"],
      "Juices & Drinks": ["Thai Iced Tea", "Lemongrass Juice"]
    },
    "Japanese": {
      "Main Dishes": ["Sushi", "Ramen", "Tempura"],
      "Desserts": ["Mochi", "Dorayaki"],
      "Juices & Drinks": ["Matcha Tea", "Yuzu Juice"]
    },
    "Korean": {
      "Main Dishes": ["Bulgogi", "Bibimbap", "Tteokbokki"],
      "Desserts": ["Hotteok", "Bingsu"],
      "Juices & Drinks": ["Ginseng Tea", "Pear Juice"]
    },
    "African": {
      "North African": ["Couscous", "Tagine", "Harira"],
      "West African": ["Jollof Rice", "Suya", "Egusi Soup"],
      "Desserts": ["Mandazi", "Malva Pudding"],
      "Juices & Drinks": ["Hibiscus Juice", "Tamarind Drink"]
    }
  }
}
{
  "IndianRegionalCuisine": {
    "Kerala": {
      "Main Dishes": ["Kerala Beef Fry", "Fish Curry", "Avial", "Thoran", "Puttu", "Appam"],
      "Breads": ["Parotta", "Chapati", "Pathiri"],
      "Rice & Biryani": ["Malabar Biryani", "Ghee Rice", "Curd Rice"],
      "Desserts": ["Ada Pradhaman", "Paal Payasam", "Unniyappam"],
      "Juices & Drinks": ["Tender Coconut", "Pineapple Juice", "Lime Soda"]
    },
    "Tamil Nadu": {
      "Main Dishes": ["Chettinad Chicken", "Kuzhambu", "Sambar", "Rasam"],
      "Breads": ["Parotta", "Idiyappam"],
      "Rice & Biryani": ["Dindigul Biryani", "Lemon Rice", "Curd Rice"],
      "Desserts": ["Kesari", "Payasam", "Jangiri"],
      "Juices & Drinks": ["Filter Coffee", "Buttermilk", "Mango Juice"]
    },
    "Andhra Pradesh": {
      "Main Dishes": ["Gongura Chicken", "Pulusu", "Pesarattu"],
      "Breads": ["Chapati", "Poori"],
      "Rice & Biryani": ["Andhra Biryani", "Tomato Rice"],
      "Desserts": ["Pootharekulu", "Payasam"],
      "Juices & Drinks": ["Lemon Soda", "Buttermilk"]
    },
    "Karnataka": {
      "Main Dishes": ["Bisi Bele Bath", "Ragi Mudde", "Neer Dosa"],
      "Breads": ["Chapati", "Akki Roti"],
      "Rice & Biryani": ["Mangalore Biryani", "Puliyogare"],
      "Desserts": ["Mysore Pak", "Kesari Bath"],
      "Juices & Drinks": ["Filter Coffee", "Sugarcane Juice"]
    },
    "Punjab": {
      "Main Dishes": ["Butter Chicken", "Dal Makhani", "Sarson da Saag"],
      "Breads": ["Naan", "Kulcha", "Paratha"],
      "Rice & Biryani": ["Jeera Rice", "Veg Pulao"],
      "Desserts": ["Phirni", "Gulab Jamun", "Lassi"],
      "Juices & Drinks": ["Sweet Lassi", "Mango Shake"]
    },
    "Gujarat": {
      "Main Dishes": ["Undhiyu", "Kadhi", "Sev Tameta"],
      "Breads": ["Thepla", "Rotla"],
      "Rice & Biryani": ["Khichdi", "Dal Rice"],
      "Desserts": ["Shrikhand", "Basundi"],
      "Juices & Drinks": ["Chaas", "Lemon Juice"]
    },
    "Rajasthan": {
      "Main Dishes": ["Dal Baati Churma", "Gatte ki Sabzi", "Laal Maas"],
      "Breads": ["Bajra Roti", "Missi Roti"],
      "Rice & Biryani": ["Veg Pulao", "Jeera Rice"],
      "Desserts": ["Ghevar", "Malpua"],
      "Juices & Drinks": ["Buttermilk", "Lemon Soda"]
    },
    "Bengal": {
      "Main Dishes": ["Macher Jhol", "Shorshe Ilish", "Chingri Malai Curry"],
      "Breads": ["Luchi", "Roti"],
      "Rice & Biryani": ["Kolkata Biryani", "Plain Rice"],
      "Desserts": ["Rasgulla", "Mishti Doi", "Sandesh"],
      "Juices & Drinks": ["Sugarcane Juice", "Coconut Water"]
    },
    "Hyderabad": {
      "Main Dishes": ["Hyderabadi Biryani", "Haleem", "Mirchi Ka Salan"],
      "Breads": ["Rumali Roti", "Naan"],
      "Desserts": ["Double Ka Meetha", "Qubani Ka Meetha"],
      "Juices & Drinks": ["Lemon Soda", "Falooda"]
    }
  }
}
{
  "GlobalJuicesAndBeverages": {
    "Indian": {
      "Fresh Juices": ["Mango Juice", "Pineapple Juice", "Watermelon Juice", "Tender Coconut", "Sugarcane Juice", "Lime Soda"],
      "Milk Drinks": ["Badam Milk", "Rose Milk", "Falooda", "Lassi", "Mango Shake"],
      "Hot Beverages": ["Masala Chai", "Filter Coffee", "Green Tea"],
      "Regional Specials": ["Panakam (South India)", "Solkadhi (Maharashtra)", "Thandai (North India)"]
    },
    "Arabic": {
      "Fresh Juices": ["Mint Lemonade", "Pomegranate Juice", "Orange Juice", "Carrot Juice"],
      "Milk Drinks": ["Camel Milk", "Date Milkshake"],
      "Hot Beverages": ["Arabic Coffee (Qahwa)", "Mint Tea"],
      "Specials": ["Jallab", "Qamar Al-Deen", "Rose Water Drink"]
    },
    "Thai": {
      "Fresh Juices": ["Lemongrass Juice", "Coconut Water", "Mango Juice"],
      "Milk Drinks": ["Thai Iced Tea", "Thai Coffee"],
      "Mocktails": ["Tamarind Cooler", "Pineapple Mint"],
      "Specials": ["Butterfly Pea Tea", "Longan Juice"]
    },
    "Chinese": {
      "Fresh Juices": ["Lychee Juice", "Pear Juice", "Plum Juice"],
      "Hot Beverages": ["Green Tea", "Oolong Tea", "Jasmine Tea"],
      "Cold Drinks": ["Bubble Tea", "Soy Milk"],
      "Specials": ["Chrysanthemum Tea", "Red Bean Drink"]
    },
    "Japanese": {
      "Fresh Juices": ["Yuzu Juice", "Melon Juice"],
      "Hot Beverages": ["Matcha Tea", "Sencha", "Hojicha"],
      "Cold Drinks": ["Ramune Soda", "Calpis Water"],
      "Specials": ["Sakura Latte", "Genmaicha"]
    },
    "Korean": {
      "Fresh Juices": ["Pear Juice", "Citron Tea (Yuja-cha)"],
      "Hot Beverages": ["Ginseng Tea", "Barley Tea"],
      "Cold Drinks": ["Banana Milk", "Sujeonggwa (Cinnamon Punch)"],
      "Specials": ["Omija Tea", "Persimmon Punch"]
    },
    "Mediterranean": {
      "Fresh Juices": ["Orange Juice", "Pomegranate Juice", "Grape Juice"],
      "Hot Beverages": ["Turkish Coffee", "Greek Coffee", "Mint Tea"],
      "Cold Drinks": ["Ayran", "Lemonade"],
      "Specials": ["Rose Water Drink", "Carob Juice"]
    },
    "European": {
      "Fresh Juices": ["Apple Juice", "Orange Juice", "Berry Mix"],
      "Hot Beverages": ["Espresso", "Cappuccino", "Latte", "Black Tea"],
      "Cold Drinks": ["Iced Coffee", "Sparkling Water"],
      "Specials": ["Mulled Wine", "Hot Chocolate"]
    },
    "American": {
      "Fresh Juices": ["Orange Juice", "Apple Juice", "Cranberry Juice"],
      "Milk Drinks": ["Milkshake", "Smoothie", "Iced Coffee"],
      "Hot Beverages": ["Coffee", "Hot Chocolate", "Tea"],
      "Mocktails": ["Virgin Mojito", "Lemon Iced Tea", "Berry Cooler"]
    },
    "African": {
      "Fresh Juices": ["Hibiscus Juice", "Tamarind Juice", "Baobab Juice"],
      "Hot Beverages": ["Rooibos Tea", "Spiced Coffee"],
      "Cold Drinks": ["Ginger Beer", "Palm Wine"],
      "Specials": ["Sobolo (Ghana)", "Zobo (Nigeria)"]
    }
  }
}
{
  "GlobalDessertsAndBakery": {
    "Indian": {
      "Traditional Sweets": ["Gulab Jamun", "Rasmalai", "Barfi", "Laddu", "Halwa", "Jalebi", "Payasam"],
      "Regional Specials": ["Mysore Pak (Karnataka)", "Ghevar (Rajasthan)", "Phirni (Punjab)", "Unniyappam (Kerala)"],
      "Bakery & Cakes": ["Fruit Cake", "Black Forest", "Honey Cake"],
      "Frozen Desserts": ["Kulfi", "Ice Cream", "Falooda"],
      "Tags": ["Indian", "Sweet", "Dessert", "Veg"]
    },
    "Arabic": {
      "Traditional Sweets": ["Baklava", "Kunafa", "Basbousa", "Maamoul"],
      "Modern Desserts": ["Date Cake", "Rose Milk Pudding"],
      "Frozen Desserts": ["Arabic Ice Cream (Booza)", "Pistachio Gelato"],
      "Bakery": ["Semolina Cake", "Honey Pastry"],
      "Tags": ["Arabic", "Middle East", "Sweet", "Dessert"]
    },
    "European": {
      "French": ["Crème Brûlée", "Éclair", "Macaron", "Croissant", "Tart"],
      "Italian": ["Tiramisu", "Panna Cotta", "Cannoli"],
      "German": ["Black Forest Cake", "Apple Strudel"],
      "British": ["Trifle", "Sticky Toffee Pudding", "Scones"],
      "Tags": ["European", "Sweet", "Dessert", "Bakery"]
    },
    "American": {
      "Classic Desserts": ["Cheesecake", "Brownie", "Apple Pie", "Donut"],
      "Frozen Desserts": ["Ice Cream Sundae", "Milkshake", "Frozen Yogurt"],
      "Bakery": ["Cupcake", "Chocolate Chip Cookie", "Cinnamon Roll"],
      "Tags": ["American", "Sweet", "Dessert", "Bakery"]
    },
    "Asian": {
      "Chinese": ["Mooncake", "Sesame Balls", "Mango Pudding"],
      "Japanese": ["Mochi", "Dorayaki", "Matcha Cake"],
      "Thai": ["Mango Sticky Rice", "Coconut Ice Cream"],
      "Korean": ["Hotteok", "Bingsu"],
      "Tags": ["Asian", "Sweet", "Dessert", "Frozen"]
    },
    "Mediterranean": {
      "Greek": ["Baklava", "Loukoumades", "Galaktoboureko"],
      "Spanish": ["Churros", "Flan", "Crema Catalana"],
      "Tags": ["Mediterranean", "Sweet", "Dessert"]
    },
    "African": {
      "North African": ["Makroud", "Chebakia"],
      "West African": ["Puff-Puff", "Coconut Candy"],
      "South African": ["Malva Pudding", "Koeksister"],
      "Tags": ["African", "Sweet", "Dessert"]
    }
  }
}
{
  "GlobalStreetFoodAndFusion": {
    "Indian": {
      "Street Food": ["Pani Puri", "Chaat", "Vada Pav", "Pav Bhaji", "Samosa", "Kachori", "Bhel Puri"],
      "Snacks": ["Pakora", "Cutlet", "Murukku", "Mixture", "Banana Chips"],
      "Fusion": ["Paneer Tacos", "Butter Chicken Pizza", "Masala Pasta", "Indo-Chinese Fried Rice"],
      "Tags": ["Indian", "Street Food", "Snack", "Fusion", "Veg", "Non-Veg"]
    },
    "Arabic": {
      "Street Food": ["Shawarma", "Falafel Roll", "Manakish", "Sambousek"],
      "Snacks": ["Hummus with Pita", "Labneh Dip", "Stuffed Grape Leaves"],
      "Fusion": ["Shawarma Burger", "Falafel Wrap", "Arabic Pizza"],
      "Tags": ["Arabic", "Middle East", "Street Food", "Snack", "Fusion"]
    },
    "Chinese": {
      "Street Food": ["Chow Mein", "Spring Roll", "Fried Rice", "Baozi"],
      "Snacks": ["Dim Sum", "Dumplings", "Sesame Balls"],
      "Fusion": ["Chinese Bhel", "Manchurian Pizza", "Chili Paneer Wrap"],
      "Tags": ["Chinese", "Asian", "Street Food", "Fusion"]
    },
    "Thai": {
      "Street Food": ["Pad Thai", "Som Tam", "Fried Banana", "Satay"],
      "Snacks": ["Spring Roll", "Fish Cake"],
      "Fusion": ["Thai Pizza", "Coconut Curry Pasta"],
      "Tags": ["Thai", "Street Food", "Snack", "Fusion"]
    },
    "Italian": {
      "Street Food": ["Panini", "Arancini", "Pizza Slice"],
      "Snacks": ["Garlic Bread", "Bruschetta"],
      "Fusion": ["Pasta Burger", "Pizza Roll"],
      "Tags": ["Italian", "Street Food", "Snack", "Fusion"]
    },
    "American": {
      "Street Food": ["Hot Dog", "Burger", "Fries", "Corn Dog"],
      "Snacks": ["Nachos", "Popcorn", "Pretzel"],
      "Fusion": ["BBQ Pizza", "Loaded Fries", "Cheese Burrito"],
      "Tags": ["American", "Fast Food", "Snack", "Fusion"]
    },
    "Mediterranean": {
      "Street Food": ["Gyros", "Kebab", "Falafel", "Pita Wrap"],
      "Snacks": ["Greek Salad", "Olive Tapenade"],
      "Fusion": ["Mediterranean Pizza", "Hummus Burger"],
      "Tags": ["Mediterranean", "Street Food", "Snack", "Fusion"]
    },
    "Japanese": {
      "Street Food": ["Takoyaki", "Okonomiyaki", "Yakitori"],
      "Snacks": ["Rice Crackers", "Onigiri"],
      "Fusion": ["Sushi Burrito", "Ramen Burger"],
      "Tags": ["Japanese", "Street Food", "Snack", "Fusion"]
    },
    "Korean": {
      "Street Food": ["Tteokbokki", "Kimbap", "Hotteok"],
      "Snacks": ["Seaweed Chips", "Fish Cake"],
      "Fusion": ["Korean BBQ Burger", "Kimchi Pizza"],
      "Tags": ["Korean", "Street Food", "Snack", "Fusion"]
    },
    "Mexican": {
      "Street Food": ["Tacos", "Burritos", "Quesadilla"],
      "Snacks": ["Nachos", "Churros"],
      "Fusion": ["Mexican Pizza", "Taco Pasta"],
      "Tags": ["Mexican", "Street Food", "Snack", "Fusion"]
    }
  }
}
{
  "GlobalSeafoodAndGrilledSpecials": {
    "Indian": {
      "Seafood": ["Fish Curry", "Prawn Masala", "Crab Roast", "Squid Fry", "Meen Pollichathu"],
      "Grilled & BBQ": ["Tandoori Chicken", "Seekh Kebab", "Fish Tikka", "Paneer Tikka", "Chicken 65"],
      "Regional Specials": ["Malabar Fish Curry (Kerala)", "Goan Prawn Curry", "Hyderabadi Grilled Chicken"],
      "Tags": ["Indian", "Seafood", "Grilled", "BBQ", "Non-Veg", "Spicy"]
    },
    "Arabic": {
      "Seafood": ["Grilled Hammour", "Shrimp Majboos", "Fish Mandi"],
      "Grilled & BBQ": ["Shish Tawook", "Kofta Kebab", "Lamb Chops", "Chicken Mandi"],
      "Regional Specials": ["Emirati Grilled Fish", "Lebanese Mixed Grill"],
      "Tags": ["Arabic", "Middle East", "Seafood", "Grilled", "BBQ"]
    },
    "Mediterranean": {
      "Seafood": ["Grilled Sea Bass", "Calamari", "Shrimp Saganaki"],
      "Grilled & BBQ": ["Greek Souvlaki", "Turkish Doner", "Kebab Platter"],
      "Vegetarian Grill": ["Grilled Halloumi", "Vegetable Skewers"],
      "Tags": ["Mediterranean", "Seafood", "Grilled", "Veg", "Non-Veg"]
    },
    "American": {
      "Seafood": ["Grilled Salmon", "Fish Tacos", "Shrimp Scampi"],
      "BBQ": ["Ribs", "Brisket", "Pulled Pork", "BBQ Chicken"],
      "Vegetarian Grill": ["Grilled Corn", "BBQ Veg Burger"],
      "Tags": ["American", "BBQ", "Seafood", "Grilled", "Non-Veg"]
    },
    "Asian": {
      "Seafood": ["Teriyaki Salmon", "Sweet & Sour Fish", "Tempura Shrimp"],
      "Grilled & BBQ": ["Yakitori (Japan)", "Satay (Thailand)", "Korean BBQ"],
      "Vegetarian Grill": ["Tofu Skewers", "Grilled Vegetables"],
      "Tags": ["Asian", "Seafood", "Grilled", "BBQ"]
    },
    "African": {
      "Seafood": ["Grilled Tilapia", "Fish Stew", "Shrimp Pilau"],
      "BBQ": ["Nyama Choma (Kenya)", "Braai (South Africa)", "Suya (Nigeria)"],
      "Vegetarian Grill": ["Grilled Plantain", "Corn on Cob"],
      "Tags": ["African", "Seafood", "Grilled", "BBQ"]
    },
    "European": {
      "Seafood": ["Fish & Chips", "Grilled Trout", "Seafood Paella"],
      "Grilled & BBQ": ["German Bratwurst", "Spanish BBQ", "Italian Grilled Chicken"],
      "Vegetarian Grill": ["Grilled Asparagus", "Stuffed Peppers"],
      "Tags": ["European", "Seafood", "Grilled", "BBQ"]
    }
  }
}
{
  "GlobalBreakfastAndHealthyOptions": {
    "Indian": {
      "Breakfast": ["Idli", "Dosa", "Upma", "Poha", "Paratha", "Puri Bhaji", "Aloo Tikki"],
      "Healthy Options": ["Oats Upma", "Vegetable Salad", "Moong Dal Soup", "Fruit Bowl"],
      "Drinks": ["Masala Chai", "Filter Coffee", "Lassi", "Tender Coconut"],
      "Tags": ["Indian", "Breakfast", "Healthy", "Veg"]
    },
    "Arabic": {
      "Breakfast": ["Manakish", "Labneh with Olive Oil", "Foul Medames", "Hummus with Pita"],
      "Healthy Options": ["Tabouleh", "Fattoush", "Grilled Chicken Salad"],
      "Drinks": ["Mint Tea", "Arabic Coffee", "Fresh Juice"],
      "Tags": ["Arabic", "Breakfast", "Healthy", "Veg", "Non-Veg"]
    },
    "European": {
      "Breakfast": ["Croissant", "Omelette", "Toast with Jam", "Pancakes"],
      "Healthy Options": ["Greek Yogurt Bowl", "Avocado Toast", "Fruit Smoothie"],
      "Drinks": ["Espresso", "Cappuccino", "Orange Juice"],
      "Tags": ["European", "Breakfast", "Healthy"]
    },
    "American": {
      "Breakfast": ["Scrambled Eggs", "Pancakes", "Waffles", "Bagel with Cream Cheese"],
      "Healthy Options": ["Oatmeal", "Granola Bowl", "Egg White Omelette"],
      "Drinks": ["Coffee", "Milkshake", "Green Smoothie"],
      "Tags": ["American", "Breakfast", "Healthy"]
    },
    "Mediterranean": {
      "Breakfast": ["Greek Yogurt with Honey", "Olive Toast", "Cheese Platter"],
      "Healthy Options": ["Quinoa Salad", "Grilled Vegetables", "Lentil Soup"],
      "Drinks": ["Herbal Tea", "Fresh Orange Juice"],
      "Tags": ["Mediterranean", "Breakfast", "Healthy"]
    },
    "Asian": {
      "Breakfast": ["Congee (China)", "Miso Soup (Japan)", "Nasi Lemak (Malaysia)", "Roti Canai (Singapore)"],
      "Healthy Options": ["Steamed Vegetables", "Tofu Salad", "Rice Porridge"],
      "Drinks": ["Green Tea", "Soy Milk", "Lemongrass Juice"],
      "Tags": ["Asian", "Breakfast", "Healthy"]
    },
    "African": {
      "Breakfast": ["Mandazi", "Chapati", "Egg Stew", "Porridge"],
      "Healthy Options": ["Fruit Salad", "Vegetable Soup", "Grilled Plantain"],
      "Drinks": ["Hibiscus Tea", "Tamarind Juice"],
      "Tags": ["African", "Breakfast", "Healthy"]
    }
  }
}
`;

// Extract all valid JSON objects
const jsonBlocks = inputStr.split(/}\s*\n\s*{/).map((block, idx, arr) => {
  if (idx === 0) return block + '}';
  if (idx === arr.length - 1) return '{' + block;
  return '{' + block + '}';
});

let compiledData = {};
jsonBlocks.forEach(block => {
  try {
    const parsed = JSON.parse(block);
    Object.assign(compiledData, parsed);
  } catch (e) {
    console.error("Parse error on a block", e.message);
  }
});

// Construct the hierarchy array
function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

const finalHierarchy = [];

// Helper to add a Cuisine -> Main Category -> Child Category -> Items
function addItems(cuisineName, mainCatName, childCatName, items) {
  const cId = slugify(cuisineName);
  let cuisine = finalHierarchy.find(c => c.id === cId);
  if (!cuisine) {
    cuisine = { id: cId, name: cuisineName, main_categories: [] };
    finalHierarchy.push(cuisine);
  }
  
  const mId = slugify(mainCatName);
  let mainCat = cuisine.main_categories.find(m => m.id === mId);
  if (!mainCat) {
    mainCat = { id: mId, name: mainCatName, child_categories: [] };
    cuisine.main_categories.push(mainCat);
  }
  
  const childId = slugify(childCatName);
  let childCat = mainCat.child_categories.find(c => c.id === childId);
  if (!childCat) {
    childCat = { id: childId, name: childCatName, items: [] };
    mainCat.child_categories.push(childCat);
  }
  
  // Add items
  items.forEach(itemName => {
    if (itemName === "Tags") return; // Skip tags array
    if (Array.isArray(itemName)) return; // safety
    const itemId = slugify(itemName);
    if (!childCat.items.find(i => i.id === itemId)) {
      childCat.items.push({ id: itemId, name: itemName });
    }
  });
}

// Process the data: 
// The data structure is like:
// { "GlobalCuisine": { "Indian": { "Breads": ["Parotta", ...], ... } } }

for (const [sectionName, cuisines] of Object.entries(compiledData)) {
  for (const [cuisineName, categories] of Object.entries(cuisines)) {
    // The main category name can just be the sectionName or cuisineName + section
    let mainCategoryLabel = sectionName.replace(/([A-Z])/g, ' $1').trim(); // "Global Cuisine"
    if (sectionName === "IndianRegionalCuisine") {
      mainCategoryLabel = "Regional Cuisine";
    }
    
    for (const [childCategoryName, items] of Object.entries(categories)) {
      if (childCategoryName === "Tags") continue;
      addItems(cuisineName, mainCategoryLabel, childCategoryName, items);
    }
  }
}

fs.writeFileSync('authenticCuisineCategories.json', JSON.stringify(finalHierarchy, null, 2));
console.log('Successfully generated authenticCuisineCategories.json');
