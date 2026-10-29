

import { getAccessToken } from "@/lib/auth";
import { Itours } from "../types/tours.types";

interface ToursData {
      items: Itours[];
 
}



interface ToursResponse {
  success: boolean;
  message: string;
  errors: unknown[];
  data: Itours[];
}


export async function getTours(): Promise<Itours[]> {
  const baseUrl = process.env.API;
 const token =await getAccessToken();
// const token = process.env.TOKEN

  if (!baseUrl) {
    throw new Error("API_BASE_URL is missing from .env.local");
  }

  // const response = await fetch(`${baseUrl}api/tours?per_page=1`
  const response = await fetch(`
    ${baseUrl}api/tours?min_budget=50&max_budget=500&tour_type=cultural&location=Egypt&rate=4&per_page=10&page=1
    `
   
    
    
    , {
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