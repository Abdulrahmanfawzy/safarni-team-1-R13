

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

export interface HotelDetails {
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
  description: string;
  amenities: string[];
  location: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
  };
  media_gallery: string[];
  review_aggregates: {
    average_rating: number;
    total_reviews: number;
  };
}

export interface HotelDetailsResponse {
  code: number;
  message: string;
  data: HotelDetails;
}
