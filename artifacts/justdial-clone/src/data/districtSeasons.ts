export interface SeasonInfo {
  months: string;
  title: string;
  temp: string;
  points: string[];
}

export interface DistrictSeasonData {
  peak: SeasonInfo;
  moderate: SeasonInfo;
  off: SeasonInfo;
}

export const districtSeasons: Record<string, DistrictSeasonData> = {
  // === KERALA ===
  "Alappuzha": {
    peak: {
      months: "October - February",
      title: "Houseboat & Backwater Peak Season",
      temp: "18°C to 28°C",
      points: [
        "Perfect water levels for luxury houseboat cruises in Alleppey",
        "Watch traditional snake boat races on calm backwater canals",
        "Charming, cool evening breeze ideal for beach walks and local toddy parlor dining"
      ]
    },
    moderate: {
      months: "June - September",
      title: "Monsoon Rejuvenation",
      temp: "22°C to 30°C",
      points: [
        "Lush green paddy fields along the canals glow with vibrant colors",
        "Enjoy romantic monsoon showers over the backwater lagoons",
        "Best time for Ayurvedic wellness therapies at premium lake resorts"
      ]
    },
    off: {
      months: "March - May",
      title: "Humid Summer Shorelines",
      temp: "26°C to 34°C",
      points: [
        "Warm weather, perfect for early morning or late evening beach visits",
        "Highly discounted rates for luxury houseboats and lakeside stays",
        "Enjoy fresh seafood, sweet mangoes, and calm, uncrowded sightseeing"
      ]
    }
  },
  "Idukki": {
    peak: {
      months: "September - March",
      title: "Winter Tea Hills & Mist",
      temp: "10°C to 22°C",
      points: [
        "Delightfully chilly weather, ideal for exploring Munnar tea gardens",
        "Thick morning fog over the valleys makes for breathtaking viewpoints",
        "Perfect time for trekking to Anamudi Peak and wild elephant spotting"
      ]
    },
    moderate: {
      months: "June - August",
      title: "Monsoon Misty Passages",
      temp: "14°C to 20°C",
      points: [
        "Waterfalls like Attukad and Cheeyappara are in full, roaring cascade",
        "Western Ghat passes are enveloped in romantic, dense rolling clouds",
        "Experience tea fields fresh from rain, smelling of cardamoms"
      ]
    },
    off: {
      months: "April - May",
      title: "High-Altitude Summer Retreat",
      temp: "18°C to 28°C",
      points: [
        "Escape the plainlands heat to cool hill stations with pleasant breezes",
        "Splendid time to see blooming jacarandas and wildflowers in the valleys",
        "Bargain deals at premium plantation bungalows and forest lodges"
      ]
    }
  },
  "Wayanad": {
    peak: {
      months: "October - March",
      title: "Cool Wilderness & Trekking",
      temp: "14°C to 24°C",
      points: [
        "Cool climate perfect for trekking to Chembra Peak and Edakkal Caves",
        "Misty mornings over the Banasura Sagar Dam reservoirs",
        "Excellent visibility for wildlife spotting in Wayanad Sanctuary"
      ]
    },
    moderate: {
      months: "June - September",
      title: "Monsoon Forest Mystique",
      temp: "18°C to 23°C",
      points: [
        "Waterfalls are highly active and forests turn incredibly green",
        "Perfect for cozy homestays, listening to rain, and spice plantation tours",
        "Lush valleys are blanketed in a dreamy fog layer"
      ]
    },
    off: {
      months: "April - May",
      title: "Warm Summer Hideout",
      temp: "22°C to 30°C",
      points: [
        "Comfortable temperatures compared to plain regions",
        "Peaceful sightseeing with minimal crowds at key viewpoints",
        "Great discounts on wellness resorts and forest cottages"
      ]
    }
  },
  "Thiruvananthapuram": {
    peak: {
      months: "November - February",
      title: "Winter Beach & Culture Season",
      temp: "20°C to 30°C",
      points: [
        "Fabulous weather for surfing at Kovalam and Varkala cliffs",
        "Enjoy beach festivals, open-air seafood shacks, and active watersports",
        "Perfect time to visit Padmanabhaswamy Temple and local palaces"
      ]
    },
    moderate: {
      months: "June - October",
      title: "Monsoon Rejuvenation",
      temp: "23°C to 29°C",
      points: [
        "Experience dramatic sea waves crashing against Varkala cliffs",
        "Peak season for traditional Ayurvedic healing treatments",
        "Lush green coastal coconut groves under cloudy skies"
      ]
    },
    off: {
      months: "March - May",
      title: "Sunny Coastal Summer",
      temp: "26°C to 35°C",
      points: [
        "Hot and sunny beach days, ideal for sunset swimming and sunbathing",
        "Huge discounts on cliffside luxury hotels and boutique beach homestays",
        "Peaceful, quiet beach walks devoid of large tourist crowds"
      ]
    }
  },
  "Ernakulam": {
    peak: {
      months: "October - March",
      title: "Winter & Art Festival Season",
      temp: "21°C to 31°C",
      points: [
        "Perfect weather for Fort Kochi walking tours and visiting Chinese fishing nets",
        "Enjoy art exhibitions, local street markets, and Kochi Biennale",
        "Cool sea breeze at Marine Drive and active harbor cruises"
      ]
    },
    moderate: {
      months: "June - September",
      title: "Monsoon Harbor Vibes",
      temp: "23°C to 30°C",
      points: [
        "Beautiful rainy views of Kochi port and ship traffic",
        "Great season for indoor cafe hopping and exploring antique shops in Jew Town",
        "Lush greenery throughout the urban backwaters"
      ]
    },
    off: {
      months: "April - May",
      title: "Humid Summer Coastal Shopping",
      temp: "26°C to 35°C",
      points: [
        "Humid summer days, best spent shopping in large air-conditioned malls",
        "Substantially reduced prices on premium star hotels and resort stays",
        "Quiet evening walks along Fort Kochi beach"
      ]
    }
  },
  "Kollam": {
    peak: {
      months: "October - March",
      title: "Ashtamudi Lake & Houseboats",
      temp: "22°C to 30°C",
      points: [
        "Calm houseboat cruises on Ashtamudi Lake without major tourist crowds",
        "Explore the historical Tangasseri Lighthouse and nearby quiet beaches",
        "Take a scenic drive to the Thenmala eco-tourism zone for forest canopy walks"
      ]
    },
    moderate: {
      months: "June - September",
      title: "Monsoon Backwater Swell",
      temp: "23°C to 28°C",
      points: [
        "Watch rainfall over the vast, connected backwater lakes and rivers",
        "Ideal time for traditional, relaxing Ayurvedic healthcare packages",
        "Enjoy the deep green look of coco-palm islands along the lake edges"
      ]
    },
    off: {
      months: "April - May",
      title: "Coastal Summer Breeze",
      temp: "27°C to 34°C",
      points: [
        "Warm weather, perfect for early morning temple visits or late beach strolls",
        "Excellent coastal dining with fresh backwater fish and toddy delicacies",
        "Remarkable seasonal discounts at lakeside heritage resorts"
      ]
    }
  },
  "Pathanamthitta": {
    peak: {
      months: "November - February",
      title: "Sabarimala Pilgrim & Forest Winter",
      temp: "18°C to 28°C",
      points: [
        "Witness Sabarimala pilgrim season and vibrant local temple festivals",
        "Perfect, cool weather for exploring Gavi's dense evergreen forests",
        "Enjoy tranquil coracle bamboo rafting at the Adavi eco-tourism site"
      ]
    },
    moderate: {
      months: "June - September",
      title: "Vibrant Forest Monsoon",
      temp: "20°C to 26°C",
      points: [
        "Monsoon rains completely revive the forest rivers and mountain streams",
        "Achankovil and Pamba rivers flow with incredible strength and speed",
        "Peaceful stays at misty hill station eco-lodges"
      ]
    },
    off: {
      months: "March - May",
      title: "Quiet Summer Valleys",
      temp: "24°C to 33°C",
      points: [
        "Uncrowded temple visits and peaceful sight-seeing tours",
        "Budget-friendly eco-tourism packages and wilderness resort rates",
        "Great drives along the scenic foothills of the Western Ghats"
      ]
    }
  },
  "Kottayam": {
    peak: {
      months: "September - February",
      title: "Kumarakom Bird Sanctuary Peak",
      temp: "20°C to 29°C",
      points: [
        "Ideal weather for bird watching and spotting migratory species in Kumarakom",
        "Stunning, clear blue views of the massive Vembanad Lake",
        "Lively local houseboat traffic, luxury boat rides, and fishing trips"
      ]
    },
    moderate: {
      months: "June - August",
      title: "Monsoon Wetlands",
      temp: "22°C to 28°C",
      points: [
        "Watch heavy monsoon rains sweep across the expansive lake surface",
        "Best time for authentic Ayurvedic massage and healing therapies",
        "Cozy, relaxing stays listening to the rain at boutique water villas"
      ]
    },
    off: {
      months: "March - May",
      title: "Lakeside Summer Retreat",
      temp: "25°C to 34°C",
      points: [
        "Warm summer evenings, perfect for sunset boat rides and lake fishing",
        "Exceptional price drops on five-star luxury lakeside resorts",
        "Feast on seasonal sweet mangoes, pineapples, and fresh pearl spot fish"
      ]
    }
  },
  "Thrissur": {
    peak: {
      months: "October - May",
      title: "Cultural Festivals & Heritage",
      temp: "22°C to 32°C",
      points: [
        "Witness grand local temple festivals, including the world-famous Thrissur Pooram",
        "Pleasant winter weather for exploring Athirappilly waterfall parks",
        "Excellent time for historical walks around temples and museum galleries"
      ]
    },
    moderate: {
      months: "June - September",
      title: "Roaring Waterfalls Monsoon",
      temp: "23°C to 29°C",
      points: [
        "Athirappilly and Vazhachal waterfalls swell into massive, roaring cascades",
        "Rainforest trails are filled with active wildlife and fresh mountain streams",
        "Beautiful misty landscapes at Peechi Dam reservoir gardens"
      ]
    },
    off: {
      months: "March - April",
      title: "Quiet Cultural Trails",
      temp: "26°C to 35°C",
      points: [
        "Quiet sightseeing with zero crowds at key museums and palaces",
        "Budget-friendly hotel rates in Kerala's cultural capital",
        "Taste local temple feasts and shop for authentic handloom clothes"
      ]
    }
  },
  "Palakkad": {
    peak: {
      months: "November - February",
      title: "Winter Fort & Silent Valley",
      temp: "20°C to 28°C",
      points: [
        "Cool breeze flows through the Palakkad Gap, keeping days comfortable",
        "Perfect trekking conditions inside Silent Valley National Park's rainforests",
        "Ideal time for visiting the historic stone Palakkad Fort and gardens"
      ]
    },
    moderate: {
      months: "June - September",
      title: "Monsoon Paddy Plains",
      temp: "22°C to 27°C",
      points: [
        "Lush green carpets of paddy fields stretch as far as the eye can see",
        "Dams like Malampuzha and Kanjirapuzha offer high water level views",
        "Enjoy mist-clad hill drives to Nelliyampathy heights"
      ]
    },
    off: {
      months: "March - May",
      title: "Nelliyampathy Summer Escape",
      temp: "28°C to 38°C",
      points: [
        "Escape the plainlands summer heat to the cool high hills of Nelliyampathy",
        "Substantially lower room tariffs at plantation homestays and hotels",
        "Enjoy traditional village festivals and summer harvest crops"
      ]
    }
  },
  "Malappuram": {
    peak: {
      months: "October - March",
      title: "Winter Rivers & Bird Sanctuary",
      temp: "21°C to 30°C",
      points: [
        "Ideal weather to spot migratory birds at Kadalundi Bird Sanctuary",
        "Pleasant temperatures for trekking in Nilambur teak forests",
        "Watch beautiful, clear winter sunsets at Padinharekara beach park"
      ]
    },
    moderate: {
      months: "June - September",
      title: "Monsoon Teak Valleys",
      temp: "22°C to 28°C",
      points: [
        "Watch heavy rain swell the Chaliyar and Bharathapuzha rivers",
        "The world's oldest teak plantations look fresh, rich, and deeply green",
        "Cozy stays and scenic river views at plantation guest houses"
      ]
    },
    off: {
      months: "April - May",
      title: "Humid Summer Vistas",
      temp: "26°C to 35°C",
      points: [
        "Quiet travel with no crowds at historical monuments and beaches",
        "Budget-friendly tariffs at riverfront hotels and eco-resorts",
        "Enjoy fresh summer mango crops and traditional Malabar delicacies"
      ]
    }
  },
  "Kozhikode": {
    peak: {
      months: "October - March",
      title: "Coastal Winter & Food Feasts",
      temp: "21°C to 31°C",
      points: [
        "Fabulous weather for evening relaxations at Kappad and Kozhikode beaches",
        "Best time to explore the culinary street culture, tasting Kozhikodan Biryani",
        "Enjoy scenic houseboat boat cruises along Elathur backwaters"
      ]
    },
    moderate: {
      months: "June - September",
      title: "Monsoon Sea Views & Falls",
      temp: "23°C to 29°C",
      points: [
        "Watch dramatic heavy monsoon sea waves from safe beach walk paths",
        "Thusharagiri and Arippara waterfalls run in full, spectacular flows",
        "Lush green hills and swollen reservoir vistas at Kakkayam Dam"
      ]
    },
    off: {
      months: "April - May",
      title: "Sunny Coastal Summer",
      temp: "26°C to 35°C",
      points: [
        "Warm summer days, best for cooling off during late evening beach dips",
        "Great discount rates for beach resorts and high-end city hotels",
        "Taste local summer refreshments like Kulukki Sarbath and fresh seafood"
      ]
    }
  },
  "Kannur": {
    peak: {
      months: "October - March",
      title: "Theyyam Festival & Drive-in Beaches",
      temp: "21°C to 31°C",
      points: [
        "Peak season to witness traditional Theyyam ritual dance performances",
        "Perfect dry sands to drive along Muzhappilangad Drive-in Beach",
        "Cool evening breezes at the historic St. Angelo Fort by the sea"
      ]
    },
    moderate: {
      months: "June - September",
      title: "Monsoon Cliffs & Plateau",
      temp: "23°C to 29°C",
      points: [
        "Heavy monsoon seas create spectacular views from cliffside vantages",
        "Madayipara laterite plateau turns into a vibrant blue-green carpet of flowers",
        "Excellent season for traditional monsoon Ayurvedic rejuvenation"
      ]
    },
    off: {
      months: "April - May",
      title: "Warm Seaside Summer",
      temp: "27°C to 35°C",
      points: [
        "Sunny weather, perfect for late evening beach activities and sunset walks",
        "Highly reduced rates on beachfront homestays and luxury resorts",
        "Explore historic forts and quiet beach coves with total privacy"
      ]
    }
  },
  "Kasaragod": {
    peak: {
      months: "October - March",
      title: "Bekal Fort & Silent Backwaters",
      temp: "20°C to 31°C",
      points: [
        "Perfect, cool weather to walk around the massive coastal Bekal Fort",
        "Houseboat cruising on the untouched Valiyaparamba backwaters",
        "Spectacular, clear sunset views over the sea at Kappil Beach cliffs"
      ]
    },
    moderate: {
      months: "June - September",
      title: "Monsoon Fortress Greenery",
      temp: "23°C to 28°C",
      points: [
        "Bekal Fort gardens and ramparts look exceptionally lush and emerald green",
        "Witness high waves crashing against the stone base of the fort",
        "Cozy stays at premium luxury wellness retreats with monsoon deals"
      ]
    },
    off: {
      months: "April - May",
      title: "Quiet Fortress Summer",
      temp: "26°C to 35°C",
      points: [
        "Uncrowded tourist sites and quiet beach relaxation",
        "Highly discounted rates at world-class luxury beach resorts",
        "Enjoy local fruit harvest festivals and calm evening walks"
      ]
    }
  },

  // === GOA ===
  "North Goa": {
    peak: {
      months: "November - February",
      title: "Winter Beach & Nightlife Season",
      temp: "21°C to 31°C",
      points: [
        "Sunny days and cool nights, perfect for beach hopping from Anjuna to Arambol",
        "All beach shacks, night clubs, and flea markets are fully operational",
        "Ideal for watersports, beach volleyball, and coastal cruise parties"
      ]
    },
    moderate: {
      months: "June - September",
      title: "Green Monsoon Coastal Retreat",
      temp: "24°C to 29°C",
      points: [
        "Lush green hills and swollen rivers present a different side of Goa",
        "Peaceful beaches with high wave action, great for watching the storm from shacks",
        "Fabulous deals on premium beach villas and boutique cottages"
      ]
    },
    off: {
      months: "March - May",
      title: "Warm Summer Sun",
      temp: "27°C to 35°C",
      points: [
        "Excellent time for cheap beers, water sports, and sunset swimming",
        "Uncrowded beaches and minimal traffic on the roads",
        "Fewer tourists allow peaceful stays at top-tier North Goa resorts"
      ]
    }
  },
  "South Goa": {
    peak: {
      months: "November - February",
      title: "Quiet Beach & Heritage Season",
      temp: "20°C to 30°C",
      points: [
        "Serene, white-sand beaches like Palolem and Colva are at their best",
        "Cool weather, ideal for visiting Portuguese mansions and churches",
        "Calm, crystal-clear sea water perfect for boat rides to spot dolphins"
      ]
    },
    moderate: {
      months: "June - September",
      title: "Monsoon Nature Trails",
      temp: "23°C to 28°C",
      points: [
        "Waterfalls like Dudhsagar swell into magnificent cascades of water",
        "Ideal for exploring spice plantations and silent forest hikes",
        "South Goa resorts offer premium luxury at a fraction of the cost"
      ]
    },
    off: {
      months: "March - May",
      title: "Tranquil Summer Escape",
      temp: "26°C to 34°C",
      points: [
        "Extremely peaceful, empty beaches offering complete privacy",
        "Favourable hotel rates at luxury wellness and yoga retreats",
        "Stunning, clear summer sunsets over the Arabian Sea"
      ]
    }
  },

  // === LADAKH ===
  "Leh": {
    peak: {
      months: "June - September",
      title: "Warm Summer & High Passes Open",
      temp: "12°C to 25°C",
      points: [
        "Pleasant daytime weather, perfect for visiting monasteries and local markets",
        "All high-altitude mountain passes (Khardung La, Chang La) are fully open",
        "Ideal conditions for trekking, biking, and camping near Pangong Tso"
      ]
    },
    moderate: {
      months: "May & October",
      title: "Crisp Spring & Golden Autumn",
      temp: "5°C to 18°C",
      points: [
        "Apricot blooms paint the valleys pink in spring, and poplars turn golden in autumn",
        "Clear blue skies and snowy mountain peaks make for amazing photography",
        "Fewer tourists allow peaceful exploration of Leh Palace and Shanti Stupa"
      ]
    },
    off: {
      months: "November - April",
      title: "Sub-Zero Snowy Winter",
      temp: "-15°C to 5°C",
      points: [
        "Stunning winter landscape with frozen lakes, including the Chadar Trek",
        "Witness local winter monastery festivals in a traditional atmosphere",
        "Extreme cold weather; most passes are blocked, accessible mostly by flight"
      ]
    }
  },
  "Kargil": {
    peak: {
      months: "June - September",
      title: "Mild Summer Harvest",
      temp: "15°C to 28°C",
      points: [
        "Very pleasant weather for visiting the Kargil War Memorial in Drass",
        "Beautiful green valleys full of ripening apricots and wheat fields",
        "Perfect time for road trips along the Srinagar-Leh Highway"
      ]
    },
    moderate: {
      months: "May & October",
      title: "Crisp Shoulder Season",
      temp: "6°C to 20°C",
      points: [
        "Beautiful autumn foliage and crisp, cold morning air",
        "Surrounding peaks receive fresh snowfall, offering dramatic views",
        "Peaceful stays at riverside guest houses"
      ]
    },
    off: {
      months: "November - April",
      title: "Freezing Himalayan Winter",
      temp: "-25°C to 2°C",
      points: [
        "Drass (near Kargil) becomes one of the coldest inhabited places on Earth",
        "Heavily snowbound landscape, popular only among extreme winter adventurers",
        "A peaceful look at local life centered around traditional wood stoves"
      ]
    }
  }
};

