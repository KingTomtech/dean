import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../services/productStore'

const allCategories = ['All', 'Mattresses', 'Furniture', 'Groceries', 'Foam Products']

const Products = () => {
  const [searchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat && allCategories.includes(cat)) setSelectedCategory(cat)
  }, [searchParams])

  useEffect(() => {
    setLoading(true)
    getProducts().then(data => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  const filtered = products.filter(p => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description ?? '').toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Products</h1>
          <p className="text-gray-600">Browse our complete catalog of quality products</p>
        </div>

        <div className="mb-6 space-y-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rapid-primary"
            aria-label="Search products"
          />
          <div className="flex flex-wrap gap-2">
            {allCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-rapid-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Showing {filtered.length} of {products.length} products
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(product => (
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
