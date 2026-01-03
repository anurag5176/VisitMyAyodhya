'use client'

import { useState } from 'react'
import { Calendar, Users, Mail, Phone, MapPin, MessageSquare, Check } from 'lucide-react'

export default function BookingForm() {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement booking submission logic
    setSubmitted(true)
    setTimeout(() => {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        numberOfGuests: '1',
        visitDate: '',
        specialRequests: '',
        dietaryPreferences: '',
      })
      setSubmitted(false)
    }, 3000)
  }

  return (
    <section id="booking-form" className="py-12 md:py-20 bg-white scroll-mt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0B1A3A] mb-4">
            Complete Your Booking
          </h2>
          <p className="text-[#7f8c8d] text-lg md:text-xl">
            Secure your spiritual experience with just a few details
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-[#e8e6e1] rounded-2xl p-6 md:p-8 lg:p-12 shadow-lg"
        >
          <div className="space-y-6">
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
                required
                className="w-full px-4 py-3 border border-[#e8e6e1] rounded-lg focus:outline-none focus:border-[#D97B2B] focus:ring-2 focus:ring-[#D97B2B]/20 transition-all"
              />
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
                  required
                  className="w-full px-4 py-3 border border-[#e8e6e1] rounded-lg focus:outline-none focus:border-[#D97B2B] focus:ring-2 focus:ring-[#D97B2B]/20 transition-all"
                />
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
                  required
                  className="w-full px-4 py-3 border border-[#e8e6e1] rounded-lg focus:outline-none focus:border-[#D97B2B] focus:ring-2 focus:ring-[#D97B2B]/20 transition-all"
                />
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
                  required
                  className="w-full px-4 py-3 border border-[#e8e6e1] rounded-lg focus:outline-none focus:border-[#D97B2B] focus:ring-2 focus:ring-[#D97B2B]/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0B1A3A] mb-3 flex items-center gap-2">
                  <Users size={16} />
                  Number of Guests *
                </label>
                <input
                  type="number"
                  name="numberOfGuests"
                  min="1"
                  max="50"
                  value={formData.numberOfGuests}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#e8e6e1] rounded-lg focus:outline-none focus:border-[#D97B2B] focus:ring-2 focus:ring-[#D97B2B]/20 transition-all"
                />
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
                <option value="non-vegetarian">Non-Vegetarian</option>
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
                className="w-full px-4 py-3 border border-[#e8e6e1] rounded-lg focus:outline-none focus:border-[#D97B2B] focus:ring-2 focus:ring-[#D97B2B]/20 transition-all resize-none"
              />
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
              disabled={submitted}
            >
              {submitted ? (
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
