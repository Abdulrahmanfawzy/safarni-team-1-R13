
export type TourSchedule = {
  id: number;
  date: string;
  end_date: string;
  available_slots: number;
  capacity: number;
};

export type TourActivity = {
  id: number;
  title: string;
  image: string | null;
};

export type TourDetails = {
  id: number;
  title: string;
  slug: string;
  duration: number;
  duration_text: string;
  price: string;
  image: string | null;
  rating: number;
  reviews_count: number;
  adventure_style: string;
  location: {
    city: string;
    country: string;
  };
  best_time_to_visit: string;
  schedules: TourSchedule[];
  top_activities: TourActivity[];
  gallery_count: number;
  images: {
    id: number;
    url: string;
  }[];
  reviews: unknown[];
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  errors: unknown;
  data: T | null;
};

export type TourSearchResult = {
  items: Pick<TourDetails, "id" | "slug">[];
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};
