
"use client";

import { useQuery } from "@tanstack/react-query";
import { getHotelDetailsAction } from "@/actions/hotels";

export function useGetHotelDetails(hotelId: string) {
  return useQuery({
    queryKey: ["hotel-details", hotelId],
    queryFn: () => getHotelDetailsAction(Number(hotelId)),
    enabled: hotelId.trim().length > 0 &&
      Number.isFinite(Number(hotelId)),
    select: (response) => response.data,
  });
}
