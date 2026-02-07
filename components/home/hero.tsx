import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Sparkles } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-[#0B1A3A] via-[#1a2d5c] to-[#0B1A3A] text-white min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97B2B] opacity-10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C9A961] opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D97B2B] opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 md:gap-2 mb-3 md:mb-4 px-2.5 md:px-3 py-1 md:py-1.5 bg-[#D97B2B]/20 backdrop-blur-sm border border-[#D97B2B]/30 text-[#D97B2B] rounded-full text-xs font-medium">
              <Sparkles size={12} className="md:w-[14px] md:h-[14px]" />
              <span>Sacred Journey Awaits</span>
            </div>

            {/* Main heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 leading-tight text-balance">
              Discover the Spiritual Essence of{' '}
              <span className="text-[#D97B2B]">Ayodhya</span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-5 md:mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed text-balance">
              Embark on a transformative pilgrimage experience. Explore sacred temples, connect with ancient traditions, and create unforgettable spiritual memories.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-2.5 md:gap-3 justify-center lg:justify-start mb-6 md:mb-8 items-center sm:items-start">
              <Link
                href="/explore"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-[#D97B2B] text-white rounded-xl font-semibold hover:bg-[#c86a1a] transition-all hover:shadow-2xl hover:shadow-[#D97B2B]/30 group text-sm md:text-base whitespace-nowrap h-10 md:h-12 w-[180px] sm:w-auto"
              >
                Explore Attractions
                <ChevronRight size={16} className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/plan-and-book"
                className="inline-flex items-center justify-center px-4 py-2 md:px-6 md:py-3 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all hover:shadow-xl text-sm md:text-base whitespace-nowrap h-10 md:h-12 w-[180px] sm:w-auto"
              >
                Plan Your Trip
              </Link>
            </div>

            {/* Hero stats */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 lg:gap-6 max-w-xl mx-auto lg:mx-0">
              {[
                { number: '12+', label: 'Sacred Sites' },
                { number: '10K+', label: 'Happy Pilgrims' },
                { number: '24/7', label: 'Support' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center lg:text-left">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#D97B2B]">{stat.number}</div>
                  <div className="text-xs text-gray-300 mt-0.5 md:mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="relative aspect-square rounded-2xl shadow-2xl overflow-hidden">
                <Image
                  src="/RamMandir/7.jpeg"
                  alt="Ayodhya Spiritual Journey - Ram Mandir"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white text-[#0B1A3A] px-4 md:px-6 py-3 md:py-4 rounded-xl shadow-xl border border-[#e8e6e1]">
                <div className="text-xl md:text-2xl font-bold text-[#D97B2B]">500+</div>
                <div className="text-xs md:text-sm font-medium">Guided Tours</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
