"use client";

import { useState } from "react";
import FlightsDialog from "./FlightsDialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { tripTypes } from "../constants/MockData";
import SelectPassenger from "./SelectPassenger";
import ImagePlane from "../shared/ImagePlane";
import CalenderTicket from "./CalenderTicket";
import { inputClass, inputContainerClass, labelClass } from "../styles/style";
import { Flight } from "../types/TypesFlights";

const SearchFlight = () => {
  const [tripType, setTripType] = useState<"round" | "multi" | "one-way">(
    "round",
  );
  const [departure, setDeparture] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [selectedDepartureFlight, setSelectedDepartureFlight] = useState<Flight | null>(null);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState<Flight | null>(null);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <section className="w-full flex items-start justify-center py-6 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-12">
        <main className="w-full container mx-auto flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-8 lg:gap-12 xl:gap-16">
          {/* Image panel */}
          <ImagePlane />

          {/* Form side */}
          <div className="w-full max-w-md sm:max-w-lg md:max-w-none md:w-7/12 lg:w-[50%] xl:w-[45%] 2xl:w-[42%] flex flex-col gap-4 sm:gap-5">
            {/* Trip type tabs */}
            <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {tripTypes.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    const newType = id as "round" | "multi" | "one-way";
                    setTripType(newType);
                    if (newType !== "round") {
                      setReturnDate(undefined);
                      setSelectedReturnFlight(null);
                    }
                  }}
                  className={cn(
                    "flex items-center justify-center shrink-0 gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer",
                    tripType === id
                      ? "bg-primary text-white shadow-xs"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900",
                  )}
                >
                  <Icon className="size-3.5 sm:size-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 sm:gap-3.5"
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="location" className={labelClass}>
                  Location
                </label>
                <Input
                  id="location"
                  type="text"
                  placeholder="Montreal, Canada"
                  containerClassName={inputContainerClass}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="destination" className={labelClass}>
                  Destination
                </label>
                <Input
                  id="destination"
                  type="text"
                  placeholder="Tokyo, Japan"
                  containerClassName={inputContainerClass}
                  className={inputClass}
                />
              </div>

              <CalenderTicket
                tripType={tripType}
                departure={departure}
                setDeparture={setDeparture}
                returnDate={returnDate}
                setReturnDate={setReturnDate}
              />

              <div className="flex flex-col gap-1">
                <SelectPassenger labelClass={labelClass} />
              </div>

              <button
                type="submit"
                disabled={
                  tripType === "round"
                    ? departure && returnDate
                      ? false
                      : true
                    : tripType === "one-way" || "multi"
                      ? departure
                        ? false
                        : true
                      : departure && returnDate
                        ? false
                        : true
                }
                className={cn(
                  "mt-2 sm:mt-3 w-full h-11 sm:h-12 rounded-xl bg-primary text-white text-sm sm:text-base font-semibold hover:bg-primary/90 active:scale-[0.99] transition-all cursor-pointer shadow-xs hover:shadow-md",
                  (departure && returnDate && tripType === "round") ||
                    (departure &&
                      (tripType === "one-way" || tripType === "multi"))
                    ? ""
                    : "opacity-50 cursor-not-allowed",
                )}
              >
                Search Flights
              </button>
            </form>
          </div>
        </main>
      </section>

      <FlightsDialog
        open={open}
        onOpenChange={setOpen}
        departureDate={departure}
        returnDate={tripType === "round" ? returnDate : undefined}
        selectedDepartureFlight={selectedDepartureFlight}
        selectedReturnFlight={selectedReturnFlight}
        onSelect={(flight, leg) => {
          if (leg === "departure") {
            setSelectedDepartureFlight((prev) => (prev?.id === flight.id ? null : flight));
          } else {
            setSelectedReturnFlight((prev) => (prev?.id === flight.id ? null : flight));
          }
        }}
      />
    </>
  );
};

export default SearchFlight;
