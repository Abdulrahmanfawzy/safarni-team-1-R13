import SearchBar from "@/features/search-filter/components/SearchBar";

export default function SearchPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8">
      <section className="space-y-6">
        <SearchBar />
      </section>
    </main>
  );
}
