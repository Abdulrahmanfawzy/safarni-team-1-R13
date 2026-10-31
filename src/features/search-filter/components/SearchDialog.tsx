"use client";

import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Search, MapPin, ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useSearchTours } from "@/features/search-filter/hooks/useSearchTours";
import type {
  SearchResponse,
  SearchTour,
} from "@/features/search-filter/schemas/search.schema";
import TourCard from "@/components/ui/tourCard";

type SearchDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type SearchData = NonNullable<SearchResponse["data"]>;

const PER_PAGE = 10;

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}

function renderTourCard(tour: SearchTour) {
  return (
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
  );
}

export default function SearchDialog({
  open,
  onOpenChange,
}: SearchDialogProps) {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const [destination, setDestination] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (open) {
      setDestination(searchParams.get("destination") ?? "");
      setShowResults(false);
    }
  }, [open, searchParams]);

  const trimmed = destination.trim();
  const debounced = useDebounce(trimmed, 300);
  const isDebouncing = trimmed !== debounced;

  const {
    data: searchData,
    isFetching,
    isError,
    error,
  } = useSearchTours(debounced, 1, PER_PAGE);

  const tours = searchData?.items ?? [];
  const isSearchLoading = isDebouncing || isFetching;

  // Tours already loaded by earlier searches
  const cachedRecommendations = useMemo(() => {
    if (!open) return [];

    return queryClient
      .getQueriesData<SearchData>({ queryKey: ["search-tours"] })
      .flatMap(([, data]) => data?.items ?? [])
      .filter(
        (tour, index, all) =>
          all.findIndex((item) => item.id === tour.id) === index,
      )
      .slice(0, PER_PAGE);
  }, [open, queryClient, searchData]);

  function handleDestinationChange(value: string) {
    setDestination(value);
    setShowResults(false);
  }

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (trimmed) setShowResults(true);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!left-1/2 !top-1/2 !h-[85vh] !w-[95vw] !max-w-5xl !-translate-x-1/2 !-translate-y-1/2 flex flex-col gap-0 overflow-hidden rounded-xl border border-blue-200 bg-white p-0">
        <DialogHeader className="sr-only">
          <DialogTitle>Search destinations and tours</DialogTitle>
          <DialogDescription>
            Search for destinations or explore previously loaded tours.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSearch}
          className="shrink-0 p-5 pb-3 sm:p-6 sm:pb-3"
        >
          <div className="flex items-center gap-3">
            {showResults && (
              <button
                type="button"
                onClick={() => setShowResults(false)}
                aria-label="Back to suggestions"
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
              >
                <ArrowLeft className="size-5" />
              </button>
            )}

            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-blue-500"
                aria-hidden="true"
              />

              <Input
                id="destination"
                name="destination"
                value={destination}
                onChange={(event) =>
                  handleDestinationChange(event.target.value)
                }
                placeholder="Search destinations..."
                autoComplete="off"
                className="h-11 rounded-lg border-blue-200 pl-9 focus-visible:border-blue-400 focus-visible:ring-blue-200"
              />
            </div>
          </div>
        </form>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5 sm:px-6 sm:pb-6">
          {!trimmed ? (
            <section>
              <h2 className="mb-2 text-xl font-semibold text-gray-900">
                Recommended Tours
              </h2>

              <p className="mb-5 text-sm text-gray-500">
                Explore tours you have already loaded.
              </p>

              {cachedRecommendations.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {cachedRecommendations.map(renderTourCard)}
                </div>
              ) : (
                <p className="py-8 text-center text-sm text-gray-500">
                  No previously loaded tours. Search for a destination first
                  to load tours.
                </p>
              )}
            </section>
          ) : isSearchLoading ? (
            <p
              role="status"
              className="py-8 text-center text-sm text-gray-500"
            >
              Searching tours...
            </p>
          ) : isError ? (
            <p role="alert" className="py-8 text-center text-sm text-red-500">
              {error instanceof Error
                ? error.message
                : "Failed to search tours. Please try again."}
            </p>
          ) : tours.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-500">
              No tours found. Try another search.
            </p>
          ) : showResults ? (
            <section>
              <h2 className="mb-1 text-lg font-semibold text-gray-900">
                {trimmed}{" "}
                <span className="text-sm font-normal text-gray-500">
                  ({searchData?.pagination.total ?? tours.length} Results)
                </span>
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tours.map(renderTourCard)}
              </div>
            </section>
          ) : (
            <div className="space-y-1">
              {tours.map((tour) => (
                <button
                  key={tour.id}
                  type="button"
                  onClick={() => {
                    setDestination(tour.title);
                    setShowResults(true);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-blue-50"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-700">
                    <MapPin className="size-5" aria-hidden="true" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-gray-800">
                      {tour.title}
                    </span>

                    <span className="block text-xs text-gray-500">
                      {tour.duration_text} · ${tour.price}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}