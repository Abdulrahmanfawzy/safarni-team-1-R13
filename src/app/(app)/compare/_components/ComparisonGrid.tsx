
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { compareItems } from "./compare-data";
import ComparisonCard from "./ComparisonCard";
import { ComparedTour } from "@/types/compare.types";
interface IProps {
  items: ComparedTour[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
}
export default function ComparisonGrid({
  items,
  isLoading,
  isError,
  errorMessage,
}: IProps) {
  const router = useRouter();
  const [selectedItemId, setSelectedItemId] = useState<number  | null>(null);
  const selectedItem = items.find(
    (item) => item.id === selectedItemId
  );
  const handleCheckout = () => {
    if (!selectedItemId) return;
    router.push(`/payment?itemId=${selectedItem?.id}`);
  };
  if (isLoading) {
    return (
      <section className="app-container">
        <h2 className="mb-4 text-lg font-medium">Compare</h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-48 animate-pulse rounded-xl bg-gray-100"
            />
          ))}
        </div>
      </section>
    );
  }
 if (isError) {
    return (
      <section className="app-container">
        <h2 className="mb-2 text-lg font-medium">Compare</h2>
        <p className="text-sm text-red-500">
          {errorMessage || "Failed to compare tours."}
        </p>
      </section>
    );
  }

  return (
    <section className="app-container flex min-w-0 flex-col gap-4 sm:gap-5">
      <h2 className="text-lg font-medium text-gray-900 sm:text-xl">
        Compare
      </h2>

     {items.length === 0 ? (
        <p className="text-sm text-gray-500">
          Select at least two tours and click Compare to see their details.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
            {items.map((item) => (
              <ComparisonCard
                key={item.id}
                item={item}
                selected={selectedItemId === item.id}
                onSelect={setSelectedItemId}
              />
            ))}
          </div>


      <div className="sticky bottom-0 z-20 -mx-5 mt-2 flex justify-center border-t border-gray-100 bg-white/95 px-5 py-3 backdrop-blur sm:static sm:mx-0 sm:mt-5 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
        <Button
          type="button"
          disabled={!selectedItemId}
          onClick={handleCheckout}
          className="h-12 w-full max-w-md text-sm sm:h-14"
        >
          Check Out
        </Button>
      </div>
          </>
      )}
    </section>
  );
}