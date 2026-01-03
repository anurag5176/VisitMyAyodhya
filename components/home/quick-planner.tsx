'use client'

import { useState } from 'react'
import { Calendar, Users, MapPin, Building2, Clock, Heart } from 'lucide-react'

export default function QuickPlanner() {
  const [formData, setFormData] = useState({
    visitDate: '',
    numberOfPeople: '1',
    interestArea: 'all',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission logic
  }

  return (
    <section className="py-10 md:py-14 lg:py-16 bg-gradient-to-b from-white to-[#F8F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B1A3A] mb-2 md:mb-3">
            Plan Your Spiritual Journey
          </h2>
          <p className="text-[#7f8c8d] text-sm sm:text-base md:text-lg">
            Get personalized recommendations in just a few clicks
          </p>
        </div>

        {/* Quick Planner Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-white rounded-xl md:rounded-2xl shadow-xl p-5 md:p-6 lg:p-8 border-2 border-[#e8e6e1]"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6 mb-6 md:mb-8">
            {/* Date Input */}
            <div className="flex flex-col">
              <label className="block text-xs md:text-sm font-semibold text-[#0B1A3A] mb-2 md:mb-3 flex items-center gap-1.5 md:gap-2">
                <Calendar size={16} className="md:w-[18px] md:h-[18px] text-[#D97B2B]" />
                When?
              </label>
              <input
                type="date"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleChange}
                className="w-full h-11 md:h-12 px-3 md:px-4 border border-[#e8e6e1] rounded-lg focus:outline-none focus:border-[#D97B2B] focus:ring-2 focus:ring-[#D97B2B]/20 transition-all text-sm md:text-base overflow-hidden"
                required
              />
            </div>

            {/* Guests Input */}
            <div className="flex flex-col">
              <label className="block text-xs md:text-sm font-semibold text-[#0B1A3A] mb-2 md:mb-3 flex items-center gap-1.5 md:gap-2">
                <Users size={16} className="md:w-[18px] md:h-[18px] text-[#D97B2B]" />
                Number of People
              </label>
              <input
                type="number"
                name="numberOfPeople"
                min="1"
                max="50"
                value={formData.numberOfPeople}
                onChange={handleChange}
                placeholder="No. of people"
                className="w-full h-11 md:h-12 px-3 md:px-4 border border-[#e8e6e1] rounded-lg focus:outline-none focus:border-[#D97B2B] focus:ring-2 focus:ring-[#D97B2B]/20 transition-all text-sm md:text-base placeholder:text-gray-400 overflow-hidden"
              />
            </div>

            {/* Interest Area */}
            <div className="flex flex-col">
              <label className="block text-xs md:text-sm font-semibold text-[#0B1A3A] mb-2 md:mb-3 flex items-center gap-1.5 md:gap-2">
                <MapPin size={16} className="md:w-[18px] md:h-[18px] text-[#D97B2B]" />
                Interest Area
              </label>
              <select
                name="interestArea"
                value={formData.interestArea}
                onChange={handleChange}
                className="w-full h-11 md:h-12 px-3 md:px-4 border border-[#e8e6e1] rounded-lg focus:outline-none focus:border-[#D97B2B] focus:ring-2 focus:ring-[#D97B2B]/20 transition-all bg-white text-sm md:text-base truncate"
              >
                <option value="all">All Attractions</option>
                <option value="temples">Temples</option>
                <option value="cultural">Cultural Sites</option>
                <option value="heritage">Heritage Sites</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full md:w-auto px-6 md:px-8 py-3 md:py-4 bg-[#D97B2B] text-white font-semibold rounded-xl hover:bg-[#c86a1a] transition-all hover:shadow-xl hover:shadow-[#D97B2B]/30 text-sm md:text-base"
            >
              Get Personalized Recommendations
            </button>
          </div>
        </form>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 lg:gap-6 mt-10 md:mt-12 lg:mt-16">
          {[
            {
              icon: Building2,
              title: 'Expert Guides',
              description: 'Local experts who know every corner of Ayodhya',
            },
            {
              icon: Clock,
              title: 'Flexible Scheduling',
              description: 'Plan your itinerary at your own pace',
            },
            {
              icon: Heart,
              title: 'Authentic Experience',
              description: 'Connect deeply with spiritual traditions',
            },
          ].map((card, idx) => {
            const IconComponent = card.icon
            return (
              <div key={idx} className="bg-white rounded-lg md:rounded-xl p-4 md:p-5 lg:p-6 text-center border border-[#e8e6e1] hover:shadow-lg transition-all">
                <div className="flex justify-center mb-2 md:mb-3">
                  <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-[#D97B2B]" />
                </div>
                <h3 className="font-semibold text-[#0B1A3A] mb-1.5 md:mb-2 text-sm md:text-base">{card.title}</h3>
                <p className="text-[#7f8c8d] text-xs md:text-sm">{card.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
