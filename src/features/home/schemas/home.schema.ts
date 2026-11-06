
import { z } from "zod";

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  icon_url: z.string(),
});

export const recommendationSchema = z.object({
  id: z.number(),
  name: z.string(),
  country: z.string(),
  tagline: z.string(),
  rating: z.number(),
  reviews_count: z.number(),
  cover_photo: z.string().nullable(),
});

export const availableTourSchema = z.object({
  id: z.number(),
  title: z.string(),
  full_title: z.string(),
  slug: z.string(),
  tour_type: z.string(),
  duration_hours: z.number(),
  price: z.number(),
  price_formatted: z.string(),
  rating: z.number(),
  reviews_count: z.number(),
  cover_photo: z.string().nullable(),
  is_favorite: z.boolean(),
});

export const homeFeedResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  errors: z.array(z.string()),
  data: z.object({
    header_image: z.string(),
    categories: z.array(categorySchema),
    recommendations: z.array(recommendationSchema),
    available_tours: z.array(availableTourSchema),
  }),
});

export type Category = z.infer<typeof categorySchema>;
export type Recommendation = z.infer<typeof recommendationSchema>;
export type AvailableTour = z.infer<typeof availableTourSchema>;
export type HomeFeedResponse = z.infer<typeof homeFeedResponseSchema>;


      // "id": 16,
      //                 "name": "Paris",
      //                 "country": "France",
      //                 "tagline": "City Breaks",
      //                 "rating": 5,
      //                 "reviews_count": 1,
      //                 "cover_photo": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34"
      
      //  "success": true,
      //     "message": "Home feed retrieved successfully.",
      //     "errors": [],