"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Seat from "./ButtonSeat";
import { PassengerBookingSheet, type BookingSeat } from "./PassengerBookingSheet";

const DEFAULT_PRICE = 150;

const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

const extractSeatList = (value: unknown): any[] | null => {
  if (Array.isArray(value)) return value;
  if (typeof value !== "object" || value === null) return null;

  const record = value as Record<string, unknown>;
  for (const key of ["all_seats", "allSeats", "seats"]) {
    if (!(key in record)) continue;
    const seats = extractSeatList(record[key]);
    if (seats) return seats;
  }

  const availableValue =
    record.available_seats ?? record.availableSeats ??
    (Array.isArray(record.available) ? record.available : undefined);
  const unavailableValue =
    record.unavailable_seats ?? record.unavailableSeats ??
    record.non_available_seats ?? record.nonAvailableSeats ??
    (Array.isArray(record.unavailable) ? record.unavailable : undefined);
  if (availableValue !== undefined || unavailableValue !== undefined) {
    const available = extractSeatList(availableValue) ?? [];
    const unavailable = extractSeatList(unavailableValue) ?? [];
    return [
      ...available.map((seat) =>
        typeof seat === "object" && seat !== null
          ? { ...seat, is_available: (seat as any).is_available ?? true }
          : { seat_number: seat, is_available: true },
      ),
      ...unavailable.map((seat) =>
        typeof seat === "object" && seat !== null
          ? { ...seat, is_available: (seat as any).is_available ?? false }
          : { seat_number: seat, is_available: false },
      ),
    ];
  }

  if ("data" in record) return extractSeatList(record.data);
  return null;
};

const getSeatLabel = (seat: any): string | null => {
  const label =
    typeof seat === "string" || typeof seat === "number"
      ? seat
      : seat?.seat_number ?? seat?.seatNumber ?? seat?.number ?? seat?.seat;
  return label === undefined || label === null || String(label).trim() === ""
    ? null
    : String(label).trim();
};

const getSeatId = (seat: any): string | null => {
  const id = seat?.seat_id ?? seat?.id;
  return id === undefined || id === null ? null : String(id);
};

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={cn("size-2.5 rounded-full", color)} />
      <span className="text-xs text-neutral-800">{label}</span>
    </div>
  );
}

