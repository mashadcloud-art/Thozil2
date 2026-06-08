import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import SearchResults from "@/pages/search-results";

import StateTourism from "@/pages/state/StateTourism";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import ListingDetail from "@/pages/listing-detail";
import RegisterBusiness from "@/pages/RegisterBusiness";
import RestaurantCollections from "@/pages/RestaurantCollections";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/search" component={SearchResults} />
      <Route path="/state/:state" component={StateTourism} />
      <Route path="/listing/:id" component={ListingDetail} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/register-business" component={RegisterBusiness} />
      <Route path="/restaurant-collections" component={RestaurantCollections} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
