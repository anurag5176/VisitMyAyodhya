import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import ItineraryBuilder from '@/components/plan-book/itinerary-builder'
import BookingForm from '@/components/plan-book/booking-form'

export default function PlanAndBookPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ItineraryBuilder />
        <BookingForm />
      </main>
      <Footer />
    </div>
  )
}
