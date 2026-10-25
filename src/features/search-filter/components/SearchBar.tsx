"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type SearchBarProps = {
  showBackButton?: boolean;
};

export default function SearchBar({ showBackButton = true }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlValue = searchParams.get("destination") ?? "";
  const [value, setValue] = useState(urlValue);
  const lastPushed = useRef(urlValue);

  // لو الـ URL اتغير من بره (مثلًا من الـ Dialog)، حدّث الحقل
  useEffect(() => {
    if (urlValue !== lastPushed.current) {
      lastPushed.current = urlValue;
      setValue(urlValue);
    }
  }, [urlValue]);

  // حدّث الـ URL بعد ما المستخدم يوقف كتابة 300ms
  useEffect(() => {
    const trimmed = value.trim();
    if (trimmed === lastPushed.current) return;

    const t = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (trimmed) params.set("destination", trimmed);
      else params.delete("destination");

      lastPushed.current = trimmed;
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    }, 300);

    return () => clearTimeout(t);
  }, [value, pathname, router, searchParams]);

  function handleBack() {
    if (window.history.length > 1) router.back();
    else router.push("/");
  }

  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className="flex w-full items-center gap-3"
    >
      {showBackButton && (
        <Button
          type="button"
          variant="secondary"
          size="icon"
          onClick={handleBack}
          aria-label="Go back"
          className="size-10 shrink-0 rounded-full"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </Button>
      )}

      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-blue-500"
          aria-hidden="true"
        />
        <Input
          type="search"
          name="q"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search destinations..."
          aria-label="Search destinations"
          className="h-10 rounded-full border-blue-200 pl-10 focus-visible:border-blue-400 focus-visible:ring-blue-200"
        />
      </div>
    </form>
  );
}