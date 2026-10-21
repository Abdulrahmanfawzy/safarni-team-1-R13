"use client";

import { ChevronLeft } from "lucide-react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { getFlights } from "../constants/MockData";
import { PropsDepartureDate } from "../types/TypesFlights";
import { DateHeader } from "./DateHeader";
import FlightCard from "./FlightCard";

const FlightsDialog = ({
  open,
  onOpenChange,
  departureDate,
  returnDate,
  onSelect,
}: PropsDepartureDate) => {
  const legs = [
    ...(departureDate
      ? [{ key: "departure" as const, date: departureDate }]
      : []),
    ...(returnDate ? [{ key: "return" as const, date: returnDate }] : []),
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full overflow-y-auto h-[90%] bg-gray-50 p-6 md:max-w-7xl md:h-[80%]">
        <DialogTitle className="sr-only">Available flights</DialogTitle>

        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Back"
          className="size-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer"
        >
          <ChevronLeft className="size-5" />
        </button>

        <div
          className={
            legs.length > 1
              ? "grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
              : "grid grid-cols-1 max-w-xl mx-auto w-full gap-6 mt-4"
          }
        >
          {legs.map((leg) => {
            const dateKey =
              leg.date instanceof Date
                ? format(leg.date, "yyyy-MM-dd")
                : String(leg.date ?? "default");
            return (
              <div key={leg.key} className="flex flex-col gap-4">
                <DateHeader date={leg.date} />
                {getFlights(dateKey).map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    onSelect={(f) => onSelect?.(f, leg.key)}
                  />
                ))}
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FlightsDialog;
