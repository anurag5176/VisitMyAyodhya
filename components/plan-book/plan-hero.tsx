import Image from 'next/image'

export default function PlanHero() {
  return (
    <section className="bg-gradient-to-br from-[#0B1A3A] via-[#1a2d5c] to-[#0B1A3A] text-white min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex items-center relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D97B2B] opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C9A961] opacity-10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-[#D97B2B]/20 backdrop-blur-sm border border-[#D97B2B]/30 text-[#D97B2B] rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-5 lg:mb-6">
              Plan Your Journey
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-5 lg:mb-6 leading-tight">
              Plan & <span className="text-[#D97B2B]">Book</span> Your Visit
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-6 md:mb-8">
              Create your perfect spiritual itinerary or let our expert guides plan a personalized journey tailored to your interests and schedule
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#itinerary-builder"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#D97B2B] text-white font-semibold rounded-xl hover:bg-[#c86a1a] transition-all hover:shadow-lg hover:shadow-[#D97B2B]/30"
              >
                Build Your Itinerary
              </a>
              <a
                href="#booking-form"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                Book Now
              </a>
            </div>
          </div>
          
          {/* Image */}
          <div className="hidden lg:block">
            <div className="relative aspect-square rounded-2xl shadow-2xl overflow-hidden">
              <Image
                src="/hero.png"
                alt="Plan Your Visit to Ayodhya"
                fill
                className="object-cover scale-125"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
