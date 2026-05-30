import { useState, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'
import { AppContext } from '../App'
import { toast } from 'sonner'

const DUMMY_USERS = [
  { email: 'hetvimaheshwari7@gmail.com', password: 'travel123', name: 'Hetvi Maheshwari' },
  { email: 'admin@wanderlust.com', password: 'admin123', name: 'Admin User' },
  { email: 'test@test.com', password: 'test123', name: 'Test User' },
]

function Login() {
  const { login } = useContext(AppContext)
  const navigate = useNavigate()

  // ✅ Booking state (price + destinationName) modal se aa rahi hai
  const location = useLocation()
  const bookingState = location.state || {}

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<any>({})

  const validate = () => {
    const newErrors: any = {}
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = DUMMY_USERS.find(
      (u) => u.email === formData.email && u.password === formData.password
    )

    if (foundUser) {
      const fakeToken = 'dummy-token-' + Date.now()
      login(fakeToken, { name: foundUser.name, email: foundUser.email } as any)
      toast.success(`Welcome back, ${foundUser.name}!`)
      // ✅ bookingState (price + destinationName) BookingDetails tak forward
      navigate('/booking-details', { state: bookingState })
    } else {
      setErrors({ general: 'Invalid email or password. Please try again.' })
      toast.error('Login failed. Check your credentials.')
    }

    setLoading(false)
  }

  const handleGoogleLogin = () => {
    const googleUser = { name: 'Google User', email: 'google@gmail.com' }
    login('google-dummy-token', googleUser as any)
    toast.success(`Welcome, ${googleUser.name}!`)
    // ✅ bookingState (price + destinationName) BookingDetails tak forward
    navigate('/booking-details', { state: bookingState })
  }

  return (
    <div className="pt-20 min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-2xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <Link to="/" className="text-3xl font-bold text-primary">
              Wanderlust
            </Link>
            <h1 className="text-2xl font-bold text-card-foreground mt-6 mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">Sign in to continue your adventure</p>
          </div>

          {errors.general && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center font-medium">
              {errors.general}
            </div>
          )}

          <div className="mb-6 p-3 bg-orange-50 border border-orange-200 text-orange-700 text-xs rounded-xl">
            <strong>Demo credentials:</strong><br />
            📧 hetvimaheshwari7@gmail.com &nbsp;🔑 travel123
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-card-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value })
                    if (errors.email) setErrors({ ...errors, email: null })
                  }}
                  className={`w-full pl-12 pr-4 py-3 bg-muted border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.email ? 'border-red-400 focus:ring-red-400' : 'border-border'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">⚠ {errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-card-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value })
                    if (errors.password) setErrors({ ...errors, password: null })
                  }}
                  className={`w-full pl-12 pr-12 py-3 bg-muted border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.password ? 'border-red-400 focus:ring-red-400' : 'border-border'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">⚠ {errors.password}</p>}
            </div>

            {/* Remember me + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-card text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3 bg-muted border border-border rounded-xl font-medium text-card-foreground hover:bg-muted/80 transition-colors flex items-center justify-center gap-3"
          >
            <FcGoogle className="w-5 h-5" />
            Sign in with Google
          </button>

          <p className="text-center text-muted-foreground mt-8">
            {"Don't have an account? "}
            <Link to="/register" className="text-primary font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Login