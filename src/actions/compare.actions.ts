"use server";

import { getCompareTours } from "@/api/compare.api";
import type { CompareToursResponse } from "@/types/compare.types";

export async function getCompareToursAction(search: string): Promise<CompareToursResponse> {
  return getCompareTours(search);
}