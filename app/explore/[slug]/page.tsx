import { notFound } from 'next/navigation'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import AttractionDetail from '@/components/explore/attraction-detail'
import { attractions } from '@/lib/attractions-data'

export async function generateStaticParams() {
  return attractions.map((attraction) => ({
    slug: attraction.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const attraction = attractions.find((a) => a.slug === slug)

  if (!attraction) {
    return {
      title: 'Not Found',
    }
  }

  return {
    title: `${attraction.name} - Visit My Ayodhya`,
    description: attraction.shortDescription,
  }
}

export default async function AttractionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const attraction = attractions.find((a) => a.slug === slug)

  if (!attraction) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AttractionDetail attraction={attraction} />
      </main>
      <Footer />
    </div>
  )
}
