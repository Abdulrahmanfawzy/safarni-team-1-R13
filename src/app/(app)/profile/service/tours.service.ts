

import type { Hotel, Room } from "../types/hotel.types";
import { Itours } from "../types/tours.types";

interface ToursData {
      items: Itours[];
 
}

interface ToursResponse {
  code: number;
  message: string;
  data: ToursData;
}

export async function getTours(): Promise<ToursData> {
  const baseUrl = process.env.API_BASE_URL;
  const token = process.env.TOKEN;

  if (!baseUrl) {
    throw new Error("API_BASE_URL is missing from .env.local");
  }

  const response = await fetch(`${baseUrl}/tours?per_page=10`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to load hotel rooms: ${response.status}`);
  }

  const result = (await response.json()) as ToursResponse;
  return result.data;
}