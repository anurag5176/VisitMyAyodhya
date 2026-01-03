'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Check } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement contact form submission logic
    setSubmitted(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' })
      setSubmitted(false)
    }, 3000)
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
                  required
                  className="w-full px-4 py-3 border border-[#e8e6e1] rounded-lg focus:outline-none focus:border-[#D97B2B] focus:ring-2 focus:ring-[#D97B2B]/20 transition-all"
                />
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
                  required
                  className="w-full px-4 py-3 border border-[#e8e6e1] rounded-lg focus:outline-none focus:border-[#D97B2B] focus:ring-2 focus:ring-[#D97B2B]/20 transition-all"
                />
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
                required
                className="w-full px-4 py-3 border border-[#e8e6e1] rounded-lg focus:outline-none focus:border-[#D97B2B] focus:ring-2 focus:ring-[#D97B2B]/20 transition-all bg-white"
              >
                <option value="">Select a subject</option>
                <option value="booking">Booking Inquiry</option>
                <option value="feedback">Feedback</option>
                <option value="support">Support</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0B1A3A] mb-3">
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                rows={5}
                required
                className="w-full px-4 py-3 border border-[#e8e6e1] rounded-lg focus:outline-none focus:border-[#D97B2B] focus:ring-2 focus:ring-[#D97B2B]/20 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-[#D97B2B] text-white font-semibold rounded-lg hover:bg-[#c86a1a] transition-all hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
              disabled={submitted}
            >
              {submitted ? (
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
