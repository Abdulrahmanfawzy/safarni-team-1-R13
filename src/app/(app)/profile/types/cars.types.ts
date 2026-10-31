


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

export type CarListItem = {
  id: number;
  model: string;
  body_type: string;
  transmission: string;
  seats_count: number;
  fuel_type: string;
  hourly_rent: number;
  daily_rent: number;
  image: string | null;
  images: string[];
  brand: {
    id: number;
    name: string;
    logo_url: string;
  };
};

export type CarBrand = {
  id: number;
  name: string;
  logo_url: string;
  cars_count: number;
};

export type CarsListResponse = {
  cars: CarListItem[];
  brands: CarBrand[];
};

export type CarsApiResponse = {
  success?: boolean;
  message?: string;
  errors?: string[];
  data?: CarListItem[] | { cars?: CarListItem[]; brands?: CarBrand[] };
  cars?: CarListItem[];
  brands?: CarBrand[];
};
