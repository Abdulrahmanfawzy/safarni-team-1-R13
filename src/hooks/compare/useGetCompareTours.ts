"use client";

import { getCompareToursAction } from "@/actions/compare.actions";
import { useQuery } from "@tanstack/react-query";


export function useGetCompareTours(search: string) {
  return useQuery({
    queryKey: ["compare-tours", search],

    queryFn: () => getCompareToursAction(search),

    enabled: true,
  });
}