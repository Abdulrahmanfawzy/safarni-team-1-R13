"use client";

import * as React from "react";
import { CreateCarCheckoutAction, type CarCheckoutPayload } from "@/actions/cars";
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
  const [couponId, setCouponId] = React.useState("");
  const [error, setError] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const defaults = defaultDates();
    setStartAt((current) => current || defaults.start);
    setEndAt((current) => current || defaults.end);
    setAddress(pickupAddress);
    setError("");
    setSuccessMessage("");
  }, [open, pickupAddress]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

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
      coupon_id: couponId.trim() || null,
    };

    setIsSubmitting(true);
    try {
      const result = await CreateCarCheckoutAction(carId, payload);
      if (result?.error || result?.success === false) {
        setError(result.error || result.message || "The rental checkout could not be created.");
        return;
      }
      setSuccessMessage(result?.message || "Your rental checkout was created successfully.");
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

        {successMessage ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800" role="status">
            <p className="font-semibold">Rental checkout submitted</p>
            <p className="mt-1">{successMessage}</p>
            <Button type="button" className="mt-4 w-full" onClick={() => onOpenChange(false)}>
              Done
            </Button>
          </div>
        ) : (
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
                  onChange={(event) => setStartAt(event.target.value)}
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
                  onChange={(event) => setEndAt(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="car-pickup-address">Pickup address</Label>
                <Input
                  id="car-pickup-address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="Cairo International Airport, Terminal 3"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="car-coupon-id">Coupon ID (optional)</Label>
                <Input
                  id="car-coupon-id"
                  value={couponId}
                  onChange={(event) => setCouponId(event.target.value)}
                  placeholder="Enter coupon ID"
                />
              </div>

              {error && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            </div>

            <SheetFooter>
              <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
                {isSubmitting ? "Submitting rental…" : "Continue to checkout"}
              </Button>
            </SheetFooter>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}
