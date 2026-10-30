
import apiClient from "@/api/client";
import {
  filterResponseSchema,
  type FilterResponse,
} from "@/features/search-filter/schemas/filter.schema";

export const filterApi = {
  async getFilteredTours(query: string): Promise<FilterResponse> {
    const response = await apiClient.get("/search/results", {
      params: {
        q: query,
      },
    });

    return filterResponseSchema.parse(response.data);
  },
};
