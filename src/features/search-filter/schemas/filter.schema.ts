
import { z } from "zod";

const destinationSchema = z.object({
  id: z.number(),
  name: z.string(),
  country: z.string(),
  tagline: z.string().nullable(),
  icon_url: z.string().nullable(),
});

const mediaAssetSchema = z.object({
  id: z.number(),
  file_url: z.string(),
  caption: z.string().nullable(),
  is_cover: z.boolean(),
});

export const filterTourSchema = z.object({
  id: z.number(),
  destination_id: z.number(),
  title: z.string(),
  slug: z.string(),
  adventure_style: z.string(),
  status: z.string(),
  duration_hours: z.number(),
  base_price: z.string(),
  pickup_available: z.boolean(),
  rating: z.number(),
  reviews_count: z.number(),
  is_favorite: z.boolean(),
  destination: destinationSchema,
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
    tours: z.array(filterTourSchema),
  }),
});

export type FilterTour = z.infer<typeof filterTourSchema>;
export type FilterResponse = z.infer<typeof filterResponseSchema>;
