import "server-only";

import { getAccessToken } from "@/lib/auth";
import type { HotelDetailsResponse, HotelsResponse } from "@/types/hotel.types";
import { HotelRoomsResponse } from "@/types/room.types";

// ---get all hotels-------------------------------------------
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
// ---get all rooms for hotel-------------------------------------------

export async function getHotelRooms(hotelId: number): Promise<HotelRoomsResponse> {
  const accessToken = await getAccessToken();
  const response = await fetch(
    `${process.env.API}api/hotels/${hotelId}/rooms`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch hotel rooms");
  }

  return response.json();
}
//--- Get hotel details-----------------------------------------------
export async function getHotelDetails(
  hotelId: number
): Promise<HotelDetailsResponse> {
  const baseUrl = process.env.API;

  if (!baseUrl) {
    throw new Error("API environment variable is missing");
  }

  const response = await fetch(
    `${baseUrl}api/hotels/${hotelId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch hotel details");
  }

  return response.json();
}
// ---get all hotels-------------------------------------------
export async function getHotelsByParams(
  search: string
): Promise<HotelsResponse> {
  const baseUrl = process.env.API;

  if (!baseUrl) {
    throw new Error("API environment variable is missing");
  }
   const params = new URLSearchParams();

  if (search.trim()) {
    params.set("search", search.trim());
  }
  const query = params.toString();
  const response = await fetch(
    `${baseUrl}api/hotels${query ? `?${query}` : ""}`,
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