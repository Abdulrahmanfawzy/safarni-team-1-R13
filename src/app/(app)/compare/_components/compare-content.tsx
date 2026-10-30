"use client";

import { useSearchParams } from "next/navigation";

import SearchBar from "@/components/shared/SearchBar";


import { useGetCompareTours } from "@/hooks/compare/useGetCompareTours";
import SelectedItems from "./SelectedItems";
import ComparisonGrid from "./ComparisonGrid";
import { useState } from "react";
import { useCompareTours } from "@/hooks/compare/useCompareTours";

interface IProps {
    initialSearch?: string;
}

export default function CompareContent({
    initialSearch = "",
}: IProps) {
    const searchParams = useSearchParams();

    const search = searchParams.get("search") ?? initialSearch;
    //------------------------------------- Selected Tours IDs----------------------------------------------------------
    const [selectedTourIds, setSelectedTourIds] = useState<number[]>([]);
    //------------------------------------- GET Tours -----------------------------------------------------------------

    const {
        data,
        isLoading,
        isError,
        error,
    } = useGetCompareTours(search);
    // -------------------------------------POST Compare Tours-----------------------------------------------------------
    const compareMutation = useCompareTours();

    const tours = data?.data?.items ?? [];
    //------------------------------------- Select / Unselect Tour-------------------------------------------------------
    const MAX_COMPARE_ITEMS = 3;



    const handleToggleTour = (tourId: number) => {
        compareMutation.reset();

        setSelectedTourIds((prev) => {
            if (prev.includes(tourId)) {
                return prev.filter((id) => id !== tourId);
            }

            if (prev.length >= MAX_COMPARE_ITEMS) {
                return prev;
            }

            return [...prev, tourId];
        });
    };
    //-------------------------------------- Send selected IDs to API-----------------------------------------------------------
    const handleCompare = () => {
        if (selectedTourIds.length < 2) return;

        compareMutation.mutate({
            tour_ids: selectedTourIds,
        });
    };

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
                    selectedIds={selectedTourIds}
                    onToggle={handleToggleTour}
                    onCompare={handleCompare}
                    isComparing={compareMutation.isPending}
                    maxItems={MAX_COMPARE_ITEMS}
                />
            </div>

            <div className="mt-6 sm:mt-8">
                <ComparisonGrid
                    items={compareMutation.data?.data.items ?? []}
                    isLoading={compareMutation.isPending}
                    isError={compareMutation.isError}
                    errorMessage={
                        compareMutation.error instanceof Error
                            ? compareMutation.error.message
                            : undefined
                    } />
            </div>
        </main>
    );
}