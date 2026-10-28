import "server-only";

import type { HotelsResponse } from "@/types/hotel.types";

export async function getHotels(
  section: "recommended" | "nearby" = "recommended"
): Promise<HotelsResponse> {
  const baseUrl = process.env.API;

  if (!baseUrl) {
    throw new Error("API environment variable is missing");
  }

  const response = await fetch(
    `${baseUrl}api/hotels?section=${section}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch hotels");
  }

  return response.json();
}