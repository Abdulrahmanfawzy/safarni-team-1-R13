export default function SelectedItemsEmpty() {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 p-10 text-center">
      <p className="font-medium text-gray-700">
        No tours found
      </p>

      <p className="mt-2 text-sm text-gray-500">
        Try searching with a different keyword.
      </p>
    </div>
  );
}