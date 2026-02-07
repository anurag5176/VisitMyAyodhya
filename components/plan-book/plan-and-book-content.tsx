'use client'

import { useState } from 'react'
import ItineraryBuilder from '@/components/plan-book/itinerary-builder'
import BookingForm from '@/components/plan-book/booking-form'

export default function PlanAndBookContent() {
  const [selectedAttractions, setSelectedAttractions] = useState<string[]>([])

  return (
    <>
      <ItineraryBuilder
        selectedAttractions={selectedAttractions}
        setSelectedAttractions={setSelectedAttractions}
      />
      <BookingForm selectedAttractions={selectedAttractions} />
    </>
  )
}
