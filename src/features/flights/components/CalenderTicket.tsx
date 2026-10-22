"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

import { inputClass, inputContainerClass, labelClass } from "../styles/style";
import { CalenderTicketProps } from "../types/TypesFlights";

const CalenderTicket = ({
  tripType,
  departure: controlledDeparture,
  setDeparture: controlledSetDeparture,
  returnDate: controlledReturnDate,
  setReturnDate: controlledSetReturnDate,
  onDepartureChange,
  onReturnDateChange,
}: CalenderTicketProps) => {
  const [internalDeparture, setInternalDeparture] = useState<
    Date | undefined
  >();
  const [internalReturnDate, setInternalReturnDate] = useState<
    Date | undefined
  >();

  const departure =
    controlledDeparture !== undefined ? controlledDeparture : internalDeparture;
  const setDeparture = (date: Date | undefined) => {
    controlledSetDeparture?.(date);
    onDepartureChange?.(date);
    if (controlledDeparture === undefined) {
      setInternalDeparture(date);
    }
  };

  const returnDate =
    controlledReturnDate !== undefined
      ? controlledReturnDate
      : internalReturnDate;
  const setReturnDate = (date: Date | undefined) => {
    controlledSetReturnDate?.(date);
    onReturnDateChange?.(date);
    if (controlledReturnDate === undefined) {
      setInternalReturnDate(date);
    }
  };

  // Avoid evaluating `new Date()` during server prerender in Next.js
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    setToday(now);
  }, []);

  const handleDepartureSelect = (date: Date | undefined) => {
    setDeparture(date);

    if (
      date &&
      returnDate &&
      returnDate < new Date(date.getFullYear(), date.getMonth(), date.getDate())
    ) {
      setReturnDate(undefined);
    }
  };

  return (
    <div
      className={cn(
        "grid gap-3 sm:gap-3.5",
        tripType === "round"
          ? "grid-cols-1 min-[420px]:grid-cols-2"
          : "grid-cols-1",
      )}
    >
      {/* Departure Date */}
      <div className="flex flex-col gap-1">
        <label className={labelClass}>Departure Date</label>

        <Popover>
          <PopoverTrigger
            render={
              <Button
                type="button"
                variant="outline"
                className={cn(
                  inputContainerClass,
                  inputClass,
                  "justify-start px-3 font-normal text-left",
                  !departure && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 size-4 shrink-0 opacity-60" />
                {departure ? format(departure, "PPP") : "Select departure date"}
              </Button>
            }
          />

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={departure}
              onSelect={handleDepartureSelect}
              disabled={(date) => (today ? date < today : false)}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Return Date */}
      {tripType === "round" && (
        <div className="flex flex-col gap-1">
          <label className={labelClass}>Return Date</label>

          <Popover>
            <PopoverTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  disabled={!departure}
                  className={cn(
                    inputContainerClass,
                    inputClass,
                    "justify-start px-3 font-normal text-left",
                    !returnDate && "text-muted-foreground",
                    !departure && "opacity-50 cursor-not-allowed",
                  )}
                >
                  <CalendarIcon className="mr-2 size-4 shrink-0 opacity-60" />
                  {returnDate
                    ? format(returnDate, "PPP")
                    : "Select return date"}
                </Button>
              }
            />

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={returnDate}
                onSelect={setReturnDate}
                disabled={(date) => {
                  if (!departure) return true;

                  const minDate = new Date(
                    departure.getFullYear(),
                    departure.getMonth(),
                    departure.getDate(),
                  );

                  return date < minDate;
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default CalenderTicket;
