


export interface FavoritesData {
  hotels: FavoriteHotel[];
  tours: FavoriteTour[];
  rooms: FavoriteRoom[];
  cars: FavoriteCar[];
  flights: unknown[];
}


export interface FavoriteHotel {
  id: number
  destination_id: number
  name: string
  slug: string
  address: string
  latitude: string
  longitude: string
  stars_count: number
  discount_rate: string
  created_at: string
  updated_at: string
  is_favorite: boolean
}


export interface FavoriteTour {
  id: number
  destination_id: number
  title: string
  slug: string
  adventure_style: string
  status: string
  duration_hours: number
  best_time_to_visit: string | null
  base_price: string
  pickup_available: boolean
  guide_type: string | null
  transportation: any
  cancellation_policy: string | null
  created_at: string
  updated_at: string
  is_favorite: boolean
}


export interface FavoriteRoom {
  id: number
  hotel_id: number
  room_name: string
  beds_count: number
  bathrooms_count: number
  area_sqft: number
  max_guests: number
  price_per_night: string
  is_refundable: boolean
  created_at: string
  updated_at: string
  is_favorite: boolean
}

export interface FavoriteCar {
  id: number
  brand_id: number
  destination_id: number
  model: string
  body_type: string
  transmission: string
  seats_count: number
  fuel_type: string
  hourly_rate: string
  daily_rate: string
  pickup_address: string
  power_hp: number
  max_speed_kmh: number
  created_at: string
  updated_at: string
  is_favorite: boolean
}