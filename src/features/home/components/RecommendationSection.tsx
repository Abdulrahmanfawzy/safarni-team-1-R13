import PlaceCard from "@/components/shared/PlaceCard";
import crank from "@/assets/images/crank.jpg";
import Link from "next/link";

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
];

export default function RecommendationSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="mb-5 flex items-center  justify-between gap-3">
        <h2 className="text-center text-4xl font-bold sm:text-2xl lg:text-3xl">
          Recommendation
        </h2>

        <Link
          href="/places"
          className="text-center text-4xl font-bold text-(--primary) transition hover:opacity-75 sm:text-base"
        >
          View all
        </Link>
      </div>

    {/* Responsive Cards */}
<div className="flex flex-col items-center gap-6 px-4 pb-4 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
  {places.map((place) => (
    <div key={place.id} className="w-full max-w-lg sm:max-w-none">
      <PlaceCard {...place} />
    </div>
  ))}
</div>
    </section>
  );
}
