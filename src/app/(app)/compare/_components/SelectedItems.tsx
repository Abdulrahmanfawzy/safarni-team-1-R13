import { CompareTour } from "@/types/compare.types";

import SelectedItemCard from "./selected-items/SelectedItemCard";
import SelectedItemsHeader from "./selected-items/SelectedItemsHeader";
import SelectedItemsSkeleton from "./selected-items/SelectedItemsSkeleton";
import SelectedItemsEmpty from "./selected-items/SelectedItemsEmpty";
import SelectedItemsError from "./selected-items/SelectedItemsError";

interface IProps {
  items: CompareTour[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
}

export default function SelectedItems({items,isLoading,isError,errorMessage,}: IProps) {
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

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4">
        {items.map((item) => (
          <SelectedItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}