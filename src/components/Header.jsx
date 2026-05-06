import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const Header = () => {
  const { getItemCount } = useCart()
  const itemCount = getItemCount()

  return (
    <header className="bg-rapid-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/images/store-icon.svg" alt="Store" className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold">Rapid Stores</h1>
              <p className="text-xs text-green-100">Mansa, Zambia</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-green-100 transition-colors">Home</Link>
            <Link to="/products" className="hover:text-green-100 transition-colors">Products</Link>
            <Link to="/manufacturing" className="hover:text-green-100 transition-colors">Manufacturing</Link>
            <Link to="/about" className="hover:text-green-100 transition-colors">About</Link>
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <img src="/images/cart-icon.svg" alt="Cart" className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-rapid-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
            
            <Link to="/admin" className="text-sm bg-white text-rapid-primary px-3 py-1 rounded-lg font-medium hover:bg-green-50 transition-colors">
              Admin
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden flex items-center justify-center space-x-4 mt-3 pt-3 border-t border-green-700">
          <Link to="/" className="text-sm hover:text-green-100 transition-colors">Home</Link>
          <Link to="/products" className="text-sm hover:text-green-100 transition-colors">Products</Link>
          <Link to="/manufacturing" className="text-sm hover:text-green-100 transition-colors">Mattresses</Link>
          <Link to="/contact" className="text-sm hover:text-green-100 transition-colors">Contact</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
