
"use client";

import { useQuery } from "@tanstack/react-query";
import { searchApi } from "@/features/search-filter/api/search.api";

export function useSearchTours(
  query: string,
  page = 1,
  perPage = 12
) {
  return useQuery({
    queryKey: ["search-tours", query, page, perPage],
    queryFn: () => searchApi.searchTours(query, page, perPage),
    enabled: query.trim().length > 0,
    staleTime: 30_000,
    placeholderData: (previousData) => previousData,
  });
}
