import { config } from '../config'

/**
 * WhatsApp Integration Service
 * Enables order placement and customer communication via WhatsApp
 */

export const whatsappService = {
  /**
   * Generate WhatsApp message for cart checkout
   * @param {Array} cartItems - Items in cart
   * @param {number} total - Total amount
   * @returns {string} Formatted WhatsApp message
   */
  generateOrderMessage: (cartItems, total) => {
    let message = `🛒 *NEW ORDER - RAPID STORES*\n\n`
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`
      message += `   Qty: ${item.quantity} x ZMW ${item.price.toFixed(2)}\n`
      message += `   Subtotal: ZMW ${(item.quantity * item.price).toFixed(2)}\n\n`
    })
    
    message += `━━━━━━━━━━━━━━━━━━━━\n`
    message += `*TOTAL: ZMW ${total.toFixed(2)}*\n\n`
    message += `📍 Pickup Location: Rapid Stores, Mansa\n`
    message += `📞 Contact: ${config.whatsapp.phoneNumber}\n\n`
    message += `Please confirm my order. Thank you! 🙏`
    
    return message
  },
  
  /**
   * Generate product inquiry message
   * @param {Object} product - Product details
   * @returns {string} Formatted inquiry message
   */
  generateInquiryMessage: (product) => {
    const message = `Hello! 👋\n\nI'm interested in:\n\n` +
      `*${product.name}*\n` +
      `Price: ZMW ${product.price.toFixed(2)}\n` +
      `Category: ${product.category}\n\n` +
      `Is this item available? Please provide more details. Thank you!`
    
    return message
  },
  
  /**
   * Open WhatsApp chat with pre-filled message
   * @param {string} message - Message to send
   * @param {string} phoneNumber - Optional custom phone number
   */
  openChat: (message, phoneNumber = null) => {
    const number = phoneNumber || config.whatsapp.phoneNumber
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${number.replace('+', '')}?text=${encodedMessage}`
    
    // Open in new tab/window
    window.open(whatsappUrl, '_blank')
  },
  
  /**
   * Share product on WhatsApp
   * @param {Object} product - Product to share
   */
  shareProduct: (product) => {
    const message = `🔥 Check out this amazing product at Rapid Stores!\n\n` +
      `*${product.name}*\n` +
      `💰 ZMW ${product.price.toFixed(2)}\n\n` +
      `${product.description || ''}\n\n` +
      `Visit Rapid Stores, Mansa to get yours! 🛒`
    
    whatsappService.openChat(message)
  },
  
  /**
   * Send order confirmation via WhatsApp
   * @param {Object} order - Order details
   */
  sendOrderConfirmation: (order) => {
    const message = `✅ *ORDER CONFIRMED*\n\n` +
      `Order ID: ${order.id}\n` +
      `Total: ZMW ${order.total.toFixed(2)}\n` +
      `Status: ${order.status}\n\n` +
      `Thank you for shopping with Rapid Stores! 🎉\n\n` +
      `We'll notify you when your order is ready for pickup.`
    
    return message
  },
  
  /**
   * Get support message template
   * @returns {string} Support request template
   */
  getSupportTemplate: () => {
    return `🆘 *CUSTOMER SUPPORT REQUEST*\n\n` +
      `Name: [Your Name]\n` +
      `Phone: [Your Phone]\n` +
      `Issue: [Describe your issue]\n\n` +
      `Order ID (if applicable): [Order ID]\n\n` +
      `Please help me with the above. Thank you!`
  }
}

export default whatsappService
