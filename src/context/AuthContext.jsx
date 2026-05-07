import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../services/supabase'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check for existing session on mount
  useEffect(() => {
    checkSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          setUser(session.user)
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
        } else if (event === 'TOKEN_REFRESHED') {
          setUser(session.user)
        } else if (event === 'USER_UPDATED') {
          setUser(session.user)
        }
        setLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const checkSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error
      setUser(session?.user ?? null)
    } catch (err) {
      console.error('Error checking session:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async ({ email, password, phone, name }) => {
    try {
      setError(null)
      
      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            phone,
            name,
          },
        },
      })

      if (error) throw error

      // If signup successful, also create user record in users table
      if (data.user) {
        const { error: insertError } = await supabase
          .from('users')
          .insert([
            {
              id: data.user.id,
              email: data.user.email,
              phone: phone || null,
              name: name || null,
              created_at: new Date().toISOString(),
            },
          ])

        if (insertError) {
          console.error('Error creating user record:', insertError)
          // Don't throw - user is created in auth, just log the error
        }
      }

      return { success: true, user: data.user }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  const signIn = async ({ email, password }) => {
    try {
      setError(null)
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      return { success: true, user: data.user }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  const signInWithPhone = async (phone, password) => {
    try {
      setError(null)
      
      // For phone-based auth, we need to use OTP or convert to email
      // This is a simplified version - in production, use Supabase Phone Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: `${phone}@phone.local`,
        password,
      })

      if (error) throw error

      return { success: true, user: data.user }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  const signOut = async () => {
    try {
      setError(null)
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  const resetPassword = async (email) => {
    try {
      setError(null)
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) throw error

      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  const updateUser = async (updates) => {
    try {
      setError(null)
      
      const { data, error } = await supabase.auth.updateUser(updates)
      if (error) throw error

      setUser(data.user)
      return { success: true, user: data.user }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }

  const value = {
    user,
    loading,
    error,
    signUp,
    signIn,
    signInWithPhone,
    signOut,
    resetPassword,
    updateUser,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
