"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, RefreshCw } from "lucide-react";
import Flight from "@/assets/images/1f333dd2b89d7ab8cf544bc5d5b4878e6d6f2f3c.png";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const tripTypes = [
  { id: "round", label: "Round Trip", icon: RefreshCw },
  { id: "multi", label: "Multi City", icon: RefreshCw },
  { id: "one-way", label: "One Way", icon: ArrowRight },
] as const;

const passengers = [
  { label: "1 Passenger", value: "1" },
  { label: "2 Passengers", value: "2" },
  { label: "3 Passengers", value: "3" },
];

const labelClass = "text-xs sm:text-sm text-app-solid-gray font-medium";
const inputContainerClass =
  "h-11 sm:h-12 w-full rounded-xl bg-background border-border/80 focus-within:border-primary transition-all";
const inputClass = "w-full text-xs sm:text-sm";

const SearchFlight = () => {
  const [tripType, setTripType] =
    useState<(typeof tripTypes)[number]["id"]>("round");

  return (
    <section className="w-full min-h-[calc(100dvh-4rem)] flex items-center justify-center py-6 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-12">
      <main className="w-full max-w-xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-8 lg:gap-12 xl:gap-16">
        {/* Image panel */}
        <div className="flex items-center justify-center w-full max-w-md sm:max-w-lg md:max-w-none md:w-5/12 lg:w-[46%] xl:w-[42%] 2xl:w-[40%] h-48 sm:h-60 md:h-[460px] lg:h-[500px] xl:h-[540px] 2xl:h-[580px] bg-light-gray rounded-2xl md:rounded-3xl p-4 sm:p-6 lg:p-8 shrink-0 overflow-hidden">
          <Image
            src={Flight}
            alt="Airplane"
            className="w-full h-full object-contain max-h-[190px] sm:max-h-[230px] md:max-h-none transition-transform duration-500 hover:scale-105"
            priority
          />
        </div>

        {/* Form side */}
        <div className="w-full max-w-md sm:max-w-lg md:max-w-none md:w-7/12 lg:w-[50%] xl:w-[45%] 2xl:w-[42%] flex flex-col gap-4 sm:gap-5">
          {/* Trip type tabs */}
          <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {tripTypes.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTripType(id)}
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

          <form className="flex flex-col gap-3 sm:gap-3.5">
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

            <div
              className={cn(
                "grid gap-3 sm:gap-3.5",
                tripType === "round"
                  ? "grid-cols-1 min-[420px]:grid-cols-2"
                  : "grid-cols-1",
              )}
            >
              <div className="flex flex-col gap-1">
                <label htmlFor="departure" className={labelClass}>
                  Departure
                </label>
                <Input
                  id="departure"
                  type="date"
                  containerClassName={inputContainerClass}
                  className={inputClass}
                />
              </div>

              {tripType === "round" && (
                <div className="flex flex-col gap-1">
                  <label htmlFor="return" className={labelClass}>
                    Return
                  </label>
                  <Input
                    id="return"
                    type="date"
                    containerClassName={inputContainerClass}
                    className={inputClass}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className={labelClass}>Passenger</label>
              <Select items={passengers} defaultValue="1">
                <SelectTrigger className="w-full h-11 sm:h-12 text-xs sm:text-sm rounded-xl px-3 bg-background border-border/80 focus-visible:border-primary transition-all">
                  <SelectValue placeholder="1 Passenger" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {passengers.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <button
              type="submit"
              className="mt-2 sm:mt-3 w-full h-11 sm:h-12 rounded-xl bg-primary text-white text-sm sm:text-base font-semibold hover:bg-primary/90 active:scale-[0.99] transition-all cursor-pointer shadow-xs hover:shadow-md"
            >
              Search Flights
            </button>
          </form>
        </div>
      </main>
    </section>
  );
};

export default SearchFlight;
