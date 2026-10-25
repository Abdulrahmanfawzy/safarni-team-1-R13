
import { compareItems } from "./compare-data";
import ComparisonCard from "./ComparisonCard";

export default function ComparisonGrid() {
  return (
    <section className="app-container flex flex-col gap-4">
      <h2 className=" text-xl font-medium text-gray-900">
        Compare
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {compareItems.map((item) => (
          <ComparisonCard key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-5 flex justify-center">
        <button
          type="button"
          className="w-full max-w-xs rounded bg-[#24489B] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#1d397c]"
        >
          Check Out
        </button>
      </div>
    </section>
  );
}