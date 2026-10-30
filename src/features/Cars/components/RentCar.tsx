"use client";

import * as React from "react";
import { Car, LocateFixed, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import SpecItem from "./SpecItem";
import { plans, specs } from "../constants/DataCars";
import PlanOption from "./Plan";
import Map from "./Maps/Map";

export default function CarRentalCard() {
  const [plan, setPlan] = React.useState<string>("hourly");
  const [location, setLocation] = React.useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ plan, location });
    getLocation();
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(
          `${position.coords.latitude}, ${position.coords.longitude}`
        );
      },
      () => {
        alert("Error getting location");
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-xl  flex-col gap-6 rounded-3xl border bg-white p-6 "
    >
      {/* Header */}
      <header className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
          <Car className="size-5" aria-hidden />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold tracking-tight text-slate-900">
            Rent Car
          </h1>
          <p className="text-xs text-slate-500">
            Choose a plan and pick up your ride
          </p>
        </div>
      </header>

      {/* Popular cars + specs */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-slate-900">Popular Cars</h2>
        <div className="grid grid-cols-3 gap-2">
          {specs.map((spec) => (
            <SpecItem key={spec.label} {...spec} />
          ))}
        </div>
      </section>

      {/* Plan */}
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-slate-900">Plan</h2>

        <RadioGroup
          value={plan}
          onValueChange={setPlan}
          className="flex flex-col gap-3"
        >
          {plans.map((p) => (
            <PlanOption key={p.id} plan={p} selected={plan === p.id} />
          ))}
        </RadioGroup>
      </section>

      {/* Location */}
      <section className="flex flex-col gap-2">
        <Label
          htmlFor="location"
          className="text-sm font-semibold text-slate-900"
        >
          Location
        </Label>
        <div className="relative">
          <MapPin
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="200-298 Clipper St San Francisco"
            className="h-11 rounded-xl pl-10 pr-28 text-sm shadow-sm"
          />
          <button
            type="button"
            onClick={getLocation}
            className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <LocateFixed className="size-3.5" aria-hidden />
            Use mine
          </button>
        </div>
      </section>

      <Button
        type="submit"
        className="h-12 w-full rounded-xl bg-primary text-sm font-semibold shadow-md transition-all hover:bg-primary-800 active:scale-[0.98]"
          onClick={()=>{
            location ? <Map/> :""
          }}
      >
        Pick Up
      </Button>
    </form>
  );
}