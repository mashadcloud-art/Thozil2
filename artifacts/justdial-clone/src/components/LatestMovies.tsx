import useEmblaCarousel from "embla-carousel-react";
import { Ticket, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

import movie1 from "@/assets/images/movie-1.png";
import movie2 from "@/assets/images/movie-2.png";
import movie3 from "@/assets/images/movie-3.png";
import movie4 from "@/assets/images/movie-4.png";
import movie5 from "@/assets/images/movie-5.png";

const movies = [
  { image: movie1, title: "Action Protocol", genre: "Action, Thriller", rating: "4.8" },
  { image: movie2, title: "Love in Paris", genre: "Romance, Drama", rating: "4.5" },
  { image: movie3, title: "Space Explorer", genre: "Sci-Fi, Adventure", rating: "4.9" },
  { image: movie4, title: "The Shadow", genre: "Thriller, Mystery", rating: "4.2" },
  { image: movie5, title: "Family Fun", genre: "Comedy, Family", rating: "4.6" },
  { image: movie1, title: "Action Protocol 2", genre: "Action", rating: "4.1" },
  { image: movie3, title: "Mars Mission", genre: "Sci-Fi", rating: "4.7" },
];

export default function LatestMovies() {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps"
  });

  return (
    <section className="py-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Ticket className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-bold text-gray-900">Latest Movies</h3>
        </div>
        <Button variant="outline" size="sm" className="text-primary border-primary hover:bg-primary/10">
          View All
        </Button>
      </div>
      
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 pb-4">
          {movies.map((movie, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex-none w-[180px] sm:w-[220px]"
            >
              <Card className="border-none shadow-md overflow-hidden bg-white hover:shadow-xl transition-shadow group">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={movie.image} 
                    alt={movie.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    {movie.rating}
                  </div>
                </div>
                <CardContent className="p-4 space-y-3">
                  <div>
                    <h4 className="font-bold text-gray-900 truncate" title={movie.title}>{movie.title}</h4>
                    <p className="text-xs text-gray-500 truncate">{movie.genre}</p>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white h-9 shadow-none text-sm font-semibold rounded-md">
                    Book Tickets
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
