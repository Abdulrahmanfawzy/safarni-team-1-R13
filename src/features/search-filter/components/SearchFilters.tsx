
// "use client";

// import { useId, useMemo, useState } from "react";
// import {
//   Building2,
//   Car,
//   Map,
//   Search,
//   Star,
//   Tent,
//   Waves,
//   X,
//   type LucideIcon,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Slider } from "@/components/ui/slider";
// import { cn } from "@/lib/utils";
// import type { Tour } from "@/features/search-filter/components/TourCard";

// export const fakeTours: Tour[] = [
//   {
//     id: "1",
//     title: "Discover the Beauty of Sharm El Sheikh",
//     location: "Sharm El Sheikh, Egypt",
//     image: "/images/sharm-el-sheikh.jpg",
//     rating: 4.8,
//     reviewCount: 245,
//     price: 350,
//     originalPrice: 450,
//     duration: "3 days",
//     groupSize: "2–8 people",
//     category: "Adventure Travel",
//   },
//   {
//     id: "2",
//     title: "Explore Ancient Egyptian History in Luxor",
//     location: "Luxor, Egypt",
//     image: "/images/luxor.jpg",
//     rating: 4.9,
//     reviewCount: 380,
//     price: 500,
//     originalPrice: 650,
//     duration: "2 days",
//     groupSize: "4–12 people",
//     category: "Historical",
//   },
//   {
//     id: "3",
//     title: "Relax on the Beautiful Beaches of Dahab",
//     location: "Dahab, Egypt",
//     image: "/images/dahab.jpg",
//     rating: 4.7,
//     reviewCount: 190,
//     price: 220,
//     duration: "1 day",
//     groupSize: "2–6 people",
//     category: "Water Activity",
//   },
//   {
//     id: "4",
//     title: "Explore Cairo's Most Famous Landmarks",
//     location: "Cairo, Egypt",
//     image: "/images/cairo.jpg",
//     rating: 4.6,
//     reviewCount: 520,
//     price: 180,
//     originalPrice: 250,
//     duration: "8 hours",
//     groupSize: "2–10 people",
//     category: "City Breaks",
//   },
//   {
//     id: "5",
//     title: "Adventure Through the Siwa Oasis",
//     location: "Siwa, Egypt",
//     image: "/images/siwa.jpg",
//     rating: 4.9,
//     reviewCount: 160,
//     price: 650,
//     originalPrice: 800,
//     duration: "4 days",
//     groupSize: "4–10 people",
//     category: "Adventure Travel",
//   },
//   {
//     id: "6",
//     title: "Snorkeling Adventure in Hurghada",
//     location: "Hurghada, Egypt",
//     image: "/images/hurghada.jpg",
//     rating: 4.8,
//     reviewCount: 310,
//     price: 300,
//     duration: "6 hours",
//     groupSize: "2–8 people",
//     category: "Water Activity",
//   },
// ];

// const sortOptions = [
//   "Price (Low to High)",
//   "Price (High to Low)",
//   "Biggest Deals (Highest Saving)",
//   "Most Reviewed",
//   "Most Popular",
// ];

// const adventureStyles: { label: string; icon: LucideIcon }[] = [
//   { label: "Adventure Travel", icon: Tent },
//   { label: "City Breaks", icon: Building2 },
//   { label: "Water Activity", icon: Waves },
//   { label: "Road Trips", icon: Car },
// ];

// const ratings = [1, 2, 3, 4, 5];

// const MIN_PRICE = 0;
// const PRICE_STEP = 50;

// const MAX_PRICE = Math.max(
//   PRICE_STEP,
//   Math.ceil(
//     Math.max(...fakeTours.map((tour) => tour.price)) / PRICE_STEP,
//   ) * PRICE_STEP,
// );

// const PRICE_BUCKET_COUNT = 28;

// const priceBuckets = Array.from(
//   { length: PRICE_BUCKET_COUNT },
//   (_, index) => {
//     const bucketSize =
//       (MAX_PRICE - MIN_PRICE) / PRICE_BUCKET_COUNT;

//     const bucketMin = MIN_PRICE + index * bucketSize;
//     const bucketMax = bucketMin + bucketSize;

//     return fakeTours.filter(
//       (tour) =>
//         tour.price >= bucketMin &&
//         (index === PRICE_BUCKET_COUNT - 1
//           ? tour.price <= bucketMax
//           : tour.price < bucketMax),
//     ).length;
//   },
// );

// const BRAND = "#1E429F";

// function FilterHeading({
//   title,
//   hint,
//   action,
// }: {
//   title: string;
//   hint?: string;
//   action?: React.ReactNode;
// }) {
//   return (
//     <div className="flex items-center justify-between gap-3">
//       <h3 className="text-sm font-semibold">
//         {title}{" "}
//         {hint && (
//           <span className="font-normal text-muted-foreground">
//             {hint}
//           </span>
//         )}
//       </h3>
//       {action}
//     </div>
//   );
// }

