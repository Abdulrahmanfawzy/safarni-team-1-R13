import apiClient from "@/api/client";
import { toursResponseSchema } from "@/features/home/schemas/home.schema";

export const homeApi = {
  async getTours() {
    const response = await apiClient.get<unknown>("/tours");

    const result = toursResponseSchema.parse(response.data);

    if (!result.success) {
      throw new Error(
        result.message || "Failed to retrieve tours."
      );
    }

    return result.data.items;
  },

  async getHomeFeed() {
    const response = await apiClient.get<unknown>("/home");

    return response.data;
  },
};