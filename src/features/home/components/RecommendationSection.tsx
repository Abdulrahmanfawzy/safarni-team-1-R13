
"use client";

import { useState } from "react";
import PlaceCard from "@/components/shared/PlaceCard";
import crank from "@/assets/images/crank.jpg";

const places = [
  {
    id: "pyramids",
    name: "The Pyramids",
    city: "Giza",
    rating: 4.8,
    image: crank,
    alt: "The Pyramids of Giza at sunset",
    href: "/places/pyramids",
  },
  {
    id: "citadel",
    name: "The Citadel of Saladin",
    city: "Cairo",
    rating: 4.8,
    image: crank,
    alt: "The Citadel of Saladin in Cairo",
    href: "/places/citadel",
  },
  {
    id: "karnak",
    name: "Karnak Temple",
    city: "Luxor",
    rating: 4.3,
    image: crank,
    alt: "Columns inside Karnak Temple",
    href: "/places/karnak",
  },
  {
    id: "alexandria-library",
    name: "Library of Alexandria",
    city: "Alexandria",
    rating: 4.8,
    image: crank,
    alt: "Reading hall of the Library of Alexandria",
    href: "/places/alexandria-library",
  },
  {
  id: "abu-simbel",
  name: "Abu Simbel Temples",
  city: "Aswan",
  rating: 4.9,
  image: crank,
  alt: "Abu Simbel Temples",
  href: "/places/abu-simbel",
},
{
  id: "white-desert",
  name: "White Desert",
  city: "Farafra",
  rating: 4.7,
  image: crank,
  alt: "White Desert landscape",
  href: "/places/white-desert",
},
{
  id: "ras-mohamed",
  name: "Ras Mohammed",
  city: "Sharm El Sheikh",
  rating: 4.8,
  image: crank,
  alt: "Ras Mohammed nature reserve",
  href: "/places/ras-mohamed",
},
{
  id: "philae",
  name: "Philae Temple",
  city: "Aswan",
  rating: 4.8,
  image: crank,
  alt: "Philae Temple in Aswan",
  href: "/places/philae",
},
];

export default function RecommendationSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const visiblePlaces = isExpanded ? places : places.slice(0, 4);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold sm:text-2xl lg:text-3xl">
          Recommendation
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

      {/* Responsive Cards */}
      <div className="grid grid-cols-1 justify-items-center gap-6 pb-4 sm:grid-cols-2 lg:grid-cols-4">
        {visiblePlaces.map((place) => (
          <div key={place.id} className="w-full max-w-lg">
            <PlaceCard {...place} />
          </div>
        ))}
      </div>
    </section>
  );
}
