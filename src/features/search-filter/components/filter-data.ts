
import {
  Building2,
  Car,
  Tent,
  Waves,
  type LucideIcon,
} from "lucide-react";

import type { Tour } from "./TourCard";

export const fakeTours: Tour[] = [
  {
    id: "1",
    title: "Discover the Beauty of Sharm El Sheikh",
    location: "Sharm El Sheikh, Egypt",
    image: "/images/sharm-el-sheikh.jpg",
    rating: 4.8,
    reviewCount: 245,
    price: 350,
    originalPrice: 450,
    duration: "3 days",
    groupSize: "2–8 people",
    category: "Adventure Travel",
  },
  {
    id: "2",
    title: "Explore Ancient Egyptian History in Luxor",
    location: "Luxor, Egypt",
    image: "/images/luxor.jpg",
    rating: 4.9,
    reviewCount: 380,
    price: 500,
    originalPrice: 650,
    duration: "2 days",
    groupSize: "4–12 people",
    category: "Historical",
  },
  {
    id: "3",
    title: "Relax on the Beautiful Beaches of Dahab",
    location: "Dahab, Egypt",
    image: "/images/dahab.jpg",
    rating: 4.7,
    reviewCount: 190,
    price: 220,
    duration: "1 day",
    groupSize: "2–6 people",
    category: "Water Activity",
  },
  {
    id: "4",
    title: "Explore Cairo's Most Famous Landmarks",
    location: "Cairo, Egypt",
    image: "/images/cairo.jpg",
    rating: 4.6,
    reviewCount: 520,
    price: 180,
    originalPrice: 250,
    duration: "8 hours",
    groupSize: "2–10 people",
    category: "City Breaks",
  },
  {
    id: "5",
    title: "Adventure Through the Siwa Oasis",
    location: "Siwa, Egypt",
    image: "/images/siwa.jpg",
    rating: 4.9,
    reviewCount: 160,
    price: 650,
    originalPrice: 800,
    duration: "4 days",
    groupSize: "4–10 people",
    category: "Adventure Travel",
  },
  {
    id: "6",
    title: "Snorkeling Adventure in Hurghada",
    location: "Hurghada, Egypt",
    image: "/images/hurghada.jpg",
    rating: 4.8,
    reviewCount: 310,
    price: 300,
    duration: "6 hours",
    groupSize: "2–8 people",
    category: "Water Activity",
  },
];

export const sortOptions = [
  "Price (Low to High)",
  "Price (High to Low)",
  "Biggest Deals (Highest Saving)",
  "Most Reviewed",
  "Most Popular",
];

export const adventureStyles: {
  label: string;
  icon: LucideIcon;
}[] = [
  { label: "Adventure Travel", icon: Tent },
  { label: "City Breaks", icon: Building2 },
  { label: "Water Activity", icon: Waves },
  { label: "Road Trips", icon: Car },
];

export const ratings = [1, 2, 3, 4, 5];

export const MIN_PRICE = 0;
export const PRICE_STEP = 50;

export const MAX_PRICE = Math.max(
  PRICE_STEP,
  Math.ceil(
    Math.max(...fakeTours.map((tour) => tour.price)) /
      PRICE_STEP,
  ) * PRICE_STEP,
);

export const PRICE_BUCKET_COUNT = 28;

export const priceBuckets = Array.from(
  { length: PRICE_BUCKET_COUNT },
  (_, index) => {
    const bucketSize =
      (MAX_PRICE - MIN_PRICE) / PRICE_BUCKET_COUNT;

    const bucketMin = MIN_PRICE + index * bucketSize;
    const bucketMax = bucketMin + bucketSize;

    return fakeTours.filter(
      (tour) =>
        tour.price >= bucketMin &&
        (index === PRICE_BUCKET_COUNT - 1
          ? tour.price <= bucketMax
          : tour.price < bucketMax),
    ).length;
  },
);

export const BRAND = "#1E429F";

export type Filters = {
  sort: string | null;
  price: [number, number];
  styles: string[];
  locations: string[];
  ratings: number[];
};

export const INITIAL_FILTERS: Filters = {
  sort: null,
  price: [MIN_PRICE, MAX_PRICE],
  styles: [],
  locations: [],
  ratings: [],
};
