"use client";

import { useGetHotelDetails } from "@/hooks/hotels/useGetHotelDetails";
import { useGetHotelRooms } from "@/hooks/hotels/useGetHotelRooms";
import RoomDetailsImage from "./RoomDetailsImage";
import RoomDetailsInfo from "./RoomDetailsInfo";

interface IProps {
  hotelId: string;
  roomSlug: string;
}

export default function RoomDetailsPage({ hotelId, roomSlug }: IProps) {
  const {
    data: hotel,
    isLoading,
    isError,
    refetch,
  } = useGetHotelDetails(hotelId);
  const {
    data: roomsResponse,
    isLoading: isRoomsLoading,
    isError: isRoomsError,
    refetch: refetchRooms,
  } = useGetHotelRooms(hotelId);

  if (isLoading || isRoomsLoading) {
    return (
      <main className="app-container grid gap-6 py-6 lg:grid-cols-2">
        <div className="h-96 animate-pulse rounded-2xl bg-gray-200" />
        <div className="h-96 animate-pulse rounded-2xl bg-gray-200" />
      </main>
    );
  }

  if (isError || isRoomsError || !hotel || !roomsResponse) {
    return (
      <div className="py-10 text-center">
        <p className="text-red-500">
          Failed to load hotel details.
        </p>

        <button
          type="button"
          onClick={() => {
            void refetch();
            void refetchRooms();
          }}
          className="mt-3 text-blue-700"
        >
          Try again
        </button>
      </div>
    );
  }

  const room = roomsResponse.data.rooms.find(
    (item) =>
      item.room_name.trim().toLowerCase().replace(/\s+/g, "-") ===
      roomSlug.toLowerCase()
  );

  if (!room) {
    return (
      <div className="py-10 text-center">
        <p className="text-gray-500">The requested room could not be found.</p>
      </div>
    );
  }

  const images = [
    ...new Set(
      [room.thumbnail_url, ...hotel.media_gallery, hotel.cover_photo].filter(
        Boolean
      )
    ),
  ];

  return (
    <main className="app-container my-3.5 flex w-full flex-col gap-8 max-lg:my-0! max-lg:px-0! lg:flex-row lg:items-start lg:justify-between">
      <RoomDetailsImage
        images={images}
        mobileImages={images}
      />

      <RoomDetailsInfo hotel={hotel} room={room} />
    </main>
  );
}