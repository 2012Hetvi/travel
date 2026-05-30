import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCreditCard, FiUser, FiCalendar, FiLock, FiCheck, FiMapPin } from 'react-icons/fi'
import { toast } from 'sonner'

function Payment() {
  const navigate = useNavigate()

  const location = useLocation()
  const { price = '$799', destinationName = 'Your Trip' } = location.state || {}

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  })
  const [errors, setErrors] = useState<any>({})

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 16)
    return cleaned.replace(/(.{4})/g, '$1 ').trim()
  }

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 4)
    if (cleaned.length >= 3) return cleaned.slice(0, 2) + '/' + cleaned.slice(2)
    return cleaned
  }

  const validate = () => {
    const newErrors: any = {}
    if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required'
    if (formData.cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = 'Enter a valid 16-digit card number'
    if (formData.expiry.length < 5) newErrors.expiry = 'Enter a valid expiry date'
    if (formData.cvv.length < 3) newErrors.cvv = 'Enter a valid CVV'
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    await new Promise((res) => setTimeout(res, 2000))

    // ✅ localStorage mein booking save karo
    const newBooking = {
      id: Date.now(),
      destinationName,
      price,
      status: 'Confirmed' as const,
      bookedAt: new Date().toISOString(),
    }
    const existing = JSON.parse(localStorage.getItem('wanderlust_bookings') || '[]')
    localStorage.setItem('wanderlust_bookings', JSON.stringify([newBooking, ...existing]))

    setLoading(false)
    setSuccess(true)
    toast.success('Payment successful! Booking confirmed 🎉')
  }

  if (success) {
    return (
      <div className="pt-20 min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center bg-card rounded-2xl p-10 shadow-xl"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
          <p className="text-muted-foreground mb-2">
            Your trip to <span className="font-semibold text-foreground">{destinationName}</span> is booked!
          </p>
          <p className="text-muted-foreground mb-8">
            Get ready for an amazing adventure!
          </p>
          <button
            onClick={() => navigate('/bookings')}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors mb-3"
          >
            View My Bookings
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 border border-border text-foreground rounded-xl font-medium hover:bg-muted transition-colors"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    )
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
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCreditCard className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-card-foreground">Payment Details</h1>
            <p className="text-muted-foreground text-sm mt-1">Secure & encrypted payment</p>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <FiMapPin className="w-3.5 h-3.5 text-primary" />
                <p className="text-sm font-medium text-foreground">{destinationName}</p>
              </div>
              <p className="text-xs text-muted-foreground mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-primary">{price}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground bg-card px-3 py-1.5 rounded-full border border-border">
              <FiLock className="w-3 h-3" />
              Secure
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">Cardholder Name</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.cardName}
                  onChange={(e) => { setFormData({ ...formData, cardName: e.target.value }); if (errors.cardName) setErrors({ ...errors, cardName: null }) }}
                  placeholder="Name on card"
                  className={`w-full pl-11 pr-4 py-3 bg-muted border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors.cardName ? 'border-red-400' : 'border-border'}`}
                />
              </div>
              {errors.cardName && <p className="mt-1 text-xs text-red-500">⚠ {errors.cardName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">Card Number</label>
              <div className="relative">
                <FiCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => { setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) }); if (errors.cardNumber) setErrors({ ...errors, cardNumber: null }) }}
                  placeholder="1234 5678 9012 3456"
                  className={`w-full pl-11 pr-4 py-3 bg-muted border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors.cardNumber ? 'border-red-400' : 'border-border'}`}
                />
              </div>
              {errors.cardNumber && <p className="mt-1 text-xs text-red-500">⚠ {errors.cardNumber}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">Expiry Date</label>
                <div className="relative">
                  <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.expiry}
                    onChange={(e) => { setFormData({ ...formData, expiry: formatExpiry(e.target.value) }); if (errors.expiry) setErrors({ ...errors, expiry: null }) }}
                    placeholder="MM/YY"
                    className={`w-full pl-11 pr-4 py-3 bg-muted border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors.expiry ? 'border-red-400' : 'border-border'}`}
                  />
                </div>
                {errors.expiry && <p className="mt-1 text-xs text-red-500">⚠ {errors.expiry}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">CVV</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="password"
                    value={formData.cvv}
                    onChange={(e) => { setFormData({ ...formData, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }); if (errors.cvv) setErrors({ ...errors, cvv: null }) }}
                    placeholder="•••"
                    className={`w-full pl-11 pr-4 py-3 bg-muted border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors.cvv ? 'border-red-400' : 'border-border'}`}
                  />
                </div>
                {errors.cvv && <p className="mt-1 text-xs text-red-500">⚠ {errors.cvv}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <><div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />Processing...</>
              ) : (
                <><FiLock className="w-4 h-4" />Pay {price} Securely</>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            🔒 Your payment info is encrypted and secure
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Payment