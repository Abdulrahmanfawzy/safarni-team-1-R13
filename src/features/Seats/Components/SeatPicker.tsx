"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Seat from "./ButtonSeat";


const TOTAL_SEATS = 30;
const TICKET_PRICE = 150;
// Seats that can be picked (dark blue in the design). Everything else is unavailable.

const ROWS = Array.from({ length: TOTAL_SEATS / 5 }, (_, r) => {
  const start = r * 5 + 1;
  return { left: [start, start + 1], right: [start + 2, start + 3, start + 4] };
});


const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={cn("size-2.5 rounded-full", color)} />
      <span className="text-xs text-neutral-800">{label}</span>
    </div>
  );
}


export function SeatPicker({
  maxSeats: propMaxSeats,
  onContinue,
}: {
  maxSeats?: number;
  onContinue?: (seats: number[]) => void;
}) {
  const router = useRouter();
  const [maxSeats, setMaxSeats] = React.useState<number>(propMaxSeats ?? 1);
  const [selected, setSelected] = React.useState<number[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (propMaxSeats && !isNaN(propMaxSeats) && propMaxSeats > 0) {
      setMaxSeats(propMaxSeats);
      return;
    }
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const urlSeats = urlParams.get("passengers");
      if (urlSeats && !isNaN(Number(urlSeats)) && Number(urlSeats) > 0) {
        setMaxSeats(Number(urlSeats));
        return;
      }
      const stored = localStorage.getItem("selectedPassengers");
      if (stored && !isNaN(Number(stored)) && Number(stored) > 0) {
        setMaxSeats(Number(stored));
      }
    }
  }, [propMaxSeats]);

  const toggle = (n: number) => {
    if (selected.includes(n)) {
      setSelected((prev) => prev.filter((s) => s !== n));
      setError(null);
    } else {
      if (selected.length >= maxSeats) {
        setError(
          `You can only select up to ${maxSeats} ${maxSeats === 1 ? "seat" : "seats"} for ${maxSeats} ${maxSeats === 1 ? "passenger" : "passengers"}.`
        );
        return;
      }
      setError(null);
      setSelected((prev) => [...prev, n].sort((a, b) => a - b));
    }
  };

  const total = selected.length * TICKET_PRICE;

  return (
    <section className="w-full max-w-7xl rounded-md bg-white px-6 py-6 font-sans shadow-sm ">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-medium text-neutral-900">Choose seat</h2>
        <span className="text-xs font-medium text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-full">
          Passengers: <strong className="text-primary">{maxSeats}</strong>
        </span>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-2.5 text-xs text-red-600 border border-red-200 flex items-center justify-between">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-red-500 hover:text-red-700 ml-2 font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <LegendItem color="bg-[#2e3192]" label="Available" />
        <LegendItem color="bg-[#22e05a]" label="Selected" />
        <LegendItem color="bg-[#d9dbe0]" label="Un available" />
      </div>

      <div className="flex flex-col gap-4.5">
        {ROWS.map((row, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex gap-3">
              {row.left.map((n) => (
                <Seat key={n} number={n} selected={selected.includes(n)} onToggle={toggle} />
              ))}
            </div>
            <div className="flex gap-3">
              {row.right.map((n) => (
                <Seat key={n} number={n} selected={selected.includes(n)} onToggle={toggle} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <dl className="mt-5 space-y-3 text-[13px] text-neutral-900">
        <div className="flex items-center justify-between">
          <dt>Passengers</dt>
          <dd className="font-semibold text-primary">
            {maxSeats} {maxSeats === 1 ? "Passenger" : "Passengers"}
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>Ticket price</dt>
          <dd className="font-semibold text-primary">{formatPrice(TICKET_PRICE)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>Total Price</dt>
          <dd className="font-semibold text-primary">{formatPrice(total)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>your Seat</dt>
          <dd className="font-semibold text-primary">
            {selected.length ? selected.join(", ") : "—"}
          </dd>
        </div>
      </dl>

      <Button
        className="mt-4 h-10 w-full rounded-xl bg-primary text-sm font-semibold text-white hover:bg-primary/90 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={selected.length === 0 || selected.length < maxSeats}
        onClick={() => {
          if (onContinue) {
            onContinue(selected);
          } else {
            const params = new URLSearchParams();
            params.set("seats", selected.join(","));
            params.set("passengers", String(maxSeats));
            router.push(`/payment?${params.toString()}`);
          }
        }}
      >
        {selected.length < maxSeats
          ? `Select ${maxSeats - selected.length} more seat${maxSeats - selected.length !== 1 ? "s" : ""}`
          : "Continue to Payment →"}
      </Button>
    </section>
  );
}