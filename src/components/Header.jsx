import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Header = () => {
  const { getItemCount } = useCart()
  const itemCount = getItemCount()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/manufacturing', label: 'Manufacturing' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-rapid-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <img src="/images/store-icon.png" alt="Store" className="w-9 h-9 rounded-lg object-cover" />
            <div>
              <h1 className="text-xl font-bold leading-tight">Rapid Stores</h1>
              <p className="text-xs text-blue-200 leading-none">Mansa, Zambia</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.to) ? 'bg-white/20 text-white' : 'text-blue-100 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <Link to="/cart" className="relative p-2 hover:bg-white/10 rounded-lg transition-colors" aria-label="Shopping cart">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.1 15h9.5c.7 0 1.3-.4 1.6-1l3.5-6.3A1 1 0 0020.8 6H5.21L4.27 4H1v2h2l3.6 7.59L5.25 16c-.22.43-.35.92-.35 1.43C4.9 19 5.9 20 7.1 20h11.9v-2H7.42c-.13 0-.23-.11-.23-.23l.03-.15.9-1.62z"/>
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-gray-900 text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden mt-3 pt-3 border-t border-white/20 flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.to) ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
