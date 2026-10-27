import {z} from "zod";
export const tourSchema = z.object(
    {
        id:z.number(),
         title: z.string(),
  slug: z.string(),
  duration: z.number(),
  duration_text: z.string(),
  price: z.string(),
  image: z.string().nullable(),
  rating: z.number().nullable(),
  reviews_count: z.number(),
  adventure_style: z.string(),
    }
);

export const toursResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  errors: z.array(z.string()),
  data: z.object({
    items: z.array(tourSchema),
  }),
});

