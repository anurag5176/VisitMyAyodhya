import { z } from 'zod'

/** Trimmed non-empty string, min/max length */
const trimmedString = (min: number, max: number, fieldName: string) =>
  z
    .string()
    .transform((s) => s.trim())
    .pipe(
      z
        .string()
        .min(1, `${fieldName} is required`)
        .min(min, `${fieldName} must be at least ${min} characters`)
        .max(max, `${fieldName} must be at most ${max} characters`)
    )

/** Email: valid format, reasonable length */
export const emailSchema = z
  .string()
  .transform((s) => s.trim().toLowerCase())
  .pipe(
    z
      .string()
      .min(1, 'Email is required')
      .max(254, 'Email is too long')
      .email('Please enter a valid email address')
  )

/** Indian phone: 10 digits, optional +91 / 0 prefix; allow international */
const phoneRegex = /^[\d\s\-+()]{10,15}$/
const digitsOnly = (s: string) => s.replace(/\D/g, '')
export const phoneSchema = z
  .string()
  .transform((s) => s.trim())
  .pipe(
    z
      .string()
      .min(1, 'Phone number is required')
      .refine((s) => phoneRegex.test(s), 'Please enter a valid phone number (10–15 digits)')
      .refine((s) => digitsOnly(s).length >= 10, 'Phone number must have at least 10 digits')
      .refine((s) => digitsOnly(s).length <= 15, 'Phone number is too long')
  )

/** Full name: 2–100 chars, letters/spaces/hyphens/apostrophes */
export const fullNameSchema = trimmedString(2, 100, 'Full name').refine(
  (s) => /^[\p{L}\s\-'.]+$/u.test(s),
  'Name can only contain letters, spaces, hyphens and apostrophes'
)

/** Short name (e.g. contact form): 2–80 chars */
export const nameSchema = trimmedString(2, 80, 'Name').refine(
  (s) => /^[\p{L}\s\-'.]+$/u.test(s),
  'Name can only contain letters, spaces, hyphens and apostrophes'
)

/** Subject: one of allowed values */
export const contactSubjectSchema = z.enum(['booking', 'feedback', 'support', 'other'], {
  errorMap: () => ({ message: 'Please select a subject' }),
})

/** Message: 10–2000 chars */
export const messageSchema = z
  .string()
  .transform((s) => s.trim())
  .pipe(
    z
      .string()
      .min(10, 'Message must be at least 10 characters')
      .max(2000, 'Message must be at most 2000 characters')
  )

/** Optional long text (e.g. special requests): max 2000 */
export const optionalLongTextSchema = z
  .string()
  .transform((s) => (s ?? '').trim())
  .pipe(z.string().max(2000, 'Must be at most 2000 characters'))
  .default('')

/** Visit date: valid date, not in the past */
export const visitDateSchema = z
  .string()
  .min(1, 'Visit date is required')
  .refine((s) => !Number.isNaN(Date.parse(s)), 'Please enter a valid date')
  .refine((s) => new Date(s) >= new Date(new Date().setHours(0, 0, 0, 0)), 'Visit date cannot be in the past')

/** Number of guests: 1–50 */
export const numberOfGuestsSchema = z
  .string()
  .min(1, 'Number of guests is required')
  .refine((s) => /^\d+$/.test(s), 'Must be a number')
  .refine((s) => {
    const n = parseInt(s, 10)
    return n >= 1 && n <= 50
  }, 'Number of guests must be between 1 and 50')

/** Number of people (quick planner): 1–50 */
export const numberOfPeopleSchema = z
  .string()
  .min(1, 'Number of people is required')
  .refine((s) => /^\d+$/.test(s), 'Must be a number')
  .refine((s) => {
    const n = parseInt(s, 10)
    return n >= 1 && n <= 50
  }, 'Must be between 1 and 50')

/** Interest area: one of allowed */
export const interestAreaSchema = z.enum(['all', 'temples', 'cultural', 'heritage'], {
  errorMap: () => ({ message: 'Please select an interest area' }),
})

// --- Form schemas ---

export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: contactSubjectSchema,
  message: messageSchema,
})

export const bookingFormSchema = z.object({
  fullName: fullNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  numberOfGuests: numberOfGuestsSchema,
  visitDate: visitDateSchema,
  specialRequests: optionalLongTextSchema.default(''),
  dietaryPreferences: z.string().max(50).optional().default(''),
})

export const expertHelpFormSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
  query: z.string().max(50).optional().default(''),
  message: messageSchema,
})

export const quickPlannerPopupSchema = z.object({
  name: nameSchema,
  phone: phoneSchema,
})

/** Date for planning (can be any valid date) */
const planDateSchema = z
  .string()
  .min(1, 'Date is required')
  .refine((s) => !Number.isNaN(Date.parse(s)), 'Please enter a valid date')

export const quickPlannerFormSchema = z.object({
  visitDate: planDateSchema,
  numberOfPeople: numberOfPeopleSchema,
  interestArea: interestAreaSchema,
})

/** Return type: field errors keyed by field name, or null if valid */
export type FieldErrors = Record<string, string>

export function validateContactForm(data: unknown): FieldErrors | null {
  const result = contactFormSchema.safeParse(data)
  if (result.success) return null
  const errors: FieldErrors = {}
  result.error.flatten().fieldErrors &&
    Object.entries(result.error.flatten().fieldErrors).forEach(([k, v]) => {
      if (v?.[0]) errors[k] = v[0]
    })
  return errors
}

export function validateBookingForm(data: unknown): FieldErrors | null {
  const result = bookingFormSchema.safeParse(data)
  if (result.success) return null
  const errors: FieldErrors = {}
  result.error.flatten().fieldErrors &&
    Object.entries(result.error.flatten().fieldErrors).forEach(([k, v]) => {
      if (v?.[0]) errors[k] = v[0]
    })
  return errors
}

export function validateExpertHelpForm(data: unknown): FieldErrors | null {
  const result = expertHelpFormSchema.safeParse(data)
  if (result.success) return null
  const errors: FieldErrors = {}
  result.error.flatten().fieldErrors &&
    Object.entries(result.error.flatten().fieldErrors).forEach(([k, v]) => {
      if (v?.[0]) errors[k] = v[0]
    })
  return errors
}

export function validateQuickPlannerPopup(data: unknown): FieldErrors | null {
  const result = quickPlannerPopupSchema.safeParse(data)
  if (result.success) return null
  const errors: FieldErrors = {}
  result.error.flatten().fieldErrors &&
    Object.entries(result.error.flatten().fieldErrors).forEach(([k, v]) => {
      if (v?.[0]) errors[k] = v[0]
    })
  return errors
}

export function validateQuickPlannerForm(data: unknown): FieldErrors | null {
  const result = quickPlannerFormSchema.safeParse(data)
  if (result.success) return null
  const errors: FieldErrors = {}
  result.error.flatten().fieldErrors &&
    Object.entries(result.error.flatten().fieldErrors).forEach(([k, v]) => {
      if (v?.[0]) errors[k] = v[0]
    })
  return errors
}
