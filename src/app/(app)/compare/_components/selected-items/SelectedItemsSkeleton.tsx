export default function SelectedItemsSkeleton() {
  return (
    <section className="space-y-4">
      <div className="h-6 w-36 animate-pulse rounded bg-gray-200" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl border border-gray-200"
          >
            <div className="h-48 w-full animate-pulse bg-gray-200" />

            <div className="space-y-3 p-4">
              <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200" />

              <div className="flex items-center justify-between pt-2">
                <div className="h-5 w-16 animate-pulse rounded bg-gray-200" />
                <div className="h-9 w-24 animate-pulse rounded-md bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}