
"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const values = React.useMemo(() => {
    if (value !== undefined) return value;
    if (defaultValue !== undefined) return defaultValue;

    return [min];
  }, [value, defaultValue, min]);

  const thumbLabel = (index: number) => {
    if (values.length !== 2) return undefined;

    return index === 0 ? "Minimum value" : "Maximum value";
  };

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        "data-[disabled]:opacity-50",
        className,
      )}
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className="relative h-[3px] w-full grow overflow-hidden rounded-full bg-blue-200"
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className="absolute h-full bg-blue-500"
        />
      </SliderPrimitive.Track>

      {values.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          data-slot="slider-thumb"
          aria-label={thumbLabel(index)}
          className={cn(
            "block size-4 shrink-0 rounded-full bg-blue-500",
            "shadow-sm ring-offset-background transition-transform",
            "hover:scale-110 focus-visible:outline-none",
            "focus-visible:ring-4 focus-visible:ring-blue-200",
            "disabled:pointer-events-none",
          )}
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
