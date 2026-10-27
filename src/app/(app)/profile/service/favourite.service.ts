// import type { FavoritesData } from "../types/favourite.types";


// interface FavoritesResponse {
//   success: boolean;
//   message: string | null;
//   errors: string[];
//   data: FavoritesData;
// }


// export async function getFavorites(): Promise<FavoritesResponse> {
//   const baseUrl = process.env.API_BASE_URL;
//  const token = process.env.TOKEN
//   if (!baseUrl) {
//     throw new Error("Add API_BASE_URL to the .env.local file, then restart the project.");
//   }

//   const response = await fetch(`${baseUrl}/v1/favorites`, {
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     cache: "no-store",
//   });

//   if (!response.ok) {
//     throw new Error(`Failed to load favorites: ${response.status}`);
//   }

//   return response.json() as Promise<FavoritesResponse>;
// }


























import type { FavoritesData } from "../types/favourite.types";

interface FavoritesResponse {
  success: boolean;
  message: string | null;
  errors: string[];
  data: FavoritesData;
}

export async function getFavorites(): Promise<FavoritesResponse> {
  const baseUrl = process.env.API_BASE_URL;
  const token = process.env.TOKEN;

  if (!baseUrl) {
    throw new Error("API_BASE_URL is missing from .env.local");
  }

  if (!token) {
    throw new Error("TOKEN is missing from .env.local");
  }

  const url = `${baseUrl.replace(/\/+$/, "")}/v1/favorites`;
  console.log("Favorites URL:", url);
console.log("Favorites URL:", url);
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Failed to load favorites: ${response.status} ${errorBody}`,
    );
  }

  return (await response.json()) as FavoritesResponse;
}