
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { homeApi } from "@/api/home.api";
import TourCard from "@/components/ui/tourCard";

export default function AvailableToursSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    data,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["home-tours"],
    queryFn: homeApi.getTours,
  });

  const tours = Array.isArray(data)
    ? data
    : data && Array.isArray(data.items)
      ? data.items
      : [];

  const visibleTours = isExpanded
    ? tours
    : tours.slice(0, 4);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold sm:text-xl lg:text-2xl">
          Available Tours
        </h2>

        {!isPending && !isError && tours.length > 4 && (
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-expanded={isExpanded}
            className="shrink-0 text-sm font-semibold text-(--primary) transition hover:opacity-75 sm:text-base"
          >
            {isExpanded ? "Show less" : "View all"}
          </button>
        )}
      </div>

      {isPending && (
        <p className="py-8 text-center text-slate-500" role="status">
          Loading tours...
        </p>
      )}

      {isError && (
        <p className="py-8 text-center text-red-600" role="alert">
          {error instanceof Error
            ? error.message
            : "Failed to load tours."}
        </p>
      )}

      {!isPending && !isError && tours.length === 0 && (
        <p className="py-8 text-center text-slate-500">
          No tours available right now.
        </p>
      )}

      {!isPending && !isError && tours.length > 0 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:gap-5">
          {visibleTours.map((tour) => (
            <TourCard
              key={tour.id}
              tour={{ ...tour, price: Number(tour.price) }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
