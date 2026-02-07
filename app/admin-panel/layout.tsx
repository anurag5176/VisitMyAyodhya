import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Panel | Visit My Ayodhya',
  description: 'Admin panel for leads.',
  robots: 'noindex, nofollow',
}

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
