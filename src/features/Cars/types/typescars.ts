import { StaticImageData } from "next/image";

interface TypeBranding {
  id: number;
  name: string;
  image: StaticImageData;
  quntatiy: string;
}
export type { TypeBranding }
interface CarPopularTypes {
  id: number;
  name: string;
  image: StaticImageData;
  type: string;
  seats: string;
  Turn: string;
}
export type { CarPopularTypes }
export type Spec = { label: string; value: string | null };
export type Plan = {
  id: string | number;
  title: string;
  description: string;
  price: number;
  icon: React.ElementType;
};
export type carDetails = {
  acceleration: null,
  body_type: string,
  brand: {
    id: number, name: string, logo_url: string
  },
  daily_rent: number,
  fuel_type: string,
  hourly_rent: number,
  id: number,
  images: string[],
  is_favorite: boolean,
  latitude: number,
  longitude: number,
  location: { latitude: number, longitude: number },
  max_speed_kmh: string,
  model: string,
  pickup_address: string,
  power_hp: string,
  rating: number,
  reviews_count: number,
  seats_count: number
  speed: string,
  transmission: string
}
