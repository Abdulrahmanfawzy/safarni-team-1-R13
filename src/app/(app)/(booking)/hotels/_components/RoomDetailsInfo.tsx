

'use client'
import { Button } from "@/components/ui/button";
import DiscountBadge from "./DiscountBadge";
import HotelRating from "./HotelRating";
import RoomDetailsTabs from "./RoomDetailsTabs";
import { useState } from "react";
import AddReview from "./AddReview";
import RoomBooking from "./RoomBooking";
import { HotelDetails } from "@/types/hotel.types";
import type { HotelRoom } from "@/types/room.types";
import { MapPin } from "lucide-react";

type View = "details" | "addReview" | "booking";
interface IProps {
  hotel: HotelDetails;
  room: HotelRoom;
}
export default function RoomDetailsInfo({hotel, room}:IProps) {
  const [view, setView] = useState<View>("details");
    const { name, address, discount_rate, review_aggregates } = hotel;

  const rating = review_aggregates?.average_rating ?? 0;
  const totalReviews = review_aggregates?.total_reviews ?? 0;
  return (
    <section className="flex w-full min-w-0 flex-1 flex-col justify-start gap-6 mt-18 ml-8 mr-8 max-lg:mx-0 max-lg:mt-4 max-lg:gap-4 max-lg:px-4 max-lg:pb-24">
      <div className="flex items-start justify-between gap-4">
        <DiscountBadge discount={discount_rate ?? 0} />

        <div className="flex items-center gap-2">
          <HotelRating rating={rating} />
          <span className="text-sm font-semibold text-[#4B4F63]">
            ({totalReviews}Reviews)
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="text-xl font-medium capitalize text-gray-900">
          {name}
        </h1>

        
         {(address) && (
                <p className="flex items-start gap-2 text-sm text-gray-600 lg:text-base">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>{[address].filter(Boolean).join(", ")}</span>
                </p>
              )}
      </div>
      {/* Dynamic content */}
      {view === "details" && (
        <>
          <RoomDetailsTabs
            hotel={hotel}
            room={room}
            onAddReview={() => setView("addReview")}
          />

          <div className="mt-4 flex flex-col gap-4 max-lg:hidden">
            <h4 className="text-xl text-[#111928]">
              Total Price:{" "}
              <span className="text-2xl font-semibold text-[#1E429F]">
                ${room.final_price.toLocaleString()}
              </span>
              <span className="text-base text-[#606369]">/night</span>
            </h4>

            <Button
              className="h-14 w-full"
              onClick={() => setView("booking")}
            >
              Book Now
            </Button>
          </div>
        </>
      )}

      {view === "details" && (
        <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-gray-200 bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-2px_8px_0_#838BB41F] lg:hidden">
          <p className="text-xs text-gray-600">
            Total price
            <span className="mt-0.5 block text-base font-semibold text-primary">
              ${room.final_price.toLocaleString()}
              <span className="ml-1 text-xs font-normal text-gray-500">
                /night
              </span>
            </span>
          </p>
          <Button
            className="h-11 w-1/2 max-w-56"
            onClick={() => setView("booking")}
          >
            Book Now
          </Button>
        </div>
      )}

      {view === "addReview" && (
        <AddReview onBack={() => setView("details")} />
      )}

      {view === "booking" && (
        <RoomBooking onBack={() => setView("details")} />
      )}

    </section>
  );
}
