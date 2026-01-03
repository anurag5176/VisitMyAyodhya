import { Heart, Award, Globe, Users, User } from 'lucide-react'

export default function AboutContent() {
  return (
    <section className="py-8 md:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Story */}
        <div className="mb-10 md:mb-14 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0B1A3A] mb-6 md:mb-8">
            Our Story
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
            <div className="prose text-[#7f8c8d] space-y-4 md:space-y-5 lg:space-y-6">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                Founded in 2012, Visit My Ayodhya emerged from a deep passion for sharing the sacred spiritual heritage of Ayodhya with pilgrims and travelers from around the world.
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                Our journey began with a simple vision: to create authentic, respectful, and transformative experiences that honor the spiritual significance of this ancient city while meeting the needs of modern travelers.
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                Today, we proudly serve as a bridge between seekers and the sacred, facilitating meaningful connections that last a lifetime.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#0B1A3A] to-[#1a2d5c] rounded-xl md:rounded-2xl p-6 md:p-8 text-white">
              <div className="space-y-4 md:space-y-5 lg:space-y-6">
                {[
                  { number: '12+', label: 'Years of Excellence' },
                  { number: '50+', label: 'Expert Guides' },
                  { number: '500+', label: 'Successful Tours' },
                  { number: '10K+', label: 'Lives Transformed' },
                ].map((stat, idx) => (
                  <div key={idx} className="pb-4 md:pb-5 lg:pb-6 border-b border-[#D97B2B]/30 last:border-b-0">
                    <div className="text-2xl sm:text-3xl font-bold text-[#D97B2B]">{stat.number}</div>
                    <div className="text-gray-300 text-xs md:text-sm mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-12 mb-10 md:mb-14 lg:mb-16">
          <div className="bg-gradient-to-br from-[#F8F6F2] to-white rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 border-2 border-[#e8e6e1] hover:border-[#D97B2B] transition-all hover:shadow-lg">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0B1A3A] mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
              <Heart size={24} className="md:w-7 md:h-7 text-[#D97B2B] flex-shrink-0" />
              Our Mission
            </h3>
            <p className="text-[#7f8c8d] leading-relaxed text-sm sm:text-base md:text-lg">
              To curate profound spiritual experiences that honor Ayodhya's sacred heritage while providing travelers with authentic, respectful, and unforgettable journeys of discovery and transformation.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#F8F6F2] to-white rounded-xl md:rounded-2xl p-5 md:p-6 lg:p-8 border-2 border-[#e8e6e1] hover:border-[#D97B2B] transition-all hover:shadow-lg">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0B1A3A] mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
              <Globe size={24} className="md:w-7 md:h-7 text-[#D97B2B] flex-shrink-0" />
              Our Vision
            </h3>
            <p className="text-[#7f8c8d] leading-relaxed text-sm sm:text-base md:text-lg">
              To become the world's most trusted guide for spiritual pilgrimage in Ayodhya, recognized for exceptional service, authentic experiences, and deep respect for cultural and spiritual traditions.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-10 md:mb-14 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#0B1A3A] mb-6 md:mb-8 lg:mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
            {[
              {
                icon: Heart,
                title: 'Reverence',
                description: 'Deep respect for spiritual traditions and sacred spaces',
              },
              {
                icon: Award,
                title: 'Excellence',
                description: 'Commitment to highest standards in service and experience',
              },
              {
                icon: Users,
                title: 'Community',
                description: 'Building meaningful connections between people and places',
              },
              {
                icon: Globe,
                title: 'Authenticity',
                description: 'Genuine, unfiltered experiences grounded in truth',
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#e8e6e1] rounded-lg md:rounded-xl p-4 md:p-5 lg:p-6 text-center hover:shadow-lg transition-all"
              >
                <value.icon size={28} className="md:w-8 md:h-8 text-[#D97B2B] mx-auto mb-3 md:mb-4" />
                <h4 className="font-bold text-[#0B1A3A] mb-1.5 md:mb-2 text-sm md:text-base">{value.title}</h4>
                <p className="text-xs md:text-sm text-[#7f8c8d]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gradient-to-br from-[#0B1A3A] to-[#1a2d5c] text-white rounded-xl md:rounded-2xl p-8 md:p-10 lg:p-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-center">Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                name: 'Prashant Srivastava',
                role: 'Founder & CEO',
                bio: 'Pilgrimage expert with 20+ years of experience guiding spiritual seekers',
              },
              {
                name: 'Priya Sharma',
                role: 'Operations Manager',
                bio: 'Ensures every guest receives exceptional care and unforgettable experiences',
              },
              {
                name: 'Amit Verma',
                role: 'Guide Coordinator',
                bio: "Passionate about preserving Ayodhya's cultural and spiritual heritage",
              },
            ].map((member, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#D97B2B] to-[#C9A961] rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center">
                  <User className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h4 className="text-base md:text-lg font-bold mb-1">{member.name}</h4>
                <div className="text-[#D97B2B] font-semibold text-xs md:text-sm mb-2 md:mb-3">
                  {member.role}
                </div>
                <p className="text-gray-300 text-xs md:text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
