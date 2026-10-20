import SearchBar from "@/features/search-filter/components/SearchBar";
import SearchFilters from "@/features/search-filter/components/SearchFilters";

export default function SearchPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8">
      <section className="space-y-6">
        <SearchBar />
        <SearchFilters />
      </section>
    </main>
  );
}
