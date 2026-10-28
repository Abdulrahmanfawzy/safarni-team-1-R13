

"use client";

import { useState, type ReactNode } from "react";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { FaCarSide } from "react-icons/fa";
import { SiTourbox } from "react-icons/si";
import { RiHotelBedFill } from "react-icons/ri";

interface BookingTabsProps {
  flight: ReactNode;
  cars: ReactNode;
  tours: ReactNode;
  hotel: ReactNode;
}

const tabs = [
  { id: "flight", label: "Flight", Icon: BiSolidPlaneAlt },
  { id: "cars", label: "Cars", Icon: FaCarSide },
  { id: "tours", label: "Tours", Icon: SiTourbox },
  { id: "hotel", label: "Hotel", Icon: RiHotelBedFill },
] as const;

export default function BookingTabs({
  flight,
  cars,
  tours,
  hotel,
}: BookingTabsProps) {
  const [activeTab, setActiveTab] =
    useState<keyof BookingTabsProps>("flight");

  const content = { flight, cars, tours, hotel };

  return (
    <div>
      <div className="mx-14 mt-10 grid max-w-350 grid-cols-2 gap-4 px-5 sm:grid-cols-4 sm:gap-7">
        {tabs.map(({ id, label, Icon }) => {
          const isActive = activeTab === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 transition ${
                isActive
                  ? "border-transparent bg-blue-50 text-blue-600"
                  : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
              }`}
            >
              <Icon />
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      <section id="booking-panel" className="mt-5">
        {content[activeTab]}
      </section>
    </div>
  );
}