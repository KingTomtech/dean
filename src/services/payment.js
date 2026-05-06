import axios from 'axios'
import { config } from '../config'

/**
 * Payment Service for Zambian Mobile Money Providers
 * Supports MTN, Airtel, Zamtel, and Lenco Pay
 */

export const paymentService = {
  /**
   * Initialize payment request
   * @param {Object} paymentData - Payment details
   * @returns {Promise<Object>} Payment response
   */
  initiatePayment: async (paymentData) => {
    const { amount, provider, phoneNumber, orderId } = paymentData
    
    try {
      // In production, this would call the actual payment gateway APIs
      // For now, we simulate the payment flow
      
      const paymentRequest = {
        amount,
        currency: config.payment.currency,
        provider,
        phoneNumber,
        orderId,
        timestamp: new Date().toISOString()
      }
      
      // Simulate API call to payment provider
      // Replace with actual API calls for each provider
      const response = await simulatePaymentAPI(paymentRequest)
      
      return {
        success: true,
        transactionId: response.transactionId,
        message: `Payment initiated via ${provider}. Check your phone to complete payment.`,
        data: response
      }
    } catch (error) {
      console.error('Payment initiation failed:', error)
      return {
        success: false,
        message: 'Failed to initiate payment. Please try again.',
        error: error.message
      }
    }
  },
  
  /**
   * Verify payment status
   * @param {string} transactionId - Transaction ID
   * @returns {Promise<Object>} Payment verification result
   */
  verifyPayment: async (transactionId) => {
    try {
      // Simulate payment verification
      const response = await simulateVerificationAPI(transactionId)
      
      return {
        success: response.status === 'completed',
        status: response.status,
        amount: response.amount,
        message: response.message
      }
    } catch (error) {
      console.error('Payment verification failed:', error)
      return {
        success: false,
        message: 'Failed to verify payment',
        error: error.message
      }
    }
  },
  
  /**
   * Get available payment providers
   * @returns {Array} List of payment providers
   */
  getProviders: () => {
    return [
      {
        id: 'mtn',
        name: 'MTN Mobile Money',
        color: '#ffcc00',
        icon: '📱',
        enabled: true
      },
      {
        id: 'airtel',
        name: 'Airtel Money',
        color: '#ff0000',
        icon: '💳',
        enabled: true
      },
      {
        id: 'zamtel',
        name: 'Zamtel Kwacha',
        color: '#0066cc',
        icon: '💰',
        enabled: true
      },
      {
        id: 'lenco',
        name: 'Lenco Pay',
        color: '#16a34a',
        icon: '🏦',
        enabled: true
      }
    ]
  }
}

// Simulated payment API (replace with actual implementations)
async function simulatePaymentAPI(request) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Generate mock transaction ID
  const transactionId = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  
  return {
    transactionId,
    status: 'pending',
    amount: request.amount,
    provider: request.provider,
    message: 'USSD prompt sent to customer phone'
  }
}

async function simulateVerificationAPI(transactionId) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // In production, this would check actual payment status
  return {
    transactionId,
    status: 'completed',
    amount: 0,
    message: 'Payment confirmed'
  }
}

export default paymentService
