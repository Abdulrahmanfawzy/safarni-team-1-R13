"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { CalendarDays, Car, Clock, LocateFixed, MoveLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import SpecItem from "./SpecItem";
import PlanOption from "./Plan";
import type { LatLng } from "./Maps/Map";
import type { carDetails, Plan, Spec } from "../types/typescars";

const MapView = dynamic(() => import("./Maps/Map"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-slate-100" />,
});

export default function CarRentalCard({ car }: { car: carDetails }) {
  const [plan, setPlan] = React.useState<string>("");
  const [pickup, setPickup] = React.useState<LatLng | null>(null);
  const [isMapOpen, setIsMapOpen] = React.useState(false);
  const [isLocating, setIsLocating] = React.useState(false);
  const [error, setError] = React.useState("");

  const specs: Spec[] = [
    { label: "Power", value: car.power_hp },
    { label: "Top Speed", value: car.max_speed_kmh },
    { label: "Acceleration", value: car.acceleration },
  ];
  const plans: Plan[] = [
    { id: "hourly", title: "Hourly Rent", description: car.pickup_address || "Hourly rental", price: car.hourly_rent, icon: Clock },
    { id: "daily", title: "Daily Rent", description: car.pickup_address || "Daily rental", price: car.daily_rent, icon: CalendarDays },
  ];

  const carPosition = React.useMemo<LatLng | null>(() => {
    const latitude = car.location?.latitude ?? car.latitude;
    const longitude = car.location?.longitude ?? car.longitude;
    return Number.isFinite(latitude) && Number.isFinite(longitude)
      ? [latitude, longitude]
      : null;
  }, [car.latitude, car.location?.latitude, car.location?.longitude, car.longitude]);

  const openPickupMap = () => {
    if (!plan) {
      setError("Choose an hourly or daily plan first.");
      return;
    }
    if (!carPosition) {
      setError("This car does not have a valid location in its details.");
      return;
    }
    if (!navigator.geolocation) {
      setError("Location access is not supported by this browser.");
      return;
    }

    setError("");
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPickup([position.coords.latitude, position.coords.longitude]);
        setIsLocating(false);
        setIsMapOpen(true);
      },
      (locationError) => {
        setError(
          locationError.code === locationError.PERMISSION_DENIED
            ? "Allow location access in your browser to open the pickup map."
            : "Could not get your current location. Please try again.",
        );
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const confirmPickup = () => {
    if (!pickup || !carPosition) return;
    const params = new URLSearchParams({
      car_id: String(car.id),
      plan,
      pickup_latitude: String(pickup[0]),
      pickup_longitude: String(pickup[1]),
      car_latitude: String(carPosition[0]),
      car_longitude: String(carPosition[1]),
    });
    console.log("Car pickup confirmation search params:", params.toString());
    console.log("Car pickup confirmation:", Object.fromEntries(params.entries()));
    setIsMapOpen(false);
  };

  if (isMapOpen && pickup && carPosition) {
    const selectedPlan = plans.find((option) => option.id === plan);
    return (
      <div className="fixed inset-0 z-40 bg-slate-100">
        <MapView route={[pickup, carPosition]} etaLabel="Car" className="h-full w-full" />

        <button
          type="button"
          onClick={() => setIsMapOpen(false)}
          aria-label="Back to car details"
          className="absolute left-5 top-24 z-[1001] flex size-11 items-center justify-center rounded-full bg-white shadow-md hover:bg-slate-50"
        >
          <MoveLeft className="size-5" aria-hidden="true" />
        </button>

        <section className="absolute bottom-5 left-1/2 z-[1001] w-[calc(100%-2rem)] max-w-[650px] -translate-x-1/2 rounded-2xl bg-white p-4 shadow-xl sm:p-5" aria-label="Car pickup details">
          <div className="relative flex min-h-14 items-start justify-between pr-28">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {car.brand?.name ?? "Car"} {car.model}
              </h2>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                <span>{car.transmission || "Transmission unavailable"}</span>
                <span>{car.seats_count} seats</span>
                <span>{car.fuel_type || "Fuel type unavailable"}</span>
              </div>
            </div>
            {car.images?.[0] ? (
              <Image
                src={car.images[0]}
                alt={`${car.brand?.name ?? "Car"} ${car.model}`}
                width={155}
                height={90}
                unoptimized
                className="absolute -right-1 -top-5 h-[88px] w-[150px] object-contain"
              />
            ) : (
              <Car className="absolute right-5 top-1 size-14 text-slate-400" aria-hidden="true" />
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
            {plans.map((option) => {
              const isSelected = option.id === plan;
              return (
                <button
                  type="button"
                  key={option.id}
                  onClick={() => setPlan(String(option.id))}
                  aria-pressed={isSelected}
                  className={`rounded-lg px-2 py-2 text-left ${isSelected ? "bg-indigo-50 ring-1 ring-indigo-200" : "hover:bg-slate-50"}`}
                >
                  <span className="block text-lg font-semibold text-slate-900">${option.price}</span>
                  <span className="text-xs text-slate-500">per {option.id === "hourly" ? "hour" : "day"}</span>
                </button>
              );
            })}
          </div>

          <Button type="button" onClick={confirmPickup} className="mt-3 h-11 w-full bg-indigo-800 font-semibold text-white hover:bg-indigo-900">
            Confirm {selectedPlan?.title.toLowerCase() ?? "pickup"}
          </Button>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6 rounded-3xl border bg-white p-6">
      <header className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
          {car.brand?.logo_url ? (
            <Image src={car.brand.logo_url} alt={car.brand.name ?? "Car brand"} width={40} height={40} />
          ) : (
            <Car className="size-5" aria-hidden="true" />
          )}
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">{car.brand?.name ?? "Car"}</h1>
          <p className="text-xs text-slate-500">{car.model}</p>
        </div>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-slate-900">Car details</h2>
        <div className="grid grid-cols-3 gap-2">{specs.map((spec) => <SpecItem key={spec.label} {...spec} />)}</div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-slate-900">Plan</h2>
        <RadioGroup value={plan} onValueChange={(value) => setPlan(String(value))} className="flex flex-col gap-3">
          {plans.map((option) => <PlanOption key={option.id} plan={option} selected={plan === option.id} />)}
        </RadioGroup>
      </section>

      <Button type="button" onClick={openPickupMap} disabled={isLocating} className="h-12 w-full rounded-xl bg-primary text-sm font-semibold text-white hover:bg-primary/90">
        <LocateFixed className="mr-2 size-4" aria-hidden="true" />
        {isLocating ? "Getting your location…" : "Pick Up"}
      </Button>
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
