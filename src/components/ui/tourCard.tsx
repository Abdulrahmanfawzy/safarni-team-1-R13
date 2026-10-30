
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import crank from "@/assets/images/crank.jpg";

type Tour = {
  slug: string;
  image?: string | null;
  title: string;
  adventure_style: string;
  rating: number | null;
  duration_text: string;
  price: number;
};

type TourCardProps = {
  tour: Tour;
};

export default function TourCard({ tour }: TourCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md">
      <Link
        href={`/tours/${tour.slug}`}
        aria-label={`View details for ${tour.title}`}
        className="flex h-full flex-col"
      >
        <div className="relative block aspect-[4/3] overflow-hidden">
          <Image
            src={tour.image || crank}
            alt={tour.title}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-xs font-medium capitalize text-slate-500 sm:text-sm">
              {tour.adventure_style}
            </p>

            <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-slate-800 sm:text-sm">
              {tour.rating !== null ? (
                <>
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  {tour.rating.toFixed(1)}
                </>
              ) : (
                "New"
              )}
            </span>
          </div>

          <h3 className="mt-2 line-clamp-2 text-base font-semibold text-slate-900 sm:text-lg">
            {tour.title}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            {tour.duration_text}
          </p>

          <p className="mt-2 text-sm text-slate-600">
            From{" "}
            <span className="font-semibold text-(--primary)">
              ${tour.price}
            </span>{" "}
            / person
          </p>
        </div>
      </Link>
    </article>
  );
}
