

"use client";

import { useState, useTransition } from "react";
import { FaStar } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";

interface FavoriteCardProps {
  id: number;
  serviceType: string;
  image?: string;
  title: string;
  rating?: number;
  duration?: string;
  price?: string | number;
  pickup_available?: boolean;
  adventure_style?: string;
  
}

export default function FavoriteCard({
  id,
  serviceType,
  image,
  title,
  rating,
  duration,
  price,
  pickup_available,
  adventure_style,
  
}: FavoriteCardProps) {
  const [isFavorite, setIsFavorite] = useState(true);
  const [isPending, startTransition] = useTransition();

  function handleHeartClick() {
    startTransition(async () => {
      try {
        const response = await fetch("/api/favorites/toggle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            service_type: serviceType,
            service_item_id: id,
          }),
        });

        const result = await response.json();

        console.log("Toggle response:", result);

 

setIsFavorite(false);

      
        setIsFavorite(result.data.is_favorite);
      } catch (error) {
        console.error("Favorite toggle failed:", error);
      }
    });
  }

  if (!isFavorite) return null;

  return (
    <article className="overflow-hidden rounded-2xl bg-white p-2 shadow-md transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-36 overflow-hidden rounded-xl bg-gray-100 sm:h-40">
        
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        

        <button
          type="button"
          onClick={handleHeartClick}
          disabled={isPending}
          aria-label="remove your favourites"
          className="absolute right-3 top-3 z-10 rounded-full bg-white p-1 shadow disabled:opacity-50"
        >
          <IoMdHeart className="size-7 text-red-600" />
        </button>
      </div>

      <div className="space-y-2 p-3">
        <div className="flex items-center  gap-2">
          {
          rating ? (
            <span className="flex mt-1 items-center gap-1 text-end text-gray-700">
              <FaStar className="text-amber-400" aria-hidden="true" />
              {rating}
            </span>
          ) : null}
        </div>

        <h3 className="truncate text-sm font-semibold text-slate-900">
          {title}
        </h3>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          {pickup_available !== undefined && (
            <span>{pickup_available ? "Pickup available" : "No pickup"}</span>
          )}

          {duration && (
            <span className="rounded-full bg-slate-100 px-2.5 py-1">
              {duration}
            </span>
          )}
        </div>

        {adventure_style && <span>Type: {adventure_style}</span>}

        {price !== undefined && (
          <p className="border-t border-slate-100 pt-2 text-xs text-slate-600">
            From <span className="font-semibold text-blue-600">${price}</span>{" "}
            per person
          </p>
        )}
      </div>
    </article>
  );
}


