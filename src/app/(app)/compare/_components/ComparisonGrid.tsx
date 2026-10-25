
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
    <section className="app-container flex flex-col gap-4">
      <h2 className=" text-xl font-medium text-gray-900">
        Compare
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {compareItems.map((item) => (
          <ComparisonCard
            key={item.id}
            item={item}
            selected={selectedItemId === item.id}
            onSelect={setSelectedItemId}
          />
        ))}
      </div>

      <div className="mt-5 flex justify-center">
        <Button
          type="button"
          disabled={!selectedItemId}
          onClick={handleCheckout}
          className="w-[50%] h-14!"
        >
          Check Out
        </Button>
      </div>
    </section>
  );
}