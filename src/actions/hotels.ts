"use server";

import { getHotelDetails, getHotelRooms, getHotels, getHotelsByParams, getRoomAvailability } from "@/api/hotels";
import { HotelRoomsResponse, RoomAvailabilityResponse } from "@/types/room.types";


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
// --- Get room availability --------------------------------

export async function getRoomAvailabilityAction(
  roomId: number,
  month: number,
  year: number
): Promise<RoomAvailabilityResponse> {
  return getRoomAvailability(roomId, month, year);
}