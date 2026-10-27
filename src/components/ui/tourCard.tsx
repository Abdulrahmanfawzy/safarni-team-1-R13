
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import crank from "@/assets/images/crank.jpg";
import type { Tour } from "@/features/home/schemas/home.schema";

type TourCardProps = {
  tour: Tour;
};

export default function TourCard({ tour }: TourCardProps) {
  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/5 transition hover:shadow-md sm:gap-4"
    >
      <div className="relative size-20 shrink-0 overflow-hidden rounded-xl sm:size-24">
        <Image
          src={tour.image || crank}
          alt={tour.title}
          fill
          sizes="(min-width: 640px) 96px, 80px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-xs font-medium capitalize text-slate-500 sm:text-sm">
            {tour.adventure_style}
          </p>

          <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-slate-800 sm:text-sm">
            {tour.rating !== null ? (
              <>
                <Star className="size-3.5 fill-amber-400 text-amber-400 sm:size-4" />
                {tour.rating.toFixed(1)}
              </>
            ) : (
              "New"
            )}
          </span>
        </div>

        <h3 className="mt-0.5 truncate text-base font-semibold text-slate-900 sm:text-lg">
          {tour.title}
        </h3>

        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          {tour.duration_text}
        </p>

        <p className="mt-1 text-xs text-slate-500 sm:text-sm">
          From{" "}
          <span className="font-semibold text-(--primary)">
            ${tour.price}
          </span>{" "}
          / person
        </p>
      </div>
    </Link>
  );
}
