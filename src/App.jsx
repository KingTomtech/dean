import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import AdminDashboard from './pages/admin/AdminDashboard'
import { CartProvider } from './context/CartContext'

const Manufacturing = () => (
  <div className="min-h-screen py-12">
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Manufacturing &amp; Custom Orders</h1>
      <p className="text-gray-600 mb-6">Request custom mattresses and foam products made to your exact specifications.</p>
      <div className="card max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Our Manufacturing Services</h2>
        <ul className="space-y-3 text-gray-700">
          {['Custom-size foam mattresses', 'Spring mattresses (all sizes)', 'Divan bases with storage', 'Foam sheets and rolls', 'Orthopedic mattresses'].map(s => (
            <li key={s} className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-green-600 flex-shrink-0">
                <circle cx="12" cy="12" r="10" fill="#22c55e"/>
                <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <a
            href="https://wa.me/260776885851?text=Hello,%20I%20would%20like%20to%20inquire%20about%20custom%20mattress%20manufacturing"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center gap-2"
          >
            <img src="/images/whatsapp-icon.svg" alt="" className="w-5 h-5" />
            Request Quote on WhatsApp
          </a>
        </div>
      </div>
    </div>
  </div>
)

const About = () => (
  <div className="min-h-screen py-12">
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">About Rapid Stores</h1>
      <div className="card max-w-4xl">
        <h2 className="text-xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-700 mb-4">
          Founded in 2018, Rapid Stores and General Dealers Ltd has grown to become a leading
          multi-sector business in Mansa, Zambia. We specialize in manufacturing high-quality
          foam and spring mattresses, divan bases, and foam products, while also providing
          essential retail goods and logistics services.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {[
            { icon: '🏭', title: 'Manufacturing', desc: 'Custom mattresses and foam products, made locally in Mansa.' },
            { icon: '🛒', title: 'Retail', desc: 'Household goods and essentials for everyday life.' },
            { icon: '🚚', title: 'Supply & Logistics', desc: 'Reliable B2B and B2C bulk supply across Zambia.' }
          ].map(item => (
            <div key={item.title} className="text-center bg-gray-50 p-4 rounded-lg">
              <div className="text-4xl mb-2">{item.icon}</div>
              <h4 className="font-semibold text-rapid-primary">{item.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

const Checkout = () => (
  <div className="min-h-screen py-12">
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Checkout</h1>
      <div className="card max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Complete Your Order</h2>
        <p className="text-gray-700 mb-4">
          Please use WhatsApp to complete your order and confirm payment details.
        </p>
        <a
          href="https://wa.me/260776885851?text=Hello,%20I%20would%20like%20to%20complete%20my%20checkout"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center gap-2"
        >
          <img src="/images/whatsapp-icon.svg" alt="" className="w-5 h-5" />
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
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-rapid-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <div>
                <p className="font-medium text-gray-800">Location</p>
                <p className="text-gray-600">Mansa, Luapula Province, Zambia</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-rapid-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <div>
                <p className="font-medium text-gray-800">Phone</p>
                <p className="text-gray-600">+260 776 885 851</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <img src="/images/whatsapp-icon.svg" alt="WhatsApp" className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-800">WhatsApp</p>
                <p className="text-gray-600">+260 776 885 851</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-rapid-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <div>
                <p className="font-medium text-gray-800">Email</p>
                <p className="text-gray-600">info@rapidstores.co.zm</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
          <form className="space-y-4" onSubmit={e => { e.preventDefault(); window.open('https://wa.me/260776885851', '_blank') }}>
            <input type="text" placeholder="Your Name" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rapid-primary" />
            <input type="tel" placeholder="Phone Number" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rapid-primary" />
            <textarea placeholder="Message" rows="4" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rapid-primary"></textarea>
            <button type="submit" className="bg-rapid-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
              Send via WhatsApp
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
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <footer className="bg-rapid-dark text-white py-10 mt-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-3">Rapid Stores</h3>
                <p className="text-gray-400 text-sm">
                  Your trusted partner for quality mattresses, furniture, and household essentials in Mansa, Zambia.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                  <li><a href="/products" className="hover:text-white transition-colors">Products</a></li>
                  <li><a href="/manufacturing" className="hover:text-white transition-colors">Manufacturing</a></li>
                  <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Payment Methods</h4>
                <div className="flex flex-wrap gap-3 items-center">
                  <img src="/images/mtn-logo.svg" alt="MTN MoMo" className="h-8 w-auto" />
                  <img src="/images/airtel-logo.svg" alt="Airtel Money" className="h-8 w-auto" />
                  <img src="/images/zamtel-logo.png" alt="Zamtel" className="h-8 w-auto" />
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
              <p>&copy; 2026 Rapid Stores and General Dealers Ltd. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  )
}

export default App
