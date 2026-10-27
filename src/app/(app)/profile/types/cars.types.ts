


export interface Data {
  car: ICar
}

export interface ICar {
  id: number
  model: string
  body_type: string
  transmission: string
  seats_count: number
  fuel_type: string
  power_hp: number
  max_speed_kmh: number
  hourly_rate: number
  daily_rate: number
  pickup_address: string
  is_favorite: boolean
  images: string[]
  brand: Brand
  pricing_tiers: PricingTier[]
}

export interface Brand {
  id: number
  name: string
  logo_url: string
}

export interface PricingTier {
  id: number
  tier_name: string
  min_hours: number
  max_hours: number
  hourly_price: number
}

