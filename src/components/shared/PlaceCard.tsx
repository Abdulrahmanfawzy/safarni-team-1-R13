import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";

type PlaceCardProps = {
  name: string;
  city: string;
  rating: number;
  image: StaticImageData;
  alt: string;
  href: string;
};

export default function PlaceCard({
  name,
  city,
  rating,
  image,
  alt,
  href,
}: PlaceCardProps) {
  return (
    <Link
      href={href}
      className="group block w-full rounded-2xl bg-white p-3 shadow-sm ring-1 ring-black/10 transition hover:shadow-lg"
    >
      {/* Image */}
   <div className="relative h-56 overflow-hidden rounded-xl sm:h-64 lg:h-52">
  <Image
    src={image}
    alt={alt}
    fill
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
    className="object-cover transition-transform duration-500 group-hover:scale-105"
  />
</div>

      {/* Name and Rating */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <h3 className="min-w-0 truncate text-lg font-bold text-slate-900 sm:text-xl lg:text-2xl">
          {name}
        </h3>

        <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-slate-800 sm:text-base">
          <Star className="size-4 fill-amber-400 text-amber-400 sm:size-5" />
          {rating.toFixed(1)}
        </span>
      </div>

      {/* City */}
      <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500 sm:text-base">
        <MapPin className="size-4 shrink-0 text-blue-600" />
        {city}
      </p>
    </Link>
  );
}
