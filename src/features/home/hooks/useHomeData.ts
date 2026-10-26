
"use client";

import { useQuery } from "@tanstack/react-query";
// import { homeApi } from "@/api/home.api";

export function useHomeData() {
  const toursQuery = useQuery({
    queryKey: ["home", "tours"],
    // queryFn: homeApi.getTours,
  });

  return {
    tours: toursQuery.data ?? [],
    isLoading: toursQuery.isLoading,
    error: toursQuery.error,
    isError: toursQuery.isError,
    refetch: toursQuery.refetch,
  };
}
