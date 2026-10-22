"use client";

import * as React from "react";
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


export function SeatPicker({ onContinue }: { onContinue?: (seats: number[]) => void }) {
  const [selected, setSelected] = React.useState<number[]>([]);

  const toggle = (n: number) =>
    setSelected((prev) =>
      prev.includes(n) ? prev.filter((s) => s !== n) : [...prev, n].sort((a, b) => a - b)
    );

  const total = selected.length * TICKET_PRICE;

  return (
    <section className="w-full max-w-7xl rounded-md bg-white px-6 py-6 font-sans shadow-sm ">
      <h2 className="mb-4 text-center text-base font-medium text-neutral-900">Choose seat</h2>

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
        className="mt-4 h-9 w-full rounded-md bg-primary text-[13px] font-semibold text-white hover:bg-primary/90"
        disabled={selected.length === 0}
        onClick={() => onContinue?.(selected)}
      > 
        Checkout
      </Button>
    </section>
  );
}