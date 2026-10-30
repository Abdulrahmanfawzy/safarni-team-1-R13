"use client";

import { getRoomAvailabilityAction } from "@/actions/hotels";
import { useQuery } from "@tanstack/react-query";

export function useRoomAvailability(
  roomId: number,
  month: number,
  year: number
) {
  return useQuery({
    queryKey: ["room-availability", roomId, month, year],

    queryFn: () =>
      getRoomAvailabilityAction(roomId, month, year),

    enabled: !!roomId && !!month && !!year,
  });
}