import Image from "next/image";
import type { CompareTour } from "@/types/compare.types";

interface Props {
  item: CompareTour;
}

export default function SelectedItemCard({ item }: Props) {
  return (
    <article className="flex min-w-0 items-center gap-3 rounded-2xl border border-gray-100 bg-[#FAFAFA] p-3 shadow-[0px_0px_25px_0px_#D1D5DB8F] sm:gap-4 sm:p-4">
      <div className="relative size-24 shrink-0 overflow-hidden rounded-lg sm:size-32 lg:size-40">
        <Image
          src={item.image}
          alt={item.title}
          fill
          unoptimized
          sizes="(max-width: 639px) 96px, (max-width: 1023px) 128px, 160px"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 flex-1 gap-1.5">
        <h3 className="wrap-break-word text-base font-medium text-[#0F1417] sm:text-lg lg:text-xl">
          {item.title}
        </h3>
      
        <p className="mt-1 wrap-break-wordtext-xs text-gray-500 sm:text-sm lg:text-base">
          { item.time_range || "Schedule unavailable"}
          <span> {item.price_label}</span>
        </p>
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500 sm:text-sm lg:text-base">
          {item.description}
        </p>
      </div>

      
    </article>
  );
}