// function Pill({
//   selected,
//   onClick,
//   className,
//   children,
// }: {
//   selected: boolean;
//   onClick: () => void;
//   className?: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <Button
//       type="button"
//       variant="outline"
//       aria-pressed={selected}
//       onClick={onClick}
//       className={cn(
//         "h-auto rounded-full px-4 py-2.5 text-xs font-medium",
//         selected
//           ? "border-[#1E429F] bg-[#1E429F]/10 text-[#1E429F] hover:bg-[#1E429F]/15 hover:text-[#1E429F]"
//           : "border-border bg-background text-muted-foreground hover:border-[#1E429F]/50 hover:bg-background",
//         className,
//       )}
//     >
//       {children}
//     </Button>
//   );
// }

// function PriceHistogram({
//   buckets,
//   range,
// }: {
//   buckets: number[];
//   range: [number, number];
// }) {
//   const W = 100;
//   const H = 40;
//   const clipId = useId();

//   const { line, area } = useMemo(() => {
//     const max = Math.max(...buckets, 1);

//     const points = buckets.map((value, index) => ({
//       x: (index / Math.max(buckets.length - 1, 1)) * W,
//       y: H - (value / max) * (H - 4),
//     }));

//     let path = `M ${points[0].x} ${points[0].y}`;

//     for (let i = 1; i < points.length; i++) {
//       const previous = points[i - 1];
//       const current = points[i];
//       const middleX = (previous.x + current.x) / 2;
//       const middleY = (previous.y + current.y) / 2;

//       path += ` Q ${previous.x} ${previous.y} ${middleX} ${middleY}`;
//     }

//     path += ` T ${points[points.length - 1].x} ${points[points.length - 1].y}`;

//     return {
//       line: path,
//       area: `${path} L ${W} ${H} L 0 ${H} Z`,
//     };
//   }, [buckets]);

//   const priceRange = MAX_PRICE - MIN_PRICE;

//   const x1 = ((range[0] - MIN_PRICE) / priceRange) * W;
//   const x2 = ((range[1] - MIN_PRICE) / priceRange) * W;

//   return (
//     <svg
//       viewBox={`0 0 ${W} ${H}`}
//       preserveAspectRatio="none"
//       className="h-36 w-full"
//       role="img"
//       aria-label="Price distribution of available tours"
//     >
//       <defs>
//         <clipPath id={clipId}>
//           <rect
//             x={x1}
//             y={0}
//             width={Math.max(x2 - x1, 0)}
//             height={H}
//           />
//         </clipPath>
//       </defs>

//       <path d={area} className="fill-blue-100" />

//       <path
//         d={area}
//         className="fill-blue-200"
//         clipPath={`url(#${clipId})`}
//       />

//       <path
//         d={line}
//         fill="none"
//         className="stroke-blue-200"
//         strokeWidth={1}
//         vectorEffect="non-scaling-stroke"
//       />
//     </svg>
//   );
// }

// export type Filters = {
//   sort: string | null;
//   price: [number, number];
//   styles: string[];
//   locations: string[];
//   ratings: number[];
// };

// export const INITIAL_FILTERS: Filters = {
//   sort: null,
//   price: [MIN_PRICE, MAX_PRICE],
//   styles: [],
//   locations: [],
//   ratings: [],
// };

// type SearchFiltersProps = {
//   filters: Filters;
//   onChange: (filters: Filters) => void;
//   resultCount: number;
// };

// export default function SearchFilters({
//   filters,
//   onChange,
//   resultCount,
// }: SearchFiltersProps) {
//   const [locationQuery, setLocationQuery] = useState("");

//   const selectedSort = filters.sort;
//   const budget = filters.price;
//   const selectedStyles = filters.styles;
//   const locations = filters.locations;
//   const selectedRatings = filters.ratings;

//   const setSelectedSort = (sort: string | null) =>
//     onChange({ ...filters, sort });

//   const setBudget = (price: [number, number]) =>
//     onChange({ ...filters, price });

//   const setSelectedStyles = (styles: string[]) =>
//     onChange({ ...filters, styles });

//   const setLocations = (locations: string[]) =>
//     onChange({ ...filters, locations });

//   const setSelectedRatings = (ratings: number[]) =>
//     onChange({ ...filters, ratings });

//   function toggleSelection<T>(
//     value: T,
//     selected: T[],
//     setSelected: (values: T[]) => void,
//   ) {
//     setSelected(
//       selected.includes(value)
//         ? selected.filter((item) => item !== value)
//         : [...selected, value],
//     );
//   }

//   function addLocation() {
//     const value = locationQuery.trim();

//     if (
//       value &&
//       !locations.some(
//         (location) =>
//           location.toLowerCase() === value.toLowerCase(),
//       )
//     ) {
//       setLocations([...locations, value]);
//     }

//     setLocationQuery("");
//   }

//   function clearAll() {
//     onChange({
//       ...INITIAL_FILTERS,
//       price: [MIN_PRICE, MAX_PRICE],
//     });
//     setLocationQuery("");
//   }

