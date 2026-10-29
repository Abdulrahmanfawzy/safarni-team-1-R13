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
import { fakeTours, INITIAL_FILTERS, type Filters } from "@/features/search-filter/components/filter-data";

type FiltersDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function FiltersDialog({ open, onOpenChange }: FiltersDialogProps) {
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

  const filtered = useMemo(() => {
    let list = fakeTours.filter((t) => {
      if (t.price < filters.price[0] || t.price > filters.price[1]) return false;
      if (filters.styles.length && !filters.styles.includes(t.category)) return false;
      if (
        filters.locations.length &&
        !filters.locations.some((l) =>
          t.location.toLowerCase().includes(l.toLowerCase()),
        )
      )
        return false;
      if (
        filters.ratings.length &&
        !filters.ratings.some((r) => Math.floor(t.rating) === r)
      )
        return false;
      return true;
    });

    if (filters.sort === "Price: Low to High")
      list = [...list].sort((a, b) => a.price - b.price);
    else if (filters.sort === "Price: High to Low")
      list = [...list].sort((a, b) => b.price - a.price);
    else if (filters.sort === "Top Rated")
      list = [...list].sort((a, b) => b.rating - a.rating);

    return list;
  }, [filters]);

return (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-h-[90vh] max-w-[calc(100%-2rem)] overflow-y-auto rounded-2xl p-6 sm:max-w-3xl">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold">Filters</DialogTitle>
        <DialogDescription className="sr-only">
          Filter tours by price, style, location and rating
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-6">
        {/* الفلاتر فوق */}
        <SearchFilters
          filters={filters}
          onChange={setFilters}
          resultCount={filtered.length}
        />

        {/* النتايج تحت */}
        <div className="grid gap-6 sm:grid-cols-2">
          {filtered.map((tour) => (
            <TourCard key={tour.id} tour={{ ...tour, image: tour.image.src }} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full py-6 text-center text-sm text-muted-foreground">
              No tours match your filters.
            </p>
          )}
        </div>
      </div>
    </DialogContent>
  </Dialog>
);
}