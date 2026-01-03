'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0B1A3A] to-[#1a2d5c] text-white pt-12 md:pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="font-bold text-xl md:text-2xl">Visit My Ayodhya</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Experience the spiritual essence of Ayodhya with our comprehensive pilgrimage guides and authentic experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-[#D97B2B]">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'Explore Attractions', href: '/explore' },
                { label: 'Plan Your Trip', href: '/plan-and-book' },
                { label: 'About Us', href: '/about' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 hover:text-[#D97B2B] transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold mb-4 text-[#D97B2B]">Information</h4>
            <ul className="space-y-3">
              <li className="flex gap-2 text-sm">
                <Phone size={16} className="flex-shrink-0 mt-1 text-[#D97B2B]" />
                <span>+91-555-0123</span>
              </li>
              <li className="flex gap-2 text-sm">
                <Mail size={16} className="flex-shrink-0 mt-1 text-[#D97B2B]" />
                <span>info@visitayodhya.com</span>
              </li>
              <li className="flex gap-2 text-sm">
                <MapPin size={16} className="flex-shrink-0 mt-1 text-[#D97B2B]" />
                <span>Ayodhya, Uttar Pradesh</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4 text-[#D97B2B]">Follow Us</h4>
            <div className="flex gap-4">
              {[
                { icon: Facebook, label: 'Facebook', href: '#' },
                { icon: Instagram, label: 'Instagram', href: '#' },
                { icon: Twitter, label: 'Twitter', href: '#' },
              ].map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-[#1a2d5c] hover:bg-[#D97B2B] transition-colors flex items-center justify-center"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#1a2d5c] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-300">
            <p>&copy; 2025 Visit My Ayodhya. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-[#D97B2B] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-[#D97B2B] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
