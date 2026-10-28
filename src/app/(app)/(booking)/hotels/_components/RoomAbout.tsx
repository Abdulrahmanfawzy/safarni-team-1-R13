
"use client";

import { useState } from "react";
import { Bath, Bed, SquareDashed } from "lucide-react";
const description =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, ea. Quasi numquam aperiam omnis. Praesentium blanditiis perferendis repudiandae fugiat magnam id nam corporis consequuntur excepturi, libero, recusandae vero facere sint?";



const RoomAbout = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const limit = 100;
  const isLongText = description.length > limit;
  return (
    <div className="mt-3 space-y-3">
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-3 items-start gap-2 px-3 max-sm:px-0">
        <div className="flex min-w-0 items-center gap-1">
          <Bed className="size-4 shrink-0 text-primary sm:size-5 lg:size-6" />
          <span className='text-xs text-gray-900 sm:text-sm lg:text-lg'>3Beds</span>
        </div>
        <div className="flex min-w-0 items-center gap-1">
          <Bath className="size-4 shrink-0 text-primary sm:size-5 lg:size-6" />
          <span className='text-xs text-gray-900 sm:text-sm lg:text-lg'>2 Path</span>
        </div>
        <div className="flex min-w-0 items-center gap-1">
          <SquareDashed className="size-4 shrink-0 text-primary sm:size-5 lg:size-6" />
          <span className='text-xs text-gray-900 sm:text-sm lg:text-lg'>1,848 Sqrt</span>
        </div>
      </div>
      {/* ------------------------------------------------------------- */}
      <div className="w-full px-3 max-sm:px-0">
        <div className="flex flex-col gap-4">

          <span className='text-base font-medium text-gray-900 lg:text-xl'>Gallery<span className="text-primary">(200)</span></span>

          <p className="w-full text-sm leading-6 text-gray-500 lg:pr-30 lg:text-lg">
            {isExpanded || !isLongText
              ? description
              : `${description.slice(0, limit)}...`}

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
    </div>
  );
}

export default RoomAbout