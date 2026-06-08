import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Global Restaurants page
 * This page provides a clean URL `/Restaurants` that redirects to the
 * search results for Restaurants in the default state (KL).
 * It mirrors the existing search results page (`/search?q=Restaurants&state=KL`).
 */
export default function Restaurants() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to the search results with the appropriate query parameters
    setLocation("/search?q=Restaurants&state=KL");
  }, []);

  // Optionally render a temporary placeholder while redirecting
  return null;
}
