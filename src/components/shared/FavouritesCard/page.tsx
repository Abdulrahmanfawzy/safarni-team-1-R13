

import { FaStar } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";



interface FavoriteCardProps {
  imageUrl?: string;
  
  title: string;
  rating?: string;
  duration?: string;
  model?:string;
  price?: string;
  pickup_available?: boolean;
  adventure_style?: string;
}

export default function FavoriteCard({
  imageUrl,
  
  title,
  rating,
  duration,

  price,

  pickup_available,
  adventure_style,
}: FavoriteCardProps) {
  return (
    <article className="overflow-hidden  rounded-2xl bg-white p-2 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-36 overflow-hidden rounded-xl bg-gray-100 sm:h-40">
        {imageUrl ? (
         
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="grid h-full place-items-center text-xs text-gray-400">
            Image unavailable
          </div>
        )}

        <IoMdHeart
          className="absolute right-3 top-3 size-7 rounded-full bg-white p-1 text-red-600 shadow"
          aria-label="Favorite"
        />
      </div>

      <div className="space-y-2 p-3">
        <div className="flex items-center justify-between gap-2">
          {/* <p className="truncate text-xs text-gray-400">{category}</p> */}

          {rating && (
            <span className="flex shrink-0 items-center gap-1 text-xs text-gray-700">
              <FaStar className="text-amber-400" aria-hidden="true" />
              {rating}
            </span>
          )}
        </div>

        <h3 className="truncate text-sm font-semibold text-slate-900">
          {title}
        </h3>

        <div className="flex justify-between  flex-wrap items-center gap-2 text-xs text-slate-500">
      


          {pickup_available !== undefined && (
            <span>{pickup_available ? "Pickup available" : "No pickup"}</span>
          )}
          {duration && (
            <span className="rounded-full bg-slate-100 px-2.5 py-1">
              {duration} 
            </span>
          )}

     
        </div>


    {adventure_style && <span>  type : {adventure_style}</span>}

        {price && (
          <p className="border-t border-slate-100 pt-2 text-xs text-slate-600">
            From  
            <span className="font-semibold text-blue-600"> ${price}</span>
            {" "}per person
          </p>
        )}
      </div>
    </article>
  );
}

