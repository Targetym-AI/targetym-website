'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Solutions', href: '/solutions' },
    // { name: "Cas d'Usage", href: '/case-studies' }, // Masqué — réactiver quand les vraies case studies seront prêtes
    { name: 'Blog', href: '/blog' },
    { name: 'Ressources', href: '/resources' },
    { name: 'Tarification', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/logo-targetym-dark.png"
                alt="Targetym AI"
                width={150}
                height={40}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors"
            >
              Connexion
            </Link>
            <Link
              href="/login?tab=register"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Essai Gratuit
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[280px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <Image
            src="/logo-targetym-dark.png"
            alt="Targetym AI"
            width={130}
            height={35}
            className="object-contain"
          />
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col px-6 py-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="py-3 px-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg text-sm font-medium transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className="px-6 py-4 border-t border-gray-200 mt-auto space-y-3">
          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center py-2.5 text-primary-600 font-medium text-sm"
          >
            Connexion
          </Link>
          <Link
            href="/login?tab=register"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center py-2.5 bg-primary-500 text-white rounded-lg font-medium text-sm hover:bg-primary-600 transition-colors"
          >
            Essai Gratuit
          </Link>
        </div>
      </div>
    </header>
  );
}
