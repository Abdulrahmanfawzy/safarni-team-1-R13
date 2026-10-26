import type { FavoritesData } from "../types/favourite.types";


interface FavoritesResponse {
  success: boolean;
  message: string | null;
  errors: string[];
  data: FavoritesData;
}


export async function getFavorites(): Promise<FavoritesResponse> {
  const baseUrl = process.env.API_BASE_URL;
 const token = process.env.TOKEN
  if (!baseUrl) {
    throw new Error("Add API_BASE_URL to the .env.local file, then restart the project.");
  }

  const response = await fetch(`${baseUrl}/v1/favorites`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to load favorites: ${response.status}`);
  }

  return response.json() as Promise<FavoritesResponse>;
}