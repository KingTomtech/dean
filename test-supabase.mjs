import { db } from './src/services/supabase.js'

const tests = [
  ['all', () => db.products.getAll()],
  ['category', () => db.products.getByCategory('Mattresses')],
  ['search', () => db.products.search('Foam')],
  ['user', () => db.users.getByPhone('+260955123456')],
  ['voucher', () => db.vouchers.validate('WELCOME10')],
  ['manufacturing', () => db.manufacturing.getAll()]
]

for (const [label, fn] of tests) {
  try {
    const result = await fn()
    console.log(`${label}:`, Array.isArray(result) ? JSON.stringify(result.slice(0, 3), null, 2) : JSON.stringify(result, null, 2))
  } catch (error) {
    console.error(`${label} ERROR:`, error.message || error)
  }
}
