"use client";

import Image from "next/image";
import { MapPin, Star, Heart, Clock, Users } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export type Tour = {
  id: string;
  title: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  duration: string;
  groupSize: string;
  category: string;
};

type TourCardProps = {
  tour: Tour;
};

export default function TourCard({ tour }: TourCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const discount =
    tour.originalPrice && tour.originalPrice > tour.price
      ? Math.round(
          ((tour.originalPrice - tour.price) / tour.originalPrice) * 100,
        )
      : null;

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-background transition-shadow hover:shadow-lg">
      {/* Tour Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {discount !== null && (
          <span className="absolute left-3 top-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            {discount}% OFF
          </span>
        )}

        <button
          type="button"
          onClick={() => setIsFavorite((previous) => !previous)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={isFavorite}
          className="absolute right-3 top-3 flex size-10 items-center justify-center rounded-full bg-white text-gray-700 shadow transition hover:scale-105"
        >
          <Heart
            className={`size-5 ${
              isFavorite ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </button>

        <span className="absolute bottom-3 left-3 rounded-md bg-white/95 px-3 py-1 text-xs font-medium text-gray-800">
          {tour.category}
        </span>
      </div>

      {/* Tour Details */}
      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4 shrink-0" />
            <span>{tour.location}</span>
          </div>

          <h2 className="line-clamp-2 text-lg font-semibold leading-7">
            {tour.title}
          </h2>

          <div className="flex items-center gap-1.5 text-sm">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            <span className="font-semibold">{tour.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">
              ({tour.reviewCount.toLocaleString()} reviews)
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 border-y border-border py-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="size-4" />
            <span>{tour.duration}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Users className="size-4" />
            <span>{tour.groupSize}</span>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>

            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-xl font-bold">
                ${tour.price.toLocaleString()}
              </span>

              {tour.originalPrice && tour.originalPrice > tour.price && (
                <span className="text-sm text-muted-foreground line-through">
                  ${tour.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">per person</p>
          </div>

          <Button type="button" className="shrink-0">
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}