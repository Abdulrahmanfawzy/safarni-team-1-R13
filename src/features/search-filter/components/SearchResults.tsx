
"use client";

import { useSearchTours } from "@/features/search-filter/hooks/useSearchTours";

type SearchResultsProps = {
  query: string;
};

export default function SearchResults({
  query,
}: SearchResultsProps) {
  const {
    data,
    isPending,
    isError,
    error,
  } = useSearchTours(query, 1);

  if (!query.trim()) {
    return <p>Enter a destination to search.</p>;
  }

  if (isPending) {
    return <p>Searching tours...</p>;
  }

  if (isError) {
    return (
      <p role="alert">
        {error.message || "Failed to search tours."}
      </p>
    );
  }

  if (!data.items.length) {
    return <p>No tours found.</p>;
  }

  return (
    <section>
      <h2>Search Results</h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((tour) => (
          <article
            key={tour.id}
            className="rounded-xl border p-4"
          >
            <h3 className="font-semibold">{tour.title}</h3>
            <p>{tour.duration_text}</p>
            <p>${tour.price}</p>
            <p>
              {tour.rating} ({tour.reviews_count} reviews)
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
