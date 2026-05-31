import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../services/productStore'

const categories = [
  { name: 'Mattresses', icon: '/images/category-mattresses.png' },
  { name: 'Furniture', icon: '/images/category-furniture.png' },
  { name: 'Groceries', icon: '/images/category-groceries.png' },
  { name: 'Foam Products', icon: '/images/category-foam.png' }
]

const Home = () => {
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    getProducts().then(products => {
      const f = products.filter(p => p.featured).slice(0, 3)
      setFeatured(f.length ? f : products.slice(0, 3))
    })
  }, [])

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-rapid-primary to-blue-700 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Welcome to Rapid Stores
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-6">
              Your trusted partner for quality mattresses, furniture, and household essentials in Mansa, Zambia.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="bg-white text-rapid-primary px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Shop Now
              </Link>
              <Link to="/manufacturing" className="bg-rapid-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                Custom Orders
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
                  <rect x="4" y="20" width="40" height="14" rx="3" fill="#064789"/>
                  <rect x="8" y="16" width="32" height="6" rx="2" fill="#427aa1"/>
                  <rect x="6" y="34" width="4" height="6" rx="1" fill="#064789"/>
                  <rect x="38" y="34" width="4" height="6" rx="1" fill="#064789"/>
                  <rect x="16" y="34" width="4" height="6" rx="1" fill="#064789"/>
                  <rect x="28" y="34" width="4" height="6" rx="1" fill="#064789"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800">Pickup Available</h3>
              <p className="text-sm text-gray-600">Collect from our store</p>
            </div>
            <div className="text-center p-4">
              <img src="/images/momo.png" alt="Mobile Money" className="w-12 h-12 mx-auto mb-2 object-contain" />
              <h3 className="font-semibold text-gray-800">Mobile Money</h3>
              <p className="text-sm text-gray-600">MTN, Airtel, Zamtel</p>
            </div>
            <div className="text-center p-4">
              <img src="/images/whatsapp-icon.svg" alt="WhatsApp" className="w-12 h-12 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800">WhatsApp Orders</h3>
              <p className="text-sm text-gray-600">Order via chat</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
                  <circle cx="24" cy="24" r="20" fill="#22c55e"/>
                  <path d="M14 24l7 7 13-14" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800">Quality Guaranteed</h3>
              <p className="text-sm text-gray-600">Made in Zambia</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className="card text-center p-6 hover:bg-blue-50 transition-colors cursor-pointer"
              >
                <img src={cat.icon} alt={cat.name} className="w-16 h-16 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
            <Link to="/products" className="text-rapid-primary font-semibold hover:underline">View All →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="bg-rapid-light rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About Rapid Stores</h2>
            <p className="text-gray-700 mb-4">
              Founded in 2018, Rapid Stores and General Dealers Ltd has grown to become a leading
              multi-sector business in Mansa, Zambia. We specialize in manufacturing high-quality
              foam and spring mattresses, divan bases, and foam products, while also providing
              essential retail goods and logistics services.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-rapid-primary">🏭 Manufacturing</h4>
                <p className="text-sm text-gray-600 mt-1">Custom mattresses and foam products</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-rapid-primary">🛒 Retail</h4>
                <p className="text-sm text-gray-600 mt-1">Household goods and essentials</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-rapid-primary">🚚 Supply & Logistics</h4>
                <p className="text-sm text-gray-600 mt-1">B2B and B2C bulk supply</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-rapid-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Place an Order?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Order directly through WhatsApp or browse our catalog. We accept all major mobile money payments.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/260776885851"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-rapid-primary px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <img src="/images/whatsapp-icon.svg" alt="" className="w-5 h-5" />
              Order on WhatsApp
            </a>
            <Link to="/products" className="bg-rapid-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              Browse Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
