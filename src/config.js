// Configuration for Rapid Stores Platform

export const config = {
  // Supabase Configuration (to be filled by user)
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || 'https://nqkslrdgspsrywrzhikw.supabase.co',
    key: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xa3NscmRnc3Bzcnl3cnpoaWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwMTE0OTQsImV4cCI6MjA5MzU4NzQ5NH0.5JcJiOv7HqK6rxu7O7kTE9RiSEd7pGFKm_lFNEVdaOI'
  },
  
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_URL || '/api',
    timeout: 30000
  },
  
  // WhatsApp Configuration
  whatsapp: {
    phoneNumber: '+260776885851', // Replace with actual business number
    defaultMessage: 'Hello, I would like to place an order'
  },
  
  // Payment Configuration
  payment: {
    providers: ['mtn', 'airtel', 'zamtel', 'lenco'],
    currency: 'ZMW'
  },
  
  // App Settings
  app: {
    name: 'Rapid Stores',
    version: '1.0.0',
    deliveryPhase: 1 // 1: Pickup only, 2: Manual tracking, 3: Full delivery
  }
}

export default config
