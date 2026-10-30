
"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { homeApi } from "@/api/home.api";
import TourCard from "@/components/ui/tourCard";

function TourCardSkeleton() {
  return (
    <div
      className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
      aria-hidden="true"
    >
      <div className="h-48 w-full rounded-xl bg-slate-200" />

      <div className="space-y-3 p-2 pt-4">
        <div className="h-5 w-3/4 rounded-md bg-slate-200" />
        <div className="h-4 w-1/2 rounded-md bg-slate-200" />

        <div className="flex items-center justify-between pt-2">
          <div className="h-5 w-20 rounded-md bg-slate-200" />
          <div className="h-9 w-24 rounded-lg bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

export default function AvailableToursSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["home-tours"],
    queryFn: homeApi.getTours,
  });

  // homeApi.getTours returns the tours array directly.
  const tours = Array.isArray(data) ? data : [];

  const visibleTours = isExpanded ? tours : tours.slice(0, 4);

  return (
    <section className="py-6">
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
        <div
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:gap-5"
          role="status"
          aria-label="Loading tours"
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <TourCardSkeleton key={index} />
          ))}
          <span className="sr-only">Loading tours...</span>
        </div>
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
              tour={{
                ...tour,
                price: Number(tour.price),
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
