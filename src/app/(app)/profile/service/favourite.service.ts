




import { getAccessToken } from "@/lib/auth";

import type { FavoritesData } from "../types/favourite.types";

interface FavoritesResponse {
  success: boolean;
  message: string | null;
  errors: string[];
  data: FavoritesData;
}

// export async function getFavorites(): Promise<FavoritesResponse> {
//   const baseUrl = process.env.API;
// const token =await getAccessToken();

//   if (!baseUrl) {
//     throw new Error("API_BASE_URL is missing from .env.local");
//   }

//   if (!token) {
//     throw new Error("TOKEN is missing from .env.local");
//   }

//   const url = `${baseUrl}favorites`;
//   console.log("Favorites URL:", url);
// console.log("Favorites URL:", url);
//   const response = await fetch(url, {
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     cache: "no-store",
//   });

//   if (!response.ok) {
//     const errorBody = await response.text();
//     throw new Error(
//       `Failed to load favorites: ${response.status} ${errorBody}`,
//     );
//   }

//   return (await response.json()) as FavoritesResponse;
// }





export async function getFavorites(): Promise<FavoritesData> {
  const baseUrl = process.env.API;
  const token = await getAccessToken();

  if (!baseUrl) {
    throw new Error("API is missing.");
  }

  if (!token) {
    throw new Error("You must be signed in.");
  }

  const response = await fetch(`${baseUrl}api/favorites`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const result = (await response.json()) as FavoritesResponse;

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to load favourites.");
  }

  return result.data;
}



























export async function toggleFavorite(
  serviceType: string,
  serviceItemId: number,
) {
  const baseUrl = process.env.API;
  const token =await getAccessToken();
// const token = process.env.TOKEN

  if (!baseUrl || !token) {
    throw new Error("API_BASE_URL or TOKEN is missing from .env.local");
  }

  const response = await fetch(`${baseUrl}api/favorites/toggle`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      service_type: serviceType,
      service_item_id: serviceItemId,
    }),
    cache: "no-store",
  });

console.log("response ", response)

  const result = await response.json();

  
  console.log("Toggle response:", result);
  if (!response.ok) {
    throw new Error(result.message || "Failed to update favorites");
  }

  return result as {
    success: boolean;
    message: string;
    errors: string[];
    data: { is_favorite: boolean };
  };
}