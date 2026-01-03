'use client'

import { Check } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Family Trip',
    quote:
      'A truly transformative experience. The guides were knowledgeable and respectful. We felt connected to the sacred heritage of Ayodhya.',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Solo Pilgrim',
    quote:
      'Exceptional service from start to finish. The itinerary was perfectly paced, and every moment felt meaningful and authentic.',
  },
  {
    name: 'Meera Patel',
    role: 'Corporate Group',
    quote:
      'Our team had the most enriching experience. The guides made complex spiritual concepts accessible and engaging for everyone.',
  },
]

export default function TrustSection() {
  return (
    <section className="py-10 md:py-14 lg:py-20 bg-gradient-to-br from-[#0B1A3A] via-[#1a2d5c] to-[#0B1A3A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-10 md:mb-14 lg:mb-16">
          {/* Left Content */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-5 lg:mb-6 leading-tight">
              Why Choose <span className="text-[#D97B2B]">Visit My Ayodhya</span>?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl mb-6 md:mb-8 leading-relaxed">
              With over a decade of experience guiding pilgrims and travelers through Ayodhya's sacred sites, we've perfected the art of creating meaningful, authentic spiritual experiences.
            </p>

            {/* Features List */}
            <ul className="space-y-3 md:space-y-4">
              {[
                'Certified spiritual guides with deep local knowledge',
                'Authentic experiences that respect sacred traditions',
                'Personalized itineraries tailored to your interests',
                'Small group sizes for meaningful connections',
                'Hassle-free bookings and 24/7 support',
              ].map((feature, idx) => (
                <li key={idx} className="flex gap-2.5 md:gap-3 items-start">
                  <Check className="text-[#D97B2B] w-4 h-4 md:w-5 md:h-5 mt-0.5 md:mt-1 flex-shrink-0" />
                  <span className="text-gray-300 text-sm md:text-base">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Stats */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6">
            {[
              { stat: '10K+', label: 'Happy Pilgrims' },
              { stat: '500+', label: 'Guided Tours' },
              { stat: '98%', label: 'Satisfaction Rate' },
              { stat: '12+', label: 'Years of Excellence' },
            ].map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-[#1a2d5c] to-[#0B1A3A] p-4 md:p-5 lg:p-6 rounded-lg md:rounded-xl border border-[#D97B2B]/30 hover:border-[#D97B2B]/50 transition-all hover:scale-105">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#D97B2B] mb-1 md:mb-2">{item.stat}</div>
                <div className="text-gray-300 text-xs md:text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="border-t border-[#1a2d5c] pt-8 md:pt-12 lg:pt-16">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 lg:mb-12 text-center">What Our Pilgrims Say</h3>
          
          {/* Mobile Carousel */}
          <div className="md:hidden">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {testimonials.map((testimonial, idx) => (
                  <CarouselItem key={idx} className="pl-2 md:pl-4">
                    <div className="bg-white/10 backdrop-blur-sm p-5 rounded-lg border border-white/10">
                      <div className="text-[#D97B2B] text-lg mb-3">★★★★★</div>
                      <p className="text-gray-200 mb-4 italic text-sm leading-relaxed">{testimonial.quote}</p>
                      <div>
                        <div className="font-semibold text-white mb-0.5 text-sm">{testimonial.name}</div>
                        <div className="text-[#D97B2B] text-xs">{testimonial.role}</div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 border-white/20 text-white hover:bg-white/10" />
              <CarouselNext className="right-2 border-white/20 text-white hover:bg-white/10" />
            </Carousel>
          </div>

          {/* Desktop/Tablet Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm p-5 md:p-6 lg:p-8 rounded-lg md:rounded-xl border border-white/10 hover:bg-white/15 transition-all hover:scale-105">
                <div className="text-[#D97B2B] text-lg md:text-xl lg:text-2xl mb-3 md:mb-4">★★★★★</div>
                <p className="text-gray-200 mb-4 md:mb-5 lg:mb-6 italic text-xs sm:text-sm md:text-base leading-relaxed">{testimonial.quote}</p>
                <div>
                  <div className="font-semibold text-white mb-0.5 md:mb-1 text-sm md:text-base">{testimonial.name}</div>
                  <div className="text-[#D97B2B] text-xs md:text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
