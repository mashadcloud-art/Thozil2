import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AllCategoriesDirectory from "@/components/AllCategoriesDirectory";
import { stateNames } from "@/lib/locationData";

export default function AllCategoriesPage({ params }: { params?: { state?: string } }) {
  // Extract stateKey from path params or fallback to query param
  const getParam = (key: string, fallback = "") => {
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    return params.get(key) || fallback;
  };

  const stateKey = (params?.state || getParam("state", "KL")).toUpperCase();
  const stateName = stateNames[stateKey] || stateKey;

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#FAF9F6] overflow-x-hidden font-sans">
      <Navbar />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <Link href={`/${stateKey}/restaurant-collections`} className="hover:text-primary transition-colors">Restaurant Collections</Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-950 font-semibold">All Categories in {stateName}</span>
        </div>

        <section className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm mb-12">
          <AllCategoriesDirectory stateKey={stateKey} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
