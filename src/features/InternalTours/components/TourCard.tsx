"use client";
 
import Image from "next/image";
import { useState } from "react";
 
type TourCardProps = {
  image: string;
  category?: string;
  title: string;
  rating: number;
  price: number;
  currency?: string;
  perLabel?: string;
  initiallyFavorite?: boolean;
  onFavoriteChange?: (value: boolean) => void;
};
 
export default function TourCard({
  image,
  category = "Full Day Tours",
  title,
  rating,
  price,
  currency = "$",
  perLabel = "Per Person",
  initiallyFavorite = true,
  onFavoriteChange,
}: TourCardProps) {
  const [favorite, setFavorite] = useState(initiallyFavorite);
 
  const toggleFavorite = () => {
    const next = !favorite;
    setFavorite(next);
    onFavoriteChange?.(next);
  };
 
  return (
    <article className="w-65 rounded-3xl bg-white p-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
      {/* Image + favorite button */}
      <div className="relative h-50 w-full overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt={title}
          fill
          sizes="260px"
          className="object-cover"
        />
 
        <button
          type="button"
          onClick={toggleFavorite}
          aria-pressed={favorite}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <svg
            viewBox="0 0 24 24"
            className={`h-5 w-5 transition-colors ${
              favorite ? "fill-red-500 stroke-red-500" : "fill-none stroke-gray-400"
            }`}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 2.6 4.5 6.4 4.5c2 0 3.4 1.1 4.2 2.4l1.4 2 1.4-2c.8-1.3 2.2-2.4 4.2-2.4 3.8 0 5.5 3.9 4 7.3C19.5 16.4 12 21 12 21z" />
          </svg>
        </button>
      </div>
 
      {/* Content */}
      <div className="px-2 pb-3 pt-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">{category}</span>
 
          <span className="flex items-center gap-1 text-sm font-medium text-gray-700">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 fill-amber-400"
              aria-hidden="true"
            >
              <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z" />
            </svg>
            {rating.toFixed(1)}
          </span>
        </div>
 
        <h3 className="mt-2 text-lg font-semibold text-gray-900">{title}</h3>
 
        <p className="mt-2 text-sm text-gray-500">
          From{" "}
          <span className="font-bold text-blue-600">
            {price}
            {currency}
          </span>{" "}
          {perLabel}
        </p>
      </div>
    </article>
  );
}