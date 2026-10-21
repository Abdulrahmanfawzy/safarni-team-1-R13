
"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { useState } from "react";
import crank from "@/assets/images/crank.jpg";

type Tour = {
  id: string;
  type: string;
  destination: string;
  price: number;
  rating: number;
  image: StaticImageData;
  alt: string;
  href: string;
};
const tours: Tour[] = [
  {
    id: "luxor",
    type: "Full Day Tour",
    destination: "Luxor",
    price: 150,
    rating: 4.3,
    image: crank,
    alt: "Temple of Hatshepsut in Luxor",
    href: "/tours/luxor",
  },
  {
    id: "dahab",
    type: "Full Day Tour",
    destination: "Dahab",
    price: 250,
    rating: 4.5,
    image: crank,
    alt: "Beach cafe on the shore in Dahab",
    href: "/tours/dahab",
  },
  {
    id: "fayoum",
    type: "Full Day Tour",
    destination: "Fayoum",
    price: 200,
    rating: 4.2,
    image: crank,
    alt: "Waterfall in Wadi El Rayan, Fayoum",
    href: "/tours/fayoum",
  },
  {
    id: "marsa-alam",
    type: "Full Day Tour",
    destination: "Marsa Alam",
    price: 220,
    rating: 4.8,
    image: crank,
    alt: "Turquoise coastline at Marsa Alam",
    href: "/tours/marsa-alam",
  },
  {
    id: "cairo",
    type: "Full Day Tour",
    destination: "Cairo",
    price: 180,
    rating: 4.6,
    image: crank,
    alt: "Cairo city tour",
    href: "/tours/cairo",
  },
  {
    id: "aswan",
    type: "Full Day Tour",
    destination: "Aswan",
    price: 230,
    rating: 4.7,
    image: crank,
    alt: "Nile river tour in Aswan",
    href: "/tours/aswan",
  },
  {
    id: "alexandria",
    type: "Full Day Tour",
    destination: "Alexandria",
    price: 190,
    rating: 4.4,
    image: crank,
    alt: "Alexandria coastal city tour",
    href: "/tours/alexandria",
  },
  {
    id: "siwa",
    type: "Full Day Tour",
    destination: "Siwa Oasis",
    price: 300,
    rating: 4.9,
    image: crank,
    alt: "Siwa Oasis desert tour",
    href: "/tours/siwa",
  },
];
function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link
      href={tour.href}
      className="group flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5 transition hover:shadow-md focus-visible:outline-2 focus-visible:outline-(--primary) sm:gap-4"
    >
      <div className="relative size-20 shrink-0 overflow-hidden rounded-xl sm:size-24">
        <Image
          src={tour.image}
          alt={tour.alt}
          fill
          sizes="(min-width: 640px) 96px, 80px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-xs font-medium text-slate-500 sm:text-sm">
            {tour.type}
          </p>

          <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-slate-800 sm:text-sm">
            <Star className="size-3.5 fill-amber-400 text-amber-400 sm:size-4" />
            {tour.rating.toFixed(1)}
          </span>
        </div>

        <h3 className="mt-0.5 truncate text-base font-semibold text-slate-900 sm:text-lg">
          {tour.destination}
        </h3>

        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          From{" "}
          <span className="font-semibold text-(--primary)">
            ${tour.price}
          </span>{" "}
          / person
        </p>
      </div>
    </Link>
  );
}

export default function AvailableToursSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleTours = isExpanded ? tours : tours.slice(0, 4);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold sm:text-xl lg:text-2xl">
          Available Tours
        </h2>

        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          className="shrink-0 text-sm font-semibold text-(--primary) transition hover:opacity-75 sm:text-base"
        >
          {isExpanded ? "Show less" : "View all"}
        </button>
      </div>

      {/* Tours Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:gap-5">
        {visibleTours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </section>
  );
}
