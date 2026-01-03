'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Clock, MapPin, DollarSign, Users, Phone, Calendar, Star, Check } from 'lucide-react'
import { Attraction } from '@/lib/attractions-data'

interface AttractionDetailProps {
  attraction: Attraction
}

export default function AttractionDetail({ attraction }: AttractionDetailProps) {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0B1A3A] via-[#1a2d5c] to-[#0B1A3A] text-white min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            {/* Hero Image */}
            <div className="order-1 lg:order-1">
              <div className="relative aspect-square rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl overflow-hidden">
                <Image
                  src={
                    attraction.slug === 'ram-mandir' 
                      ? '/rammandir.png' 
                      : attraction.slug === 'hanuman-garhi'
                      ? '/hanuman-garhi2.jpg'
                      : attraction.slug === 'kanak-bhawan'
                      ? '/kanakbhawan2.jpeg'
                      : attraction.slug === 'nageshwarnath-temple'
                      ? '/nageshwar2.jpg'
                      : attraction.slug === 'tulsi-das-birthplace'
                      ? '/tulsi2.jpg'
                      : attraction.slug === 'ghat-ghats'
                      ? '/ghats1.jpg'
                      : '/hero.png'
                  }
                  alt={attraction.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Content */}
            <div className="order-2 lg:order-2">
              <span className="inline-flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-[#D97B2B]/20 backdrop-blur-sm border border-[#D97B2B]/30 text-[#D97B2B] text-xs font-bold rounded-full uppercase mb-4 md:mb-6">
                {attraction.category}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight">
                {attraction.name}
              </h1>

              {/* Quick Info */}
              <div className="space-y-2 md:space-y-3">
                {attraction.timings && (
                  <div className="flex items-start gap-2 md:gap-3">
                    <Clock size={18} className="md:w-5 md:h-5 flex-shrink-0 mt-0.5 md:mt-1" />
                    <div>
                      <div className="font-semibold text-sm md:text-base">Opening Hours</div>
                      <div className="text-gray-300 text-sm md:text-base">{attraction.timings}</div>
                    </div>
                  </div>
                )}
                {attraction.location && (
                  <div className="flex items-start gap-2 md:gap-3">
                    <MapPin size={18} className="md:w-5 md:h-5 flex-shrink-0 mt-0.5 md:mt-1" />
                    <div>
                      <div className="font-semibold text-sm md:text-base">Location</div>
                      <div className="text-gray-300 text-sm md:text-base">{attraction.location}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8 md:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8 md:space-y-10">
              {/* About */}
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B1A3A] mb-4 md:mb-5">About</h2>
                <p className="text-[#7f8c8d] leading-relaxed text-sm sm:text-base md:text-lg">
                  {attraction.description}
                </p>
              </div>

              {/* Additional Images Gallery */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0B1A3A] mb-4 md:mb-5">Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {attraction.slug === 'ram-mandir' ? (
                    <>
                      <div className="relative aspect-square rounded-xl overflow-hidden">
                        <Image
                          src="/rammandir2.png"
                          alt={`${attraction.name} - Image 1`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="relative aspect-square rounded-xl overflow-hidden">
                        <Image
                          src="/rammandir3.png"
                          alt={`${attraction.name} - Image 2`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="relative aspect-square rounded-xl overflow-hidden">
                        <Image
                          src="/rammandir.png"
                          alt={`${attraction.name} - Image 3`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </>
                  ) : attraction.slug === 'hanuman-garhi' ? (
                    <>
                      <div className="relative aspect-square rounded-xl overflow-hidden">
                        <Image
                          src="/hanuman-garhi.png"
                          alt={`${attraction.name} - Image 1`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="relative aspect-square rounded-xl overflow-hidden">
                        <Image
                          src="/hanuman-garhi2.jpg"
                          alt={`${attraction.name} - Image 2`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="relative aspect-square rounded-xl overflow-hidden">
                        <Image
                          src="/hanuman-garhi1.jpg"
                          alt={`${attraction.name} - Image 3`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </>
                  ) : attraction.slug === 'kanak-bhawan' ? (
                    <>
                      <div className="relative aspect-square rounded-xl overflow-hidden">
                        <Image
                          src="/kanakbhawan2.jpeg"
                          alt={`${attraction.name} - Image 1`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="relative aspect-square rounded-xl overflow-hidden">
                        <Image
                          src="/kanakbhawan3.jpg"
                          alt={`${attraction.name} - Image 2`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="relative aspect-square rounded-xl overflow-hidden">
                        <Image
                          src="/kanakbhawan1.jpeg"
                          alt={`${attraction.name} - Image 3`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </>
                  ) : attraction.slug === 'nageshwarnath-temple' ? (
                    <>
                      <div className="relative aspect-square rounded-xl overflow-hidden">
                        <Image
                          src="/nageshwar2.jpg"
                          alt={`${attraction.name} - Image 1`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="relative aspect-square rounded-xl overflow-hidden">
                        <Image
                          src="/nageshwar3.jpg"
                          alt={`${attraction.name} - Image 2`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="relative aspect-square rounded-xl overflow-hidden">
                        <Image
                          src="/nageshwar1.jpg"
                          alt={`${attraction.name} - Image 3`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </>
                  ) : attraction.slug === 'tulsi-das-birthplace' ? (
                    <>
                      <div className="relative aspect-square rounded-xl overflow-hidden">
                        <Image
                          src="/tulsi1.avif"
                          alt={`${attraction.name} - Image 1`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="relative aspect-square rounded-xl overflow-hidden">
                        <Image
                          src="/tulsi2.jpg"
                          alt={`${attraction.name} - Image 2`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="relative aspect-square rounded-xl overflow-hidden">
                        <Image
                          src="/tulsi3.avif"
                          alt={`${attraction.name} - Image 3`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </>
                  ) : attraction.slug === 'ghat-ghats' ? (
                    <>
                      <div className="relative aspect-square rounded-xl overflow-hidden">
                        <Image
                          src="/ghats1.jpg"
                          alt={`${attraction.name} - Image 1`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="relative aspect-square rounded-xl overflow-hidden">
                        <Image
                          src="/ghats2.jpeg"
                          alt={`${attraction.name} - Image 2`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="relative aspect-square rounded-xl overflow-hidden">
                        <Image
                          src="/ghats3.jpeg"
                          alt={`${attraction.name} - Image 3`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </>
                  ) : (
                    [1, 2, 3].map((idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden">
                        <Image
                          src="/hero.png"
                          alt={`${attraction.name} - Image ${idx}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Highlights */}
              {attraction.highlights && attraction.highlights.length > 0 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B1A3A] mb-4 md:mb-5">Key Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {attraction.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex gap-2.5 md:gap-3 items-start p-3 md:p-4 bg-gradient-to-br from-[#F8F6F2] to-white rounded-lg md:rounded-xl border border-[#e8e6e1] hover:border-[#D97B2B] transition-colors"
                      >
                        <Check className="text-[#D97B2B] w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5" />
                        <span className="text-[#2c3e50] font-medium text-sm md:text-base">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {attraction.faqs && attraction.faqs.length > 0 && (
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B1A3A] mb-4 md:mb-5">Frequently Asked Questions</h2>
                  <div className="space-y-3 md:space-y-4">
                    {attraction.faqs.map((faq, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          setExpandedFAQ(expandedFAQ === idx ? null : idx)
                        }
                        className="w-full text-left p-4 md:p-5 lg:p-6 bg-white rounded-lg md:rounded-xl border-2 border-[#e8e6e1] hover:border-[#D97B2B] transition-all shadow-sm hover:shadow-md"
                      >
                        <div className="flex items-center justify-between gap-3 md:gap-4">
                          <span className="font-semibold text-[#0B1A3A] text-sm sm:text-base md:text-lg">
                            {faq.question}
                          </span>
                          <ChevronDown
                            size={18}
                            className={`md:w-5 md:h-5 text-[#D97B2B] transition-transform flex-shrink-0 ${
                              expandedFAQ === idx ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                        {expandedFAQ === idx && (
                          <p className="text-[#7f8c8d] mt-3 md:mt-4 leading-relaxed text-sm md:text-base">{faq.answer}</p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              {/* Booking Card */}
              <div className="bg-gradient-to-br from-[#0B1A3A] via-[#1a2d5c] to-[#0B1A3A] text-white p-5 md:p-6 lg:p-8 rounded-xl md:rounded-2xl sticky top-20 md:top-24 border border-[#D97B2B]/30 shadow-xl md:shadow-2xl">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-5">Plan Your Visit</h3>

                {/* Info Items */}
                <div className="space-y-4 md:space-y-5 mb-6 md:mb-8">
                  {attraction.bestTimeToVisit && (
                    <div>
                      <div className="font-semibold text-[#D97B2B] mb-1.5 md:mb-2 text-sm md:text-base">
                        Best Time to Visit
                      </div>
                      <div className="text-gray-300 text-xs md:text-sm">
                        {attraction.bestTimeToVisit}
                      </div>
                    </div>
                  )}

                  {attraction.entryFee && (
                    <div className="flex items-start gap-2.5 md:gap-3">
                      <DollarSign size={16} className="md:w-[18px] md:h-[18px] flex-shrink-0 mt-0.5 md:mt-1 text-[#D97B2B]" />
                      <div>
                        <div className="font-semibold text-sm md:text-base">Entry Fee</div>
                        <div className="text-gray-300 text-xs md:text-sm">{attraction.entryFee}</div>
                      </div>
                    </div>
                  )}

                  {attraction.guidedTourCost && (
                    <div className="flex items-start gap-2.5 md:gap-3">
                      <Users size={16} className="md:w-[18px] md:h-[18px] flex-shrink-0 mt-0.5 md:mt-1 text-[#D97B2B]" />
                      <div>
                        <div className="font-semibold text-sm md:text-base">Guided Tour</div>
                        <div className="text-gray-300 text-xs md:text-sm">
                          {attraction.guidedTourCost}
                        </div>
                      </div>
                    </div>
                  )}

                  {attraction.phone && (
                    <div className="flex items-start gap-2.5 md:gap-3">
                      <Phone size={16} className="md:w-[18px] md:h-[18px] flex-shrink-0 mt-0.5 md:mt-1 text-[#D97B2B]" />
                      <div>
                        <div className="font-semibold text-sm md:text-base">Contact</div>
                        <div className="text-gray-300 text-xs md:text-sm">{attraction.phone}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-2.5 md:space-y-3">
                  <Link
                    href="/plan-and-book"
                    className="w-full px-5 md:px-6 py-2.5 md:py-3 bg-[#D97B2B] text-white font-semibold rounded-lg hover:bg-[#c86a1a] transition-all text-center block text-sm md:text-base"
                  >
                    Book Now
                  </Link>
                  <button className="w-full px-5 md:px-6 py-2.5 md:py-3 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all text-sm md:text-base">
                    Get More Info
                  </button>
                </div>

                {/* Info */}
                <div className="mt-5 md:mt-6 pt-5 md:pt-6 border-t border-white/10 text-xs text-gray-300">
                  24/7 customer support available to assist with your queries
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
