import { useEffect } from "react";
import { useLocation } from "wouter";
import { tourismData } from "@/data/tourismData";
import CardGrid from "@/components/CardGrid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronRight } from "lucide-react";

export default function StateTourism({ params }: { params: { state: string } }) {
  const [, setLocation] = useLocation();
  const stateKey = params.state.toUpperCase();
  const data = tourismData[stateKey];

  useEffect(() => {
    if (!data) setLocation("/" );
  }, [data, setLocation]);

  if (!data) return null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />
      <section className="relative h-64 md:h-80 bg-gradient-to-r from-primary to-indigo-600 text-white flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wider uppercase">
          {stateKey} Tourism Guide
        </h1>
      </section>
      <div className="flex items-center gap-2 text-sm text-gray-500 px-4 py-3 max-w-7xl mx-auto">
        <span className="cursor-pointer hover:text-primary" onClick={() => setLocation("/" )}>Home</span>
        <ChevronRight className="w-4 h-4" />
        <span>{stateKey} Tourism</span>
      </div>
      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-12">
        <CardGrid title="Top Attractions" items={data.attractions} />
        <CardGrid title="Best Hotels &amp; Homestays" items={data.hotels} />
        <CardGrid title="Popular Restaurants" items={data.restaurants} />
        <CardGrid title="Transport Options" items={data.transport} />
      </main>
      <Footer />
    </div>
  );
}
