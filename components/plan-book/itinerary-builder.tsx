'use client'

import { useState } from 'react'
import { attractions } from '@/lib/attractions-data'
import { Plus, Trash2, Calendar, Clock, MapPin, Check, Loader2 } from 'lucide-react'
import { getIcon } from '@/lib/icon-map'
import { submitLead } from '@/lib/supabase/leads'
import { validateExpertHelpForm, type FieldErrors } from '@/lib/validation'
import Link from 'next/link'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface ItineraryBuilderProps {
  selectedAttractions?: string[]
  setSelectedAttractions?: React.Dispatch<React.SetStateAction<string[]>>
}

export default function ItineraryBuilder({
  selectedAttractions: controlledSelected,
  setSelectedAttractions: setControlledSelected,
}: ItineraryBuilderProps = {}) {
  const [internalSelected, setInternalSelected] = useState<string[]>([])
  const selectedAttractions = controlledSelected ?? internalSelected
  const setSelectedAttractions = setControlledSelected ?? setInternalSelected
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    query: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [expertHelpSubmitting, setExpertHelpSubmitting] = useState(false)
  const [expertHelpError, setExpertHelpError] = useState<string | null>(null)
  const [expertHelpFieldErrors, setExpertHelpFieldErrors] = useState<FieldErrors>({})

  const commonQueries = [
    { value: '', label: 'Select a query type' },
    { value: 'itinerary', label: 'Custom Itinerary Planning' },
    { value: 'group', label: 'Group Tour Planning' },
    { value: 'timing', label: 'Best Time to Visit' },
    { value: 'accommodation', label: 'Accommodation Recommendations' },
    { value: 'transport', label: 'Transportation Options' },
    { value: 'special', label: 'Special Requirements' },
    { value: 'other', label: 'Other Questions' },
  ]

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setExpertHelpError(null)
    if (expertHelpFieldErrors[name]) setExpertHelpFieldErrors((prev) => { const next = { ...prev }; delete next[name]; return next })
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setExpertHelpError(null)
    setExpertHelpFieldErrors({})
    const errors = validateExpertHelpForm(formData)
    if (errors && Object.keys(errors).length > 0) {
      setExpertHelpFieldErrors(errors)
      return
    }
    setExpertHelpSubmitting(true)
    const result = await submitLead('expert_help', {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      query: formData.query,
      message: formData.message.trim(),
    })
    if (!result.success) {
      setExpertHelpError(result.error ?? 'Something went wrong. Please try again.')
      setExpertHelpSubmitting(false)
      return
    }
    setSubmitted(true)
    setExpertHelpSubmitting(false)
    setTimeout(() => {
      setFormData({ name: '', phone: '', query: '', message: '' })
      setSubmitted(false)
      setExpertHelpError(null)
      setExpertHelpFieldErrors({})
      setIsDialogOpen(false)
    }, 2000)
  }

  const expertInputBorder = (name: string) =>
    expertHelpFieldErrors[name]
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
      : 'border-[#e8e6e1] focus:border-[#D97B2B] focus:ring-2 focus:ring-[#D97B2B]/20'

  const toggleAttraction = (slug: string) => {
    setSelectedAttractions((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    )
  }

  const removeAttraction = (slug: string) => {
    setSelectedAttractions((prev) => prev.filter((s) => s !== slug))
  }

  const moveUp = (index: number) => {
    if (index === 0) return
    const newOrder = [...selectedAttractions]
    ;[newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]]
    setSelectedAttractions(newOrder)
  }

  const moveDown = (index: number) => {
    if (index === selectedAttractions.length - 1) return
    const newOrder = [...selectedAttractions]
    ;[newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]]
    setSelectedAttractions(newOrder)
  }

  const ExpertHelpForm = () => (
    <>
      <DialogHeader>
        <DialogTitle className="text-xl md:text-2xl font-bold text-[#0B1A3A]">
          Request Expert Help
        </DialogTitle>
        <DialogDescription className="text-[#7f8c8d]">
          Fill out the form below and our expert guides will get back to you soon.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleFormSubmit} className="space-y-4 mt-4">
        {expertHelpError && (
          <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-lg">
            {expertHelpError}
          </p>
        )}
        <div>
          <label className="block text-sm font-semibold text-[#0B1A3A] mb-2">
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            placeholder="Enter your full name"
            maxLength={80}
            autoComplete="name"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${expertInputBorder('name')}`}
          />
          {expertHelpFieldErrors.name && <p className="mt-1.5 text-sm text-red-600">{expertHelpFieldErrors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#0B1A3A] mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleFormChange}
            placeholder="+91-XXXXXXXXXX"
            autoComplete="tel"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${expertInputBorder('phone')}`}
          />
          {expertHelpFieldErrors.phone && <p className="mt-1.5 text-sm text-red-600">{expertHelpFieldErrors.phone}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#0B1A3A] mb-2">
            Query Type
          </label>
          <select
            name="query"
            value={formData.query}
            onChange={handleFormChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all bg-white ${expertInputBorder('query')}`}
          >
            {commonQueries.map((query) => (
              <option key={query.value} value={query.value}>
                {query.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#0B1A3A] mb-2">
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleFormChange}
            placeholder="Tell us about your requirements, group size, preferred dates... (at least 10 characters)"
            rows={4}
            maxLength={2000}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 resize-none transition-all ${expertInputBorder('message')}`}
          />
          {expertHelpFieldErrors.message && <p className="mt-1.5 text-sm text-red-600">{expertHelpFieldErrors.message}</p>}
          <p className="mt-1 text-xs text-[#7f8c8d]">{formData.message.length}/2000</p>
        </div>
        <button
          type="submit"
          disabled={submitted || expertHelpSubmitting}
          className="w-full px-6 py-3 bg-[#D97B2B] text-white font-semibold rounded-lg hover:bg-[#c86a1a] transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {expertHelpSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden />
              Sending...
            </>
          ) : submitted ? (
            <>
              <Check className="w-5 h-5" />
              Request Sent!
            </>
          ) : (
            'Send Request'
          )}
        </button>
      </form>
    </>
  )

  return (
    <section id="itinerary-builder" className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-[#F8F6F2] to-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B1A3A] mb-3 md:mb-4">
            Build Your Itinerary
          </h2>
          <p className="text-[#7f8c8d] text-base md:text-lg max-w-2xl mx-auto">
            Select attractions and create your perfect spiritual journey. Or let our experts plan it for you.
          </p>
        </div>

        {/* Request Planning Option */}
        <div className="mb-8 md:mb-10 bg-gradient-to-r from-[#D97B2B] to-[#c86a1a] rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2">Need Help Planning?</h3>
              <p className="text-sm md:text-base text-white/90">Let our expert guides create a personalized itinerary for you</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button className="px-5 md:px-6 py-2.5 md:py-3 bg-white text-[#D97B2B] font-semibold rounded-lg md:rounded-xl hover:bg-gray-100 transition-all whitespace-nowrap text-sm md:text-base shadow-md hover:shadow-lg">
                  Request Expert Help
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] bg-white border-2 border-[#e8e6e1]">
                <ExpertHelpForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Available Attractions */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5 md:mb-6">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#0B1A3A]">
                Available Attractions
              </h2>
              <span className="text-sm text-[#7f8c8d] font-medium">
                {attractions.length} attractions
              </span>
            </div>
            <div className="space-y-3 md:space-y-4">
              {attractions.map((attraction) => (
                <div
                  key={attraction.slug}
                  className={`bg-white border-2 rounded-lg md:rounded-xl p-4 md:p-5 flex items-start gap-3 md:gap-4 transition-all hover:shadow-md ${
                    selectedAttractions.includes(attraction.slug)
                      ? 'border-[#D97B2B] bg-[#D97B2B]/5 shadow-sm'
                      : 'border-[#e8e6e1] hover:border-[#D97B2B]/50'
                  }`}
                >
                  <input
                    type="checkbox"
                    id={attraction.slug}
                    checked={selectedAttractions.includes(attraction.slug)}
                    onChange={() => toggleAttraction(attraction.slug)}
                    className="mt-1 w-5 h-5 accent-[#D97B2B] cursor-pointer flex-shrink-0"
                  />
                  <label
                    htmlFor={attraction.slug}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      {(() => {
                        const IconComponent = getIcon(attraction.icon)
                        return <IconComponent className="w-6 h-6 text-[#D97B2B] flex-shrink-0 mt-1" />
                      })()}
                      <div className="flex-1">
                        <div className="font-bold text-[#0B1A3A] mb-1">{attraction.name}</div>
                        <div className="text-sm text-[#7f8c8d] line-clamp-2 mb-2">
                          {attraction.shortDescription}
                        </div>
                        {attraction.location && (
                          <div className="flex items-center gap-1 text-xs text-[#7f8c8d]">
                            <MapPin size={12} />
                            <span>{attraction.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Itinerary */}
          <div>
            <div className="sticky top-24 bg-white rounded-xl md:rounded-2xl border-2 border-[#D97B2B] p-5 md:p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4 md:mb-5">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#0B1A3A]">
                  Your Itinerary
                </h3>
                <span className="px-2.5 md:px-3 py-1 bg-[#D97B2B] text-white text-xs md:text-sm font-bold rounded-full min-w-[28px] text-center">
                  {selectedAttractions.length}
                </span>
              </div>

              {selectedAttractions.length === 0 ? (
                <div className="text-center py-10 md:py-12 text-[#7f8c8d]">
                  <Calendar size={40} className="mx-auto mb-3 md:mb-4 text-[#D97B2B]/30" />
                  <p className="text-sm font-medium mb-1">Select attractions to build your itinerary</p>
                  <p className="text-xs text-[#7f8c8d]/80">Click on attractions to add them</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2.5 md:space-y-3 mb-5 md:mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {selectedAttractions.map((slug, idx) => {
                      const attraction = attractions.find((a) => a.slug === slug)
                      if (!attraction) return null

                      return (
                        <div
                          key={slug}
                          className="group p-3 md:p-4 bg-gradient-to-br from-[#F8F6F2] to-white rounded-lg md:rounded-xl border border-[#e8e6e1] hover:border-[#D97B2B] transition-all"
                        >
                          <div className="flex items-start gap-2.5 md:gap-3">
                            <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-[#D97B2B] text-white rounded-full flex items-center justify-center font-bold text-xs md:text-sm">
                              {idx + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-sm md:text-base text-[#0B1A3A] mb-1 truncate">
                                {attraction.name}
                              </div>
                              <div className="text-xs text-[#7f8c8d] line-clamp-1">
                                {attraction.shortDescription}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 md:gap-2 mt-2.5 md:mt-3 pt-2.5 md:pt-3 border-t border-[#e8e6e1]">
                            <button
                              onClick={() => moveUp(idx)}
                              disabled={idx === 0}
                              className="flex-1 px-2 py-1 text-xs text-[#7f8c8d] hover:text-[#D97B2B] hover:bg-[#D97B2B]/5 rounded transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                            >
                              ↑ Up
                            </button>
                            <button
                              onClick={() => moveDown(idx)}
                              disabled={idx === selectedAttractions.length - 1}
                              className="flex-1 px-2 py-1 text-xs text-[#7f8c8d] hover:text-[#D97B2B] hover:bg-[#D97B2B]/5 rounded transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                            >
                              ↓ Down
                            </button>
                            <button
                              onClick={() => removeAttraction(slug)}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-all"
                              aria-label="Remove attraction"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="space-y-2.5 md:space-y-3">
                    <Link
                      href="#booking-form"
                      className="w-full px-5 md:px-6 py-2.5 md:py-3 bg-[#D97B2B] text-white font-semibold rounded-lg md:rounded-xl hover:bg-[#c86a1a] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-sm md:text-base"
                    >
                      <Plus size={18} />
                      Proceed to Booking
                    </Link>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <button className="w-full px-5 md:px-6 py-2.5 md:py-3 border-2 border-[#D97B2B] text-[#D97B2B] font-semibold rounded-lg md:rounded-xl hover:bg-[#D97B2B]/5 transition-all text-sm md:text-base">
                          Request Expert Help
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px] bg-white border-2 border-[#e8e6e1]">
                        <ExpertHelpForm />
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Estimated Time */}
                  <div className="mt-5 md:mt-6 pt-5 md:pt-6 border-t border-[#e8e6e1]">
                    <div className="flex items-center gap-2 text-xs md:text-sm text-[#7f8c8d]">
                      <Clock size={14} className="text-[#D97B2B] flex-shrink-0" />
                      <span>Estimated Duration: <strong className="text-[#0B1A3A]">{selectedAttractions.length * 2}-{selectedAttractions.length * 3} hours</strong></span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
