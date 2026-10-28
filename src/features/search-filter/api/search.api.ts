
import apiClient from "@/api/client";
import { searchResponseSchema } from "@/features/search-filter/schemas/search.schema";

export const searchApi = {
  async searchTours(query: string, perPage = 1) {
    const response = await apiClient.get<unknown>("/search", {
      params: {
        q: query,
        per_page: perPage,
      },
    });

    const result = searchResponseSchema.parse(response.data);

    if (!result.success || !result.data) {
      throw new Error(
        result.message || "Failed to search tours."
      );
    }

    return result.data;
  },
};
