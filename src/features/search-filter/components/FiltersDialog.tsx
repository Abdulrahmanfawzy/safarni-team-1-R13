
"use client";

import { useMemo, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import SearchFilters from "@/features/search-filter/components/SearchFilters";
import TourCard from "@/components/ui/tourCard";

import {
  INITIAL_FILTERS,
  type Filters,
} from "@/features/search-filter/components/filter-data";

import { useFilter } from "@/features/search-filter/hooks/useFilter";

import type { FilteredTour } from "@/features/search-filter/types/filter.types";

type FiltersDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function FiltersDialog({
  open,
  onOpenChange,
}: FiltersDialogProps) {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

  const { data, isLoading, isError, error } = useFilter();

  const tours: FilteredTour[] = data?.data?.tours ?? [];

  const filteredTours = useMemo(() => {
    let result = tours.filter((tour) => {
      if (tour.status !== "published") return false;

      const price = Number(tour.base_price);

      if (
        !Number.isFinite(price) ||
        price < filters.price[0] ||
        price > filters.price[1]
      ) {
        return false;
      }

      if (
        filters.ratings.length > 0 &&
        !filters.ratings.some(
          (rating) =>
            Number(tour.rating) >= rating &&
            Number(tour.rating) < rating + 1,
        )
      ) {
        return false;
      }

      if (
        filters.styles.length > 0 &&
        !filters.styles.some(
          (style) =>
            style.toLowerCase() ===
            tour.adventure_style?.toLowerCase(),
        )
      ) {
        return false;
      }

      if (
        filters.locations.length > 0 &&
        !filters.locations.some(
          (location) =>
            location.toLowerCase() ===
            tour.destination?.name?.toLowerCase(),
        )
      ) {
        return false;
      }

      return true;
    });

    switch (filters.sort) {
      case "Price (Low to High)":
        result = [...result].sort(
          (a, b) => Number(a.base_price) - Number(b.base_price),
        );
        break;

      case "Price (High to Low)":
        result = [...result].sort(
          (a, b) => Number(b.base_price) - Number(a.base_price),
        );
        break;

      case "Most Reviewed":
        result = [...result].sort(
          (a, b) => b.reviews_count - a.reviews_count,
        );
        break;

      case "Most Popular":
        result = [...result].sort(
          (a, b) => b.rating - a.rating,
        );
        break;
    }

    return result;
  }, [tours, filters]);

  function clearFilters() {
    setFilters({ ...INITIAL_FILTERS });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-[calc(100%-2rem)] overflow-y-auto rounded-2xl p-6 sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Filters
          </DialogTitle>

          <DialogDescription className="sr-only">
            Filter tours by price, style, location and rating.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <SearchFilters
            filters={filters}
            onChange={setFilters}
            resultCount={filteredTours.length}
          />

          <button
            type="button"
            onClick={clearFilters}
            className="self-end text-sm font-medium text-primary hover:underline"
          >
            Clear All
          </button>

          {isLoading && (
            <div className="grid gap-6 sm:grid-cols-2">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-64 animate-pulse rounded-2xl bg-muted"
                />
              ))}
            </div>
          )}

          {isError && (
            <p className="py-8 text-center text-sm text-red-500">
              {error instanceof Error
                ? error.message
                : "Failed to load tours."}
            </p>
          )}

          {!isLoading && !isError && (
            <div className="grid gap-6 sm:grid-cols-2">
              {filteredTours.map((tour) => {
                const coverImage =
                  tour.media_assets?.find(
                    (asset) => asset.is_cover,
                  )?.file_url ??
                  tour.destination?.icon_url ??
                  "";

                return (
                  <TourCard
                    key={tour.id}
                    tour={{
                      ...tour,
                      price: Number(tour.base_price),
                      duration_text: `${tour.duration_hours} hours`,
                      image: coverImage,
                    }}
                  />
                );
              })}

              {filteredTours.length === 0 && (
                <p className="col-span-full py-8 text-center text-sm text-muted-foreground">
                  No tours match your filters.
                </p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
