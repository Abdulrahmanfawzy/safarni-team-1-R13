"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type SearchBarProps = {
  /** Called on every keystroke, so results filter as the user types. */
  onSearch?: (query: string) => void;
  /** Defaults to router.back(). */
  onBack?: () => void;
};

export default function SearchBar({ onSearch, onBack }: SearchBarProps) {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // stop the page reload; filtering already happens live
    const query = new FormData(e.currentTarget).get("q")?.toString() ?? "";
    onSearch?.(query);
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex w-full items-center gap-3"
    >
      <Button
        type="button"
        variant="secondary"
        size="icon"
        onClick={onBack ?? (() => router.back())}
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
          onChange={(e) => onSearch?.(e.target.value)}
          className="h-10 rounded-full border-blue-200 pl-10 focus-visible:border-blue-400 focus-visible:ring-blue-200"
        />
      </div>
    </form>
  );
}
