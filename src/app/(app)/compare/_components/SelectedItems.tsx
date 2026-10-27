import { compareItems } from "./compare-data";
import SelectedItemCard from "./SelectedItemCard";

export default function SelectedItems() {
  return (
    <section className="app-container mt-4 sm:mt-6">
      

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-4">
        {compareItems.map((item) => (
          <SelectedItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}