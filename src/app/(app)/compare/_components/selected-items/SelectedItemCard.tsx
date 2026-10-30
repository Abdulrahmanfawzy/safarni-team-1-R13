import Image from "next/image";
import type { CompareTour } from "@/types/compare.types";
import { Check } from "lucide-react";

interface Props {
  item: CompareTour;
  selected: boolean;
  disabled?: boolean;
  onSelect: () => void;
}

export default function SelectedItemCard({ item ,selected,
  disabled = false,
  onSelect,}: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={selected}
      aria-label={`Select ${item.title} for comparison`}
      className={`relative flex min-w-0 w-full items-center gap-3 rounded-2xl border bg-[#FAFAFA] p-3 text-left shadow-[0px_0px_25px_0px_#D1D5DB8F] transition-all sm:gap-4 sm:p-4 ${
        selected
          ? "border-blue-600 ring-1 ring-blue-600"
          : "border-gray-100 hover:border-blue-300"
      } ${
        disabled
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer"
      }`}
    >      <div className="relative size-24 shrink-0 overflow-hidden rounded-lg sm:size-32 lg:size-40">
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
         {/* Selected Indicator */}
      {selected && (
        <span className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full bg-blue-600 text-white">
          <Check size={15} />
        </span>
      )}

      
    </button>
  );
}