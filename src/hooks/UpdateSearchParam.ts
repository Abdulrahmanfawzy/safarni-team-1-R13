"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type SearchParamUpdates = Record<string, string | null | undefined>;

export function useUpdateSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSearchParams = useCallback(
    (updates: SearchParamUpdates) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      // Reset to page 1 whenever a filter (not page/per_page itself) changes
      const isFilterChange = Object.keys(updates).some(
        (k) => k !== "page" && k !== "per_page"
      );
      if (isFilterChange) {
        params.delete("page");
      }

      const query = params.toString();
      const url = query ? `${pathname}?${query}` : pathname;

      router.replace(url, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return { updateSearchParams, searchParams };
}
