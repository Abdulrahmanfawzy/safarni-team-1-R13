import { compareItems } from "./compare-data";
import SelectedItemCard from "./SelectedItemCard";

export default function SelectedItems() {
  return (
    <section className="app-container mt-6">
      

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {compareItems.map((item) => (
          <SelectedItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}