import { CompareTour } from "@/types/compare.types";
import SelectedItemCard from "./SelectedItemCard";
interface IProps {
  items: CompareTour[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
}

export default function SelectedItems({
  items,
  isLoading,
  isError,
  errorMessage,
}: IProps) {
   // Loading Skeleton
  if (isLoading) {
    return (
      <section className="space-y-4">
        <div className="h-6 w-36 animate-pulse rounded bg-gray-200" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-gray-200"
            >
              {/* Image Skeleton */}
              <div className="h-48 w-full animate-pulse bg-gray-200" />

              {/* Content Skeleton */}
              <div className="space-y-3 p-4">
                <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />

                <div className="h-3 w-full animate-pulse rounded bg-gray-200" />

                <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200" />

                <div className="flex items-center justify-between pt-2">
                  <div className="h-5 w-16 animate-pulse rounded bg-gray-200" />
                  <div className="h-9 w-24 animate-pulse rounded-md bg-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
    if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-sm text-red-500">
          {errorMessage || "Failed to load tours. Please try again."}
        </p>
      </div>
    );
  }
  if (!items.length) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">
        <p className="font-medium text-gray-700">
          No tours found
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Try searching with a different keyword.
        </p>
      </div>
    );
  }
  return (
    <section className="app-container mt-4 sm:mt-6">
      

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4">
        {items.map((item) => (
          <SelectedItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}