import apiClient from "@/api/client";
import { homeFeedResponseSchema } from "@/features/home/schemas/home.schema";

export const homeApi = {
  async getTours() {
    const response = await apiClient.get<unknown>("/tours");

    const result = response.data as {
      success?: unknown;
      message?: unknown;
      data?: { items?: unknown };
    };

    if (result.success !== true) {
      throw new Error(
        typeof result.message === "string"
          ? result.message
          : "Failed to retrieve tours."
      );
    }

    if (!Array.isArray(result.data?.items)) {
      throw new Error("Invalid tours response.");
    }

    return result.data;
  },

  async getHomeFeed() {
    const response = await apiClient.get<unknown>("/home");
    const result =  homeFeedResponseSchema.parse(response.data);
    

    if (!result.success) {
      throw new Error(
        result.message || "Failed to retrieve tours."
      );
    }
    return result.data;
  },
};