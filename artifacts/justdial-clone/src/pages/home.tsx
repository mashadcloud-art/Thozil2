import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import QuickCategories from "@/components/QuickCategories";
import CategoryCards from "@/components/CategoryCards";
import BillsRecharge from "@/components/BillsRecharge";
import SidebarBanner from "@/components/SidebarBanner";
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

        {/* Category cards + sidebar — sidebar stretches to full height */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left — category cards + popular searches */}
          <div className="lg:col-span-8 space-y-10">
            <CategoryCards />
            <PopularSearches />
          </div>

          {/* Right sidebar — flex column, Bills fixed, banner, Travel fills rest */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <BillsRecharge />
            <SidebarBanner />
            <div className="flex-1">
              <TravelBookings />
            </div>
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
