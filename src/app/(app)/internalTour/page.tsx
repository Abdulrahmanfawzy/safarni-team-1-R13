import { InternalTour } from "@/actions/internalTour";
import ToursCardsInternal from "@/features/InternalTours/components/ToursCardsInternal";
import SearchBar from "@/features/search-filter/components/SearchBar";

type InternalTourSummary = {
  id: number;
  image: string | null;
  title: string;
  adventure_style: string;
  rating: number | null;
  duration_text: string;
  price: string | number;
};

export default async function InternalTourPage() {
  const result = (await InternalTour()) as {
    data?: { items?: InternalTourSummary[] };
    error?: string;
  };
  const tours = result.data?.items ?? [];

  return (
    <section className="w-full">
      <SearchBar />
      {result.error ? (
        <p role="alert" className="mt-5 rounded-lg bg-red-50 p-4 text-red-700">
          {result.error}
        </p>
      ) : tours.length === 0 ? (
        <p className="mt-5 rounded-lg bg-gray-50 p-4 text-center text-gray-600">
          No tours are available right now.
        </p>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tours.map((tour) => (
            <ToursCardsInternal
              key={tour.id}
              id={tour.id}
              image={tour.image}
              category={tour.adventure_style}
              title={tour.title}
              rating={tour.rating}
              price={Number(tour.price)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