export function SeatPicker({
  apiSeats,
  requestError,
  onContinue,
}: {
  apiSeats?: any;
  requestError?: string;
  onContinue?: (seatIds: string[]) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPassengerSheetOpen, setPassengerSheetOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>([]);
  const flightId = searchParams.get("id") ?? "";

  const seatsParam = searchParams.get("seats") ?? "";
  const selectedSeatValues = React.useMemo(
    () => seatsParam.split(",").map((seat) => seat.trim()).filter(Boolean),
    [seatsParam],
  );

  const rawSeats = React.useMemo(() => extractSeatList(apiSeats), [apiSeats]);

  // Extract available seats from the flight seats response.
  const availableSeatNumbers = React.useMemo(() => {
    const set = new Set<string>();
    rawSeats?.forEach((item: any) => {
      const id = getSeatId(item);
      const label = getSeatLabel(item);
      if (id === null || label === null) return;

      const status = String(item.status ?? "").toLowerCase();
      const availability = String(item.is_available ?? item.available ?? "").toLowerCase();
      const unavailableValues = [
        "false", "0", "no", "unavailable", "non_available", "not_available",
        "not available", "booked", "occupied", "reserved",
      ];
      if (
        !unavailableValues.includes(status) &&
        !unavailableValues.includes(availability)
      ) {
        set.add(id);
      }
    });
    return set;
  }, [rawSeats]);

  const seatEntries = React.useMemo(
    () => (rawSeats ?? [])
      .map((seat) => ({ id: getSeatId(seat), label: getSeatLabel(seat) }))
      .filter((seat): seat is BookingSeat => seat.id !== null && seat.label !== null)
      .sort((a, b) => a.label.localeCompare(b.label, undefined, { numeric: true, sensitivity: "base" })),
    [rawSeats],
  );

  // Accept existing label-based URLs, then keep selections as API seat IDs.
  React.useEffect(() => {
    setSelected(
      selectedSeatValues
        .map((value) =>
          seatEntries.find((seat) => seat.id === value)?.id ??
          seatEntries.find((seat) => seat.label.toLowerCase() === value.toLowerCase())?.id,
        )
        .filter((id): id is string => Boolean(id)),
    );
  }, [seatEntries, selectedSeatValues]);

  const selectedSeatEntries = React.useMemo(
    () => seatEntries.filter(
      (seat) => selected.includes(seat.id) && availableSeatNumbers.has(seat.id),
    ),
    [availableSeatNumbers, seatEntries, selected],
  );
  const passengerCount = selectedSeatEntries.length;

  const rows = React.useMemo(() => {
      const byRow = new Map<string, BookingSeat[]>();
      seatEntries.forEach((seat) => {
        const rowKey = seat.label.match(/^\d+/)?.[0] ?? seat.label;
        byRow.set(rowKey, [...(byRow.get(rowKey) ?? []), seat]);
      });
      return [...byRow.entries()]
        .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
        .map(([key, seats]) => ({
          key,
          left: seats.slice(0, 2),
          right: seats.slice(2),
        }));
    }, [seatEntries]);

  const ticketPrice = React.useMemo(() => {
    const foundPrice =
      apiSeats?.price ||
      apiSeats?.ticket_price ||
      apiSeats?.data?.price ||
      apiSeats?.data?.ticket_price ||
      rawSeats?.[0]?.price;
    return Number(foundPrice) || DEFAULT_PRICE;
  }, [apiSeats, rawSeats]);

  const seatsError =
    requestError || apiSeats?.error ||
    (rawSeats === null ? "The seats service returned an unrecognized response." :
      rawSeats.length === 0 ? "No seats are available for this flight." : "");

  const total = passengerCount * ticketPrice;

  const toggle = (seatId: string) => {
    const next = selected.includes(seatId)
      ? selected.filter((selectedSeat) => selectedSeat !== seatId)
      : [...selected, seatId];
    setSelected(next);

    const params = new URLSearchParams(searchParams.toString());
    if (next.length > 0) {
      params.set("seats", next.join(","));
      params.set("passengers", String(next.length));
    } else {
      params.delete("seats");
      params.delete("passengers");
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleContinue = () => {
    if (selectedSeatEntries.length === 0 || !flightId) return;
    if (onContinue) {
      onContinue(selectedSeatEntries.map((seat) => seat.id));
    } else {
      setPassengerSheetOpen(true);
    }
  };

  return (
    <>
      <section className="w-full max-w-7xl rounded-md bg-white px-6 py-6 font-sans shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-medium text-neutral-900">Choose seat</h2>
        <span className="text-xs font-medium text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-full">
          Passengers: <strong className="text-primary">{passengerCount}</strong>
        </span>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <LegendItem color="bg-[#2e3192]" label="Available" />
        <LegendItem color="bg-[#03D947]" label="Selected" />
        <LegendItem color="bg-[#d9dbe0]" label="Unavailable" />
      </div>

      {seatsError && (
        <p role="alert" className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
          {seatsError}
        </p>
      )}

      <div className="flex flex-col gap-4.5">
        {rows.map((row) => (
          <div key={row.key} className="flex items-center justify-between">
            <div className="flex gap-3">
              {row.left.map((n) => (
                <Seat
                  key={n.id}
                  seatId={n.id}
                  number={n.label}
                  selected={selected.includes(n.id)}
                  isAvailable={!seatsError && availableSeatNumbers.has(n.id)}
                  onToggle={toggle}
                />
              ))}
            </div>
            <div className="flex gap-3">
              {row.right.map((n) => (
                <Seat
                  key={n.id}
                  seatId={n.id}
                  number={n.label}
                  selected={selected.includes(n.id)}
                  isAvailable={!seatsError && availableSeatNumbers.has(n.id)}
                  onToggle={toggle}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <dl className="mt-5 space-y-3 text-[13px] text-neutral-900">
        <div className="flex items-center justify-between">
          <dt>Passengers</dt>
          <dd className="font-semibold text-primary">
            {passengerCount} {passengerCount === 1 ? "Passenger" : "Passengers"}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>Ticket price</dt>
          <dd className="font-semibold text-primary">{formatPrice(ticketPrice)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>Total Price</dt>
          <dd className="font-semibold text-primary">{formatPrice(total)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>your Seat</dt>
          <dd className="font-semibold text-primary">
            {selectedSeatEntries.length
              ? selectedSeatEntries.map((seat) => seat.label).join(", ")
              : "—"}
          </dd>
        </div>
      </dl>

      <Button
        className="mt-4 h-10 w-full rounded-xl bg-primary text-sm font-semibold text-white hover:bg-primary/90 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={selectedSeatEntries.length === 0 || !flightId}
        onClick={handleContinue}
      >
        {selectedSeatEntries.length === 0
          ? "Please select your seat(s)"
          : `Enter passenger details (${passengerCount} ${passengerCount === 1 ? "passenger" : "passengers"}) →`}
      </Button>
      </section>
      <PassengerBookingSheet
        open={isPassengerSheetOpen}
        onOpenChange={setPassengerSheetOpen}
        flightId={flightId}
        seats={selectedSeatEntries}
      />
    </>
  );
}
