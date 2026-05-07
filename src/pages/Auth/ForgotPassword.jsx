import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const ForgotPassword = () => {
  const { resetPassword, error: authError } = useAuth()
  
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!email) {
      setError('Please enter your email address')
      return
    }

    setLoading(true)

    try {
      const result = await resetPassword(email)
      
      if (result.success) {
        setSuccess(true)
        setEmail('')
      } else {
        setError(result.error || 'Failed to send reset email. Please try again.')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const displayError = error || authError

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password?</h1>
            <p className="text-gray-600">No worries! Enter your email and we'll send you reset instructions.</p>
          </div>

          {/* Reset Password Form */}
          <div className="card p-8">
            {success ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Check Your Email</h2>
                <p className="text-gray-600 mb-6">
                  We've sent password reset instructions to <strong>{email}</strong>
                </p>
                <Link
                  to="/login"
                  className="inline-block bg-rapid-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all"
                >
                  Back to Login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rapid-primary focus:border-transparent transition-all"
                    placeholder="you@example.com"
                    disabled={loading}
                    autoComplete="email"
                  />
                </div>

                {/* Error Message */}
                {displayError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {displayError}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-rapid-primary hover:bg-green-700'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Reset Instructions'
                  )}
                </button>
              </form>
            )}

            {!success && (
              <>
                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Remember your password?</span>
                  </div>
                </div>

                {/* Login Link */}
                <Link
                  to="/login"
                  className="block w-full text-center py-3 px-4 border-2 border-rapid-primary text-rapid-primary rounded-lg font-semibold hover:bg-green-50 transition-all"
                >
                  Back to Login
                </Link>
              </>
            )}
          </div>

          {/* Help Text */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Need help?{' '}
            <a href="/contact" className="text-rapid-primary hover:text-green-700 font-medium">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