export function getSeasonDataForDistrict(
  stateName: string,
  districtName: string,
  stateSeasons: DistrictSeasonData
): DistrictSeasonData {
  if (districtSeasons[districtName]) {
    return districtSeasons[districtName];
  }
  
  // Dynamic fallback: substitute "state" with "district" in description text
  const cleanDistrict = districtName.trim();
  
  return {
    peak: {
      months: stateSeasons.peak.months,
      title: `${cleanDistrict} Peak Season`,
      temp: stateSeasons.peak.temp,
      points: stateSeasons.peak.points.map(pt => 
        pt.replace(new RegExp(stateName, "gi"), cleanDistrict)
      )
    },
    moderate: {
      months: stateSeasons.moderate.months,
      title: `${cleanDistrict} Mid Season`,
      temp: stateSeasons.moderate.temp,
      points: stateSeasons.moderate.points.map(pt => 
        pt.replace(new RegExp(stateName, "gi"), cleanDistrict)
      )
    },
    off: {
      months: stateSeasons.off.months,
      title: `${cleanDistrict} Quiet Season`,
      temp: stateSeasons.off.temp,
      points: stateSeasons.off.points.map(pt => 
        pt.replace(new RegExp(stateName, "gi"), cleanDistrict)
      )
    }
  };
}
