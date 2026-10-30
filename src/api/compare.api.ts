import "server-only";


import type { CompareToursResponse } from "@/types/compare.types";
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

  const normalizedBaseUrl = baseUrl.replace(/\/+$/, "");
  const apiBaseUrl = /\/api$/i.test(normalizedBaseUrl)
    ? normalizedBaseUrl
    : `${normalizedBaseUrl}/api`;
  const response = await fetch(
    `${apiBaseUrl}/v1/compare/tours?${params.toString()}`,
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
