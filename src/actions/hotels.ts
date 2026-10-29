"use server";

import { getHotelDetails, getHotelRooms, getHotels, getHotelsByParams } from "@/api/hotels";
import { HotelRoomsResponse } from "@/types/room.types";


// ---get all hotels------------------------------------------------------------------------

export async function getHotelsAction(
  section: "recommended" | "nearby" = "recommended"
) {
  return getHotels(section);
}
// ---get all rooms for hotel-----------------------------------------------------------------

export async function getHotelRoomsActions(hotelId: number): Promise<HotelRoomsResponse> {
  return getHotelRooms(hotelId);
}
//-- Get hotel details---------------------------------------------------------
export async function getHotelDetailsAction(hotelId: number) {
  return getHotelDetails(hotelId);
}
//-- Get hotels by param ---------------------------------------------------------------------
export async function getHotelsByParamsAction(search:string) {
  return getHotelsByParams(search);
}