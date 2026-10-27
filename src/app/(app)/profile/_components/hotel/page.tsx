



import Image from "next/image";
import { IoStarSharp } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { getHotels } from "@/app/(app)/profile/service/hotel.service";

type Room = {
  id: number;
  room_name: string;
  price_per_night: number;
  final_price: number;
  beds_count: number;
  bathrooms_count: number;
  max_guests: number;
  area_sqft: number;
  thumbnail_url: string;
};

export default async function Hotel() {
  const data = await getHotels();
  const { hotel, rooms } = data;

  return (
    <article className="rounded-xl border border-[#B22459] bg-white p-4 mx-10 shadow-sm">
      <div className="flex items-center gap-4">
        <Image
          src={hotel.cover_photo}
          alt={hotel.name}
          width={120}
          height={120}
          className="size-20 shrink-0 rounded-lg object-cover sm:size-28"
        />

        <div className="flex w-full justify-between">
          
          <div>

          {hotel.discount_rate > 0 && (
            <span className="rounded-full border border-[#EBF5FF] px-3 py-1 text-xs">
              {hotel.discount_rate}% off
            </span>
          )}

          <h2 className="mt-2 text-lg font-semibold">{hotel.name}</h2>

          <p className="flex items-center gap-1 text-sm text-slate-500">
            <FaMapMarkerAlt aria-hidden="true" />
            {hotel.city}
          </p>
          </div>
          


<div>
   <p className="mt-1 flex items-center gap-1 text-sm text-slate-600">
            <IoStarSharp className="text-amber-400" aria-hidden="true" />
            {hotel.stars_count} stars
          </p>
</div>


        </div>
      </div>

      <div className="mt-4 space-y-3 border-t pt-4">
        {rooms.map((room: Room) => (
          <div
            key={room.id}
            className="flex items-center gap-3 rounded-lg bg-slate-50 p-3"
          >
            <Image
              src={room.thumbnail_url}
              alt={room.room_name}
              width={80}
              height={80}
              className="size-16 rounded-md object-cover"
            />

            <div className="min-w-0 flex-1">
              <h3 className="font-medium">{room.room_name}</h3>
              <p className="text-sm text-slate-500">
                {room.beds_count} beds · {room.bathrooms_count} bathrooms · Up
                to {room.max_guests} guests
              </p>
            </div>

            <p className="whitespace-nowrap text-sm font-semibold">
              ${room.final_price}
              <span className="font-normal text-slate-500"> / night</span>
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}