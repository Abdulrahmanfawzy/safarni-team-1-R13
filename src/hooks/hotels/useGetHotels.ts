"use client";

import { getHotelsAction } from "@/actions/hotels";
import { useQuery } from "@tanstack/react-query";

export function useGetHotels(
  section: "recommended" | "nearby" = "recommended"
) {
  return useQuery({
    queryKey: ["hotels", section],
    queryFn: () => getHotelsAction(section),
    select: (response) => response.data.data,
  });
}