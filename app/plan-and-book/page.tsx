import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import PlanHero from '@/components/plan-book/plan-hero'
import PlanAndBookContent from '@/components/plan-book/plan-and-book-content'

export const metadata = {
  title: 'Plan & Book Your Visit | Visit My Ayodhya',
  description: 'Build your perfect spiritual itinerary or let our expert guides plan a personalized journey to Ayodhya.',
}

export default function PlanAndBookPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <PlanHero />
        <PlanAndBookContent />
      </main>
      <Footer />
    </div>
  )
}
