// "use client";

import Navbar from "@/components/ui/Navbar";

// import { useMemo, useState } from "react";
// import SearchBar from "@/features/search-filter/components/SearchBar";
// import SearchFilters, {
//   type Filters,
//   INITIAL_FILTERS,
// } from "@/features/search-filter/components/SearchFilters";
// import TourCard, {
//   type Tour,
// } from "@/features/search-filter/components/TourCard";

// const tours: Tour[] = [
//   {
//     id: "1",
//     title: "Discover the Pyramids of Giza",
//     location: "Giza, Egypt",
//     image: "/images/pyramids.jpg",
//     rating: 4.9,
//     reviewCount: 128,
//     price: 120,
//     originalPrice: 150,
//     duration: "6 hours",
//     groupSize: "Up to 10 people",
//     category: "Adventure Travel",
//   },
//   {
//     id: "2",
//     title: "Explore the Beauty of Paris",
//     location: "Paris, France",
//     image: "/images/paris.jpg",
//     rating: 4.7,
//     reviewCount: 96,
//     price: 250,
//     duration: "3 days",
//     groupSize: "Up to 8 people",
//     category: "City Breaks",
//   },
//   {
//     id: "3",
//     title: "Red Sea Snorkeling Adventure",
//     location: "Hurghada, Egypt",
//     image: "/images/red-sea.jpg",
//     rating: 4.8,
//     reviewCount: 84,
//     price: 85,
//     originalPrice: 100,
//     duration: "4 hours",
//     groupSize: "Up to 12 people",
//     category: "Water Activity",
//   },
//   {
//     id: "4",
//     title: "Safari Across the Egyptian Desert",
//     location: "Sharm El Sheikh, Egypt",
//     image: "/images/desert-safari.jpg",
//     rating: 4.8,
//     reviewCount: 112,
//     price: 95,
//     originalPrice: 120,
//     duration: "5 hours",
//     groupSize: "Up to 8 people",
//     category: "Adventure Travel",
//   },
//   {
//     id: "5",
//     title: "Explore Historic Rome",
//     location: "Rome, Italy",
//     image: "/images/rome.jpg",
//     rating: 4.6,
//     reviewCount: 73,
//     price: 180,
//     duration: "2 days",
//     groupSize: "Up to 10 people",
//     category: "City Breaks",
//   },
//   {
//     id: "6",
//     title: "Mountain Hiking Adventure",
//     location: "Swiss Alps, Switzerland",
//     image: "/images/mountain-hiking.jpg",
//     rating: 4.9,
//     reviewCount: 156,
//     price: 210,
//     originalPrice: 260,
//     duration: "8 hours",
//     groupSize: "Up to 6 people",
//     category: "Adventure Travel",
//   },
//   {
//     id: "7",
//     title: "Discover the Islands of Bali",
//     location: "Bali, Indonesia",
//     image: "/images/bali.jpg",
//     rating: 4.8,
//     reviewCount: 142,
//     price: 320,
//     duration: "4 days",
//     groupSize: "Up to 12 people",
//     category: "Water Activity",
//   },
//   {
//     id: "8",
//     title: "Scenic Road Trip Through Cappadocia",
//     location: "Cappadocia, Turkey",
//     image: "/images/cappadocia.jpg",
//     rating: 4.7,
//     reviewCount: 91,
//     price: 160,
//     originalPrice: 200,
//     duration: "1 day",
//     groupSize: "Up to 8 people",
//     category: "Road Trips",
//   },
// ];

// function savingPercent(tour: Tour): number {
//   if (!tour.originalPrice || tour.originalPrice <= 0) return 0;

//   return Math.max(
//     0,
//     (tour.originalPrice - tour.price) / tour.originalPrice,
//   );
// }

// function applyFilters(
//   allTours: Tour[],
//   filters: Filters,
//   query: string,
// ): Tour[] {
//   const normalizedQuery = query.trim().toLowerCase();

//   const filteredTours = allTours.filter((tour) => {
//     const matchesQuery =
//       !normalizedQuery ||
//       `${tour.title} ${tour.location} ${tour.category}`
//         .toLowerCase()
//         .includes(normalizedQuery);

//     const matchesPrice =
//       tour.price >= filters.price[0] &&
//       tour.price <= filters.price[1];

//     const matchesStyle =
//       filters.styles.length === 0 ||
//       filters.styles.includes(tour.category);

//     const matchesLocation =
//       filters.locations.length === 0 ||
//       filters.locations.some((location) =>
//         tour.location.toLowerCase().includes(location.toLowerCase()),
//       );

//     const matchesRating =
//       filters.ratings.length === 0 ||
//       filters.ratings.includes(Math.round(tour.rating));

//     return (
//       matchesQuery &&
//       matchesPrice &&
//       matchesStyle &&
//       matchesLocation &&
//       matchesRating
//     );
//   });

//   const sortedTours = [...filteredTours];

//   switch (filters.sort) {
//     case "Price (Low to High)":
//       sortedTours.sort((a, b) => a.price - b.price);
//       break;

//     case "Price (High to Low)":
//       sortedTours.sort((a, b) => b.price - a.price);
//       break;

//     case "Biggest Deals (Highest Saving)":
//       sortedTours.sort(
//         (a, b) => savingPercent(b) - savingPercent(a),
//       );
//       break;

//     case "Most Reviewed":
//       sortedTours.sort((a, b) => b.reviewCount - a.reviewCount);
//       break;

//     case "Most Popular":
//       sortedTours.sort(
//         (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
//       );
//       break;
//   }

//   return sortedTours;
// }

// export default function SearchPage() {
//   const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
//   const [query, setQuery] = useState("");

//   const results = useMemo(
//     () => applyFilters(tours, filters, query),
//     [filters, query],
//   );

//   return (
//     <main className="mx-auto w-full max-w-7xl px-4 py-8">
//       <section className="space-y-6">
//         <SearchBar onSearch={setQuery} />

//         <div className="grid grid-cols-1 gap-8 md:grid-cols-[280px_minmax(0,1fr)]">
//           <div className="md:sticky md:top-4 md:self-start">
//             <SearchFilters
//               filters={filters}
//               onChange={setFilters}
//               resultCount={results.length}
//             />
//           </div>

//           <section className="min-w-0 space-y-6">
//             <div>
//               <h1 className="text-2xl font-bold">Explore Tours</h1>

//               <p
//                 className="mt-1 text-sm text-muted-foreground"
//                 aria-live="polite"
//               >
//                 {results.length}{" "}
//                 {results.length === 1 ? "tour" : "tours"} found
//               </p>
//             </div>

//             {results.length > 0 ? (
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 {results.map((tour) => (
//                   <TourCard key={tour.id} tour={tour} />
//                 ))}
//               </div>
//             ) : (
//               <div className="rounded-2xl border border-dashed border-border p-10 text-center">
//                 <h2 className="font-semibold">
//                   No tours match your filters
//                 </h2>

//                 <p className="mt-2 text-sm text-muted-foreground">
//                   Try another search or adjust your filters.
//                 </p>
//               </div>
//             )}
//           </section>
//         </div>
//       </section>
//     </main>
//   );
// }

export default function Page() {
  return <div>
     <Navbar />
  </div>;
}
