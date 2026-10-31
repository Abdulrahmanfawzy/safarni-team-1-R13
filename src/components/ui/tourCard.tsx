import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import crank from "@/assets/images/crank.jpg";

type Tour = {
  id?: number;
  slug?: string;
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
  const href = tour.slug ? `/tours/${tour.slug}` : `/internaltour/${tour.id}`;

  return (
    <Link
      href={href}
      className="group flex w-full flex-col gap-3 rounded-3xl bg-white p-2.5 shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
    >
      {/* Image on top, full width */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
        <Image
          src={tour.image || crank}
          alt={tour.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content below */}
      <div className="flex min-w-0 flex-col px-2 pb-2">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium capitalize text-slate-400">
            {tour.adventure_style}
          </p>

          <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-slate-800">
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

        <h3 className="mt-2 truncate text-lg font-semibold text-slate-900">
          {tour.title}
        </h3>

        <p className="mt-1 text-sm text-slate-500">{tour.duration_text}</p>

        <p className="mt-2 text-sm text-slate-500">
          From{" "}
          <span className="font-bold text-(--primary)">${tour.price}</span>{" "}
          Per Person
        </p>
      </div>
    </Link>
  );
}
