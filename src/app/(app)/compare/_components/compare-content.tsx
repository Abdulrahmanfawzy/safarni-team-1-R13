"use client";

import { useSearchParams } from "next/navigation";

import SearchBar from "@/components/shared/SearchBar";


import { useGetCompareTours } from "@/hooks/compare/useGetCompareTours";
import SelectedItems from "./SelectedItems";
import ComparisonGrid from "./ComparisonGrid";

interface IProps {
  initialSearch?: string;
}

export default function CompareContent({
  initialSearch = "",
}: IProps) {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? initialSearch;

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetCompareTours(search);

  const tours = data?.data?.items ?? [];

  return (
    <main className="w-full py-3 sm:py-5">
      <SearchBar
        pathname=""
        initialSearch={initialSearch}
      />

      <div className="mt-4 sm:mt-6">
        <SelectedItems
          items={tours}
          isLoading={isLoading}
          isError={isError}
          errorMessage={error instanceof Error ? error.message : undefined}
        />
      </div>

      <div className="mt-6 sm:mt-8">
        <ComparisonGrid />
      </div>
    </main>
  );
}