import { createClient } from '@supabase/supabase-js'
import { config } from '../config'

// Initialize Supabase client
export const supabase = createClient(
  config.supabase.url,
  config.supabase.key
)

// Database helper functions
export const db = {
  // Products
  products: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
    
    getById: async (id) => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()
      if (error) throw error
      return data
    },
    
    getByCategory: async (category) => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('name')
      if (error) throw error
      return data
    },
    
    search: async (query) => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .ilike('name', `%${query}%`)
        .or(`description.ilike.%${query}%`)
      if (error) throw error
      return data
    }
  },
  
  // Orders
  orders: {
    create: async (orderData) => {
      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single()
      if (error) throw error
      return data
    },
    
    getByUser: async (userId) => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
    
    updateStatus: async (orderId, status) => {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)
        .select()
        .single()
      if (error) throw error
      return data
    }
  },
  
  // Users
  users: {
    getByPhone: async (phone) => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('phone', phone)
        .single()
      if (error && error.code !== 'PGRST116') throw error
      return data
    },
    
    create: async (userData) => {
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single()
      if (error) throw error
      return data
    }
  },
  
  // Vouchers
  vouchers: {
    validate: async (code) => {
      const { data, error } = await supabase
        .from('vouchers')
        .select('*')
        .eq('code', code)
        .eq('active', true)
        .gt('expires_at', new Date().toISOString())
        .single()
      if (error && error.code !== 'PGRST116') throw error
      return data
    }
  },
  
  // Manufacturing
  production: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('production_orders')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },
    
    create: async (productionData) => {
      const { data, error } = await supabase
        .from('production_orders')
        .insert([productionData])
        .select()
        .single()
      if (error) throw error
      return data
    },
    
    updateStatus: async (id, status) => {
      const { data, error } = await supabase
        .from('production_orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single()
      if (error) throw error
      return data
    }
  }
}

export default supabase
