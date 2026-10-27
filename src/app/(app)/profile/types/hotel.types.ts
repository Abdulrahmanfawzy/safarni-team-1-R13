



export interface Hotel {
  id: number
  name: string
  slug: string
  city: string
  address: string
  stars_count: number
  discount_rate: number
  is_favorite: boolean
  distance_km: any
  cover_photo: string
}

export interface Room {
  id: number
  room_name: string
  price_per_night: number
  discount_rate: number
  final_price: number
  beds_count: number
  bathrooms_count: number
  max_guests: number
  area_sqft: number
  is_refundable: boolean
  is_favorite: boolean
  thumbnail_url: string
}

