
import { useQuery } from "@tanstack/react-query";
import { filterApi } from "@/features/search-filter/api/filter.api";

export function useFilter(query: string) {
  return useQuery({
    queryKey: ["filter-tours", query],
    queryFn: () => filterApi.getFilteredTours(query),
    enabled: query.trim().length > 0,
  });
}
