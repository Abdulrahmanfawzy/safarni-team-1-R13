"use client";

import { getHotelRoomsActions } from "@/actions/hotels";
import { useQuery } from "@tanstack/react-query";

export function useGetHotelRooms(hotelId: string) {
  return useQuery({
    queryKey: ["hotel-rooms", hotelId],
    queryFn: () => getHotelRoomsActions(Number(hotelId)),
    enabled: hotelId.trim().length > 0 && Number.isFinite(Number(hotelId)),
  });
}