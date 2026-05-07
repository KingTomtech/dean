import React, { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { db } from '../services/supabase'

const defaultCategories = ['All', 'Mattresses', 'Furniture', 'Groceries', 'Foam Products']

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState(defaultCategories)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadCategories()
    loadProducts()
  }, [])

  useEffect(() => {
    if (selectedCategory === 'All') {
      loadProducts()
    } else {
      loadProductsByCategory(selectedCategory)
    }
  }, [selectedCategory])

  const loadCategories = async () => {
    try {
      const categoryData = await db.categories.getAll()
      if (categoryData?.length) {
        setCategories(['All', ...categoryData.map((category) => category.name)])
      }
    } catch (err) {
      console.error('Failed to load categories:', err)
    }
  }

  const loadProducts = async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await db.products.getAll()
      setProducts(data)
    } catch (err) {
      console.error('Failed to load products:', err)
      setError('Unable to load products right now. Please try again later.')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const loadProductsByCategory = async (category) => {
    setLoading(true)
    setError(null)

    try {
      const data = await db.products.getByCategory(category)
      setProducts(data)
    } catch (err) {
      console.error(`Failed to load products for category ${category}:`, err)
      setError('Unable to load products right now. Please try again later.')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description ?? '').toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rapid-primary mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading products...</p>
          </div>
        </div>
      </div>
    )
  }

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
            {categories.map((category) => (
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
          Showing {filteredProducts.length} of {products.length} products
        </p>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
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
