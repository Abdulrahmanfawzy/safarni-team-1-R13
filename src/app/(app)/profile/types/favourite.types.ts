



export interface FavoriteHotel {
  id: number;
  destination_id: number;
  name: string;
  slug: string;
  address: string;
  image:string;
  latitude: string;
  longitude: string;
  stars_count: number;
  discount_rate: string;
  created_at: string;
  updated_at: string;
  is_favorite: boolean;
}

export interface FavoriteTour {
  id: number;
  destination_id: number;
  title: string;
  slug: string;
  adventure_style: string;
  status: string;
   image:string;
  duration_hours: number;
  best_time_to_visit: string | null;
  base_price: string;
  pickup_available: boolean;
  guide_type: string;
  transportation: string;
  cancellation_policy: string;
  created_at: string;
  updated_at: string;
  is_favorite: boolean;
  rating: number;
  reviews_count: number;
}

export interface FavoriteCar {
  id: number;
  brand_id: number;
  destination_id: number;
  model: string;
   image:string;
  body_type: string;
  transmission: string;
  seats_count: number;
  fuel_type: string;
  hourly_rate: string;
  daily_rate: string;
  pickup_address: string;
  latitude: number;
  longitude: number;
  power_hp: number;
  rpm: string;
  max_speed_kmh: number;
  acceleration: string;
  created_at: string;
  updated_at: string;
  is_favorite: boolean;
  rating: number;
  reviews_count: number;
}

export interface FavoriteFlight {
  id: number;
  flight_number: string;
  airline_id: number;
   image:string;
  origin_airport_id: number;
  dest_airport_id: number;
  departure_at: string;
  arrival_at: string;
  terminal: string;
  gate: string;
  stops_count: number;
  created_at: string;
  updated_at: string;
  is_favorite: boolean;
}

export interface FavoritesData {
  hotels: FavoriteHotel[];
  tours: FavoriteTour[];
  rooms: unknown[]; 
   image:string;
  cars: FavoriteCar[];
  flights: FavoriteFlight[];
}

export interface FavoritesResponse {
  success: boolean;
  message: string | null;
  errors: unknown[] | Record<string, unknown>;
  data: FavoritesData;
}