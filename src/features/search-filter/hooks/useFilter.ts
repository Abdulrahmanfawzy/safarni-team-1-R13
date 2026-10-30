
import { useQuery } from "@tanstack/react-query";

import { filterApi } from "@/features/search-filter/api/filter.api";

export type FilterParams = {
  q?: string;
  min_price?: number;
  max_price?: number;
  adventure_style?: string[];
  location?: string | string[];
  min_rating?: number;
  sort?: string;
};

export function useFilter(params: FilterParams = {}) {
  const normalizedParams = {
    ...params,
    q: params.q?.trim() ?? "",
    location: Array.isArray(params.location)
      ? params.location.join(",")
      : params.location,
  };

  return useQuery({
    queryKey: ["filter-tours", normalizedParams],
    queryFn: () => filterApi.getResults(normalizedParams),
  });
}
