import type {
  ApiResponse,
  TourDetails,
  TourSearchResult,
} from "@/features/search-filter/types/tourDetailsTypes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function getApiUrl(path: string): string {
  const baseUrl = API_BASE_URL?.replace(/\/+$/, "");

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured.");
  }

  return `${baseUrl}/${path.replace(/^\/+/, "")}`;
}

export async function getTourDetails(
  slug: string,
): Promise<TourDetails | null> {
  // Search for the tour using its slug words.
  const searchUrl = new URL(getApiUrl("tours/search"));

  const searchQuery = slug.split("-").slice(0, 2).join(" ");

  searchUrl.searchParams.set("q", searchQuery);
  searchUrl.searchParams.set("per_page", "10");

  console.log("searchUrl.toString()", searchUrl.toString());
  const searchResponse = await fetch(searchUrl.toString(), {
    cache: "no-store",
  });

  if (!searchResponse.ok) {
    throw new Error(`Failed to search tours: ${searchResponse.status}`);
  }

  const searchResult: ApiResponse<TourSearchResult> =
    await searchResponse.json();

  if (!searchResult.success || !searchResult.data) {
    throw new Error("Invalid tour search response.");
  }

  const matchedTour = searchResult.data.items.find(
    (item) => item.slug === slug,
  );

  if (!matchedTour) {
    return null;
  }

  // Fetch details using the matched tour ID.
  const detailsResponse = await fetch(getApiUrl(`tours/${matchedTour.id}`), {
    cache: "no-store",
  });

  if (!detailsResponse.ok) {
    throw new Error(`Failed to fetch tour details: ${detailsResponse.status}`);
  }

  const detailsResult: ApiResponse<TourDetails> = await detailsResponse.json();

  if (!detailsResult.success || !detailsResult.data) {
    throw new Error("Invalid tour details response.");
  }

  // Ensure the API returned the requested tour.
  if (detailsResult.data.slug !== slug) {
    return null;
  }

  return detailsResult.data;
}
