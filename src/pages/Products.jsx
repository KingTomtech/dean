import React, { useState } from 'react'
import ProductCard from '../components/ProductCard'

// Sample products (will be replaced with API data)
const allProducts = [
  { id: 1, name: 'Single Foam Mattress', price: 450, category: 'Mattresses', description: 'High-quality foam mattress for single bed.', stock: 25 },
  { id: 2, name: 'Double Spring Mattress', price: 1200, category: 'Mattresses', description: 'Premium spring mattress with orthopedic support.', stock: 15 },
  { id: 3, name: 'Divan Base - Queen', price: 850, category: 'Furniture', description: 'Sturdy divan base with storage compartments.', stock: 8 },
  { id: 4, name: 'Household Essentials Pack', price: 250, category: 'Groceries', description: 'Complete pack of daily household essentials.', stock: 50 },
  { id: 5, name: 'Custom Foam Sheet', price: 180, category: 'Foam Products', description: 'Custom-cut foam sheet in various thicknesses.', stock: 100 },
  { id: 6, name: 'King Size Mattress', price: 1800, category: 'Mattresses', description: 'Luxury king size mattress with premium comfort.', stock: 5 },
  { id: 7, name: 'Office Chair', price: 650, category: 'Furniture', description: 'Ergonomic office chair with lumbar support.', stock: 12 },
  { id: 8, name: 'Foam Pillow', price: 80, category: 'Foam Products', description: 'Comfortable foam pillow for better sleep.', stock: 40 }
]

const categories = ['All', 'Mattresses', 'Furniture', 'Groceries', 'Foam Products']

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Products</h1>
          <p className="text-gray-600">Browse our complete catalog of quality products</p>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rapid-primary"
          />

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-rapid-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-600 mb-4">
          Showing {filteredProducts.length} of {allProducts.length} products
        </p>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
