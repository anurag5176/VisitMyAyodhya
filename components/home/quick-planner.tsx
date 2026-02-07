'use client'

import { useState } from 'react'
import { Calendar, Users, MapPin, Building2, Clock, Heart, Check, Loader2 } from 'lucide-react'
import { submitLead } from '@/lib/supabase/leads'
import {
  validateQuickPlannerForm,
  validateQuickPlannerPopup,
  type FieldErrors,
} from '@/lib/validation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function QuickPlanner() {
  const [formData, setFormData] = useState({
    visitDate: '',
    numberOfPeople: '1',
    interestArea: 'all',
  })
  const [popupData, setPopupData] = useState({ name: '', phone: '' })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [popupSubmitting, setPopupSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState<FieldErrors>({})
  const [popupErrors, setPopupErrors] = useState<FieldErrors>({})
  const [popupError, setPopupError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handlePopupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPopupData((prev) => ({ ...prev, [name]: value }))
    setPopupError(null)
    if (popupErrors[name]) setPopupErrors((prev) => { const next = { ...prev }; delete next[name]; return next })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormErrors({})
    const errors = validateQuickPlannerForm(formData)
    if (errors && Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    setIsDialogOpen(true)
  }

  const handlePopupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPopupError(null)
    setPopupErrors({})
    const errors = validateQuickPlannerPopup(popupData)
    if (errors && Object.keys(errors).length > 0) {
      setPopupErrors(errors)
      return
    }
    setPopupSubmitting(true)
    const result = await submitLead('quick_planner', {
      name: popupData.name.trim(),
      phone: popupData.phone.trim(),
      visitDate: formData.visitDate,
      numberOfPeople: formData.numberOfPeople,
      interestArea: formData.interestArea,
    })
    if (!result.success) {
      setPopupError(result.error ?? 'Something went wrong. Please try again.')
      setPopupSubmitting(false)
      return
    }
    setSubmitted(true)
    setPopupSubmitting(false)
    setPopupData({ name: '', phone: '' })
    setFormData({ visitDate: '', numberOfPeople: '1', interestArea: 'all' })
    setIsDialogOpen(false)
    setFormErrors({})
    setPopupErrors({})
    setTimeout(() => setSubmitted(false), 3000)
  }

  const fieldBorder = (errors: FieldErrors, name: string) =>
    errors[name]
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
      : 'border-[#e8e6e1] focus:border-[#D97B2B] focus:ring-2 focus:ring-[#D97B2B]/20'

  return (
    <section className="py-10 md:py-14 lg:py-16 bg-gradient-to-b from-white to-[#F8F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B1A3A] mb-2 md:mb-3">
            Plan Your Spiritual Journey
          </h2>
          <p className="text-[#7f8c8d] text-sm sm:text-base md:text-lg">
            Get personalized recommendations in just a few clicks
          </p>
        </div>

        {/* Quick Planner Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white rounded-xl md:rounded-2xl shadow-xl p-5 md:p-6 lg:p-8 border-2 border-[#e8e6e1]"
        >
          {(formErrors.visitDate || formErrors.numberOfPeople || formErrors.interestArea) && (
            <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg mb-4">
              Please fix the errors below before continuing.
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6 mb-6 md:mb-8">
            {/* Date Input */}
            <div className="flex flex-col">
              <label className="block text-xs md:text-sm font-semibold text-[#0B1A3A] mb-2 md:mb-3 flex items-center gap-1.5 md:gap-2">
                <Calendar size={16} className="md:w-[18px] md:h-[18px] text-[#D97B2B]" />
                When?
              </label>
              <input
                type="date"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleChange}
                className={`w-full h-11 md:h-12 px-3 md:px-4 border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm md:text-base overflow-hidden ${fieldBorder(formErrors, 'visitDate')}`}
              />
              {formErrors.visitDate && <p className="mt-1.5 text-sm text-red-600">{formErrors.visitDate}</p>}
            </div>

            {/* Guests Input */}
            <div className="flex flex-col">
              <label className="block text-xs md:text-sm font-semibold text-[#0B1A3A] mb-2 md:mb-3 flex items-center gap-1.5 md:gap-2">
                <Users size={16} className="md:w-[18px] md:h-[18px] text-[#D97B2B]" />
                Number of People
              </label>
              <input
                type="number"
                name="numberOfPeople"
                min={1}
                max={50}
                value={formData.numberOfPeople}
                onChange={handleChange}
                placeholder="No. of people"
                className={`w-full h-11 md:h-12 px-3 md:px-4 border rounded-lg focus:outline-none focus:ring-2 transition-all text-sm md:text-base placeholder:text-gray-400 overflow-hidden ${fieldBorder(formErrors, 'numberOfPeople')}`}
              />
              {formErrors.numberOfPeople && <p className="mt-1.5 text-sm text-red-600">{formErrors.numberOfPeople}</p>}
            </div>

            {/* Interest Area */}
            <div className="flex flex-col">
              <label className="block text-xs md:text-sm font-semibold text-[#0B1A3A] mb-2 md:mb-3 flex items-center gap-1.5 md:gap-2">
                <MapPin size={16} className="md:w-[18px] md:h-[18px] text-[#D97B2B]" />
                Interest Area
              </label>
              <select
                name="interestArea"
                value={formData.interestArea}
                onChange={handleChange}
                className={`w-full h-11 md:h-12 px-3 md:px-4 border rounded-lg focus:outline-none focus:ring-2 transition-all bg-white text-sm md:text-base truncate ${fieldBorder(formErrors, 'interestArea')}`}
              >
                <option value="all">All Attractions</option>
                <option value="temples">Temples</option>
                <option value="cultural">Cultural Sites</option>
                <option value="heritage">Heritage Sites</option>
              </select>
              {formErrors.interestArea && <p className="mt-1.5 text-sm text-red-600">{formErrors.interestArea}</p>}
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            {submitted && (
              <p className="text-sm font-medium text-green-700">Thanks! We&apos;ll get in touch with recommendations.</p>
            )}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="sm:max-w-[420px] bg-white border-2 border-[#e8e6e1]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-[#0B1A3A]">
                    Almost there
                  </DialogTitle>
                  <DialogDescription className="text-[#7f8c8d]">
                    Share your name and phone so we can send personalized recommendations.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handlePopupSubmit} className="space-y-4 mt-4">
                  {popupError && (
                    <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg">
                      {popupError}
                    </p>
                  )}
                  <div>
                    <label className="block text-sm font-semibold text-[#0B1A3A] mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={popupData.name}
                      onChange={handlePopupChange}
                      placeholder="Enter your full name"
                      maxLength={80}
                      autoComplete="name"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${fieldBorder(popupErrors, 'name')}`}
                    />
                    {popupErrors.name && <p className="mt-1.5 text-sm text-red-600">{popupErrors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0B1A3A] mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={popupData.phone}
                      onChange={handlePopupChange}
                      placeholder="+91-XXXXXXXXXX"
                      autoComplete="tel"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${fieldBorder(popupErrors, 'phone')}`}
                    />
                    {popupErrors.phone && <p className="mt-1.5 text-sm text-red-600">{popupErrors.phone}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={popupSubmitting}
                    className="w-full px-6 py-3 bg-[#D97B2B] text-white font-semibold rounded-lg hover:bg-[#c86a1a] transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {popupSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" aria-hidden />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        Submit
                      </>
                    )}
                  </button>
                </form>
              </DialogContent>
            </Dialog>
            <button
              type="submit"
              disabled={submitted}
              className="w-full md:w-auto px-6 md:px-8 py-3 md:py-4 bg-[#D97B2B] text-white font-semibold rounded-xl hover:bg-[#c86a1a] transition-all hover:shadow-xl hover:shadow-[#D97B2B]/30 text-sm md:text-base disabled:opacity-50"
            >
              Get Personalized Recommendations
            </button>
          </div>
        </form>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6 mt-10 md:mt-12 lg:mt-16">
          {[
            {
              icon: Building2,
              title: 'Expert Guides',
              description: 'Local experts who know every corner of Ayodhya',
            },
            {
              icon: Clock,
              title: 'Flexible Scheduling',
              description: 'Plan your itinerary at your own pace',
            },
            {
              icon: Heart,
              title: 'Authentic Experience',
              description: 'Connect deeply with spiritual traditions',
            },
          ].map((card, idx) => {
            const IconComponent = card.icon
            return (
              <div key={idx} className="bg-white rounded-lg md:rounded-xl p-4 md:p-5 lg:p-6 text-center border border-[#e8e6e1] hover:shadow-lg transition-all">
                <div className="flex justify-center mb-2 md:mb-3">
                  <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-[#D97B2B]" />
                </div>
                <h3 className="font-semibold text-[#0B1A3A] mb-1.5 md:mb-2 text-sm md:text-base">{card.title}</h3>
                <p className="text-[#7f8c8d] text-xs md:text-sm">{card.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
