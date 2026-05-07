import React from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

// Sample products (will be replaced with API data)
const sampleProducts = [
  {
    id: 1,
    name: 'Single Foam Mattress',
    price: 450,
    category: 'Mattresses',
    description: 'High-quality foam mattress for single bed. Comfortable and durable.',
    stock: 25,
    image: null
  },
  {
    id: 2,
    name: 'Double Spring Mattress',
    price: 1200,
    category: 'Mattresses',
    description: 'Premium spring mattress with orthopedic support for double beds.',
    stock: 15,
    image: null
  },
  {
    id: 3,
    name: 'Divan Base - Queen',
    price: 850,
    category: 'Furniture',
    description: 'Sturdy divan base with storage compartments. Queen size.',
    stock: 8,
    image: null
  },
  {
    id: 4,
    name: 'Household Essentials Pack',
    price: 250,
    category: 'Groceries',
    description: 'Complete pack of daily household essentials including soap, detergent, and more.',
    stock: 50,
    image: null
  },
  {
    id: 5,
    name: 'Custom Foam Sheet',
    price: 180,
    category: 'Foam Products',
    description: 'Custom-cut foam sheet available in various thicknesses.',
    stock: 100,
    image: null
  },
  {
    id: 6,
    name: 'King Size Mattress',
    price: 1800,
    category: 'Mattresses',
    description: 'Luxury king size mattress with premium comfort layers.',
    stock: 5,
    image: null
  }
]

const categories = [
  { name: 'Mattresses', icon: '/images/bed-icon.svg', count: 15 },
  { name: 'Furniture', icon: '/images/chair-icon.svg', count: 8 },
  { name: 'Groceries', icon: '/images/shopping-cart-icon.svg', count: 50 },
  { name: 'Foam Products', icon: '/images/box-icon.svg', count: 30 }
]

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rapid-primary to-green-700 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Welcome to Rapid Stores
            </h1>
            <p className="text-lg md:text-xl text-green-100 mb-6">
              Your trusted partner for quality mattresses, furniture, and household essentials in Mansa, Zambia.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="bg-white text-rapid-primary px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Shop Now
              </Link>
              <Link
                to="/manufacturing"
                className="bg-rapid-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
              >
                Custom Orders
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <img src="/images/delivery-icon.svg" alt="Delivery" className="w-12 h-12 mx-auto mb-2 text-gray-600" />
              <h3 className="font-semibold text-gray-800">Pickup Available</h3>
              <p className="text-sm text-gray-600">Collect from our store</p>
            </div>
            <div className="text-center p-4">
              <img src="/images/momo.png" alt="Payment" className="w-12 h-12 mx-auto mb-2 text-gray-600" />
              <h3 className="font-semibold text-gray-800">Mobile Money</h3>
              <p className="text-sm text-gray-600">MTN, Airtel, Zamtel</p>
            </div>
            <div className="text-center p-4">
              <img src="/images/whatsapp-icon.svg" alt="WhatsApp" className="w-12 h-12 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800">WhatsApp Orders</h3>
              <p className="text-sm text-gray-600">Order via chat</p>
            </div>
            <div className="text-center p-4">
              <img src="/images/checkmark-icon.svg" alt="Quality" className="w-12 h-12 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800">Quality Guaranteed</h3>
              <p className="text-sm text-gray-600">Made in Zambia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="card text-center p-6 hover:bg-green-50 transition-colors cursor-pointer"
              >
                <img src={category.icon} alt={category.name} className="w-16 h-16 mx-auto mb-3 text-gray-600" />
                <h3 className="font-semibold text-gray-800">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} products</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
            <Link to="/products" className="text-rapid-primary font-semibold hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProducts.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
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

      {/* CTA Section */}
      <section className="py-12 bg-rapid-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Place an Order?</h2>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Order directly through WhatsApp or browse our catalog and checkout online. 
            We accept all major mobile money payments.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/260776885851"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-rapid-primary px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors flex items-center"
            >
              💬 Order on WhatsApp
            </a>
            <Link
              to="/products"
              className="bg-rapid-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
