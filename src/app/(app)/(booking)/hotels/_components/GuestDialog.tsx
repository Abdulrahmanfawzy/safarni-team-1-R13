
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Minus, Plus } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  adults: number;
  setAdults: Dispatch<SetStateAction<number>>;
  childrenCount: number;
  setChildrenCount: Dispatch<SetStateAction<number>>;
  infants: number;
  setInfants: Dispatch<SetStateAction<number>>;
  onConfirm: () => void;
}

export default function GuestDialog({
  open,
  onOpenChange,
  adults,
  setAdults,
  childrenCount,
  setChildrenCount,
  infants,
  setInfants,
  onConfirm,
}: IProps) {
  const guests = [
    {
      title: "Adults",
      description: "Ages 18 Or Above",
      count: adults,
      setCount: setAdults,
    },
    {
      title: "Children",
      description: "Ages 2-17",
      count: childrenCount,
      setCount: setChildrenCount,
    },
    {
      title: "Infants",
      description: "Under Ages 2",
      count: infants,
      setCount: setInfants,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-32px)] max-w-90 gap-0 rounded-md border-0 bg-white p-6">
        <DialogTitle className="sr-only">
          Select Guests
        </DialogTitle>

        <div>
          {guests.map((guest) => (
            <div
              key={guest.title}
              className="flex items-center justify-between gap-3 border-b border-gray-100 py-4 first:pt-0 last:border-b-0"
            >
              <div className="space-y-1">
                <h3 className="text-base font-medium text-[#111928]">
                  {guest.title}
                </h3>

                <p className="text-xs text-[#4B5563]">
                  {guest.description}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  disabled={guest.count <= 1}
                  onClick={() =>
                    guest.setCount((count) => Math.max(1, count - 1))
                  }
                  className="flex size-4.5 items-center justify-center rounded-sm bg-gray-100 text-gray-500 disabled:opacity-40"
                  aria-label={`Decrease ${guest.title}`}
                >
                  <Minus size={12} />
                </button>

                <span className="min-w-3 text-center text-xs">
                  {guest.count}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    guest.setCount((count) => count + 1)
                  }
                  className="flex size-4.5 items-center justify-center rounded-sm bg-primary text-white"
                  aria-label={`Increase ${guest.title}`}
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <Button
          type="button"
          onClick={onConfirm}
          className="mt-4 h-9.5 w-full rounded-md bg-primary hover:bg-[#1E429F]"
        >
          Book Now
        </Button>
      </DialogContent>
    </Dialog>
  );
}
