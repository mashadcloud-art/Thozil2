import { motion } from "framer-motion";

const searches = [
  { label: "Packers & Movers", img: "/popular/packers.png", tall: true },
  { label: "Lawyers",          img: "/popular/lawyers.png",  tall: false },
  { label: "Carpenters",       img: "/popular/carpenters.png", tall: false },
  { label: "Event Management", img: "/popular/event-mgmt.png", tall: true },
  { label: "Cleaning Service", img: "/popular/cleaning.png",  tall: false },
  { label: "Driving Schools",  img: "/popular/driving.png",   tall: false },
  {
    label: "Courier Service",
    img: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop",
    tall: false,
  },
  {
    label: "Fire Stations",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    tall: false,
  },
];

export default function PopularSearches() {
  return (
    <section>
      <h2 className="text-lg font-bold text-gray-800 mb-3">Popular Searches</h2>

      {/* Mosaic / bento grid */}
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: "repeat(5, 1fr)",
          gridTemplateRows: "140px 140px",
        }}
      >
        {/* col 1 — tall (spans 2 rows) */}
        <MosaicTile label={searches[0].label} img={searches[0].img} className="row-span-2" />

        {/* col 2 row 1 */}
        <MosaicTile label={searches[1].label} img={searches[1].img} />
        {/* col 2 row 2 */}
        <MosaicTile label={searches[2].label} img={searches[2].img} />

        {/* col 3 — tall */}
        <MosaicTile label={searches[3].label} img={searches[3].img} className="row-span-2" />

        {/* col 4 row 1 */}
        <MosaicTile label={searches[4].label} img={searches[4].img} />
        {/* col 4 row 2 */}
        <MosaicTile label={searches[5].label} img={searches[5].img} />

        {/* col 5 row 1 */}
        <MosaicTile label={searches[6].label} img={searches[6].img} />
        {/* col 5 row 2 */}
        <MosaicTile label={searches[7].label} img={searches[7].img} />
      </div>
    </section>
  );
}

function MosaicTile({
  label,
  img,
  className = "",
}: {
  label: string;
  img: string;
  className?: string;
}) {
  return (
    <motion.a
      href="#"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`relative rounded-xl overflow-hidden group cursor-pointer shadow-sm ${className}`}
      data-testid={`popular-${label.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <img
        src={img}
        alt={label}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      {/* dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      {/* label pill */}
      <span className="absolute bottom-2.5 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold px-3 py-1 rounded-full whitespace-nowrap uppercase tracking-wide">
        {label}
      </span>
    </motion.a>
  );
}
