"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

import CarBookingCard from "@/features/Cars/components/CarCardBooking";
import type { LatLng } from "./Map";

// Leaflet touches `window`, so it must not render on the server.
const MapView = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-muted" />,
});

// Placeholder route (San Francisco). Replace with data from your routing API.
const ROUTE: LatLng[] = [
  [37.7550, -122.4177],
  [37.7573, -122.4177],
  [37.7573, -122.4155],
  [37.7595, -122.4155],
];

export default function MapScreen() {
  const router = useRouter();

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <MapView route={ROUTE} etaLabel="5 min" />

      <button
        type="button"
        aria-label="Back"
        onClick={() => router.back()}
        className="absolute left-4 top-24 z-[1000] flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-50"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="absolute inset-x-4 bottom-4 z-[1000] mx-auto max-w-[560px]">
        <CarBookingCard
          name="S 500 Sedan"
          imageSrc="/images/s500.png"
          transmission="Automatic"
          seats={5}
          fuel="Diesel"
          pricePerHour={80}
          pricePerDay={400}
          onConfirm={() => console.log("confirmed")}
        />
      </div>
    </div>
  );
}