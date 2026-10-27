
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { compareItems } from "./compare-data";
import ComparisonCard from "./ComparisonCard";

export default function ComparisonGrid() {
  const router = useRouter();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleCheckout = () => {
    if (!selectedItemId) return;
    router.push(`/payment?itemId=${encodeURIComponent(selectedItemId)}`);
  };

  return (
    <section className="app-container flex min-w-0 flex-col gap-4 sm:gap-5">
      <h2 className="text-lg font-medium text-gray-900 sm:text-xl">
        Compare
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
        {compareItems.map((item) => (
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
    </section>
  );
}