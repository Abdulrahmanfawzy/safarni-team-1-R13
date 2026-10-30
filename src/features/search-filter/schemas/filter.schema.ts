
import { z } from "zod";

const destinationSchema = z.object({
  id: z.number(),
  name: z.string(),
  country: z.string(),
  tagline: z.string(),
  icon_url: z.string().nullable(),
  latitude: z.string(),
  longitude: z.string(),
  best_time_to_visit: z.string(),
  price_per_night: z.string(),
  rating: z.number(),
  reviews_count: z.number(),
});

const reviewSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  booking_id: z.number(),
  service_type: z.string(),
  service_item_id: z.number(),
  rating: z.number(),
  comment: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

const mediaAssetSchema = z.object({
  id: z.number(),
  entity_type: z.string(),
  entity_id: z.number(),
  file_url: z.string(),
  caption: z.string().nullable(),
  is_cover: z.boolean(),
});

export const filteredTourSchema = z.object({
  id: z.number(),
  destination_id: z.number(),
  title: z.string(),
  slug: z.string(),
  adventure_style: z.string(),
  status: z.string(),
  duration_hours: z.number(),
  best_time_to_visit: z.string().nullable(),
  base_price: z.string(),
  pickup_available: z.boolean(),
  guide_type: z.string(),
  transportation: z.string(),
  cancellation_policy: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  reviews_avg_rating: z.string(),
  is_favorite: z.boolean(),
  rating: z.number(),
  reviews_count: z.number(),
  destination: destinationSchema,
  reviews: z.array(reviewSchema),
  media_assets: z.array(mediaAssetSchema),
});

export const filterResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  errors: z.array(z.unknown()),
  data: z.object({
    total_results: z.number(),
    current_page: z.number(),
    last_page: z.number(),
    tours: z.array(filteredTourSchema),
  }),
});

export type FilterResponse = z.infer<typeof filterResponseSchema>;
export type FilteredTour = z.infer<typeof filteredTourSchema>;
