

'use client'
import { Button } from "@/components/ui/button";
import DiscountBadge from "./DiscountBadge";
import HotelRating from "./HotelRating";
import RoomDetailsTabs from "./RoomDetailsTabs";
import { useState } from "react";
import AddReview from "./AddReview";
import RoomBooking from "./RoomBooking";

type View = "details" | "addReview" | "booking";
export default function RoomDetailsInfo() {
  const [view, setView] = useState<View>("details");
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
      {/* Dynamic content */}
      {view === "details" && (
        <>
          <RoomDetailsTabs
            onAddReview={() => setView("addReview")}
          />

          <div className="mt-4 flex flex-col gap-4">
            <h4 className="text-xl text-[#111928]">
              Total Price:{" "}
              <span className="text-2xl font-semibold text-[#1E429F]">
                $150
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

      {view === "addReview" && (
        <AddReview onBack={() => setView("details")} />
      )}

      {view === "booking" && (
        <RoomBooking onBack={() => setView("details")} />
      )}

    </section>
  );
}
