
import type { Hotel, Room } from "../types/hotel.types";

import { getAccessToken } from "@/lib/auth";

interface HotelRoomsData {
  hotel: Hotel;
  rooms: Room[];
}

interface HotelResponse {
  code: number;
  message: string;
  data: HotelRoomsData;
}

export async function getHotels(): Promise<HotelRoomsData> {
  const baseUrl = process.env.API;
 const token = getAccessToken();
// const token = process.env.TOKEN

  if (!baseUrl) {
    throw new Error("API_BASE_URL is missing from .env.local");
  }

  const response = await fetch(`${baseUrl}/hotels/3/rooms`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to load hotel rooms: ${response.status}`);
  }

  const result = (await response.json()) as HotelResponse;
  return result.data;
}