export default function InternalToursLoading() {
  return (
    <section className="w-full" aria-busy="true" aria-label="Loading tours">
      <span className="sr-only" role="status">
        Loading tours...
      </span>

      <div
        aria-hidden="true"
        className="h-14 w-full animate-pulse rounded-xl bg-gray-200"
      />

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-3xl bg-white p-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
            aria-hidden="true"
          >
            <div className="h-50 w-full rounded-2xl bg-gray-200" />
            <div className="px-2 pb-3 pt-3">
              <div className="flex items-center justify-between">
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="h-4 w-10 rounded bg-gray-200" />
              </div>
              <div className="mt-3 h-5 w-3/4 rounded bg-gray-200" />
              <div className="mt-3 h-4 w-1/2 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
