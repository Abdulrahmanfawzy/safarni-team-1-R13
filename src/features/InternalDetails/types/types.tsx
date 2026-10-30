export type ApiResponse<T> = {
  success: boolean;
  message: string;
  errors: string[];
  data: T;
};

export type TourLocation = {
  city: string;
  country: string;
};

export type TourSchedule = {
  id: number;
  date: string;
  end_date: string;
  available_slots: number;
  capacity: number;
};

export type TopActivity = {
  id: number;
  title: string;
  description?: string | null;
  image: string | null;
};

export type TourImage = {
  id: number;
  url: string;
};


export type TourReview = {
  id: number;
  user_name: string;
  user_avatar?: string | null;
  rating: number;
  comment: string;
  created_at: string;
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
  location: TourLocation;
  best_time_to_visit: string | null;
  schedules: TourSchedule[];
  top_activities: TopActivity[];
  gallery_count: number;
  images: TourImage[];
  reviews: TourReview[];
};

export type TourDetailsResponse = ApiResponse<TourDetails>;