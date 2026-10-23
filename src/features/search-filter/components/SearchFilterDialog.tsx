"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, MapPin } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type SearchFilterDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type Destination = {
  id: number;
  name: string;
  country: string;
  category: string;
};

const fakeDestinations: Destination[] = [
  { id: 1, name: "Paris", country: "France", category: "City" },
  { id: 2, name: "Paris", country: "Ontario", category: "City" },
  {
    id: 3,
    name: "Paris",
    country: "Texas, United States",
    category: "City",
  },
  {
    id: 4,
    name: "Paris",
    country: "Tennessee, United States",
    category: "City",
  },
  { id: 5, name: "Sharm El Sheikh", country: "Egypt", category: "Beach" },
  { id: 6, name: "Hurghada", country: "Egypt", category: "Beach" },
  { id: 7, name: "Luxor", country: "Egypt", category: "Historical" },
  { id: 8, name: "Cairo", country: "Egypt", category: "City" },
  { id: 9, name: "Dahab", country: "Egypt", category: "Adventure" },
  { id: 10, name: "Siwa Oasis", country: "Egypt", category: "Nature" },
];

export default function SearchFilterDialog({
  open,
  onOpenChange,
}: SearchFilterDialogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [destination, setDestination] = useState("");

  useEffect(() => {
    if (open) {
      setDestination(searchParams.get("destination") ?? "");
    }
  }, [open, searchParams]);

  const filteredDestinations = useMemo(() => {
    const query = destination.trim().toLowerCase();

    if (!query) return fakeDestinations;

    return fakeDestinations.filter((item) =>
      `${item.name}, ${item.country} ${item.category}`
        .toLowerCase()
        .includes(query),
    );
  }, [destination]);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigateToSearch(destination);
  }

  function selectDestination(name: string, country: string) {
    navigateToSearch(`${name}, ${country}`);
  }

  function navigateToSearch(query: string) {
    const params = new URLSearchParams(searchParams.toString());
    const value = query.trim();

    if (value) {
      params.set("destination", value);
    } else {
      params.delete("destination");
    }

    onOpenChange(false);

    router.push(`/search${params.size ? `?${params.toString()}` : ""}`);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!left-1/2 !top-1/2 !h-[80vh] !w-[95vw] !max-w-5xl !-translate-x-1/2 !-translate-y-1/2 gap-0 overflow-hidden rounded-none border border-blue-400 bg-white p-0 sm:!max-w-5xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Search destinations</DialogTitle>
          <DialogDescription>
            Search and select a destination.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSearch} className="shrink-0 p-6 pb-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Close search"
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-600 transition-colors hover:bg-gray-200"
            >
              <span aria-hidden="true">‹</span>
            </button>

            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-blue-500"
                aria-hidden="true"
              />

              <Input
                id="destination"
                name="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Search destinations..."
                autoComplete="off"
                className="h-10 rounded-lg border-blue-200 pl-9 focus-visible:border-blue-400 focus-visible:ring-blue-200"
              />
            </div>
          </div>
        </form>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6">
          <div className="space-y-1">
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    selectDestination(item.name, item.country)
                  }
                  className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-blue-50"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-blue-50 text-[#1E429F]">
                    <MapPin className="size-5" aria-hidden="true" />
                  </span>

                  <span className="text-sm text-gray-800">
                    {item.name}, {item.country}
                  </span>
                </button>
              ))
            ) : (
              <p className="py-6 text-center text-sm text-gray-500">
                No destinations found. Try another search.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}