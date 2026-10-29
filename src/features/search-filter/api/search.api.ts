
import apiClient from "@/api/client";
import { searchResponseSchema } from "@/features/search-filter/schemas/search.schema";

export const searchApi = {
  async searchTours(query: string, page = 1, perPage = 10) {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return null;
    }

    const response = await apiClient.get<unknown>("/tours/search", {
      params: {
        q: trimmedQuery,
        page,
        per_page: perPage,
      },
    });

    console.log(
      "Search API URL:",
      response.config.baseURL,
      response.config.url
    );
    console.log("Search API response:", response.status, response.data);

    const result = searchResponseSchema.parse(response.data);

    if (!result.success || !result.data) {
      throw new Error(result.message || "Failed to search tours.");
    }

    return result.data;
  },
};
