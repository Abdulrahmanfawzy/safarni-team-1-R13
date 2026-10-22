

import { z } from 'zod'

export const personalInfoSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),

  email: z
    .string()
    .trim()
    .email('Enter a valid email address'),

  location: z.string().trim().min(2, 'Enter a location'),

  phone: z
    .string()
    .trim()
    
    .min(8, 'Phone number is too short')
    .max(20, 'Phone number is too long')
    .regex(/^01[0125][0-9]{8}$/,  'you must enter the egyptian number'   )
    
    ,
})

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>


