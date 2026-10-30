"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { TourSchedule } from "../types/types";
import { TourBookingSheet } from "./TourBookingSheet";
import { formatPrice } from "./Format";

type BookingBarProps = {
  tourId: number;
  schedules: TourSchedule[];
  price: string;
};

export function BookingBar({ tourId, schedules, price }: BookingBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasAvailableSchedule = schedules.some((schedule) => schedule.available_slots > 0);

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Total price:{" "}
            <span className="text-base font-bold text-foreground">
              {formatPrice(price)}
            </span>
            <span className="text-xs">/person</span>
          </p>

          <Button
            type="button"
            size="lg"
            className="min-w-40 sm:min-w-64"
            disabled={!hasAvailableSchedule}
            onClick={() => setIsOpen(true)}
          >
            {hasAvailableSchedule ? "Book Now" : "No dates available"}
          </Button>
        </div>
      </div>

      <TourBookingSheet
        tourId={tourId}
        schedules={schedules}
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
}
