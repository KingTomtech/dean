import React from 'react'
import { useCart } from '../context/CartContext'
import whatsappService from '../services/whatsapp'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product, 1)
  }

  const handleWhatsAppInquiry = () => {
    const message = whatsappService.generateInquiryMessage(product)
    whatsappService.openChat(message)
  }

  const handleShareProduct = () => {
    whatsappService.shareProduct(product)
  }

  return (
    <div className="card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={e => { e.target.onerror = null; e.target.src = '/images/box-icon.svg'; e.target.className = 'w-24 h-24 m-auto opacity-40'; }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <img src="/images/box-icon.svg" alt="Product" className="w-24 h-24 opacity-40" />
          </div>
        )}
        
        {/* Stock Badge */}
        {product.stock <= 0 ? (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Out of Stock
          </span>
        ) : product.stock < 10 ? (
          <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded">
            Low Stock
          </span>
        ) : null}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <span className="text-xs text-rapid-primary font-semibold uppercase tracking-wide">
          {product.category ?? 'Uncategorized'}
        </span>
        
        <h3 className="text-lg font-bold text-gray-800 mt-1 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-rapid-primary">
            ZMW {(product.price ?? product.price_zmw ?? 0).toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ZMW {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
              product.stock > 0
                ? 'bg-rapid-primary text-white hover:bg-green-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
          
          <button
            onClick={handleWhatsAppInquiry}
            className="py-2 px-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            title="Inquire via WhatsApp"
          >
            <img src="/images/whatsapp-icon.svg" alt="WhatsApp" className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleShareProduct}
            className="py-2 px-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            title="Share on WhatsApp"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
