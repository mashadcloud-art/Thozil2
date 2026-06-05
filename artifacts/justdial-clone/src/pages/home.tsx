import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import QuickCategories from "@/components/QuickCategories";
import CategoryCards from "@/components/CategoryCards";
import BillsRecharge from "@/components/BillsRecharge";
import TravelBookings from "@/components/TravelBookings";
import PopularSearches from "@/components/PopularSearches";
import DiscoverByCity from "@/components/DiscoverByCity";
import TrendingSearches from "@/components/TrendingSearches";
import LatestMovies from "@/components/LatestMovies";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background overflow-x-hidden">
      <Navbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-6 space-y-10">
        <HeroSection />
        <QuickCategories />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-10">
            <CategoryCards />
            <PopularSearches />
          </div>
          <div className="lg:col-span-4 space-y-6">
            <BillsRecharge />
            <TravelBookings />
          </div>
        </div>

        <DiscoverByCity />
        <TrendingSearches />
        <LatestMovies />
      </main>

      <Footer />
    </div>
  );
}
