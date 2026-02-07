'use client'

import { useState } from 'react'
import { Calendar, Users, Mail, Phone, MapPin, MessageSquare, Check, Loader2 } from 'lucide-react'
import { submitLead } from '@/lib/supabase/leads'
import { attractions } from '@/lib/attractions-data'
import { validateBookingForm, type FieldErrors } from '@/lib/validation'

interface BookingFormProps {
  selectedAttractions?: string[]
}

const inputBorder = (fieldErrors: FieldErrors, name: string) =>
  fieldErrors[name]
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
    : 'border-[#e8e6e1] focus:border-[#D97B2B] focus:ring-[#D97B2B]/20'

export default function BookingForm({ selectedAttractions = [] }: BookingFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    numberOfGuests: '1',
    visitDate: '',
    specialRequests: '',
    dietaryPreferences: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError(null)
    if (fieldErrors[name]) setFieldErrors((prev) => { const next = { ...prev }; delete next[name]; return next })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setFieldErrors({})
    const errors = validateBookingForm(formData)
    if (errors && Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }
    setIsSubmitting(true)
    const result = await submitLead('booking', {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      numberOfGuests: formData.numberOfGuests,
      visitDate: formData.visitDate,
      specialRequests: formData.specialRequests,
      dietaryPreferences: formData.dietaryPreferences,
      selectedAttractions,
    })
    if (!result.success) {
      setError(result.error ?? 'Something went wrong. Please try again.')
      setIsSubmitting(false)
      return
    }
    setSubmitted(true)
    setIsSubmitting(false)
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      numberOfGuests: '1',
      visitDate: '',
      specialRequests: '',
      dietaryPreferences: '',
    })
    setFieldErrors({})
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="booking-form" className="py-12 md:py-16 lg:py-20 bg-white scroll-mt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B1A3A] mb-3 md:mb-4">
            Complete Your Booking
          </h2>
          <p className="text-[#7f8c8d] text-base md:text-lg mb-4">
            Secure your spiritual experience with just a few details
          </p>
          {selectedAttractions.length > 0 && (
            <div className="inline-flex flex-wrap items-center justify-center gap-2 text-sm text-[#0B1A3A] bg-[#F8F6F2] border border-[#e8e6e1] rounded-xl px-4 py-3">
              <MapPin size={16} className="text-[#D97B2B] flex-shrink-0" />
              <span className="font-medium">Your itinerary:</span>
              <span className="text-[#7f8c8d]">
                {selectedAttractions.length} {selectedAttractions.length === 1 ? 'attraction' : 'attractions'} selected
                {selectedAttractions.length <= 4 && (
                  <> — {selectedAttractions.map((slug) => attractions.find((a) => a.slug === slug)?.name ?? slug).join(', ')}</>
                )}
              </span>
            </div>
          )}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-[#e8e6e1] rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 xl:p-12 shadow-lg"
        >
          <div className="space-y-5 md:space-y-6">
            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg">
                {error}
              </p>
            )}
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-[#0B1A3A] mb-3">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                maxLength={100}
                autoComplete="name"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${inputBorder(fieldErrors, 'fullName')}`}
              />
              {fieldErrors.fullName && <p className="mt-1.5 text-sm text-red-600">{fieldErrors.fullName}</p>}
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#0B1A3A] mb-3 flex items-center gap-2">
                  <Mail size={16} />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  maxLength={254}
                  autoComplete="email"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${inputBorder(fieldErrors, 'email')}`}
                />
                {fieldErrors.email && <p className="mt-1.5 text-sm text-red-600">{fieldErrors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0B1A3A] mb-3 flex items-center gap-2">
                  <Phone size={16} />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91-XXXXXXXXXX"
                  autoComplete="tel"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${inputBorder(fieldErrors, 'phone')}`}
                />
                {fieldErrors.phone && <p className="mt-1.5 text-sm text-red-600">{fieldErrors.phone}</p>}
              </div>
            </div>

            {/* Date and Guests */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#0B1A3A] mb-3 flex items-center gap-2">
                  <Calendar size={16} />
                  Preferred Visit Date *
                </label>
                <input
                  type="date"
                  name="visitDate"
                  value={formData.visitDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${inputBorder(fieldErrors, 'visitDate')}`}
                />
                {fieldErrors.visitDate && <p className="mt-1.5 text-sm text-red-600">{fieldErrors.visitDate}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0B1A3A] mb-3 flex items-center gap-2">
                  <Users size={16} />
                  Number of Guests *
                </label>
                <input
                  type="number"
                  name="numberOfGuests"
                  min={1}
                  max={50}
                  value={formData.numberOfGuests}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${inputBorder(fieldErrors, 'numberOfGuests')}`}
                />
                {fieldErrors.numberOfGuests && <p className="mt-1.5 text-sm text-red-600">{fieldErrors.numberOfGuests}</p>}
              </div>
            </div>

            {/* Dietary Preferences */}
            <div>
              <label className="block text-sm font-semibold text-[#0B1A3A] mb-3">
                Dietary Preferences
              </label>
              <select
                name="dietaryPreferences"
                value={formData.dietaryPreferences}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#e8e6e1] rounded-lg focus:outline-none focus:border-[#D97B2B] focus:ring-2 focus:ring-[#D97B2B]/20 transition-all bg-white"
              >
                <option value="">Select dietary preference</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="jain">Jain</option>
              </select>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-sm font-semibold text-[#0B1A3A] mb-3 flex items-center gap-2">
                <MessageSquare size={16} />
                Special Requests or Notes
              </label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                placeholder="Any specific interests, accessibility needs, or special requests?"
                rows={4}
                maxLength={2000}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${inputBorder(fieldErrors, 'specialRequests')}`}
              />
              {fieldErrors.specialRequests && <p className="mt-1.5 text-sm text-red-600">{fieldErrors.specialRequests}</p>}
              <p className="mt-1 text-xs text-[#7f8c8d]">{formData.specialRequests.length}/2000</p>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 p-4 bg-[#F8F6F2] rounded-lg">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 w-5 h-5 accent-[#D97B2B]"
              />
              <label htmlFor="terms" className="text-sm text-[#7f8c8d]">
                I agree to the terms and conditions and understand that all bookings are subject to availability and confirmation.
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full px-8 py-4 bg-[#D97B2B] text-white font-semibold rounded-lg hover:bg-[#c86a1a] transition-all hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
              disabled={submitted || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" aria-hidden />
                  Submitting...
                </>
              ) : submitted ? (
                <>
                  <Check className="w-5 h-5" />
                  Booking Submitted Successfully!
                </>
              ) : (
                'Confirm Booking'
              )}
            </button>
          </div>

          {/* Info */}
          <div className="mt-8 pt-8 border-t border-[#e8e6e1] text-center">
            <p className="text-sm text-[#7f8c8d]">
              Our team will contact you within 24 hours to confirm your booking and provide additional details.
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}
