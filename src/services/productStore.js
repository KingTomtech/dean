const STORAGE_KEY = 'rapid_products'
const SEEDED_KEY = 'rapid_products_seeded_v3'

async function seedFromJson() {
  try {
    const res = await fetch('/data/products.json')
    const data = await res.json()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.products))
    localStorage.setItem(SEEDED_KEY, '1')
    return data.products
  } catch (e) {
    console.error('Failed to seed products:', e)
    return []
  }
}

export async function getProducts() {
  if (!localStorage.getItem(SEEDED_KEY)) {
    return await seedFromJson()
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  localStorage.setItem(SEEDED_KEY, '1')
}

export async function addProduct(product) {
  const products = await getProducts()
  const newProduct = {
    ...product,
    id: String(Date.now()),
    stock: Number(product.stock) || 0,
    price: Number(product.price) || 0
  }
  saveProducts([...products, newProduct])
  return newProduct
}

export async function updateProduct(id, updates) {
  const products = await getProducts()
  const updated = products.map(p =>
    p.id === id ? { ...p, ...updates, stock: Number(updates.stock ?? p.stock), price: Number(updates.price ?? p.price) } : p
  )
  saveProducts(updated)
}

export async function deleteProduct(id) {
  const products = await getProducts()
  saveProducts(products.filter(p => p.id !== id))
}

export function exportProductsJson() {
  const raw = localStorage.getItem(STORAGE_KEY)
  const products = raw ? JSON.parse(raw) : []
  const data = JSON.stringify({ products }, null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'products.json'
  a.click()
  URL.revokeObjectURL(url)
}

export function resetToDefault() {
  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem(SEEDED_KEY)
}
