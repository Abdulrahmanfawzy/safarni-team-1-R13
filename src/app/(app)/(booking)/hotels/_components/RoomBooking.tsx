
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import GuestDialog from "./GuestDialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRoomBooking } from "@/hooks/hotels/useRoomBooking";
import RoomBookingSkeleton from "@/components/skeletons/RoomBookingSkeleton";

interface IProps {
  onBack: () => void;
  roomId: number;
}

export default function RoomBooking({ onBack, roomId }: IProps) {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(1);
  const [infants, setInfants] = useState(1);

  const {
    month,
    year,
    dates,
    changeMonth,
    checkIn,
    checkOut,
    selectCheckIn,
    selectCheckOut,
    getDateParts,
    isDateDisabled,
    isCheckOutDisabled,
    bookedRanges,
    isLoading,
    isError,
    isBookingValid,
  } = useRoomBooking(roomId);

  const formatDate = (date: string) => {
    const parts = getDateParts(date);
    return `${parts.day}, ${parts.date}`;
  };

  const handleBooking = () => {
    if (!isBookingValid) return;
    setOpenDialog(false);
    router.push("/payment");
  };

    return (
      <>
      <div className="space-y-5">

        {/* Header */}
        <div className="flex items-center justify-center border-t border-gray-200 pt-3">
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-1.5 p-0 text-lg font-medium text-primary hover:bg-transparent"
          >
            <ChevronLeft />
            Book Room
          </Button>
        </div>

        {/* Month Navigation-------------------------------------------------------------- */}
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => changeMonth("prev")}
            aria-label="Previous month"
          >
            <ChevronLeft />
          </Button>

          <h3 className="font-semibold">
            {new Date(year, month - 1).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h3>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => changeMonth("next")}
            aria-label="Next month"
          >
            <ChevronRight />
          </Button>
        </div>

        {/* Loading -------------------------------------------------------------- ---------*/}
        {isLoading && <RoomBookingSkeleton />}

        {/* Error-------------------------------------------------------------- ------------- */}
        {isError && (
          <p className="text-sm text-red-500">
            Failed to load availability. Please try again.
          </p>
        )}

        {/* Calendar-------------------------------------------------------------- ----------- */}
        {!isLoading && !isError && (
          <>
            {/* Check In */}
            <div className="space-y-3 ">
              <h3 className="text-sm font-medium text-gray-900">
                Check In
              </h3>
             <div className="max-h-29 overflow-y-auto pr-2">
              <div className="grid grid-cols-4 gap-2">
                {dates.map((date) => {
                  const disabled = isDateDisabled(date);

                  return (
                    <button
                      key={date}
                      type="button"
                      disabled={disabled}
                      onClick={() => selectCheckIn(date)}
                      className={`flex min-h-12 flex-col items-center justify-center rounded-md border px-1 py-2 transition
                        ${
                          checkIn === date
                            ? "border-[#E1EFFE] bg-[#E1EFFE] text-primary"
                            : disabled
                              ? "cursor-not-allowed border-gray-100 bg-gray-100 text-gray-300 line-through"
                              : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                        }`}
                    >
                      <span className="text-xs font-medium">
                        {formatDate(date)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
            </div>

            {/* Check Out */}
            <div className="space-y-3 ">
              <h3 className="text-sm font-medium text-gray-900">
                Check Out
              </h3>
             <div className="max-h-29 overflow-y-auto pr-2">
              <div className="grid grid-cols-4 gap-2">
                {dates.map((date) => {
                  const disabled = isCheckOutDisabled(date);

                  return (
                    <button
                      key={date}
                      type="button"
                      disabled={disabled}
                      onClick={() => selectCheckOut(date)}
                      className={`flex min-h-12 flex-col items-center justify-center rounded-md border px-1 py-2 transition
                        ${
                          checkOut === date
                            ? "border-[#E1EFFE] bg-[#E1EFFE] text-primary"
                            : disabled
                              ? "cursor-not-allowed border-gray-100 bg-gray-100 text-gray-300"
                              : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                        }`}
                    >
                      <span className="text-xs font-medium">
                        {formatDate(date)}
                      </span>
                    </button>
                  );
                })}
              </div>
              </div>
            </div>
          </>
        )}

        {/* Selected Dates */}
        {/* {checkIn && checkOut && (
          <div className="rounded-lg bg-blue-50 p-3 text-sm text-primary">
            <p>Check In: {formatDate(checkIn)}</p>
            <p>Check Out: {formatDate(checkOut)}</p>
          </div>
        )} */}

       

        {/* Note */}
        <div className="space-y-2">
          <label
            htmlFor="owner-note"
            className="text-sm font-medium text-gray-900"
          >
            Note To Owner
          </label>

          <Textarea
            id="owner-note"
            placeholder="Enter here"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-24 resize-none border-0 bg-[#F3F4F6] px-3 py-3 text-sm shadow-none focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>

        {/* Submit */}
        <Button
          type="button"
          disabled={!isBookingValid || isLoading}
          onClick={() => setOpenDialog(true)}
          className="h-14 w-full rounded-md bg-primary disabled:opacity-50"
        >
          Submit
        </Button>
      </div>

      {/* Guests Dialog */}
      <GuestDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        adults={adults}
        setAdults={setAdults}
        childrenCount={children}
        setChildrenCount={setChildren}
        infants={infants}
        setInfants={setInfants}
        onConfirm={handleBooking}
      />
    </>
    );
}
