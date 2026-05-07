import { supabase } from '../services/supabase.js'

console.log('🔍 Verifying Supabase Integration...\n')

// Test 1: Check connection
console.log('1. Testing Supabase connection...')
try {
  const { data, error } = await supabase.from('users').select('count').limit(1)
  if (error) throw error
  console.log('✅ Connection successful\n')
} catch (error) {
  console.log('❌ Connection failed:', error.message, '\n')
}

// Test 2: Check users table
console.log('2. Testing users table...')
try {
  const { data: users, error } = await supabase.from('users').select('*').limit(5)
  if (error) throw error
  console.log(`✅ Found ${users.length} users`)
  if (users.length > 0) {
    console.log('   Sample user:', {
      id: users[0].id,
      full_name: users[0].full_name,
      role: users[0].role
    })
  }
  console.log('')
} catch (error) {
  console.log('❌ Users table error:', error.message, '\n')
}

// Test 3: Check categories table
console.log('3. Testing categories table...')
try {
  const { data: categories, error } = await supabase.from('categories').select('*')
  if (error) throw error
  console.log(`✅ Found ${categories.length} categories`)
  if (categories.length > 0) {
    console.log('   Categories:', categories.map(c => c.name).join(', '))
  }
  console.log('')
} catch (error) {
  console.log('❌ Categories table error:', error.message, '\n')
}

// Test 4: Check products table
console.log('4. Testing products table...')
try {
  const { data: products, error } = await supabase.from('products').select('*').limit(5)
  if (error) throw error
  console.log(`✅ Found ${products.length} products`)
  if (products.length > 0) {
    console.log('   Sample product:', {
      name: products[0].name,
      price: products[0].price_zmw || products[0].price,
      category: products[0].categories?.name || products[0].category
    })
  }
  console.log('')
} catch (error) {
  console.log('❌ Products table error:', error.message, '\n')
}

// Test 5: Check storage bucket
console.log('5. Testing storage bucket...')
try {
  const { data, error } = await supabase.storage.listBuckets()
  if (error) throw error
  const uploadsBucket = data.find(bucket => bucket.id === 'uploads')
  if (uploadsBucket) {
    console.log('✅ Uploads bucket exists')
  } else {
    console.log('❌ Uploads bucket not found')
  }
  console.log('')
} catch (error) {
  console.log('❌ Storage error:', error.message, '\n')
}

console.log('🎉 Verification complete!')