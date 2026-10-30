import apiClient from "@/api/client";
import { homeFeedResponseSchema } from "@/features/home/schemas/home.schema";

export const homeApi = {

async getTours() {
  const response = await apiClient.get<unknown>("/tours");

  const result = response.data as {
    data?: unknown;
    links?: unknown;
    meta?: unknown;
  };

  if (!Array.isArray(result.data)) {
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