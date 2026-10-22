import SearchBar from "@/features/search-filter/components/SearchBar";

export default function SearchPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8">
      <section className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Explore Destinations
          </h1>

          <p className="mt-2 text-muted-foreground">
            Find your next destination.
          </p>
        </div>

        <SearchBar />
      </section>
    </main>
  );
}