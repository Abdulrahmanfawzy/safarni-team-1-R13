"use client";

import HotelCardSkeleton from "@/components/skeletons/HotelCardSkeleton";
import HotelCard from "./HotelCard";

import { useGetHotels } from "@/hooks/hotels/useGetHotels";


export default function RecommendationSection() {
  const { data: hotels, isLoading, isError, refetch } = useGetHotels("recommended");
  if (isLoading) return (
    <section
      aria-label="Loading recommended hotels"
      aria-busy="true"
      className="mx-5 flex gap-4 overflow-x-auto pb-3
        [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
        sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4"
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="w-[calc(66.666%-6px)] shrink-0
            sm:w-auto sm:shrink"
        >
          <HotelCardSkeleton />
        </div>
      ))}
    </section>
  );

  if (isError) {
    return (
      <div className="mx-5 flex flex-col items-center gap-3 py-8">
        <p className="text-sm text-red-500">
          Failed to load recommended hotels.
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="text-sm font-medium text-blue-700"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!hotels?.length) {
    return (
      <p className="mx-5 py-6 text-center text-gray-500">
        No recommended hotels available.
      </p>
    );
  }

  return (
    <section className="mx-5 flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
         sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">

      {hotels.map((hotel) => (
        <div key={hotel.id} className="
            w-[calc(66.666%-6px)] shrink-0 snap-start mr-4 sm:mr-0
            sm:w-auto sm:shrink
          ">
          <HotelCard hotel={hotel} />
        </div>

      ))}
    </section>
  );
}