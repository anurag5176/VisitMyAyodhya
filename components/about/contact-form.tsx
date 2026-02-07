'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Check, Loader2 } from 'lucide-react'
import { submitLead } from '@/lib/supabase/leads'
import { validateContactForm, type FieldErrors } from '@/lib/validation'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
    const errors = validateContactForm(formData)
    if (errors && Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }
    setIsSubmitting(true)
    const result = await submitLead('contact', {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      subject: formData.subject,
      message: formData.message.trim(),
    })
    if (!result.success) {
      setError(result.error ?? 'Something went wrong. Please try again.')
      setIsSubmitting(false)
      return
    }
    setSubmitted(true)
    setIsSubmitting(false)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="py-20 md:py-24 bg-[#F8F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1A3A] mb-3">
            Get in Touch
          </h2>
          <p className="text-[#7f8c8d] text-lg">
            We'd love to hear from you. Reach out with any questions or inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          {[
            {
              icon: Phone,
              title: 'Call Us',
              content: '+91-555-0123',
              subtext: 'Available 24/7',
            },
            {
              icon: Mail,
              title: 'Email Us',
              content: 'info@visitayodhya.com',
              subtext: 'Response within 24 hours',
            },
            {
              icon: MapPin,
              title: 'Visit Us',
              content: 'Ayodhya, Uttar Pradesh',
              subtext: 'Office & Information Center',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-8 text-center border border-[#e8e6e1] hover:shadow-lg transition-all"
            >
              <item.icon size={32} className="text-[#D97B2B] mx-auto mb-4" />
              <h3 className="font-bold text-[#0B1A3A] mb-2">{item.title}</h3>
              <div className="font-semibold text-[#0B1A3A] mb-1">{item.content}</div>
              <div className="text-sm text-[#7f8c8d]">{item.subtext}</div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-[#e8e6e1] p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#0B1A3A] mb-3">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  maxLength={80}
                  autoComplete="name"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    fieldErrors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-[#e8e6e1] focus:border-[#D97B2B] focus:ring-[#D97B2B]/20'
                  }`}
                />
                {fieldErrors.name && <p className="mt-1.5 text-sm text-red-600">{fieldErrors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0B1A3A] mb-3">
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
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    fieldErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-[#e8e6e1] focus:border-[#D97B2B] focus:ring-[#D97B2B]/20'
                  }`}
                />
                {fieldErrors.email && <p className="mt-1.5 text-sm text-red-600">{fieldErrors.email}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0B1A3A] mb-3">
                Subject *
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all bg-white ${
                  fieldErrors.subject ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-[#e8e6e1] focus:border-[#D97B2B] focus:ring-[#D97B2B]/20'
                }`}
              >
                <option value="">Select a subject</option>
                <option value="booking">Booking Inquiry</option>
                <option value="feedback">Feedback</option>
                <option value="support">Support</option>
                <option value="other">Other</option>
              </select>
              {fieldErrors.subject && <p className="mt-1.5 text-sm text-red-600">{fieldErrors.subject}</p>}
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg">
                {error}
              </p>
            )}
            <div>
              <label className="block text-sm font-semibold text-[#0B1A3A] mb-3">
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here... (at least 10 characters)"
                rows={5}
                maxLength={2000}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${
                  fieldErrors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-[#e8e6e1] focus:border-[#D97B2B] focus:ring-[#D97B2B]/20'
                }`}
              />
              <div className="mt-1.5 flex justify-between">
                {fieldErrors.message && <p className="text-sm text-red-600">{fieldErrors.message}</p>}
                <p className="text-xs text-[#7f8c8d] ml-auto">{formData.message.length}/2000</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-[#D97B2B] text-white font-semibold rounded-lg hover:bg-[#c86a1a] transition-all hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
              disabled={submitted || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" aria-hidden />
                  Sending...
                </>
              ) : submitted ? (
                <>
                  <Check className="w-5 h-5" />
                  Message Sent Successfully!
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
