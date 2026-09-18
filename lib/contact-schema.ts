import { z } from 'zod'

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name is required' })
    .max(100, { message: 'Name must be 100 characters or less' }),
  email: z
    .string()
    .trim()
    .min(1, { message: 'Email address is required' })
    .email({ message: 'Please enter a valid email address (e.g. name@domain.com)' })
    .max(254, { message: 'Email address must be 254 characters or less' }),
  message: z
    .string()
    .trim()
    .min(10, { message: 'Message must be at least 10 characters long' })
    .max(2000, { message: 'Message must not exceed 2,000 characters' }),
  // Honeypot field for spam bots (must remain empty for legitimate human submissions)
  website: z.string().optional().default(''),
})

export type ContactFormData = z.infer<typeof contactSchema>
