import apiClient from "@/api/client";

export type FilterParams = {
  q?: string;
  min_price?: number;
  max_price?: number;
  adventure_style?: string[];
  location?: string;
  min_rating?: number;
  sort?: string;
  page?: number;
  per_page?: number;
};

export const filterApi = {
  async getResults(params: FilterParams) {
    const response = await apiClient.get("/search/results", {
      params,
    });

    return response.data;
  },
};