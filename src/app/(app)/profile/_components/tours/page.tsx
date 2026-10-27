

import Image from "next/image";
import { IoStarSharp } from "react-icons/io5";
import { getTours } from "../../service/tours.service";

export default async function Tour() {
  const data = await getTours();

  return (
    <div className="space-y-3">
      {data.items.map((tour) => (
        <article
          key={tour.id}
          className="flex items-center justify-between gap-3 rounded-xl border border-[#B22459] bg-white p-3"
        >
          <div className="flex min-w-0 items-center gap-2">
            {tour.image ? (
              <Image
                src={tour.image}
                alt={tour.title}
                width={80}
                height={80}
                className="size-16 shrink-0 rounded-lg object-cover"
              />
            ) : (
              <div
                className="size-16 shrink-0 rounded-lg bg-slate-100"
                aria-label="No tour image available"
              />
            )}

            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-500">
                {tour.duration_text}
              </p>
              <h2 className="truncate text-sm font-semibold">{tour.title}</h2>
              <p className="mt-1 text-xs text-slate-500">
                From <span className="font-semibold text-blue-600">${tour.price}</span>{" "}
                Per Person
              </p>
            </div>
          </div>

          {tour.rating !== null && (
            <div className="flex shrink-0 items-center gap-1 text-xs">
              <IoStarSharp className="text-amber-400" aria-hidden="true" />
              <span>{tour.rating}</span>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}