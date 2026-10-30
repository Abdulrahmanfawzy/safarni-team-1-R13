
"use client";

import { useMutation } from "@tanstack/react-query";


import type { TourCheckoutRequest } from "@/types/compare.types";
import { checkoutTourAction } from "@/actions/compare.actions";

export function useTourCheckout() {
  return useMutation({
    mutationFn: ({
      tourId,
      body,
    }: {
      tourId: number;
      body: TourCheckoutRequest;
    }) => checkoutTourAction(tourId, body),
  });
}
