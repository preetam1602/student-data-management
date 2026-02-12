import { useState } from 'react'


export default function LoginPage({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      // Validation
      if (!formData.email || !formData.password) {
        setError('Email and password are required')
        setLoading(false)
        return
      }

      if (isSignUp && !formData.username) {
        setError('Username is required for sign up')
        setLoading(false)
        return
      }

      if (isSignUp) {
        // Sign up logic
        const response = await fetch('http://localhost:5000/api/v1/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password
          })
        })

        const data = await response.json()

        if (!response.ok) {
          setError(data.message || 'Sign up failed')
          setLoading(false)
          return
        }

        // After successful signup, log them in
        const loginResponse = await fetch('http://localhost:5000/api/v1/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        })

        const loginData = await loginResponse.json()

        if (loginResponse.ok) {
          onLogin(loginData.user)
        } else {
          setError('Please login with your new account')
        }
      } else {
        // Login logic
        const response = await fetch('http://localhost:5000/api/v1/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        })

        const data = await response.json()

        if (!response.ok) {
          setError(data.message || 'Login failed')
          setLoading(false)
          return
        }

        onLogin(data.user)
      }
      
      setLoading(false)
    } catch (error) {
      console.error('Error:', error)
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747 0-6.002-4.5-10.747-10-10.747z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Student Data</h1>
            <p className="text-gray-500 mt-1">Management System</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Sign Up Fields */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Login')}
            </button>
          </form>

          {/* Toggle Sign Up / Login */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setFormData({ username: '', email: '', password: '' })
                  setError('')
                }}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                {isSignUp ? 'Login' : 'Sign Up'}
              </button>
            </p>
          </div>

          {/* Demo Login Info */}
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800">
            <p className="font-semibold mb-1">Demo Credentials:</p>
            <p>Email: <span className="font-mono">demo@example.com</span></p>
            <p>Password: <span className="font-mono">demo123</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}
