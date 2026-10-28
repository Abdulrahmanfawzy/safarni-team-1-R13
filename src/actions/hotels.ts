"use server";

import { getHotels } from "@/api/hotels";


export async function getHotelsAction(
  section: "recommended" | "nearby" = "recommended"
) {
  return getHotels(section);
}