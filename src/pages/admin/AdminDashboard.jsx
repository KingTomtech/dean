import React, { useState, useEffect } from 'react'
import { getProducts, addProduct, updateProduct, deleteProduct, exportProductsJson } from '../../services/productStore'
import { ADMIN_CREDENTIALS } from '../../data/adminConfig'

const ADMIN_SESSION_KEY = 'rapid_admin_session'

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

const emptyForm = { name: '', price: '', category: 'Mattresses', description: '', stock: '', image: '', featured: false }
const CATEGORIES = ['Mattresses', 'Furniture', 'Groceries', 'Foam Products']

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, '1')
      onLogin()
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-rapid-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
              <path d="M12 2a5 5 0 100 10A5 5 0 0012 2zm0 8a3 3 0 110-6 3 3 0 010 6zm0 2c-3.33 0-10 1.67-10 5v1h20v-1c0-3.33-6.67-5-10-5z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-1">Rapid Stores Dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rapid-primary"
              placeholder="Enter username"
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rapid-primary"
              placeholder="Enter password"
              autoComplete="current-password"
              required
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-rapid-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

function ProductForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || emptyForm)
  const [imageMode, setImageMode] = useState('url')
  const [uploading, setUploading] = useState(false)

  const handleImageFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const base64 = await toBase64(file)
      setForm(f => ({ ...f, image: base64 }))
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...form, price: Number(form.price), stock: Number(form.stock) })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{initial ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rapid-primary" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (ZMW) *</label>
              <input required type="number" min="0" step="0.01" value={form.price}
                onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rapid-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
              <input type="number" min="0" value={form.stock}
                onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rapid-primary" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rapid-primary">
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rapid-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <div className="flex gap-2 mb-2">
              <button type="button" onClick={() => setImageMode('url')}
                className={`px-3 py-1 rounded text-sm ${imageMode === 'url' ? 'bg-rapid-primary text-white' : 'bg-gray-100'}`}>
                URL
              </button>
              <button type="button" onClick={() => setImageMode('upload')}
                className={`px-3 py-1 rounded text-sm ${imageMode === 'upload' ? 'bg-rapid-primary text-white' : 'bg-gray-100'}`}>
                Upload File
              </button>
            </div>
            {imageMode === 'url' ? (
              <input value={form.image.startsWith('data:') ? '' : form.image}
                onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rapid-primary" />
            ) : (
              <input type="file" accept="image/*" onChange={handleImageFile}
                className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-rapid-primary file:text-white" />
            )}
            {form.image && (
              <img src={form.image} alt="Preview" className="mt-2 h-24 w-auto rounded-lg object-cover border" />
            )}
            {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="featured" checked={form.featured}
              onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))}
              className="w-4 h-4 accent-rapid-primary" />
            <label htmlFor="featured" className="text-sm text-gray-700">Show on homepage (featured)</label>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onCancel}
              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 bg-rapid-primary text-white py-2 rounded-lg hover:bg-blue-800 font-semibold">
              {initial ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem(ADMIN_SESSION_KEY) === '1')
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [search, setSearch] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [toast, setToast] = useState('')

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const load = () => getProducts().then(setProducts)

  useEffect(() => {
    if (loggedIn) load()
  }, [loggedIn])

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY)
    setLoggedIn(false)
  }

  const handleAdd = async (form) => {
    await addProduct(form)
    await load()
    setShowForm(false)
    showToast('Product added successfully')
  }

  const handleEdit = async (form) => {
    await updateProduct(editProduct.id, form)
    await load()
    setEditProduct(null)
    showToast('Product updated successfully')
  }

  const handleDelete = async (id) => {
    await deleteProduct(id)
    await load()
    setConfirmDelete(null)
    showToast('Product deleted')
  }

  if (!loggedIn) return <LoginPage onLogin={() => setLoggedIn(true)} />

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-rapid-primary text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div>
          <h1 className="text-xl font-bold">Rapid Stores Admin</h1>
          <p className="text-blue-200 text-xs">Product Management</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={exportProductsJson}
            className="bg-white text-rapid-primary px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
            Export JSON
          </button>
          <button onClick={handleLogout}
            className="border border-white text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-800 transition-colors">
            Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <p className="text-gray-500 text-sm">Total Products</p>
            <p className="text-3xl font-bold text-rapid-primary mt-1">{products.length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <p className="text-gray-500 text-sm">In Stock</p>
            <p className="text-3xl font-bold text-green-600 mt-1">{products.filter(p => p.stock > 0).length}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <p className="text-gray-500 text-sm">Featured</p>
            <p className="text-3xl font-bold text-amber-500 mt-1">{products.filter(p => p.featured).length}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border">
          <div className="px-6 py-4 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-lg font-semibold text-gray-800">Products</h2>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rapid-primary"
              />
              <button onClick={() => setShowForm(true)}
                className="bg-rapid-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors flex items-center gap-1">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19 11H13V5h-2v6H5v2h6v6h2v-6h6z"/></svg>
                Add Product
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left text-sm text-gray-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Product</th>
                  <th className="px-6 py-3 font-medium">Category</th>
                  <th className="px-6 py-3 font-medium">Price</th>
                  <th className="px-6 py-3 font-medium">Stock</th>
                  <th className="px-6 py-3 font-medium">Featured</th>
                  <th className="px-6 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {p.image ? (
                          <img src={p.image} alt={p.name}
                            className="w-12 h-12 rounded-lg object-cover border border-gray-100" />
                        ) : (
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xl">📦</div>
                        )}
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{p.name}</p>
                          <p className="text-xs text-gray-400 line-clamp-1 max-w-[180px]">{p.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{p.category}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-rapid-primary">ZMW {Number(p.price).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        p.stock <= 0 ? 'bg-red-100 text-red-700' :
                        p.stock < 10 ? 'bg-amber-100 text-amber-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {p.stock <= 0 ? 'Out of stock' : `${p.stock} units`}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {p.featured ? <span className="text-amber-500">★ Yes</span> : <span className="text-gray-400">No</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setEditProduct(p)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                        <button onClick={() => setConfirmDelete(p)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400">No products found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-4 text-center">
          Changes are saved locally in your browser. Click "Export JSON" to download and deploy updated data.
        </p>
      </div>

      {showForm && <ProductForm onSave={handleAdd} onCancel={() => setShowForm(false)} />}
      {editProduct && <ProductForm initial={editProduct} onSave={handleEdit} onCancel={() => setEditProduct(null)} />}

      {confirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Delete Product</h3>
            <p className="text-gray-600 mb-4">Are you sure you want to delete <strong>{confirmDelete.name}</strong>? This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50">Cancel</button>
              <button onClick={() => handleDelete(confirmDelete.id)}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-800 text-white px-5 py-3 rounded-xl shadow-lg text-sm z-50 animate-fade-in">
          {toast}
        </div>
      )}
    </div>
  )
}
