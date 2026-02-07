import Link from 'next/link'
import Image from 'next/image'
import { attractions } from '@/lib/attractions-data'
import { ArrowRight, MapPin, Clock } from 'lucide-react'
import { ImagePlaceholder } from '@/components/ui/image-placeholder'

export default function FeaturedAttractions() {
  const featured = attractions.slice(0, 3)

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-[#F8F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12 lg:mb-16">
          <div className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-[#D97B2B]/10 text-[#D97B2B] rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4">
            Must Visit
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0B1A3A] mb-3 md:mb-4">
            Featured Attractions
          </h2>
          <p className="text-[#7f8c8d] text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
            Discover the most sacred and iconic sites of Ayodhya that have been drawing pilgrims for centuries
          </p>
        </div>

        {/* Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 md:gap-9 lg:gap-10 mb-8 md:mb-10 lg:mb-12">
          {featured.map((attraction, idx) => (
            <Link
              key={attraction.slug}
              href={`/explore/${attraction.slug}`}
              className="group"
            >
              <div className="h-full bg-white rounded-2xl overflow-hidden border border-[#e8e6e1] hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                {/* Image */}
                <div className="relative overflow-hidden aspect-video">
                  {attraction.slug === 'ram-mandir' ? (
                    <Image
                      src="/RamMandir/3.jpeg"
                      alt={attraction.name}
                      fill
                      className="object-cover rounded-t-2xl group-hover:scale-110 transition-transform duration-500"
                      priority={idx === 0}
                    />
                  ) : attraction.slug === 'hanuman-garhi' ? (
                    <Image
                      src="/hanuman-garhi2.jpg"
                      alt={attraction.name}
                      fill
                      className="object-cover rounded-t-2xl group-hover:scale-110 transition-transform duration-500"
                      priority={idx === 0}
                    />
                  ) : attraction.slug === 'kanak-bhawan' ? (
                    <Image
                      src="/kanakbhawan1.jpeg"
                      alt={attraction.name}
                      fill
                      className="object-cover rounded-t-2xl group-hover:scale-110 transition-transform duration-500"
                      priority={idx === 0}
                    />
                  ) : attraction.slug === 'nageshwarnath-temple' ? (
                    <Image
                      src="/nageshwar3.jpg"
                      alt={attraction.name}
                      fill
                      className="object-cover rounded-t-2xl group-hover:scale-110 transition-transform duration-500"
                      priority={idx === 0}
                    />
                  ) : attraction.slug === 'tulsi-das-birthplace' ? (
                    <Image
                      src="/tulsi2.jpg"
                      alt={attraction.name}
                      fill
                      className="object-cover rounded-t-2xl group-hover:scale-110 transition-transform duration-500"
                      priority={idx === 0}
                    />
                  ) : attraction.slug === 'ghat-ghats' ? (
                    <Image
                      src="/ghats1.jpg"
                      alt={attraction.name}
                      fill
                      className="object-cover rounded-t-2xl group-hover:scale-110 transition-transform duration-500"
                      priority={idx === 0}
                    />
                  ) : (
                    <ImagePlaceholder
                      aspectRatio="video"
                      size="lg"
                      icon={attraction.icon}
                      className="rounded-t-2xl group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#0B1A3A] text-xs font-bold rounded-full uppercase">
                      {attraction.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-5 lg:p-6 flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0B1A3A] mb-2 md:mb-3 group-hover:text-[#D97B2B] transition-colors">
                    {attraction.name}
                  </h3>
                  <p className="text-[#7f8c8d] text-xs sm:text-sm md:text-base mb-3 md:mb-4 line-clamp-2 flex-1">
                    {attraction.shortDescription}
                  </p>

                  {/* Quick Info */}
                  {attraction.location && (
                    <div className="flex items-center gap-1.5 md:gap-2 text-[#7f8c8d] text-xs mb-3 md:mb-4">
                      <MapPin size={12} className="md:w-[14px] md:h-[14px]" />
                      <span className="truncate">{attraction.location}</span>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex items-center gap-1.5 md:gap-2 text-[#D97B2B] font-semibold group-hover:gap-2 md:group-hover:gap-3 transition-all mt-auto text-sm md:text-base">
                    Explore Details
                    <ArrowRight size={16} className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 md:gap-2 px-5 md:px-6 py-2.5 md:py-3 bg-[#D97B2B] text-white font-semibold rounded-full hover:bg-[#c86a1a] transition-all hover:shadow-lg hover:shadow-[#D97B2B]/30 group text-sm md:text-base"
          >
            View All Attractions
            <ArrowRight size={16} className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
