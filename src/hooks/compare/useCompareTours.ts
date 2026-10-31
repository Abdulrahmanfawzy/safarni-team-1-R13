"use client";

import { useMutation } from "@tanstack/react-query";



import type { CompareRequest } from "@/types/compare.types";
import { compareToursAction } from "@/actions/compare.actions";

export function useCompareTours() {
  return useMutation({
    mutationFn: (body: CompareRequest) =>
      compareToursAction(body),
  });
}