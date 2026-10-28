
import apiClient from "@/api/client";

export const searchApi = {
  async searchTours(query: string, perPage = 1) {
    const response = await apiClient.get<unknown>("/search", {
      params: {
        q: query,
        per_page: perPage,
      },
    });

    const result = response.data as {
      success?: unknown;
      message?: unknown;
      data?: unknown;
    };

    if (result.success !== true) {
      throw new Error(
        typeof result.message === "string"
          ? result.message
          : "Failed to search tours."
      );
    }

    return result.data;
  },
};
