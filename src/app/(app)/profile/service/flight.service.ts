
import type { Iflight } from "../types/flight.types";

import { getAccessToken } from "@/lib/auth";

interface FlightResponse {
  success: boolean;
  message: string;
  errors: string[];
  data: Iflight[];
}

export async function getFlights(): Promise<Iflight[]> {
  const baseUrl = process.env.API;
 const token = await getAccessToken();
// const token = process.env.TOKEN

  if (!baseUrl) {
    throw new Error("API_BASE_URL is missing from .env.local");
  }

  const response = await fetch(
    `${baseUrl}/profile/bookings?service_type=flights`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to load flights: ${response.status}`);
  }

  const result = (await response.json()) as FlightResponse;
  return result.data;
}












