'use client'

import { useState } from 'react'
import { attractions } from '@/lib/attractions-data'
import { Plus, Trash2, Calendar, Clock, MapPin, ArrowRight, Sparkles } from 'lucide-react'
import { getIcon } from '@/lib/icon-map'
import Link from 'next/link'

export default function ItineraryBuilder() {
  const [selectedAttractions, setSelectedAttractions] = useState<string[]>([])
  const [showRequestForm, setShowRequestForm] = useState(false)

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

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-[#F8F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D97B2B]/10 text-[#D97B2B] rounded-full text-sm font-semibold mb-4">
            <Sparkles size={16} />
            <span>Plan Your Journey</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B1A3A] mb-4">
            Build Your Itinerary
          </h1>
          <p className="text-[#7f8c8d] text-lg md:text-xl max-w-2xl mx-auto">
            Select attractions and create your perfect spiritual journey. Or let our experts plan it for you.
          </p>
        </div>

        {/* Request Planning Option */}
        {!showRequestForm && (
          <div className="mb-8 bg-gradient-to-r from-[#D97B2B] to-[#c86a1a] rounded-2xl p-6 md:p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">Need Help Planning?</h3>
                <p className="text-white/90">Let our expert guides create a personalized itinerary for you</p>
              </div>
              <button
                onClick={() => setShowRequestForm(true)}
                className="px-6 py-3 bg-white text-[#D97B2B] font-semibold rounded-xl hover:bg-gray-100 transition-all whitespace-nowrap"
              >
                Request Planning
              </button>
            </div>
          </div>
        )}

        {/* Request Planning Form */}
        {showRequestForm && (
          <div className="mb-8 bg-white rounded-2xl border-2 border-[#D97B2B] p-6 md:p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-[#0B1A3A] mb-6">Request Custom Itinerary</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="px-4 py-3 border border-[#e8e6e1] rounded-lg focus:outline-none focus:border-[#D97B2B] focus:ring-2 focus:ring-[#D97B2B]/20"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="px-4 py-3 border border-[#e8e6e1] rounded-lg focus:outline-none focus:border-[#D97B2B] focus:ring-2 focus:ring-[#D97B2B]/20"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="px-4 py-3 border border-[#e8e6e1] rounded-lg focus:outline-none focus:border-[#D97B2B] focus:ring-2 focus:ring-[#D97B2B]/20"
                />
                <input
                  type="date"
                  className="px-4 py-3 border border-[#e8e6e1] rounded-lg focus:outline-none focus:border-[#D97B2B] focus:ring-2 focus:ring-[#D97B2B]/20"
                />
              </div>
              <textarea
                placeholder="Tell us about your interests, group size, duration, and any special requirements..."
                rows={4}
                className="w-full px-4 py-3 border border-[#e8e6e1] rounded-lg focus:outline-none focus:border-[#D97B2B] focus:ring-2 focus:ring-[#D97B2B]/20 resize-none"
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#D97B2B] text-white font-semibold rounded-lg hover:bg-[#c86a1a] transition-all"
                >
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowRequestForm(false)}
                  className="px-6 py-3 border border-[#e8e6e1] text-[#0B1A3A] font-semibold rounded-lg hover:bg-[#F8F6F2] transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Available Attractions */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B1A3A] mb-6">
              Available Attractions
            </h2>
            <div className="space-y-4">
              {attractions.map((attraction) => (
                <div
                  key={attraction.slug}
                  className={`bg-white border-2 rounded-xl p-4 md:p-5 flex items-start gap-4 transition-all hover:shadow-lg ${
                    selectedAttractions.includes(attraction.slug)
                      ? 'border-[#D97B2B] bg-[#D97B2B]/5'
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
            <div className="sticky top-24 bg-white rounded-2xl border-2 border-[#D97B2B] p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl md:text-2xl font-bold text-[#0B1A3A]">
                  Your Itinerary
                </h3>
                <span className="px-3 py-1 bg-[#D97B2B] text-white text-sm font-bold rounded-full">
                  {selectedAttractions.length}
                </span>
              </div>

              {selectedAttractions.length === 0 ? (
                <div className="text-center py-12 text-[#7f8c8d]">
                  <Calendar size={48} className="mx-auto mb-4 text-[#D97B2B]/30" />
                  <p className="text-sm font-medium">Select attractions to build your itinerary</p>
                  <p className="text-xs mt-2">Click on attractions to add them</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto pr-2">
                    {selectedAttractions.map((slug, idx) => {
                      const attraction = attractions.find((a) => a.slug === slug)
                      if (!attraction) return null

                      return (
                        <div
                          key={slug}
                          className="group p-4 bg-gradient-to-br from-[#F8F6F2] to-white rounded-xl border border-[#e8e6e1] hover:border-[#D97B2B] transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-[#D97B2B] text-white rounded-full flex items-center justify-center font-bold text-sm">
                              {idx + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-[#0B1A3A] mb-1 truncate">
                                {attraction.name}
                              </div>
                              <div className="text-xs text-[#7f8c8d] line-clamp-1">
                                {attraction.shortDescription}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#e8e6e1]">
                            <button
                              onClick={() => moveUp(idx)}
                              disabled={idx === 0}
                              className="flex-1 px-2 py-1 text-xs text-[#7f8c8d] hover:text-[#D97B2B] disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              ↑ Up
                            </button>
                            <button
                              onClick={() => moveDown(idx)}
                              disabled={idx === selectedAttractions.length - 1}
                              className="flex-1 px-2 py-1 text-xs text-[#7f8c8d] hover:text-[#D97B2B] disabled:opacity-30 disabled:cursor-not-allowed"
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

                  <div className="space-y-3">
                    <Link
                      href="#booking-form"
                      className="w-full px-6 py-3 bg-[#D97B2B] text-white font-semibold rounded-xl hover:bg-[#c86a1a] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      <Plus size={20} />
                      Proceed to Booking
                    </Link>
                    <button
                      onClick={() => setShowRequestForm(true)}
                      className="w-full px-6 py-3 border-2 border-[#D97B2B] text-[#D97B2B] font-semibold rounded-xl hover:bg-[#D97B2B]/5 transition-all"
                    >
                      Request Expert Help
                    </button>
                  </div>

                  {/* Estimated Time */}
                  <div className="mt-6 pt-6 border-t border-[#e8e6e1]">
                    <div className="flex items-center gap-2 text-sm text-[#7f8c8d]">
                      <Clock size={16} className="text-[#D97B2B]" />
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
