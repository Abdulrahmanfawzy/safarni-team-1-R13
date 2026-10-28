export interface HotelDummy {
  id: string;
  name: string;
  image: string;
  rating: number;
  discount: number;
  location: string;
}
export interface Hotel {
  id: number;
  name: string;
  slug: string;
  city: string;
  address: string;
  stars_count: number;
  discount_rate: number;
  is_favorite: boolean;
  distance_km: number | null;
  cover_photo: string;
}

export interface HotelsResponse {
  code: number;
  message: string;
  data: {
    data: Hotel[];
    links: {
      first: string | null;
      last: string | null;
      prev: string | null;
      next: string | null;
    };
    meta: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
    };
  };
}