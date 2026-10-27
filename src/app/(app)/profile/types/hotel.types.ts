


export interface Data {
  hotel: Hotel
  rooms: Room[]
  links: Links
  meta: Meta
}

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

export interface Links {
  first: string
  last: string
  prev: any
  next: any
}

export interface Meta {
  current_page: number
  from: number
  last_page: number
  links: Link[]
  path: string
  per_page: number
  to: number
  total: number
}

export interface Link {
  url?: string
  label: string
  page?: number
  active: boolean
}
