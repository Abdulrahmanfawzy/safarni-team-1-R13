export function ComparePageSkeleton() {
  return (
    <main className="w-full py-3 sm:py-5">
      <div className="h-14 w-full animate-pulse rounded-lg bg-gray-100" />
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-64 animate-pulse rounded-xl bg-gray-100"
          />
        ))}
      </div>
    </main>
  );
}