import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import ContactHero from '@/components/contact/contact-hero'
import ContactForm from '@/components/about/contact-form'

export const metadata = {
  title: 'Contact Us | Visit My Ayodhya',
  description: 'Get in touch with Visit My Ayodhya. We\'re here to help you plan your spiritual journey to Ayodhya.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ContactHero />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
