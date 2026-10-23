
import type { StaticImageData } from "next/image";

export type Tour = {
  id: string;
  title: string;
  location: string;
  image: StaticImageData;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  duration: string;
  groupSize: string;
  category: string;
};

export type Filters = {
  sort: string | null;
  price: [number, number];
  styles: string[];
  locations: string[];
  ratings: number[];
};

export const fakeTours: Tour[] = [
  {
    id: "1",
    title: "Discover Sharm El Sheikh",
    location: "Sharm El Sheikh",
    image: "/images/sharm.jpg" as unknown as StaticImageData,
    rating: 4.9,
    reviewCount: 245,
    price: 450,
    originalPrice: 600,
    duration: "3 days",
    groupSize: "2-8 people",
    category: "Beach",
  },
  {
    id: "2",
    title: "Explore Ancient Luxor",
    location: "Luxor",
    image: "/images/luxor.jpg" as unknown as StaticImageData,
    rating: 4.8,
    reviewCount: 189,
    price: 350,
    originalPrice: 450,
    duration: "2 days",
    groupSize: "2-10 people",
    category: "History",
  },
  {
    id: "3",
    title: "Relax in Dahab",
    location: "Dahab",
    image: "/images/dahab.jpg" as unknown as StaticImageData,
    rating: 4.7,
    reviewCount: 156,
    price: 300,
    originalPrice: 400,
    duration: "2 days",
    groupSize: "2-6 people",
    category: "Adventure",
  },
  {
    id: "4",
    title: "Cairo City Experience",
    location: "Cairo",
    image: "/images/cairo.jpg" as unknown as StaticImageData,
    rating: 4.6,
    reviewCount: 320,
    price: 180,
    duration: "1 day",
    groupSize: "2-12 people",
    category: "City",
  },
  {
    id: "5",
    title: "Siwa Oasis Adventure",
    location: "Siwa",
    image: "/images/siwa.jpg" as unknown as StaticImageData,
    rating: 4.9,
    reviewCount: 98,
    price: 650,
    originalPrice: 800,
    duration: "4 days",
    groupSize: "2-8 people",
    category: "Adventure",
  },
  {
    id: "6",
    title: "Hurghada Sea Trip",
    location: "Hurghada",
    image: "/images/hurghada.jpg" as unknown as StaticImageData,
    rating: 4.5,
    reviewCount: 210,
    price: 250,
    originalPrice: 350,
    duration: "1 day",
    groupSize: "2-10 people",
    category: "Beach",
  },
];

export const MIN_PRICE = 0;

export const MAX_PRICE = Math.max(
  ...fakeTours.map((tour) => tour.price),
);

export const PRICE_STEP = 50;

export const priceBuckets = Array.from(
  { length: Math.ceil((MAX_PRICE - MIN_PRICE) / PRICE_STEP) },
  (_, index) => {
    const start = MIN_PRICE + index * PRICE_STEP;
    const end = start + PRICE_STEP;

    return {
      min: start,
      max: end,
      count: fakeTours.filter(
        (tour) => tour.price >= start && tour.price < end,
      ).length,
    };
  },
);

export const INITIAL_FILTERS: Filters = {
  sort: null,
  price: [MIN_PRICE, MAX_PRICE],
  styles: [],
  locations: [],
  ratings: [],
};

