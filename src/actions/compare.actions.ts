"use server";

import { checkoutTour, compareTours, getCompareTours } from "@/api/compare.api";
import type { CompareRequest, CompareResponse, CompareToursResponse, TourCheckoutRequest, TourCheckoutResponse } from "@/types/compare.types";
// Get
export async function getCompareToursAction(search: string): Promise<CompareToursResponse> {
  return getCompareTours(search);
}

// POST
export async function compareToursAction(
  body: CompareRequest
): Promise<CompareResponse> {
  return compareTours(body);
}

// pay----------------
export async function checkoutTourAction(
  tourId: number,
  body: TourCheckoutRequest
): Promise<TourCheckoutResponse> {
  return checkoutTour(tourId, body);
}