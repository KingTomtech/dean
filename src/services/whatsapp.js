import { SITE_CONFIG } from '../data/adminConfig'

export const whatsappService = {
  generateOrderMessage: (cartItems, total) => {
    let message = `🛒 *NEW ORDER - RAPID STORES*\n\n`
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`
      message += `   Qty: ${item.quantity} x ZMW ${Number(item.price).toFixed(2)}\n`
      message += `   Subtotal: ZMW ${(item.quantity * Number(item.price)).toFixed(2)}\n\n`
    })
    message += `━━━━━━━━━━━━━━━━━━━━\n`
    message += `*TOTAL: ZMW ${Number(total).toFixed(2)}*\n\n`
    message += `📍 Pickup Location: Rapid Stores, Mansa\n`
    message += `📞 Contact: ${SITE_CONFIG.whatsapp}\n\n`
    message += `Please confirm my order. Thank you! 🙏`
    return message
  },

  generateInquiryMessage: (product) => {
    return `Hello! 👋\n\nI'm interested in:\n\n` +
      `*${product.name}*\n` +
      `Price: ZMW ${Number(product.price).toFixed(2)}\n` +
      `Category: ${product.category}\n\n` +
      `Is this item available? Please provide more details. Thank you!`
  },

  openChat: (message, phoneNumber = null) => {
    const number = (phoneNumber || SITE_CONFIG.whatsapp).replace('+', '')
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
  },

  shareProduct: (product) => {
    const message = `🔥 Check out this amazing product at Rapid Stores!\n\n` +
      `*${product.name}*\n` +
      `💰 ZMW ${Number(product.price).toFixed(2)}\n\n` +
      `${product.description || ''}\n\n` +
      `Visit Rapid Stores, Mansa to get yours! 🛒`
    whatsappService.openChat(message)
  }
}

export default whatsappService
