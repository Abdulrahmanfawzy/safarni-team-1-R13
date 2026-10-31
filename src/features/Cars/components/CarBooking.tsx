import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface CarBookingCardProps {
  name: string;
  imageSrc: string;
  transmission: string;
  seats: number;
  fuel: string;
  pricePerHour: number;
  pricePerDay: number;
  currency?: string;
  confirmLabel?: string;
  onConfirm?: () => void;
  className?: string;
}

export default function CarBookingCard({
  name,
  imageSrc,
  transmission,
  seats,
  fuel,
  pricePerHour,
  pricePerDay,
  currency = "$",
  confirmLabel = "Confirm",
  onConfirm,
  className,
}: CarBookingCardProps) {
  const specs = [transmission, `${seats} seats`, fuel];

  return (
    <Card
      aria-label={name}
      className={cn(
        "relative w-full max-w-[560px] gap-0 rounded-lg border-0 p-3 pt-5 shadow-lg",
        className
      )}
    >
      <Image
        src={imageSrc}
        alt={name}
        width={260}
        height={130}
        priority
        className="pointer-events-none absolute -top-3.5 right-1.5 h-auto w-[110px] sm:-top-5 sm:w-[140px]"
      />

      <CardContent className="p-0 px-1">
        <h3 className="mb-3.5 text-base font-medium">{name}</h3>

        <ul className="mb-3.5 flex text-[13px] text-muted-foreground">
          {specs.map((spec) => (
            <li
              key={spec}
              className="border-l border-border px-3.5 first:border-l-0 first:pl-0"
            >
              {spec}
            </li>
          ))}
        </ul>

        <div className="flex items-baseline justify-between">
          <p className="flex items-baseline gap-1">
            <strong className="text-sm font-semibold">
              {currency}
              {pricePerHour}
            </strong>
            <span className="text-[10px] text-muted-foreground">per hour</span>
          </p>
          <p className="flex items-baseline gap-1">
            <strong className="text-sm font-semibold">
              {currency}
              {pricePerDay}
            </strong>
            <span className="text-[10px] text-muted-foreground">per day</span>
          </p>
        </div>
      </CardContent>

      <CardFooter className="mt-3.5 p-0">
        <Button
          type="button"
          onClick={onConfirm}
          className="w-full rounded bg-[#2d3199] font-semibold text-white hover:bg-[#23277a]"
        >
          {confirmLabel}
        </Button>
      </CardFooter>
    </Card>
  );
}