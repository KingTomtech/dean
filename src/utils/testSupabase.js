import { db } from '../services/supabase.js'

export const testSupabaseConnection = async () => {
  console.log('🧪 Testing Supabase Connection...')

  const tests = [
    {
      name: 'Products - Get All',
      fn: () => db.products.getAll(),
      expect: 'array'
    },
    {
      name: 'Products - Get by Category',
      fn: () => db.products.getByCategory('Mattresses'),
      expect: 'array'
    },
    {
      name: 'Products - Search',
      fn: () => db.products.search('Foam'),
      expect: 'array'
    },
    {
      name: 'Categories - Get All',
      fn: () => db.categories.getAll(),
      expect: 'array'
    },
    {
      name: 'Users - Get by Phone',
      fn: () => db.users.getByPhone('+260955123456'),
      expect: 'object'
    },
    {
      name: 'Vouchers - Validate',
      fn: () => db.vouchers.validate('WELCOME10'),
      expect: 'object'
    }
  ]

  const results = []

  for (const test of tests) {
    try {
      const result = await test.fn()
      const passed = (test.expect === 'array' && Array.isArray(result)) ||
                    (test.expect === 'object' && typeof result === 'object' && !Array.isArray(result))

      results.push({
        name: test.name,
        status: passed ? '✅ PASS' : '❌ FAIL',
        count: Array.isArray(result) ? result.length : (result ? 1 : 0),
        error: null
      })

      console.log(`${passed ? '✅' : '❌'} ${test.name}: ${Array.isArray(result) ? result.length : (result ? '1' : '0')} items`)
    } catch (error) {
      results.push({
        name: test.name,
        status: '❌ ERROR',
        count: 0,
        error: error.message
      })
      console.error(`❌ ${test.name}: ${error.message}`)
    }
  }

  console.log('\n📊 Test Summary:')
  console.table(results)

  const passed = results.filter(r => r.status.includes('PASS')).length
  const total = results.length
  console.log(`\n🎯 Results: ${passed}/${total} tests passed`)

  return results
}