

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
            (345) reviews
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
    </section>
  );
}
