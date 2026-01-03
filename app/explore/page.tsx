import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import AttractionsHero from '@/components/explore/attractions-hero'
import AttractionsGrid from '@/components/explore/attractions-grid'
import CTASection from '@/components/home/cta-section'

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AttractionsHero />
        <AttractionsGrid />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
