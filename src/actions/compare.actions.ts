"use server";

import { compareTours, getCompareTours } from "@/api/compare.api";
import type { CompareRequest, CompareResponse, CompareToursResponse } from "@/types/compare.types";
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