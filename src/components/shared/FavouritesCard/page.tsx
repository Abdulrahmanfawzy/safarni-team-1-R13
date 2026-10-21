

import Image from "next/image";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";

export type FavouritesProps = {
  image: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  days: number;
};

export default function FavouritesCard({
  image,
  title,
  description,
  rating,
  days,
  price,
}: FavouritesProps) {
  return (
    <article className="w-full relative max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <Image
        src={image}
        width={400}
        height={280}
        alt={title}
        className="h-52 w-full object-cover"
      />

      <div className="icon">
        <IoMdHeart  className="absolute top-10 right-3  bg-white text-red-600 rounded-full w-6 h-6 p-1" />
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-slate-900">{title}</h3>

          <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-slate-700">
            <FaStar className="text-amber-400" aria-hidden="true" />
            {rating}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="line-clamp-2 text-sm text-slate-500">{description}</p>
          <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
            {days} days
          </span>
        </div>

        <p className="border-t border-slate-100 pt-3 text-sm text-slate-600">
          From <span className="font-semibold text-blue-600">${price}</span> per
          person
        </p>
      </div>
    </article>
  );
}