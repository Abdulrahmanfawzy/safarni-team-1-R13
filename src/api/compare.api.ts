import "server-only";


import type { CompareRequest, CompareResponse, CompareToursResponse, TourCheckoutRequest, TourCheckoutResponse } from "@/types/compare.types";
import { getAccessToken } from "@/lib/auth";

export async function getCompareTours(
  search: string
): Promise<CompareToursResponse> {
  const baseUrl = process.env.API;

  if (!baseUrl) {
    throw new Error("API environment variable is missing");
  }

  const accessToken = await getAccessToken();

  const params = new URLSearchParams({ per_page: "6" });
  const query = search.trim();
  if (query) {
    params.set("search", query);
  }

  
  const response = await fetch(
    `${baseUrl}api/v1/compare/tours?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const body = await response.text();
    let message = `Failed to fetch compare tours (${response.status})`;

    if (body) {
      try {
        const errorResponse: unknown = JSON.parse(body);
        if (
          typeof errorResponse === "object" &&
          errorResponse !== null &&
          "message" in errorResponse &&
          typeof errorResponse.message === "string"
        ) {
          message = errorResponse.message;
        }
      } catch {
        message = `Failed to fetch compare tours (${response.status})`;
      }
    }

    throw new Error(message);
  }

  const result = (await response.json()) as CompareToursResponse;
  if (!result.success || !Array.isArray(result.data?.items)) {
    throw new Error(result.message || "Invalid compare tours response.");
  }

  return result;
}
// Compare Tours--------------------------------------------------------------------------
export async function compareTours(
  body: CompareRequest
): Promise<CompareResponse> {
  const baseUrl = process.env.API;

  if (!baseUrl) {
    throw new Error("API environment variable is missing");
  }

  const accessToken = await getAccessToken();

  const response = await fetch(
    `${baseUrl}api/v1/compare/tours`,
    {
      method: "POST",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },

      body: JSON.stringify(body),

      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to compare tours");
  }

  return response.json();
}
// pay----------------------------------------------------------------


export async function checkoutTour(
  tourId: number,
  body: TourCheckoutRequest
): Promise<TourCheckoutResponse> {
  const baseUrl = process.env.API;

  if (!baseUrl) {
    throw new Error("API environment variable is missing");
  }

  const accessToken = await getAccessToken();

  const response = await fetch(
    `${baseUrl}api/v1/tour-checkout/tours/${tourId}/checkout`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to start tour checkout"
    );
  }

  return result as TourCheckoutResponse;
}
