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

const labelClass = "text-sm text-app-solid-gray font-medium";
const inputClass = "w-full h-10 text-xs";

const SearchFlight = () => {
  const [tripType, setTripType] =
    useState<(typeof tripTypes)[number]["id"]>("round");

  return (
    <section className="w-full min-h-screen flex items-center">
      <main className="container mx-auto flex items-center justify-center gap-12">
        {/* Image panel */}
        <div className="hidden md:flex items-center justify-center shrink-0 w-[30%] h-130 bg-light-gray rounded-2xl">
          <Image
            src={Flight}
            alt="Airplane"
            className=" object-cover"
            priority
          />
        </div>

        {/* Form side */}
        <div className="w-full max-w-[512px] flex flex-col gap-4">
          {/* Trip type tabs */}
          <div className="flex items-center gap-3">
            {tripTypes.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTripType(id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  tripType === id
                    ? "bg-blue-50 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                )}
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>

          <form className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="location" className={labelClass}>
                Location
              </label>
              <Input
                id="location"
                type="text"
                placeholder="Montreal, Canada"
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
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="departure" className={labelClass}>
                  Departure
                </label>
                <Input id="departure" type="date" className={inputClass} />
              </div>

              {tripType === "round" && (
                <div className="flex flex-col gap-1">
                  <label htmlFor="return" className={labelClass}>
                    Return
                  </label>
                  <Input id="return" type="date" className={inputClass} />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className={labelClass}>Passenger</label>
              <Select items={passengers} defaultValue="1">
                <SelectTrigger className="w-full h-10 text-xs">
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
              className="mt-2 w-full h-11 rounded-md bg-primary text-white text-sm font-semibold hover:opacity-90 transition-opacity"
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
