import { StaticImageData } from "next/image";

export type AdventureStyle =
  | "Adventure Travel"
  | "City Breaks"
  | "Water Activity"
  | "Road Trips";

export type SortKey =
  | "price-asc"
  | "price-desc"
  | "deals"
  | "reviews"
  | "popular";

export const ADVENTURE_STYLES: AdventureStyle[] = [
  "Adventure Travel",
  "City Breaks",
  "Water Activity",
  "Road Trips",
];


export interface Tour {
  id: string;
  title: string;
  image: StaticImageData| string;
  location: string;
  style: AdventureStyle;
  rating: number;
  reviews: number;
  days?: number;
  hours?: number;
  price: number;
  oldPrice?: number;
  pickup: boolean;
  popularity: number;
}