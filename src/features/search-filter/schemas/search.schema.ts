
import { z } from "zod";

const searchTourSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  duration: z.number(),
  duration_text: z.string(),
  price: z.string(),
  image: z.string().url(),
  rating: z.number(),
  reviews_count: z.number(),
  adventure_style: z.string(),
});

const searchPaginationSchema = z.object({
  current_page: z.number(),
  last_page: z.number(),
  per_page: z.number(),
  total: z.number(),
});

export const searchResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  errors: z.array(z.unknown()),
  data: z.object({
    items: z.array(searchTourSchema),
    pagination: searchPaginationSchema,
  }).nullable(),
});

export type SearchTour = z.infer<typeof searchTourSchema>;

export type SearchPagination = z.infer<
  typeof searchPaginationSchema
>;

export type SearchResponse = z.infer<
  typeof searchResponseSchema
>;
