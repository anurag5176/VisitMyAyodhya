'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'

export default function Header() {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Explore', href: '/explore' },
    { label: 'Plan & Book', href: '/plan-and-book' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e8e6e1] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between items-center h-20 md:h-16 lg:h-20">
          {/* Mobile Menu Button - Left */}
          <div className="md:hidden">
            <div className="w-10"></div>
          </div>

          {/* Logo - Centered on Mobile, Left on Desktop */}
          <Link href="/" className="absolute md:relative md:left-0 left-1/2 transform md:transform-none -translate-x-1/2 md:translate-x-0 group">
            <span className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-[#0B1A3A] group-hover:text-[#D97B2B] transition-colors">Visit My Ayodhya</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-4 lg:gap-6 xl:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#2c3e50] font-medium hover:text-[#D97B2B] transition-colors relative group text-sm lg:text-base"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D97B2B] group-hover:w-full transition-all"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <Link
            href="/plan-and-book"
            className="hidden md:inline-block px-4 md:px-5 lg:px-6 py-1.5 md:py-2 bg-[#D97B2B] text-white rounded-lg md:rounded-xl font-semibold hover:bg-[#c86a1a] transition-all hover:shadow-lg hover:shadow-[#D97B2B]/30 text-sm md:text-base"
          >
            Book Now
          </Link>

          {/* Mobile Menu Button - Right */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="p-2 text-[#0B1A3A]"
                  aria-label="Toggle menu"
                >
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[75%] bg-white p-0 flex flex-col">
                <SheetHeader className="px-6 pt-8 pb-6 border-b border-[#e8e6e1] pr-12">
                  <SheetTitle className="text-left text-lg font-bold text-[#0B1A3A]">
                    Visit My Ayodhya
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col px-6 py-8 flex-1">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[#2c3e50] font-medium hover:text-[#D97B2B] transition-colors py-4 text-lg border-b border-[#e8e6e1] last:border-b-0"
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="px-6 pb-8 pt-4 border-t border-[#e8e6e1]">
                  <SheetClose asChild>
                    <Link
                      href="/plan-and-book"
                      className="w-full px-6 py-4 bg-[#D97B2B] text-white rounded-xl font-semibold hover:bg-[#c86a1a] transition-all text-center block"
                    >
                      Book Now
                    </Link>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
