"use client";

import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { CreateFlightBookingAction, FlightPayment } from "@/actions/Flights";
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

export type BookingSeat = {
  id: string;
  label: string;
};

type PassengerFormValues = {
  passengers: Array<{
    full_name: string;
    age: number | "";
    gender: string;
    passport_number: string;
    seat_id: string;
  }>;
};

const toApiId = (value: string): string | number =>
  /^\d+$/.test(value) ? Number(value) : value;

export function PassengerBookingSheet({
  open,
  onOpenChange,
  flightId,
  seats,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flightId: string;
  seats: BookingSeat[];
}) {
  const [submitError, setSubmitError] = useState("");
  const [createdBooking, setCreatedBooking] = useState<{
    key: string;
    id: string | number;
  } | null>(null);
  const [isStartingPayment, setIsStartingPayment] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PassengerFormValues>({
    defaultValues: { passengers: [] },
  });
  const { fields } = useFieldArray({ control, name: "passengers" });
  const bookingKey = `${flightId}:${seats.map((seat) => seat.id).sort().join(",")}`;
  const activeBookingId = createdBooking?.key === bookingKey ? createdBooking.id : null;

  useEffect(() => {
    if (!open) return;
    setSubmitError("");
    if (createdBooking?.key !== bookingKey) {
      reset({
        passengers: seats.map((seat) => ({
          full_name: "",
          age: "",
          gender: "male",
          passport_number: "",
          seat_id: seat.id,
        })),
      });
    }
  }, [bookingKey, createdBooking?.key, open, reset, seats]);

  const startCheckout = async (id: string | number) => {
    setSubmitError("");
    setIsStartingPayment(true);
    try {
      const response = await FlightPayment(id);
      if (response?.error || response?.success === false) {
        setSubmitError(response.error || response.message || "Could not start checkout.");
        return;
      }

      const checkoutUrl = response?.data?.checkout_url ?? response?.checkout_url;
      if (typeof checkoutUrl !== "string" || !checkoutUrl.startsWith("https://")) {
        setSubmitError("The payment service did not return a valid checkout URL.");
        return;
      }

      window.location.assign(checkoutUrl);
    } catch {
      setSubmitError("Unable to start checkout. Please try again.");
    } finally {
      setIsStartingPayment(false);
    }
  };

  const submit = handleSubmit(async (values) => {
    setSubmitError("");
    let bookingId = activeBookingId;

    if (!bookingId) {
      const response = await CreateFlightBookingAction({
        flight_id: toApiId(flightId),
        passengers: values.passengers.map((passenger) => ({
          full_name: passenger.full_name.trim(),
          age: Number(passenger.age),
          gender: passenger.gender,
          passport_number: passenger.passport_number.trim(),
          seat_id: toApiId(passenger.seat_id),
        })),
      });

      if (response?.error || response?.success === false) {
        setSubmitError(response.error || response.message || "Booking could not be completed.");
        return;
      }

      const bookingData = response?.data?.booking ?? response?.data ?? response?.booking ?? response;
      bookingId = bookingData?.id ?? bookingData?.booking_id ?? response?.booking_id;
      if (bookingId === undefined || bookingId === null) {
        setSubmitError("Booking was created, but the response did not include a booking ID.");
        return;
      }

      setCreatedBooking({ key: bookingKey, id: bookingId });
    }

    await startCheckout(bookingId);
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Passenger details</SheetTitle>
          <SheetDescription>
            Add passenger information for each selected seat. Flight #{flightId}.
          </SheetDescription>
        </SheetHeader>

        {activeBookingId ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800" role="status">
            Booking created. Continue to secure checkout.
            {submitError && (
              <p role="alert" className="mt-3 rounded-md bg-red-50 p-3 text-red-700">
                {submitError}
              </p>
            )}
            <Button
              className="mt-4 w-full"
              loading={isStartingPayment}
              disabled={isStartingPayment}
              onClick={() => void startCheckout(activeBookingId)}
            >
              {isStartingPayment ? "Opening checkout..." : "Continue to payment"}
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 space-y-4 overflow-y-auto py-2 pr-1">
              {fields.map((field, index) => (
                <fieldset key={field.id} className="space-y-3 rounded-xl border border-neutral-200 p-4">
                  <legend className="px-1 text-sm font-semibold text-neutral-900">
                    Passenger {index + 1} · Seat {seats[index]?.label}
                  </legend>
                  <input
                    type="hidden"
                    {...register(`passengers.${index}.seat_id` as const)}
                  />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor={`passenger-name-${index}`}>Full name</Label>
                      <Input
                        id={`passenger-name-${index}`}
                        autoComplete="name"
                        placeholder="Full name as on passport"
                        aria-invalid={Boolean(errors.passengers?.[index]?.full_name)}
                        {...register(`passengers.${index}.full_name` as const, {
                          required: "Enter the passenger's full name.",
                          minLength: { value: 2, message: "Enter at least 2 characters." },
                        })}
                      />
                      {errors.passengers?.[index]?.full_name && (
                        <p className="text-xs text-red-600">
                          {errors.passengers[index]?.full_name?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor={`passenger-age-${index}`}>Age</Label>
                      <Input
                        id={`passenger-age-${index}`}
                        type="number"
                        min={1}
                        max={120}
                        aria-invalid={Boolean(errors.passengers?.[index]?.age)}
                        {...register(`passengers.${index}.age` as const, {
                          setValueAs: (value) => value === "" ? "" : Number(value),
                          validate: (value) =>
                            value !== "" && Number.isInteger(value) && value >= 1 && value <= 120
                              ? true
                              : "Enter an age from 1 to 120.",
                        })}
                      />
                      {errors.passengers?.[index]?.age && (
                        <p className="text-xs text-red-600">
                          {errors.passengers[index]?.age?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor={`passenger-gender-${index}`}>Gender</Label>
                      <select
                        id={`passenger-gender-${index}`}
                        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        {...register(`passengers.${index}.gender` as const, {
                          required: "Select a gender.",
                        })}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor={`passenger-passport-${index}`}>Passport number</Label>
                      <Input
                        id={`passenger-passport-${index}`}
                        autoComplete="off"
                        placeholder="Passport number"
                        aria-invalid={Boolean(errors.passengers?.[index]?.passport_number)}
                        {...register(`passengers.${index}.passport_number` as const, {
                          required: "Enter the passport number.",
                        })}
                      />
                      {errors.passengers?.[index]?.passport_number && (
                        <p className="text-xs text-red-600">
                          {errors.passengers[index]?.passport_number?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </fieldset>
              ))}
            </div>

            {submitError && (
              <p role="alert" className="mt-3 rounded-md bg-red-50 p-3 text-sm text-red-700">
                {submitError}
              </p>
            )}

            <SheetFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" loading={isSubmitting || isStartingPayment} disabled={isSubmitting || isStartingPayment || seats.length === 0}>
                {isSubmitting || isStartingPayment ? "Creating checkout..." : "Submit booking and continue to payment"}
              </Button>
            </SheetFooter>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
}
