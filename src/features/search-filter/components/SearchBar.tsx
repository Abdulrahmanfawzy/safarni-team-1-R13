
"use client";

import { useEffect, useRef, useState } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { ChevronLeft, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSearchTours } from "@/features/search-filter/hooks/useSearchTours";

type SearchBarProps = {
  showBackButton?: boolean;
  className?: string;
};

export default function SearchBar({
  showBackButton = true,
  className,
}: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlValue = searchParams.get("destination") ?? "";
  const [value, setValue] = useState(urlValue);
  const lastPushed = useRef(urlValue);

  const query = urlValue.trim();

  const {
    data,
    isPending,
    isError,
    error,
  } = useSearchTours(query, 10);

  // Sync input when URL changes externally.
  useEffect(() => {
    if (urlValue !== lastPushed.current) {
      lastPushed.current = urlValue;
      setValue(urlValue);
    }
  }, [urlValue]);

  // Update URL after the user stops typing for 300ms.
  useEffect(() => {
    const trimmed = value.trim();

    if (trimmed === lastPushed.current) return;

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (trimmed) {
        params.set("destination", trimmed);
      } else {
        params.delete("destination");
      }

      lastPushed.current = trimmed;

      const queryString = params.toString();

      router.replace(
        queryString ? `${pathname}?${queryString}` : pathname,
        { scroll: false }
      );
    }, 300);

    return () => clearTimeout(timer);
  }, [value, pathname, router, searchParams]);

  function handleBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }

  return (
    <div className={cn("w-full min-w-0 space-y-3 sm:space-y-4", className)}>
      <form
        role="search"
        onSubmit={(event) => event.preventDefault()}
        className="flex w-full min-w-0 items-center gap-2 sm:gap-3"
      >
        {showBackButton && (
          <Button
            type="button"
            variant="secondary"
            size="icon"
            onClick={handleBack}
            aria-label="Go back"
            className="size-10 shrink-0 rounded-full"
          >
            <ChevronLeft
              className="size-5"
              aria-hidden="true"
            />
          </Button>
        )}

        <div className="relative min-w-0 flex-1">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-blue-500"
            aria-hidden="true"
          />

          <Input
            type="search"
            name="destination"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Search destinations..."
            aria-label="Search destinations"
            className="h-11 w-full min-w-0 rounded-full border-blue-200 pl-10 pr-3 text-sm focus-visible:border-blue-400 focus-visible:ring-blue-200 sm:h-10 sm:pl-11"
          />
        </div>
      </form>

      {query && (
        <section
          aria-label="Tour search results"
          aria-live="polite"
          className="space-y-3"
        >
          {isPending && (
            <p className="text-sm text-muted-foreground">
              Searching tours...
            </p>
          )}

          {isError && (
            <p role="alert" className="text-sm text-red-500">
              {error.message || "Failed to search tours."}
            </p>
          )}

          {data && (
            <>
              <p className="text-sm text-muted-foreground">
                {data.pagination.total} tours found
              </p>

              {data.items.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No tours found for "{query}".
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {data.items.map((tour) => (
                    <article
                      key={tour.id}
                      className="overflow-hidden rounded-xl border bg-background"
                    >
                      {tour.image && (
                        <img
                          src={tour.image}
                          alt={tour.title}
                          className="h-40 w-full object-cover"
                        />
                      )}

                      <div className="space-y-2 p-4">
                        <h3 className="font-semibold">
                          {tour.title}
                        </h3>

                        <p className="text-sm text-muted-foreground">
                          {tour.duration_text}
                        </p>

                        <p className="font-medium">
                          ${tour.price}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {tour.rating} / 5 · {tour.reviews_count} reviews
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      )}
    </div>
  );
}
