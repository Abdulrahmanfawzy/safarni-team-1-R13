import type { HotelDummy } from "@/types/hotel.types";
import Image from "next/image";
import DiscountBadge from "./DiscountBadge";
import HotelRating from "./HotelRating";
import { MapPin } from "lucide-react";

interface IProps {
  hotel: HotelDummy;
}
const HotelCard = ({ hotel }: IProps) => {
  return (
    <article className="min-w-0 overflow-hidden rounded-2xl bg-primary-foreground p-3 shadow-[0px_0px_26.37px_0px_#6F6F6F40] ">
      <div className="relative aspect-4/3 m-1 overflow-hidden rounded-xl ">
        <Image
          src={hotel.image}
          alt={hotel.name}

          fill

          className="object-cover"
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <DiscountBadge discount={hotel.discount} />
        <HotelRating rating={hotel.rating} />
      </div>

      <h3 className="mt-2 truncate text-xl font-medium text-slate-900">
        {hotel.name}
      </h3>

      <div className="mt-2 flex items-center gap-1 text-xs text-slate-400">
        <MapPin className="w-[20.75] h-[24.5px] text-gray-400 " />
        <span className="text-base text-gray-400 leading-7.25 tracking-[-0.24px] ">{hotel.location}</span>
      </div>
    </article>
  )
}

export default HotelCard