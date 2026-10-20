
import Image from "next/image";
import { ReactNode } from "react";
import { IoStarSharp } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";

type TourCardProps = {
  image: string;
  imageAlt: string;
  category: string;
  percentage?:string
  location: string;
  showPrice : boolean,
  price?: number;
  rating: number;
details?: ReactNode;
};

export default function TourandHotelCard({
  image,
  imageAlt,
  category,
  location,
  showPrice,
  price,
  rating,
  details,
  percentage
}: TourCardProps) {
  return (
    <article className="flex flex-col gap-4 rounded-xl border border-[#B22459] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <Image
          src={image}
          alt={imageAlt}
          width={120}
          height={120}
          className="size-20 shrink-0 rounded-lg object-cover sm:size-28"
        />

        <div className="min-w-0 space-y-2">
         {percentage !==undefined &&   <span className="border px-3 border-[#EBF5FF] rounded-full">  {percentage} </span>  }   
          <p className="text-sm text-slate-500">{category}</p>

          <h2 className="text-lg font-semibold flex items-center gap-1 text-slate-500">
            <FaMapMarkerAlt/>
            {location}
            
            </h2>

      
{showPrice !== undefined && (
  <p className="text-sm text-slate-600">
  
{details && (
  <div className="text-sm text-slate-600">
    {details}
  </div>
)}


  </p>
)}




        </div>
      </div>

      <div
        className="flex items-center gap-1 
         rounded-full bg-amber-50 px-3 text-sm sm:self-center"
       
      >
        <IoStarSharp className="text-amber-400" aria-hidden="true" />
        <span className="font-medium text-slate-800">{rating}</span>
      </div>
    </article>
  );
}