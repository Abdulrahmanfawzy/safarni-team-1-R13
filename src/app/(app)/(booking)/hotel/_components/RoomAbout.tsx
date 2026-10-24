
"use client";

import { useState } from "react";
import { Bath, Bed, SquareDashed } from "lucide-react";
import { Button } from "@/components/ui/button";
const description =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, ea. Quasi numquam aperiam omnis. Praesentium blanditiis perferendis repudiandae fugiat magnam id nam corporis consequuntur excepturi, libero, recusandae vero facere sint?";



const RoomAbout = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const limit = 100;
  const isLongText = description.length > limit;
  return (
    <div className="mt-3 space-y-3">
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-3 items-start px-3">
        <div className="flex items-center gap-1 ">
          <Bed className="text-primary" />
          <span className='text-gray-900 text-lg'>3Beds</span>
        </div>
        <div className="flex items-center gap-1 ">
          <Bath className="text-primary" />
          <span className='text-gray-900  text-lg'>2 Path</span>
        </div>
        <div className="flex items-center gap-1 ">
          <SquareDashed className="text-primary" />
          <span className='text-gray-900  text-lg'>1,848 Sqrt</span>
        </div>
      </div>
      {/* ------------------------------------------------------------- */}
      <div className="w-full   px-3 ">
        <div className="flex flex-col gap-4">

          <span className='text-gray-900 font-medium text-xl '>Gallery<span className="text-primary">(200)</span></span>

          <p className="text-gray-500 w-full pr-30 text-lg">
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
       {/* price & button----------------------------------------------- */}
        <div className="flex flex-col gap-4 mt-4">
          <h4 className='text-[#111928] text-xl'>Total Price : 
              <span className="text-[#1E429F] text-2xl font-semibold ">$ 150</span>
            <span className="text-[#606369] text-base ">/night</span>
          </h4>
          <Button className='h-14!'>Book Now</Button>
        </div>

      </div>
    </div>
  );
}

export default RoomAbout