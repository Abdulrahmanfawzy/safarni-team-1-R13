import type { HotelDummy } from "@/types/hotel.types";
import Image from "next/image";
import DiscountBadge from "./DiscountBadge";
import HotelRating from "./HotelRating";
import { MapPin } from "lucide-react";
import { cn } from "cn";
import Link from "next/link";

interface IProps {
  hotel: HotelDummy;
  variant?: "default" | "horizontal";
}
const HotelCard = ({ hotel, variant = 'default' }: IProps) => {
  const isHorizontal = variant === "horizontal";
  return (
    <Link  href={`/hotel/${hotel.id}`} className="block min-w-0">
      <article className={cn("min-w-0 w-full overflow-hidden rounded-2xl bg-primary-foreground p-3 ",
        isHorizontal
          ? "flex items-center gap-3  shadow-[0px_3.39px_13.58px_0px_#838BB41F]"
          : "overflow-hidden w-54.25 sm:w-full shadow-[0px_0px_20px_0px_#6F6F6F40] sm:shadow-[0px_0px_26.37px_0px_#6F6F6F40]",

      )}>
        <div className={cn(
          "relative shrink-0 overflow-hidden rounded-xl",
          isHorizontal
            ? "w-31 h-31 sm:h-37.5 sm:w-37.5"
            : "mx-1 aspect-4/3",
        )}>
          <Image
            src={hotel.image}
            alt={hotel.name}

            fill
            sizes={isHorizontal ? "124px sm:150px" : "(max-width: 640px) 90vw, 25vw"}
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className={cn("flex items-center justify-between gap-2", isHorizontal ? "mt-0" : "mt-3 ")}>
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
        </div>
      </article>
    </Link>
  )
}

export default HotelCard