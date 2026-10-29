"use client";

import * as React from "react";
import { CarPayment, type CarCheckoutPayload } from "@/actions/cars";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type RentalType = CarCheckoutPayload["rental_type"];

function toLocalDateTimeValue(date: Date) {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function defaultDates() {
  const start = new Date();
  // Match the working checkout example: start three days from today at 10am.
  start.setDate(start.getDate() + 3);
  start.setHours(10, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 4);
  return { start: toLocalDateTimeValue(start), end: toLocalDateTimeValue(end) };
}

function toApiDateTime(value: string) {
  return `${value.replace("T", " ")}:00`;
}

export default function CarCheckoutSheet({
  carId,
  rentalType,
  pickupAddress,
  open,
  onOpenChange,
}: {
  carId: string | number;
  rentalType: RentalType;
  pickupAddress: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [startAt, setStartAt] = React.useState("");
  const [endAt, setEndAt] = React.useState("");
  const [address, setAddress] = React.useState(pickupAddress);
  const [notes, setNotes] = React.useState("");
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const isAvailabilityError = /not available|unavailable/i.test(error);

  React.useEffect(() => {
    if (!open) return;
    const defaults = defaultDates();
    setStartAt((current) => current || defaults.start);
    setEndAt((current) => current || defaults.end);
    setAddress(pickupAddress);
    setError("");
  }, [open, pickupAddress]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!startAt || !endAt || new Date(endAt) <= new Date(startAt)) {
      setError("Choose an end time after the start time.");
      return;
    }
    if (!address.trim()) {
      setError("Enter a pickup address.");
      return;
    }

    const payload: CarCheckoutPayload = {
      rental_type: rentalType,
      start_at: toApiDateTime(startAt),
      end_at: toApiDateTime(endAt),
      pickup_address: address.trim(),
      notes: notes.trim(),
    };

    setIsSubmitting(true);
    try {
      const result = await CarPayment(carId, payload);
      if ("error" in result) {
        setError(result.error);
        return;
      }

      window.location.assign(result.checkoutUrl);
    } catch {
      setError("Unable to submit the rental checkout. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Confirm your car rental</SheetTitle>
          <SheetDescription>
            Review the rental period and pickup address before continuing.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col gap-5">
            <div className="flex-1 space-y-4 overflow-y-auto py-2">
              <div className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
                Rental type: <span className="font-semibold capitalize text-slate-900">{rentalType}</span>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="car-rental-start">Start at</Label>
                <Input
                  id="car-rental-start"
                  type="datetime-local"
                  value={startAt}
                  onChange={(event) => {
                    setStartAt(event.target.value);
                    setError("");
                  }}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="car-rental-end">End at</Label>
                <Input
                  id="car-rental-end"
                  type="datetime-local"
                  min={startAt}
                  value={endAt}
                  onChange={(event) => {
                    setEndAt(event.target.value);
                    setError("");
                  }}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="car-pickup-address">Pickup address</Label>
                <Input
                  id="car-pickup-address"
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                    setError("");
                  }}
                  placeholder="Cairo International Airport, Terminal 3"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="car-rental-notes">Notes (optional)</Label>
                <textarea
                  id="car-rental-notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Flight arrives at 9:30 AM"
                  rows={3}
                  className="w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
                />
              </div>

              {error && (
                <div role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">
                  <p>{error}</p>
                  {isAvailabilityError && (
                    <p className="mt-1">
                      Please choose different pickup and return dates, then try again.
                    </p>
                  )}
                </div>
              )}
            </div>

            <SheetFooter>
              <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
                {isSubmitting ? "Submitting rental…" : "Continue to checkout"}
              </Button>
            </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
