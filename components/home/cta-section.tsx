import Link from 'next/link'
import { Mail } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="py-10 md:py-14 lg:py-20 bg-gradient-to-r from-[#D97B2B] via-[#e88c4a] to-[#c86a1a] text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-5 lg:mb-6 leading-tight">
          Ready to Begin Your Spiritual Journey?
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of pilgrims who have discovered the transformative power of Ayodhya's sacred sites.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          <Link
            href="/plan-and-book"
            className="px-6 md:px-8 py-3 md:py-4 bg-white text-[#D97B2B] font-semibold rounded-xl hover:bg-gray-100 transition-all hover:shadow-2xl hover:scale-105 text-sm md:text-base"
          >
            Start Booking Now
          </Link>
          <Link
            href="/about"
            className="px-6 md:px-8 py-3 md:py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/30 transition-all hover:scale-105 text-sm md:text-base"
          >
            Learn More About Us
          </Link>
        </div>

        {/* Contact Info */}
        <div className="mt-8 md:mt-10 lg:mt-12 pt-8 md:pt-10 lg:pt-12 border-t border-white/20 flex flex-col sm:flex-row justify-center gap-4 md:gap-6 text-white/90 text-sm md:text-base">
          <div className="flex items-center justify-center gap-1.5 md:gap-2">
            <Mail size={18} className="md:w-5 md:h-5" />
            <span>info@visitayodhya.com</span>
          </div>
          <div className="hidden sm:block">•</div>
          <div>+91-555-0123</div>
        </div>
      </div>
    </section>
  )
}
