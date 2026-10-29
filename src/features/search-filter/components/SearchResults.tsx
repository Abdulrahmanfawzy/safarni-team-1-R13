"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSearchTours } from "@/features/search-filter/hooks/useSearchTours";
import TourCard from "@/components/ui/tourCard";

const PER_PAGE = 12;

type SearchResultsProps = {
  query: string;
};

export default function SearchResults({ query }: SearchResultsProps) {
  const trimmed = query.trim();

  // Page belongs to a query, so a new query starts on page 1
  // without a wasted request (replaces the useEffect reset).
  const [pageState, setPageState] = useState({ query: trimmed, page: 1 });
  const page = pageState.query === trimmed ? pageState.page : 1;

  function goToPage(nextPage: number) {
    setPageState({ query: trimmed, page: nextPage });
  }

  const { data, isPending, isError, error, isFetching, isPlaceholderData } =
    useSearchTours(trimmed, page, PER_PAGE);

  if (!trimmed) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        Enter a destination to search.
      </p>
    );
  }

  if (isError && !data) {
    return (
      <p role="alert" className="py-8 text-center text-sm text-red-500">
        {error instanceof Error ? error.message : "Failed to search tours."}
      </p>
    );
  }

  if (isPending || !data) {
    return (
      <p
        role="status"
        className="py-8 text-center text-sm text-muted-foreground"
      >
        Searching tours...
      </p>
    );
  }

  if (data.items.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No tours found for &quot;{trimmed}&quot;.
      </p>
    );
  }

  return (
    <section aria-label="Search results" className="space-y-4">
      <div className="flex items-baseline justify-between gap-3">
        <h2 aria-live="polite" className="text-lg font-semibold">
          {trimmed}{" "}
          <span className="text-sm font-normal text-muted-foreground">
            ({data.pagination.total} Results)
          </span>
        </h2>

        {isFetching && (
          <span role="status" className="text-sm text-muted-foreground">
            Updating results...
          </span>
        )}
      </div>

      <div
        className={cn(
          "grid gap-4 transition-opacity sm:grid-cols-2 lg:grid-cols-4",
          isFetching && "opacity-60",
        )}
      >
        {data.items.map((tour) => (
          <TourCard
            key={tour.id}
            tour={{
              slug: tour.slug,
              title: tour.title,
              image: tour.image,
              adventure_style: tour.adventure_style,
              rating: tour.rating,
              duration_text: tour.duration_text,
              price: Number(tour.price),
            }}
          />
        ))}
      </div>

      {data.pagination.last_page > 1 && (
        <nav
          aria-label="Pagination"
          className="flex items-center justify-between gap-4"
        >
          <Button
            variant="outline"
            disabled={page <= 1 || isFetching}
            onClick={() => goToPage(page - 1)}
          >
            Previous
          </Button>

          <span className="text-sm text-muted-foreground">
            Page {data.pagination.current_page} of {data.pagination.last_page}
          </span>

          <Button
            variant="outline"
            disabled={
              isPlaceholderData ||
              isFetching ||
              page >= data.pagination.last_page
            }
            onClick={() => goToPage(page + 1)}
          >
            Next
          </Button>
        </nav>
      )}
    </section>
  );
}