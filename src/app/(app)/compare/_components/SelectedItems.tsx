import { CompareTour } from "@/types/compare.types";

import SelectedItemCard from "./selected-items/SelectedItemCard";
import SelectedItemsHeader from "./selected-items/SelectedItemsHeader";
import SelectedItemsSkeleton from "./selected-items/SelectedItemsSkeleton";
import SelectedItemsEmpty from "./selected-items/SelectedItemsEmpty";
import SelectedItemsError from "./selected-items/SelectedItemsError";
import { Button } from "@/components/ui/button";

interface IProps {
  items: CompareTour[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  selectedIds: number[];
  onToggle: (id: number) => void;
  onCompare: () => void;
  isComparing: boolean;
  maxItems: number;
}

export default function SelectedItems({ items, isLoading, isError, errorMessage, selectedIds, onCompare, onToggle, isComparing, maxItems }: IProps) {
  if (isLoading) {
    return <SelectedItemsSkeleton />;
  }

  if (isError) {
    return <SelectedItemsError message={errorMessage} />;
  }

  if (!items.length) {
    return <SelectedItemsEmpty />;
  }

  return (
    <section className="app-container mt-4 space-y-4 sm:mt-6">
      <SelectedItemsHeader count={items.length} />
         <p className="text-xs text-gray-500 sm:text-sm">
        Select up to {maxItems} tours to compare.
        {" "}
        {selectedIds.length}/{maxItems} selected
      </p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4">
       {items.map((item) => {
          const isSelected = selectedIds.includes(item.id);

          const isLimitReached =
            selectedIds.length >= maxItems && !isSelected;

          return (
            <SelectedItemCard
              key={item.id}
              item={item}
              selected={isSelected}
              disabled={isLimitReached}
              onSelect={() => onToggle(item.id)}
            />
          );
        })}
      </div>
      <Button
        type="button"
        onClick={onCompare}
        loading={isLoading}
        disabled={selectedIds.length < 2 || isComparing}
      >
        Compare

        ({selectedIds.length}/{maxItems})
      </Button>
    </section>
  );
}