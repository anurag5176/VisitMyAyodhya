import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import Hero from '@/components/home/hero'
import QuickPlanner from '@/components/home/quick-planner'
import FeaturedAttractions from '@/components/home/featured-attractions'
import TrustSection from '@/components/home/trust-section'
import CTASection from '@/components/home/cta-section'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="relative">
        <Hero />
        <QuickPlanner />
        <FeaturedAttractions />
        <TrustSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
