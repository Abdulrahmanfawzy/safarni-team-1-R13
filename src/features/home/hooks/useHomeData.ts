
"use client";

import { useQuery } from "@tanstack/react-query";
import { homeApi } from "@/api/home.api";

export function useHomeData() {
  const homeQuery = useQuery({
    queryKey: ["home", "feed"],
    queryFn: homeApi.getHomeFeed,
  });

  const homeData = (homeQuery.data as { data?: Record<string, any> } | undefined)?.data;

  return {
    categories: homeData?.categories ?? [],
    recommendations: homeData?.recommendations ?? [],
    availableTours: homeData?.available_tours ?? [],

    isLoading: homeQuery.isLoading,
    isError: homeQuery.isError,
    error: homeQuery.error,
    refetch: homeQuery.refetch,
  };
}
