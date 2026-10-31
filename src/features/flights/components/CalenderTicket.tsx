"use client";

import { format, startOfDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalenderTicketProps } from "../types/TypesFlights";
import { inputClass, inputContainerClass, labelClass } from "../styles/style";

const CalenderTicket = ({
  tripType,
  departure,
  setDeparture,
  returnDate,
  setReturnDate,
}: CalenderTicketProps) => {
  const today = startOfDay(new Date());

  return (
    <div
      className={cn(
        "grid gap-3 sm:gap-3.5",
        tripType === "round"
          ? "grid-cols-1 min-[420px]:grid-cols-2"
          : "grid-cols-1",
      )}
    >
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
              onSelect={setDeparture}
              disabled={(date) => date < today}
            />
          </PopoverContent>
        </Popover>
      </div>

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
                  {returnDate ? format(returnDate, "PPP") : "Select return date"}
                </Button>
              }
            />
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={returnDate}
                onSelect={setReturnDate}
                disabled={(date) => !departure || date < startOfDay(departure)}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default CalenderTicket;
