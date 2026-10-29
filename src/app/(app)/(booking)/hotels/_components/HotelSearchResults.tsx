
"use client";

import { useGetHotelsByParams } from "@/hooks/hotels/useGetHotelsBySearchParam";
import HotelCard from "./HotelCard";
import SectionHeader from "./SectionHeader";



interface Props {
  search: string;
}

export default function HotelSearchResults({ search }: Props) {
      const normalizedSearch = search.trim();

  const { data, isPending, isError } =useGetHotelsByParams(normalizedSearch);
  if (!normalizedSearch) return null;

  if (isPending) {
    return <p>Searching hotels...</p>;
  }

  if (isError) {
    return <p>Failed to load hotels. Please try again.</p>;
  }

  const hotels = data?.data?.data ?? [];

  if (hotels.length === 0) {
    return <p>No hotels found.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
            <SectionHeader title="Search Results" />
      

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
    </div>
  );
}
