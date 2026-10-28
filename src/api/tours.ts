import { Tour } from "@/types/tours.types";

export interface TourItem {
  id: number;
  title: string;
  slug: string;
  duration: number;
  duration_text: string;
  price: string;
  image: string | null;
  rating: number | null;
  reviews_count: number;
  adventure_style: string;
}

interface TourSearchData {
  items: TourItem[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export async function searchTours(
  q: string,
  perPage = 10,
): Promise<TourSearchData> {
  const url = new URL(`${process.env.API}/tours/search`);
  url.searchParams.set("q", q);
  url.searchParams.set("per_page", String(perPage));

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Tours search failed (${res.status})`);

  const json = await res.json();
  return json.data as TourSearchData;
}

// API item -> the shape TourCard expects
export function toTour(t: TourItem): Tour {
  return {
    id: String(t.id),
    title: t.title,
    image: t.image ?? "",
    rating: t.rating ?? 0,
    reviews: t.reviews_count,
    days: t.duration >= 24 ? Math.round(t.duration / 24) : undefined,
    hours: t.duration < 24 ? t.duration : undefined,
    pickup: false,
    price: Number(t.price),
    // the API has no location yet; the casts keep this compiling whatever the types are
    location: "" as Tour["location"],
    style: t.adventure_style as Tour["style"],
    popularity: t.reviews_count,
  };
}