
"use client";

import { useState } from "react";
import { Bath, Bed, MapPin, SquareDashed } from "lucide-react";

interface IProps {
  bedsCount: number;
  bathroomsCount: number;
  areaSqft: number;
  galleryCount: number;
  description: string;
  amenities: string[];
  address: string;
  city: string;
}

const RoomAbout = ({
  bedsCount,
  bathroomsCount,
  areaSqft,
  galleryCount,
  description,
  
}: IProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const limit = 100;
  const isLongText = description.length > limit;
  const displayedDescription =
    isExpanded || !isLongText
      ? description
      : `${description.slice(0, limit)}...`;

  return (
    <div className="mt-3 space-y-3">
      <div className="grid grid-cols-3 items-start gap-2 px-3 max-sm:px-0">
        <div className="flex min-w-0 items-center gap-1">
          <Bed className="size-4 shrink-0 text-primary sm:size-5 lg:size-6" />
          <span className="text-xs text-gray-900 sm:text-sm lg:text-lg">
            {bedsCount} {bedsCount === 1 ? "Bed" : "Beds"}
          </span>
        </div>
        <div className="flex min-w-0 items-center gap-1">
          <Bath className="size-4 shrink-0 text-primary sm:size-5 lg:size-6" />
          <span className="text-xs text-gray-900 sm:text-sm lg:text-lg">
            {bathroomsCount} {bathroomsCount === 1 ? "Bath" : "Baths"}
          </span>
        </div>
        <div className="flex min-w-0 items-center gap-1">
          <SquareDashed className="size-4 shrink-0 text-primary sm:size-5 lg:size-6" />
          <span className="text-xs text-gray-900 sm:text-sm lg:text-lg">
            {areaSqft.toLocaleString()} Sqft
          </span>
        </div>
      </div>

      <div className="w-full">
        <span className="text-base font-medium text-gray-900 lg:text-xl">
          Gallery
          <span className="text-primary">({galleryCount})</span>
        </span>
        <p className="mt-2 text-sm leading-6 text-gray-500 lg:text-base">
          {description
            ? displayedDescription
            : "No description is available for this hotel yet."}
          {isLongText && (
            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="ml-2 font-medium text-primary hover:underline"
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          )}
        </p>
      </div>

     
    </div>
  );
}

export default RoomAbout