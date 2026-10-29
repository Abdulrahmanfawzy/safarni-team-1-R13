
import type { HotelRoom } from "@/types/room.types";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  room: HotelRoom;
  hotelId: string;
}

const RoomCard = ({ room, hotelId }: IProps) => {
  const roomSlug = room.room_name.trim().toLowerCase().replace(/\s+/g, "-");

  return (
    <Link
      href={`/hotels/${hotelId}/${encodeURIComponent(roomSlug)}`}
      className="block w-full min-w-0"
    >
      <article className="flex w-full flex-col gap-4 overflow-hidden rounded-3xl bg-primary-foreground p-4 shadow-[0px_0px_26.37px_0px_#6F6F6F40]">
        <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-lg">
          <Image
            src={room.thumbnail_url}
            fill
            alt={room.room_name}
            unoptimized
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-xl leading-[100%] font-medium text-gray-900">
            {room.room_name}
          </h3>

          <p className="text-lg leading-6 font-medium text-gray-400">
            From{" "}
            <span className="text-blue-600">${room.final_price}</span> Per
            Night
          </p>
          <p className="text-sm text-gray-500">
            {room.beds_count} beds · {room.bathrooms_count} bathrooms · Up to{" "}
            {room.max_guests} guests
          </p>
        </div>
      </article>
    </Link>
  );
};

export default RoomCard;