


import { Button } from "@/components/ui/button";
import DiscountBadge from "./DiscountBadge";
import HotelRating from "./HotelRating";
import RoomDetailsTabs from "./RoomDetailsTabs";


export default function RoomDetailsInfo() {
  return (
    <section className="flex w-full flex-1 flex-col justify-start gap-6  mt-18 ml-8 mr-8 ">
      <div className="flex items-start justify-between gap-4">
        <DiscountBadge discount={20} />

        <div className="flex items-center gap-2">
          <HotelRating rating={4.5} />
          <span className="text-sm font-semibold text-[#4B4F63]">
            (345Reviews)
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-xl font-medium capitalize text-gray-900">
          HarborHaven Hideaway
        </h1>

        <p className="text-base capitalize text-gray-500">
          1012 Ocean Avenue, New York, USA
        </p>
      </div>

      <RoomDetailsTabs />
      {/* price & button----------------------------------------------- */}
      <div className="flex flex-col gap-4 mt-4">
        <h4 className='text-[#111928] text-xl'>Total Price :
          <span className="text-[#1E429F] text-2xl font-semibold ">$ 150</span>
          <span className="text-[#606369] text-base ">/night</span>
        </h4>
        <Button className='h-14!'>Book Now</Button>
      </div>
    </section>
  );
}
