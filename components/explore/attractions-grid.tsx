import Link from 'next/link'
import Image from 'next/image'
import { attractions } from '@/lib/attractions-data'
import { ArrowRight, MapPin } from 'lucide-react'
import { ImagePlaceholder } from '@/components/ui/image-placeholder'

export default function AttractionsGrid() {
  return (
    <section className="py-8 md:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 md:gap-9 lg:gap-10">
          {attractions.map((attraction, index) => (
            <div key={attraction.slug} className="relative">
              <Link
                href={`/explore/${attraction.slug}`}
                className="group block"
              >
                <div className="h-full bg-white rounded-2xl overflow-hidden border border-[#e8e6e1] hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                {/* Image */}
                <div className="relative overflow-hidden aspect-video">
                  {attraction.slug === 'ram-mandir' ? (
                    <Image
                      src="/rammandir3.png"
                      alt={attraction.name}
                      fill
                      className="object-cover rounded-t-2xl group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : attraction.slug === 'hanuman-garhi' ? (
                    <Image
                      src="/hanuman-garhi2.jpg"
                      alt={attraction.name}
                      fill
                      className="object-cover rounded-t-2xl group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : attraction.slug === 'kanak-bhawan' ? (
                    <Image
                      src="/kanakbhawan1.jpeg"
                      alt={attraction.name}
                      fill
                      className="object-cover rounded-t-2xl group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : attraction.slug === 'nageshwarnath-temple' ? (
                    <Image
                      src="/nageshwar3.jpg"
                      alt={attraction.name}
                      fill
                      className="object-cover rounded-t-2xl group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : attraction.slug === 'tulsi-das-birthplace' ? (
                    <Image
                      src="/tulsi2.jpg"
                      alt={attraction.name}
                      fill
                      className="object-cover rounded-t-2xl group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : attraction.slug === 'ghat-ghats' ? (
                    <Image
                      src="/ghats1.jpg"
                      alt={attraction.name}
                      fill
                      className="object-cover rounded-t-2xl group-hover:scale-110 transition-transform duration-500"
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
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#0B1A3A] text-xs font-bold rounded-full uppercase border border-[#e8e6e1]">
                      {attraction.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-5 lg:p-6 flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0B1A3A] mb-2 group-hover:text-[#D97B2B] transition-colors">
                    {attraction.name}
                  </h3>
                  <p className="text-[#7f8c8d] text-xs sm:text-sm mb-3 md:mb-4 line-clamp-3 flex-1">
                    {attraction.shortDescription}
                  </p>

                  {/* Location */}
                  {attraction.location && (
                    <div className="flex items-center gap-1.5 md:gap-2 text-[#7f8c8d] text-xs mb-3 md:mb-4">
                      <MapPin size={12} className="md:w-[14px] md:h-[14px] flex-shrink-0" />
                      <span className="truncate">{attraction.location}</span>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex items-center gap-1.5 md:gap-2 text-[#D97B2B] font-semibold group-hover:gap-2 md:group-hover:gap-3 transition-all mt-auto text-sm md:text-base">
                    Discover More
                    <ArrowRight size={16} className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
              </Link>
              {/* Aesthetic Line Separator - Mobile (between cards) */}
              {index < attractions.length - 1 && (
                <div className="absolute -bottom-2.5 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#D97B2B]/30 to-transparent md:hidden"></div>
              )}
              {/* Aesthetic Line Separator - Tablet (vertical between columns) */}
              {index < attractions.length - 1 && index % 2 !== 1 && (
                <div className="hidden md:block lg:hidden absolute top-1/2 -right-3 transform -translate-y-1/2 w-px h-3/4 bg-gradient-to-b from-transparent via-[#D97B2B]/20 to-transparent"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
