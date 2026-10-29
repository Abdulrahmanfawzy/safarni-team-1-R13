"use client";

import * as React from "react";
import {
  CreateInternalTourBooking,
  CreateInternalTourPayPalOrder,
  type CreateInternalTourBookingPayload,
} from "@/actions/internalTourBookings";
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
import type { TourSchedule } from "../types/types";

type TourBookingSheetProps = {
  tourId: number;
  schedules: TourSchedule[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type CreatedBooking = {
  id: string | number;
  code?: string;
};

function formatScheduleDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function TourBookingSheet({
  tourId,
  schedules,
  open,
  onOpenChange,
}: TourBookingSheetProps) {
  const availableSchedules = React.useMemo(
    () => schedules.filter((schedule) => schedule.available_slots > 0),
    [schedules],
  );
  const [scheduleId, setScheduleId] = React.useState("");
  const [adults, setAdults] = React.useState(2);
  const [children, setChildren] = React.useState(0);
  const [infants, setInfants] = React.useState(0);
  const [booking, setBooking] = React.useState<CreatedBooking | null>(null);
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    setScheduleId((current) =>
      availableSchedules.some((schedule) => String(schedule.id) === current)
        ? current
        : String(availableSchedules[0]?.id ?? ""),
    );
  }, [availableSchedules, open]);

  const close = (nextOpen: boolean) => {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      setScheduleId("");
      setAdults(2);
      setChildren(0);
      setInfants(0);
      setBooking(null);
      setFullName("");
      setEmail("");
      setError("");
    }
  };

  const submitBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const selectedSchedule = availableSchedules.find(
      (schedule) => String(schedule.id) === scheduleId,
    );
    if (!selectedSchedule) {
      setError("Choose an available tour date.");
      return;
    }
    if (adults < 1 || children < 0 || infants < 0) {
      setError("Add at least one adult and check the passenger counts.");
      return;
    }
    if (adults + children + infants > selectedSchedule.available_slots) {
      setError(`This date has only ${selectedSchedule.available_slots} spots available.`);
      return;
    }

    const payload: CreateInternalTourBookingPayload = {
      schedule_id: selectedSchedule.id,
      adults,
      children,
      infants,
    };

    setIsSubmitting(true);
    try {
      const result = await CreateInternalTourBooking(tourId, payload);
      if ("error" in result) {
        setError(result.error);
        return;
      }
      setBooking({ id: result.bookingId, code: result.bookingCode });
      setError("");
    } catch {
      setError("Unable to create the tour booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitPayment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (!booking) return;

    setIsSubmitting(true);
    try {
      const result = await CreateInternalTourPayPalOrder(booking.id, {
        full_name: fullName.trim(),
        email: email.trim(),
      });
      if ("error" in result) {
        setError(result.error);
        return;
      }
      window.location.assign(result.approvalUrl);
    } catch {
      setError("Unable to create the PayPal order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={close}>
      <SheetContent side="right" className="sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{booking ? "Complete your payment" : "Book this tour"}</SheetTitle>
          <SheetDescription>
            {booking
              ? "Enter your name and email to continue to PayPal."
              : "Choose a tour date and tell us how many guests are coming."}
          </SheetDescription>
        </SheetHeader>

        {booking ? (
          <form onSubmit={submitPayment} className="flex min-h-0 flex-1 flex-col gap-5">
            <div className="flex-1 space-y-4 overflow-y-auto py-2">
              <div className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800" role="status">
                Booking created{booking.code ? ` · ${booking.code}` : ""}. Continue to PayPal to approve payment.
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="tour-payment-name">Full name</Label>
                <Input
                  id="tour-payment-name"
                  autoComplete="name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="tour-payment-email">Email</Label>
                <Input
                  id="tour-payment-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              {error && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            </div>

            <SheetFooter>
              <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
                {isSubmitting ? "Creating PayPal order…" : "Continue to PayPal"}
              </Button>
            </SheetFooter>
          </form>
        ) : (
          <form onSubmit={submitBooking} className="flex min-h-0 flex-1 flex-col gap-5">
            <div className="flex-1 space-y-4 overflow-y-auto py-2">
              {availableSchedules.length > 0 ? (
                <div className="space-y-1.5">
                  <Label htmlFor="tour-schedule">Tour date</Label>
                  <select
                    id="tour-schedule"
                    value={scheduleId}
                    onChange={(event) => setScheduleId(event.target.value)}
                    required
                    className="h-12 w-full rounded-lg border border-input bg-background px-3 text-sm"
                  >
                    {availableSchedules.map((schedule) => (
                      <option key={schedule.id} value={schedule.id}>
                        {formatScheduleDate(schedule.date)}
                        {schedule.end_date !== schedule.date
                          ? ` – ${formatScheduleDate(schedule.end_date)}`
                          : ""}
                        {` · ${schedule.available_slots} spots left`}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                  There are no available dates for this tour right now.
                </p>
              )}

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="tour-adults">Adults</Label>
                  <Input
                    id="tour-adults"
                    type="number"
                    min={1}
                    value={adults}
                    onChange={(event) => setAdults(Number(event.target.value))}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="tour-children">Children</Label>
                  <Input
                    id="tour-children"
                    type="number"
                    min={0}
                    value={children}
                    onChange={(event) => setChildren(Number(event.target.value))}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="tour-infants">Infants</Label>
                  <Input
                    id="tour-infants"
                    type="number"
                    min={0}
                    value={infants}
                    onChange={(event) => setInfants(Number(event.target.value))}
                    required
                  />
                </div>
              </div>

              {error && <p role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            </div>

            <SheetFooter>
              <Button
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting || availableSchedules.length === 0}
              >
                {isSubmitting ? "Creating booking…" : "Continue"}
              </Button>
            </SheetFooter>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}
