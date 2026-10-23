"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

function Slider({
  className,
  value,
  defaultValue,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const values = value ?? defaultValue ?? [min, max];

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        "data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative h-[3px] w-full grow overflow-hidden rounded-full bg-blue-200"
      >
        <SliderPrimitive.Range className="absolute h-full bg-blue-500" />
      </SliderPrimitive.Track>

      {values.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          data-slot="slider-thumb"
          aria-label={
            values.length === 2
              ? index === 0
                ? "Minimum value"
                : "Maximum value"
              : "Value"
          }
          className={cn(
            "block size-4 shrink-0 rounded-full bg-blue-500",
            "shadow-sm ring-offset-background transition-transform",
            "hover:scale-110 focus-visible:outline-none",
            "focus-visible:ring-4 focus-visible:ring-blue-200",
          )}
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