//   return (
//     <aside className="w-full space-y-6 rounded-2xl border border-border bg-background p-5">
//       {/* Sort */}
//       <section className="flex flex-wrap gap-3">
//         {sortOptions.map((option) => (
//           <Pill
//             key={option}
//             selected={selectedSort === option}
//             onClick={() =>
//               setSelectedSort(
//                 selectedSort === option ? null : option,
//               )
//             }
//           >
//             {option}
//           </Pill>
//         ))}
//       </section>

//       <hr className="border-border" />

//       {/* Budget */}
//       <section className="space-y-4">
//         <FilterHeading title="Budget Range" />

//         <div className="relative pb-2">
//           <PriceHistogram buckets={priceBuckets} range={budget} />

//           <Slider
//             min={MIN_PRICE}
//             max={MAX_PRICE}
//             step={PRICE_STEP}
//             minStepsBetweenThumbs={1}
//             value={budget}
//             onValueChange={(value) => {
//               if (value.length === 2) {
//                 setBudget([value[0], value[1]]);
//               }
//             }}
//             aria-label="Budget range"
//             className="absolute inset-x-0 bottom-0 translate-y-1/2"
//           />
//         </div>

//         <div className="flex justify-between pt-2">
//           <div>
//             <p className="text-sm text-muted-foreground">Min</p>
//             <p className="text-base font-semibold">
//               $ {budget[0]}
//             </p>
//           </div>

//           <div className="text-right">
//             <p className="text-sm text-muted-foreground">Max</p>
//             <p className="text-base font-semibold">
//               $ {budget[1]}
//             </p>
//           </div>
//         </div>
//       </section>

//       <hr className="border-border" />

//       {/* Adventure style */}
//       <section className="space-y-4">
//         <FilterHeading title="Adventure Style" hint="Multi Select" />

//         <div className="flex flex-wrap gap-3">
//           {adventureStyles.map(({ label, icon: Icon }) => (
//             <Pill
//               key={label}
//               selected={selectedStyles.includes(label)}
//               onClick={() =>
//                 toggleSelection(
//                   label,
//                   selectedStyles,
//                   setSelectedStyles,
//                 )
//               }
//             >
//               <Icon className="size-4" aria-hidden="true" />
//               {label}
//             </Pill>
//           ))}
//         </div>
//       </section>

//       <hr className="border-border" />

//       {/* Location */}
//       <section className="space-y-4">
//         <FilterHeading
//           title="Location"
//           action={
//             <button
//               type="button"
//               aria-label="Show on map"
//               className="text-[#1E429F] hover:opacity-80"
//             >
//               <Map className="size-4" aria-hidden="true" />
//             </button>
//           }
//         />

//         <form
//           role="search"
//           className="relative"
//           onSubmit={(event) => {
//             event.preventDefault();
//             addLocation();
//           }}
//         >
//           <Search
//             className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
//             aria-hidden="true"
//           />

//           <Input
//             type="search"
//             placeholder="Search ..."
//             aria-label="Search locations"
//             value={locationQuery}
//             onChange={(event) =>
//               setLocationQuery(event.target.value)
//             }
//             className="h-9 pl-9 text-xs"
//           />
//         </form>

//         {locations.length > 0 && (
//           <ul className="flex flex-wrap gap-2">
//             {locations.map((location) => (
//               <li key={location}>
//                 <button
//                   type="button"
//                   aria-label={`Remove ${location}`}
//                   onClick={() =>
//                     setLocations(
//                       locations.filter((item) => item !== location),
//                     )
//                   }
//                   className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:border-[#1E429F]/50"
//                 >
//                   <X className="size-3" aria-hidden="true" />
//                   {location}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>

//       <hr className="border-border" />

//       {/* Rating */}
//       <section className="space-y-4">
//         <FilterHeading title="Rating" hint="Multi Select" />

//         <div className="flex flex-wrap gap-3">
//           {ratings.map((rating) => (
//             <Pill
//               key={rating}
//               selected={selectedRatings.includes(rating)}
//               onClick={() =>
//                 toggleSelection(
//                   rating,
//                   selectedRatings,
//                   setSelectedRatings,
//                 )
//               }
//               className="px-5 text-base"
//             >
//               <Star className="size-4" aria-hidden="true" />
//               {rating}
//             </Pill>
//           ))}
//         </div>
//       </section>

//       {/* Footer */}
//       <div className="grid grid-cols-2 gap-4 pt-2">
//         <Button
//           type="button"
//           variant="outline"
//           onClick={clearAll}
//           className="border-[#1E429F] text-[#1E429F] hover:text-[#1E429F]"
//         >
//           Clear All
//         </Button>

//         <Button
//           type="button"
//           className="text-white hover:opacity-90"
//           style={{ backgroundColor: BRAND }}
//         >
//           {resultCount} Tours Found
//         </Button>
//       </div>
//     </aside>
//   );
// }
