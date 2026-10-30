
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
      `${baseUrl?.replace(/\/+$/, "")}/api/profile/bookings?service_type=flights`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );
  console.log( "resflight " ,  response);
  

  if (!response.ok) {
    throw new Error(`Failed to load flights: ${response.status}`);
  }

  const result = (await response.json()) as FlightResponse;
  console.log("results" , result);
  
  return result.data;
}












