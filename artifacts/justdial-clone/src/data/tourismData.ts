export interface CardItem {
  id: number;
  title: string;
  image: string;
  description?: string;
  rating?: number;
}

export const tourismData: Record<string, {
  attractions: CardItem[];
  hotels: CardItem[];
  restaurants: CardItem[];
  transport: CardItem[];
}> = {
  KL: {
    attractions: [
      { id: 1, title: "Munnar", image: "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=600&q=80", description: "Scenic hill station" },
      { id: 2, title: "Alleppey Backwaters", image: "https://images.unsplash.com/photo-1558611848-0b04f33ce3e2?auto=format&fit=crop&w=600&q=80", description: "Houseboat experiences" }
    ],
    hotels: [
      { id: 1, title: "Kumarakom Lake Resort", image: "https://images.unsplash.com/photo-1518684079-5f6cddcd3a0c?auto=format&fit=crop&w=600&q=80", rating: 4.7 },
      { id: 2, title: "The Leela Kovalam", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9a5f?auto=format&fit=crop&w=600&q=80", rating: 4.8 }
    ],
    restaurants: [
      { id: 1, title: "Kayal", image: "https://images.unsplash.com/photo-1543351611-0a0e5c71e6ef?auto=format&fit=crop&w=600&q=80" },
      { id: 2, title: "Paragon", image: "https://images.unsplash.com/photo-1522199670076-2852f80289df?auto=format&fit=crop&w=600&q=80" }
    ],
    transport: [
      { id: 1, title: "Kerala Taxi", image: "https://images.unsplash.com/photo-1517964603305-4fe4b8e5d5b5?auto=format&fit=crop&w=600&q=80" },
      { id: 2, title: "Kerala Bus Service", image: "https://images.unsplash.com/photo-1496579323318-86c2ff9d4f6d?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  TN: {
    attractions: [
      { id: 1, title: "Marina Beach", image: "https://images.unsplash.com/photo-1558009455-6c0f8dd9e3f6?auto=format&fit=crop&w=600&q=80" },
      { id: 2, title: "Meenakshi Temple", image: "https://images.unsplash.com/photo-1523741540904-7b7fbe5c9f5e?auto=format&fit=crop&w=600&q=80" }
    ],
    hotels: [
      { id: 1, title: "ITC Grand Chola", image: "https://images.unsplash.com/photo-1553317840-5e0ef5fb1c73?auto=format&fit=crop&w=600&q=80", rating: 4.9 },
      { id: 2, title: "Le Royal Meriç", image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=600&q=80", rating: 4.6 }
    ],
    restaurants: [
      { id: 1, title: "Saravana Bhavan", image: "https://images.unsplash.com/photo-1543353071-087092ec3d45?auto=format&fit=crop&w=600&q=80" },
      { id: 2, title: "Murugan Idli Shop", image: "https://images.unsplash.com/photo-1524591732074-1f9d2c5e0c4e?auto=format&fit=crop&w=600&q=80" }
    ],
    transport: [
      { id: 1, title: "Tamil Nadu Cabs", image: "https://images.unsplash.com/photo-1526401485004-2f69b9d6b3b1?auto=format&fit=crop&w=600&q=80" },
      { id: 2, title: "Tamil Nadu Bus", image: "https://images.unsplash.com/photo-1504470695779-757d9c6fae3c?auto=format&fit=crop&w=600&q=80" }
    ]
  }
};
