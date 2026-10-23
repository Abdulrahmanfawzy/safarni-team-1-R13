
"use client";

import { useState } from "react";
import {
  Map,
  Search,
  Star,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

import {
  adventureStyles,
  BRAND,
  fakeTours,
  Filters,
  INITIAL_FILTERS,
  MIN_PRICE,
  MAX_PRICE,
  PRICE_STEP,
  priceBuckets,
  ratings,
  sortOptions,
} from "./filter-data";

import { FilterHeading, Pill } from "./FilterUI";
import PriceHistogram from "./PriceHistogram";

type SearchFiltersProps = {
  filters: Filters;
  onChange: (filters: Filters) => void;
  resultCount: number;
};

export default function SearchFilters({
  filters,
  onChange,
  resultCount,
}: SearchFiltersProps) {
  const [locationQuery, setLocationQuery] = useState("");

  const selectedSort = filters.sort;
  const budget = filters.price;
  const selectedStyles = filters.styles;
  const locations = filters.locations;
  const selectedRatings = filters.ratings;

  const setSelectedSort = (sort: string | null) =>
    onChange({ ...filters, sort });

  const setBudget = (price: [number, number]) =>
    onChange({ ...filters, price });

  const setSelectedStyles = (styles: string[]) =>
    onChange({ ...filters, styles });

  const setLocations = (locations: string[]) =>
    onChange({ ...filters, locations });

  const setSelectedRatings = (ratings: number[]) =>
    onChange({ ...filters, ratings });

  function toggleSelection<T>(
    value: T,
    selected: T[],
    setSelected: (values: T[]) => void,
  ) {
    setSelected(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value],
    );
  }

  function addLocation() {
    const value = locationQuery.trim();

    if (
      value &&
      !locations.some(
        (location) =>
          location.toLowerCase() === value.toLowerCase(),
      )
    ) {
      setLocations([...locations, value]);
    }

    setLocationQuery("");
  }

  function clearAll() {
    onChange({ ...INITIAL_FILTERS });
    setLocationQuery("");
  }

  return (
    <aside className="w-full space-y-6 rounded-2xl border border-border bg-background p-5">
      {/* Sort */}
      <section className="flex flex-wrap gap-3">
        {sortOptions.map((option) => (
          <Pill
            key={option}
            selected={selectedSort === option}
            onClick={() =>
              setSelectedSort(
                selectedSort === option ? null : option,
              )
            }
          >
            {option}
          </Pill>
        ))}
      </section>

      <hr className="border-border" />

      {/* Budget */}
      <section className="space-y-4">
        <FilterHeading title="Budget Range" />

        <div className="relative pb-2">
          <PriceHistogram
            buckets={priceBuckets}
            range={budget}
          />

          <Slider
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={PRICE_STEP}
            minStepsBetweenThumbs={1}
            value={budget}
            onValueChange={(value) => {
              if (value.length === 2) {
                setBudget([value[0], value[1]]);
              }
            }}
            aria-label="Budget range"
            className="absolute inset-x-0 bottom-0 z-20 translate-y-1/2"
          />
        </div>

        <div className="flex justify-between pt-2">
          <div>
            <p className="text-sm text-muted-foreground">Min</p>
            <p className="text-base font-semibold">
              $ {budget[0]}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-muted-foreground">Max</p>
            <p className="text-base font-semibold">
              $ {budget[1]}
            </p>
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* Adventure style */}
      <section className="space-y-4">
        <FilterHeading
          title="Adventure Style"
          hint="Multi Select"
        />

        <div className="flex flex-wrap gap-3">
          {adventureStyles.map(({ label, icon: Icon }) => (
            <Pill
              key={label}
              selected={selectedStyles.includes(label)}
              onClick={() =>
                toggleSelection(
                  label,
                  selectedStyles,
                  setSelectedStyles,
                )
              }
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </Pill>
          ))}
        </div>
      </section>

      <hr className="border-border" />

      {/* Location */}
      <section className="space-y-4">
        <FilterHeading
          title="Location"
          action={
            <button
              type="button"
              aria-label="Show on map"
              className="text-[#1E429F] hover:opacity-80"
            >
              <Map className="size-4" aria-hidden="true" />
            </button>
          }
        />

        <form
          role="search"
          className="relative"
          onSubmit={(event) => {
            event.preventDefault();
            addLocation();
          }}
        >
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />

          <Input
            type="search"
            placeholder="Search ..."
            aria-label="Search locations"
            value={locationQuery}
            onChange={(event) =>
              setLocationQuery(event.target.value)
            }
            className="h-9 pl-9 text-xs"
          />
        </form>

        {locations.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {locations.map((location) => (
              <li key={location}>
                <button
                  type="button"
                  aria-label={`Remove ${location}`}
                  onClick={() =>
                    setLocations(
                      locations.filter((item) => item !== location),
                    )
                  }
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:border-[#1E429F]/50"
                >
                  <X className="size-3" aria-hidden="true" />
                  {location}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <hr className="border-border" />

      {/* Rating */}
      <section className="space-y-4">
        <FilterHeading
          title="Rating"
          hint="Multi Select"
        />

        <div className="flex flex-wrap gap-3">
          {ratings.map((rating) => (
            <Pill
              key={rating}
              selected={selectedRatings.includes(rating)}
              onClick={() =>
                toggleSelection(
                  rating,
                  selectedRatings,
                  setSelectedRatings,
                )
              }
              className="px-5 text-base"
            >
              <Star className="size-4" aria-hidden="true" />
              {rating}
            </Pill>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={clearAll}
          className="border-[#1E429F] text-[#1E429F] hover:text-[#1E429F]"
        >
          Clear All
        </Button>

        <Button
          type="button"
          className={cn("text-white hover:opacity-90")}
          style={{ backgroundColor: BRAND }}
        >
          {resultCount} Tours Found
        </Button>
      </div>
    </aside>
  );
}
