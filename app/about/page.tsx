import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import AboutHero from '@/components/about/about-hero'
import AboutContent from '@/components/about/about-content'
import ContactForm from '@/components/about/contact-form'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AboutHero />
        <AboutContent />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
