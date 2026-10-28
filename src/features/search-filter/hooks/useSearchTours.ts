
"use client";

import { useQuery } from "@tanstack/react-query";
import { searchApi } from "@/features/search-filter/api/search.api";

export function useSearchTours(query: string, perPage = 1) {
  return useQuery({
    queryKey: ["search-tours", query, perPage],
    queryFn: () => searchApi.searchTours(query, perPage),
    enabled: query.trim().length > 0,
  });
}
