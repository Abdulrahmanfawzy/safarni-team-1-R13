"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  Car,
  Map,
  Search,
  Star,
  Tent,
  Waves,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const sortOptions = [
  "Price (Low to High)",
  "Price (High to Low)",
  "Biggest Deals (Highest Saving)",
  "Most Reviewed",
  "Most Popular",
];

const adventureStyles: { label: string; icon: LucideIcon }[] = [
  { label: "Adventure Travel", icon: Tent },
  { label: "City Breaks", icon: Building2 },
  { label: "Water Activity", icon: Waves },
  { label: "Road Trips", icon: Car },
];

const ratings = [1, 2, 3, 4, 5];

const MIN_PRICE = 0;
const MAX_PRICE = 8500;

/** Tours per price bucket. Replace with real data from your API. */
const priceBuckets = [
  1, 2, 3, 5, 9, 12, 10, 8, 9, 14, 22, 30, 38, 34, 28, 24, 26, 30, 28, 20, 14,
  9, 6, 4, 3, 2, 1, 1,
];

const BRAND = "#1E429F";

/* ------------------------- defined OUTSIDE the component ------------------------- */
/* (Defining components inside another component remounts them on every render.)    */

function FilterHeading({
  title,
  hint,
  action,
}: {
  title: string;
  hint?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h3 className="text-sm font-semibold">
        {title}{" "}
        {hint && (
          <span className="font-normal text-muted-foreground">{hint}</span>
        )}
      </h3>
      {action}
    </div>
  );
}

function Pill({
  selected,
  onClick,
  className,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "h-auto rounded-full px-4 py-2.5 text-xs font-medium",
        selected
          ? "border-[#1E429F] bg-[#1E429F]/10 text-[#1E429F] hover:bg-[#1E429F]/15 hover:text-[#1E429F]"
          : "border-border bg-background text-muted-foreground hover:border-[#1E429F]/50 hover:bg-background",
        className,
      )}
    >
      {children}
    </Button>
  );
}

function PriceHistogram({
  buckets,
  range,
}: {
  buckets: number[];
  range: [number, number];
}) {
  const W = 100;
  const H = 40;

  const { line, area } = useMemo(() => {
    const max = Math.max(...buckets, 1);
    const pts = buckets.map((v, i) => ({
      x: (i / (buckets.length - 1)) * W,
      y: H - (v / max) * (H - 4),
    }));
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const mx = (pts[i - 1].x + pts[i].x) / 2;
      const my = (pts[i - 1].y + pts[i].y) / 2;
      d += ` Q ${pts[i - 1].x} ${pts[i - 1].y} ${mx} ${my}`;
    }
    d += ` T ${pts[pts.length - 1].x} ${pts[pts.length - 1].y}`;
    return { line: d, area: `${d} L ${W} ${H} L 0 ${H} Z` };
  }, [buckets]);

  const x1 = ((range[0] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * W;
  const x2 = ((range[1] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * W;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="h-36 w-full"
      role="img"
      aria-label="Price distribution of available tours"
    >
      <defs>
        <clipPath id="selected-range">
          <rect x={x1} y={0} width={Math.max(x2 - x1, 0)} height={H} />
        </clipPath>
      </defs>
      <path d={area} className="fill-blue-100" />
      <path d={area} className="fill-blue-200" clipPath="url(#selected-range)" />
      <path
        d={line}
        fill="none"
        className="stroke-blue-200"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* --------------------------------- component --------------------------------- */

export type Filters = {
  sort: string | null;
  price: [number, number];
  styles: string[];
  locations: string[];
  ratings: number[];
};

export const INITIAL_FILTERS: Filters = {
  sort: null,
  price: [MIN_PRICE, MAX_PRICE],
  styles: [],
  locations: [],
  ratings: [],
};

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

  // Read from props, write through onChange, so the JSX below stays the same.
  const selectedSort = filters.sort;
  const budget = filters.price;
  const selectedStyles = filters.styles;
  const locations = filters.locations;
  const selectedRatings = filters.ratings;

  const setSelectedSort = (sort: string | null) => onChange({ ...filters, sort });
  const setBudget = (price: [number, number]) => onChange({ ...filters, price });
  const setSelectedStyles = (styles: string[]) => onChange({ ...filters, styles });
  const setLocations = (locations: string[]) => onChange({ ...filters, locations });
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
    if (value && !locations.includes(value)) {
      setLocations([...locations, value]);
    }
    setLocationQuery("");
  }

  function clearAll() {
    onChange(INITIAL_FILTERS);
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
              setSelectedSort(selectedSort === option ? null : option)
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

        <div className="relative">
          <PriceHistogram buckets={priceBuckets} range={budget} />
          <Slider
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={50}
            minStepsBetweenThumbs={1}
            value={budget}
            onValueChange={(v) => setBudget([v[0], v[1]])}
            aria-label="Budget range"
            className="absolute inset-x-0 bottom-0 translate-y-1/2"
          />
        </div>

        <div className="flex justify-between pt-2">
          <div>
            <p className="text-sm text-muted-foreground">Min</p>
            <p className="text-base font-semibold">$ {budget[0]}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Max</p>
            <p className="text-base font-semibold">$ {budget[1]}</p>
          </div>
        </div>
      </section>

      <hr className="border-border" />

      {/* Adventure style */}
      <section className="space-y-4">
        <FilterHeading title="Adventure Style" hint="Multi Select" />

        <div className="flex flex-wrap gap-3">
          {adventureStyles.map(({ label, icon: Icon }) => (
            <Pill
              key={label}
              selected={selectedStyles.includes(label)}
              onClick={() =>
                toggleSelection(label, selectedStyles, setSelectedStyles)
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
          onSubmit={(e) => {
            e.preventDefault();
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
            onChange={(event) => setLocationQuery(event.target.value)}
            className="h-9 pl-9 text-xs"
          />
        </form>

        {locations.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {locations.map((loc) => (
              <li key={loc}>
                <button
                  type="button"
                  aria-label={`Remove ${loc}`}
                  onClick={() =>
                    setLocations(locations.filter((l) => l !== loc))
                  }
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:border-[#1E429F]/50"
                >
                  <X className="size-3" aria-hidden="true" />
                  {loc}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <hr className="border-border" />

      {/* Rating */}
      <section className="space-y-4">
        <FilterHeading title="Rating" hint="Multi Select" />

        <div className="flex flex-wrap gap-3">
          {ratings.map((rating) => (
            <Pill
              key={rating}
              selected={selectedRatings.includes(rating)}
              onClick={() =>
                toggleSelection(rating, selectedRatings, setSelectedRatings)
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
          className="text-white hover:opacity-90"
          style={{ backgroundColor: BRAND }}
        >
          {resultCount} Tours Found
        </Button>
      </div>
    </aside>
  );
}
