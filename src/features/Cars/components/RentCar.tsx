"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { CalendarDays, Car, Clock, LocateFixed } from "lucide-react";

import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SpecItem from "./SpecItem";
import PlanOption from "./Plan";
import type { LatLng } from "./Maps/Map";
import type { carDetails, Plan, Spec } from "../types/typescars";

const MapView = dynamic(() => import("./Maps/Map"), {
  ssr: false,
  loading: () => <div className="h-80 animate-pulse rounded-xl bg-slate-100" />,
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
    {
      id: "hourly",
      title: "Hourly Rent",
      description: car.pickup_address || "Hourly rental",
      price: car.hourly_rent,
      icon: Clock,
    },
    {
      id: "daily",
      title: "Daily Rent",
      description: car.pickup_address || "Daily rental",
      price: car.daily_rent,
      icon: CalendarDays,
    },
  ];

  const carPosition = React.useMemo<LatLng | null>(() => {
    const latitude = car.location?.latitude ?? car.latitude;
    const longitude = car.location?.longitude ?? car.longitude;
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;
    return [latitude, longitude];
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

  return (
    <>
      <div className="mx-auto flex w-full max-w-xl flex-col gap-6 rounded-3xl border bg-white p-6">
        <header className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            {car.brand?.logo_url ? (
              <Image src={car.brand.logo_url} alt={car.brand.name ?? "Car brand"} width={40} height={40} />
            ) : (
              <Car className="size-5" aria-hidden="true" />
            )}
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold tracking-tight text-slate-900">
              {car.brand?.name ?? "Car"}
            </h1>
            <p className="text-xs text-slate-500">{car.model}</p>
          </div>
        </header>

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-slate-900">Car details</h2>
          <div className="grid grid-cols-3 gap-2">
            {specs.map((spec) => <SpecItem key={spec.label} {...spec} />)}
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-slate-900">Plan</h2>
          <RadioGroup value={plan} onValueChange={(value) => setPlan(String(value))} className="flex flex-col gap-3">
            {plans.map((option) => (
              <PlanOption key={option.id} plan={option} selected={plan === option.id} />
            ))}
          </RadioGroup>
        </section>

        <Button type="button" onClick={openPickupMap} disabled={isLocating} className="h-12 w-full rounded-xl bg-primary text-sm font-semibold text-white hover:bg-primary/90">
          <LocateFixed className="mr-2 size-4" aria-hidden="true" />
          {isLocating ? "Getting your location…" : "Pick Up"}
        </Button>
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      </div>

      <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
        <DialogContent showCloseButton className="w-[calc(100%-2rem)] max-w-3xl p-5 sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Confirm pickup location</DialogTitle>
            <DialogDescription>Your pickup point and the car location are marked on the map.</DialogDescription>
          </DialogHeader>
          {pickup && carPosition && (
            <MapView route={[pickup, carPosition]} etaLabel="Car" className="h-[min(60vh,480px)] w-full rounded-xl" />
          )}
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-slate-500">Green: pickup · Car marker: vehicle location</p>
            <Button type="button" onClick={confirmPickup}>Confirm pickup</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
