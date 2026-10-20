import React from "react";
import { ChevronLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function SearchBar() {
  return (
 <form  className="flex w-full items-center gap-3">
      <Button
        type="button"
        variant="secondary"
        size="icon"
        
        aria-label="Go back"
        className="size-10 shrink-0 rounded-full"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </Button>

      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-blue-500"
          aria-hidden="true"
        />
        <Input
          type="search"
          name="q"
          placeholder="Search destinations..."
          aria-label="Search destinations"
          className="h-10 rounded-full border-blue-200 pl-10 focus-visible:border-blue-400 focus-visible:ring-blue-200"
        />
      </div>
    </form>
  );
}
