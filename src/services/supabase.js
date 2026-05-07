import { createClient } from '@supabase/supabase-js'
import { config } from '../config'

// Initialize Supabase client
export const supabase = createClient(
  config.supabase.url,
  config.supabase.key
)

const normalizeProduct = (product) => ({
  ...product,
  price: Number(product.price_zmw ?? product.price ?? 0),
  stock: product.stock_qty ?? product.stock ?? 0,
  category: product.categories?.name ?? product.category ?? '',
  image: product.image_url ?? product.image ?? null
})

export const db = {
  // Categories
  categories: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name')
      if (error) throw error
      return data
    }
  },

  // Products
  products: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name)')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data.map(normalizeProduct)
    },

    getById: async (id) => {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name)')
        .eq('id', id)
        .single()
      if (error) throw error
      return normalizeProduct(data)
    },

    getByCategory: async (category) => {
      if (!category || category === 'All') {
        return db.products.getAll()
      }

      const { data: categoryRow, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('name', category)
        .maybeSingle()
      if (categoryError) throw categoryError
      if (!categoryRow) return []

      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name)')
        .eq('category_id', categoryRow.id)
        .order('name')
      if (error) throw error
      return data.map(normalizeProduct)
    },

    search: async (query) => {
      const sanitized = query?.trim() ?? ''
      if (!sanitized) return []

      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name)')
        .or(
          `name.ilike.%${sanitized}%,description.ilike.%${sanitized}%`
        )
        .order('name')
      if (error) throw error
      return data.map(normalizeProduct)
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
        .eq('is_active', true)
        .gte('expires_at', new Date().toISOString())
        .single()
      if (error && error.code !== 'PGRST116') throw error
      return data
    }
  },

  // Manufacturing
  manufacturing: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('manufacturing_orders')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data
    },

    create: async (manufacturingData) => {
      const { data, error } = await supabase
        .from('manufacturing_orders')
        .insert([manufacturingData])
        .select()
        .single()
      if (error) throw error
      return data
    },

    updateStatus: async (id, status) => {
      const { data, error } = await supabase
        .from('manufacturing_orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single()
      if (error) throw error
      return data
    }
  }
}
