import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import QuickCategories from "@/components/QuickCategories";
import CategoryCards from "@/components/CategoryCards";
import BillsRecharge from "@/components/BillsRecharge";
import FullWidthBanner from "@/components/FullWidthBanner";
import PopularSearches from "@/components/PopularSearches";
import TravelBookings from "@/components/TravelBookings";
import DiscoverByCity from "@/components/DiscoverByCity";
import TrendingSearches from "@/components/TrendingSearches";
import LatestMovies from "@/components/LatestMovies";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background overflow-x-hidden">
      <Navbar />

      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-6 space-y-10">
        <HeroSection />
        <QuickCategories />

        {/* Category cards + Bills sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8">
            <CategoryCards />
          </div>
          <div className="lg:col-span-4 flex flex-col">
            <BillsRecharge />
          </div>
        </div>

        {/* Full-width banner between sections */}
        <FullWidthBanner />

        {/* Popular Searches — full width */}
        <PopularSearches />

        {/* Travel & Bookings — full width, same feel as Popular Searches */}
        <TravelBookings />

        <DiscoverByCity />
        <TrendingSearches />
        <LatestMovies />
      </main>

      <Footer />
    </div>
  );
}
