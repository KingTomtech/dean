import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import { CartProvider } from './context/CartContext'

// Placeholder pages (to be implemented)
const Manufacturing = () => (
  <div className="min-h-screen py-12">
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Manufacturing & Custom Orders</h1>
      <p className="text-gray-600 mb-6">Request custom mattresses and foam products.</p>
      <div className="card max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Our Manufacturing Services</h2>
        <ul className="space-y-2 text-gray-700">
          <li>✓ Custom-size foam mattresses</li>
          <li>✓ Spring mattresses (all sizes)</li>
          <li>✓ Divan bases with storage</li>
          <li>✓ Foam sheets and rolls</li>
          <li>✓ Orthopedic mattresses</li>
        </ul>
        <div className="mt-6">
          <a
            href="https://wa.me/260776885851?text=Hello,%20I%20would%20like%20to%20inquire%20about%20custom%20mattress%20manufacturing"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-block"
          >
            <img src="/images/whatsapp-icon.svg" alt="WhatsApp" className="w-4 h-4 inline mr-2" />
            Request Quote on WhatsApp
          </a>
        </div>
      </div>
    </div>
  </div>
)

const Admin = () => (
  <div className="min-h-screen py-12">
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">Manage products, orders, and inventory.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card p-6 cursor-pointer hover:shadow-lg transition-shadow">
          <img src="/images/box-icon.svg" alt="Products" className="w-12 h-12 mx-auto mb-3" />
          <h3 className="font-semibold text-lg">Products</h3>
          <p className="text-sm text-gray-600">Manage catalog</p>
        </div>
        <div className="card p-6 cursor-pointer hover:shadow-lg transition-shadow">
          <img src="/images/cart-icon.svg" alt="Orders" className="w-12 h-12 mx-auto mb-3" />
          <h3 className="font-semibold text-lg">Orders</h3>
          <p className="text-sm text-gray-600">View and manage orders</p>
        </div>
        <div className="card p-6 cursor-pointer hover:shadow-lg transition-shadow">
          <img src="/images/analytics-icon.svg" alt="Analytics" className="w-12 h-12 mx-auto mb-3" />
          <h3 className="font-semibold text-lg">Analytics</h3>
          <p className="text-sm text-gray-600">Sales and reports</p>
        </div>
        <div className="card p-6 cursor-pointer hover:shadow-lg transition-shadow">
          <img src="/images/customers-icon.svg" alt="Customers" className="w-12 h-12 mx-auto mb-3" />
          <h3 className="font-semibold text-lg">Customers</h3>
          <p className="text-sm text-gray-600">Customer management</p>
        </div>
        <div className="card p-6 cursor-pointer hover:shadow-lg transition-shadow">
          <img src="/images/factory-icon.svg" alt="Production" className="w-12 h-12 mx-auto mb-3" />
          <h3 className="font-semibold text-lg">Production</h3>
          <p className="text-sm text-gray-600">Track manufacturing</p>
        </div>
        <div className="card p-6 cursor-pointer hover:shadow-lg transition-shadow">
          <img src="/images/vouchers-icon.svg" alt="Vouchers" className="w-12 h-12 mx-auto mb-3" />
          <h3 className="font-semibold text-lg">Vouchers</h3>
          <p className="text-sm text-gray-600">Discount codes</p>
        </div>
      </div>
    </div>
  </div>
)

const About = () => (
  <div className="min-h-screen py-12">
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">About Rapid Stores</h1>
      <p className="text-gray-600 mb-6">Learn more about our company and mission.</p>
      <div className="card max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-700 mb-4">
          Founded in 2018, Rapid Stores and General Dealers Ltd has grown to become a leading 
          multi-sector business in Mansa, Zambia. We specialize in manufacturing high-quality 
          foam and spring mattresses, divan bases, and foam products, while also providing 
          essential retail goods and logistics services.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="text-center">
            <img src="/images/manufacturing-icon.svg" alt="Manufacturing" className="w-12 h-12 mx-auto mb-2" />
            <h4 className="font-semibold text-rapid-primary">Manufacturing</h4>
            <p className="text-sm text-gray-600 mt-1">Custom mattresses and foam products</p>
          </div>
          <div className="text-center">
            <img src="/images/retail-icon.svg" alt="Retail" className="w-12 h-12 mx-auto mb-2" />
            <h4 className="font-semibold text-rapid-primary">Retail</h4>
            <p className="text-sm text-gray-600 mt-1">Household goods and essentials</p>
          </div>
          <div className="text-center">
            <img src="/images/supply-icon.svg" alt="Supply & Logistics" className="w-12 h-12 mx-auto mb-2" />
            <h4 className="font-semibold text-rapid-primary">Supply & Logistics</h4>
            <p className="text-sm text-gray-600 mt-1">B2B and B2C bulk supply</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const Checkout = () => (
  <div className="min-h-screen py-12">
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Checkout</h1>
      <p className="text-gray-600 mb-6">Complete your order.</p>
      <div className="card max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <p className="text-gray-700 mb-4">
          For now, please use WhatsApp to complete your order. Full checkout functionality coming soon.
        </p>
        <a
          href="https://wa.me/260970000000?text=Hello,%20I%20would%20like%20to%20complete%20my%20checkout"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-block"
        >
          <img src="/images/whatsapp-icon.svg" alt="WhatsApp" className="w-4 h-4 inline mr-2" />
          Complete Order on WhatsApp
        </a>
      </div>
    </div>
  </div>
)

const Contact = () => (
  <div className="min-h-screen py-12">
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <div className="space-y-4">
            <div>
              <p className="font-medium flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Location
              </p>
              <p className="text-gray-600">Mansa, Zambia</p>
            </div>
            <div>
              <p className="font-medium flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Phone
              </p>
              <p className="text-gray-600">+260 776 885 851</p>
            </div>
            <div>
              <p className="font-medium flex items-center">
                <img src="/images/whatsapp-icon.svg" alt="WhatsApp" className="w-4 h-4 mr-2" />
                WhatsApp
              </p>
              <p className="text-gray-600">+260 776 885 851</p>
            </div>
            <div>
              <p className="font-medium flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email
              </p>
              <p className="text-gray-600">info@rapidstores.co.zm</p>
            </div>
          </div>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
          <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full px-4 py-2 border rounded-lg" />
            <input type="tel" placeholder="Phone Number" className="w-full px-4 py-2 border rounded-lg" />
            <textarea placeholder="Message" rows="4" className="w-full px-4 py-2 border rounded-lg"></textarea>
            <button type="submit" className="bg-rapid-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
)

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/manufacturing" element={<Manufacturing />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="bg-rapid-dark text-white py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Rapid Stores</h3>
                <p className="text-gray-400 text-sm">
                  Your trusted partner for quality mattresses, furniture, and household essentials in Mansa, Zambia.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/" className="hover:text-white">Home</a></li>
                  <li><a href="/products" className="hover:text-white">Products</a></li>
                  <li><a href="/manufacturing" className="hover:text-white">Manufacturing</a></li>
                  <li><a href="/contact" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Payment Methods</h4>
                <div className="flex flex-wrap gap-2">
                  <img src="/images/mtn-logo.svg" alt="MTN MoMo" className="h-8 w-auto" />
                  <img src="/images/airtel-logo.svg" alt="Airtel Money" className="h-8 w-auto" />
                  <img src="/images/zamtel-logo.svg" alt="Zamtel" className="h-8 w-auto" />
                  <img src="/images/lenco-logo.svg" alt="Lenco" className="h-8 w-auto" />
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2026 Rapid Stores and General Dealers Ltd. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  )
}

export default App
