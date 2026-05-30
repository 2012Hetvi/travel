import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiUser, FiUsers, FiCalendar, FiMapPin, FiChevronRight,
  FiCheck, FiStar, FiPackage
} from 'react-icons/fi'

// ─── Package options ──────────────────────────────────────────────────────────
const PACKAGES = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'Flights + Hotel (3-star)',
    includes: ['Return Flights', '3-Star Hotel', 'Airport Transfer'],
    multiplier: 1.0,
    badge: null,
  },
  {
    id: 'standard',
    name: 'Standard',
    description: 'Flights + Hotel + Tours',
    includes: ['Return Flights', '4-Star Hotel', 'Airport Transfer', 'City Tours', 'Breakfast Included'],
    multiplier: 1.4,
    badge: 'Popular',
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'All-inclusive luxury',
    includes: ['Business Class Flights', '5-Star Hotel', 'Private Transfer', 'All Tours', 'All Meals', 'Travel Insurance'],
    multiplier: 2.0,
    badge: 'Best Value',
  },
]

// ─── Helper: parse price string like "$799" or "₹65,000" ──────────────────────
function parsePrice(price: string): number {
  const cleaned = price.replace(/[^0-9.]/g, '')
  return parseFloat(cleaned) || 0
}

function formatPrice(base: string, multiplier: number): string {
  const symbol = base.match(/^[^0-9]+/)?.[0] || '$'
  const num = Math.round(parsePrice(base) * multiplier)
  return symbol + num.toLocaleString()
}

// ─── Main Component ───────────────────────────────────────────────────────────
function BookingDetails() {
  const navigate = useNavigate()
  const location = useLocation()
  const { price = '$799', destinationName = 'Your Trip' } = location.state || {}

  const today = new Date().toISOString().split('T')[0]

  const [selectedPackage, setSelectedPackage] = useState('standard')
  const [travelers, setTravelers] = useState({ adults: 1, children: 0 })
  const [dates, setDates] = useState({ departure: '', returnDate: '' })
  const [travelerInfo, setTravelerInfo] = useState({ fullName: '', phone: '', nationality: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const pkg = PACKAGES.find(p => p.id === selectedPackage)!
  const totalPrice = formatPrice(price, pkg.multiplier * (travelers.adults + travelers.children * 0.5 || 1))

  const validate = () => {
    const e: Record<string, string> = {}
    if (!travelerInfo.fullName.trim()) e.fullName = 'Full name is required'
    if (!travelerInfo.phone.trim()) e.phone = 'Phone number is required'
    if (!travelerInfo.nationality.trim()) e.nationality = 'Nationality is required'
    if (!dates.departure) e.departure = 'Departure date is required'
    if (!dates.returnDate) e.returnDate = 'Return date is required'
    if (dates.departure && dates.returnDate && dates.returnDate <= dates.departure)
      e.returnDate = 'Return must be after departure'
    return e
  }

  const handleNext = () => {
    const e = validate()
    if (Object.keys(e).length > 0) { setErrors(e); return }
    navigate('/payment', {
      state: {
        price: totalPrice,
        destinationName,
        packageName: pkg.name,
        travelers,
        dates,
        travelerInfo,
      }
    })
  }

  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Header */}
      <section className="py-10 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <FiPackage className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Booking Details</h1>
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-0.5">
                <FiMapPin className="w-3.5 h-3.5 text-primary" />
                <span>{destinationName}</span>
              </div>
            </div>
          </motion.div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mt-6">
            {['Sign In', 'Trip Details', 'Payment'].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                  i === 0 ? 'bg-primary/20 text-primary' :
                  i === 1 ? 'bg-primary text-primary-foreground' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {i === 0 && <FiCheck className="w-3 h-3" />}
                  {step}
                </div>
                {i < 2 && <FiChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">

          {/* ── Package Selection ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <FiStar className="text-primary" /> Choose Package
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PACKAGES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPackage(p.id)}
                  className={`relative text-left p-4 rounded-2xl border-2 transition-all ${
                    selectedPackage === p.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card hover:border-primary/40'
                  }`}
                >
                  {p.badge && (
                    <span className="absolute -top-2.5 left-4 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {p.badge}
                    </span>
                  )}
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-bold text-foreground">{p.name}</span>
                    {selectedPackage === p.id && (
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <FiCheck className="w-3 h-3 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{p.description}</p>
                  <ul className="space-y-1">
                    {p.includes.map(item => (
                      <li key={item} className="flex items-center gap-1.5 text-xs text-foreground">
                        <FiCheck className="w-3 h-3 text-primary flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 font-bold text-primary text-sm">
                    From {formatPrice(price, p.multiplier)}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Travel Dates ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <FiCalendar className="text-primary" /> Travel Dates
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-card border border-border/60 rounded-2xl p-5">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Departure Date</label>
                <input
                  type="date"
                  min={today}
                  value={dates.departure}
                  onChange={e => { setDates({ ...dates, departure: e.target.value }); setErrors({ ...errors, departure: '' }) }}
                  className={`w-full px-4 py-3 bg-muted border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors.departure ? 'border-red-400' : 'border-border'}`}
                />
                {errors.departure && <p className="mt-1 text-xs text-red-500">⚠ {errors.departure}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Return Date</label>
                <input
                  type="date"
                  min={dates.departure || today}
                  value={dates.returnDate}
                  onChange={e => { setDates({ ...dates, returnDate: e.target.value }); setErrors({ ...errors, returnDate: '' }) }}
                  className={`w-full px-4 py-3 bg-muted border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors.returnDate ? 'border-red-400' : 'border-border'}`}
                />
                {errors.returnDate && <p className="mt-1 text-xs text-red-500">⚠ {errors.returnDate}</p>}
              </div>
            </div>
          </motion.div>

          {/* ── Travelers ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <FiUsers className="text-primary" /> Travelers
            </h2>
            <div className="grid grid-cols-2 gap-4 bg-card border border-border/60 rounded-2xl p-5">
              {[
                { label: 'Adults', key: 'adults' as const, sub: 'Age 13+', min: 1 },
                { label: 'Children', key: 'children' as const, sub: 'Age 2–12', min: 0 },
              ].map(({ label, key, sub, min }) => (
                <div key={key}>
                  <p className="font-medium text-foreground text-sm">{label}</p>
                  <p className="text-xs text-muted-foreground mb-3">{sub}</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setTravelers(t => ({ ...t, [key]: Math.max(min, t[key] - 1) }))}
                      className="w-9 h-9 rounded-xl border border-border bg-muted hover:bg-muted/80 font-bold text-foreground transition-colors"
                    >−</button>
                    <span className="w-6 text-center font-bold text-foreground">{travelers[key]}</span>
                    <button
                      onClick={() => setTravelers(t => ({ ...t, [key]: t[key] + 1 }))}
                      className="w-9 h-9 rounded-xl border border-border bg-muted hover:bg-muted/80 font-bold text-foreground transition-colors"
                    >+</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Traveler Info ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <FiUser className="text-primary" /> Primary Traveler Info
            </h2>
            <div className="bg-card border border-border/60 rounded-2xl p-5 space-y-4">
              {[
                { label: 'Full Name (as on passport)', key: 'fullName' as const, placeholder: 'e.g. Hetvi Maheshwari', type: 'text' },
                { label: 'Phone Number', key: 'phone' as const, placeholder: 'e.g. +91 98765 43210', type: 'tel' },
                { label: 'Nationality', key: 'nationality' as const, placeholder: 'e.g. Indian', type: 'text' },
              ].map(({ label, key, placeholder, type }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-foreground mb-2">{label}</label>
                  <input
                    type={type}
                    value={travelerInfo[key]}
                    placeholder={placeholder}
                    onChange={e => { setTravelerInfo({ ...travelerInfo, [key]: e.target.value }); setErrors({ ...errors, [key]: '' }) }}
                    className={`w-full px-4 py-3 bg-muted border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary ${errors[key] ? 'border-red-400' : 'border-border'}`}
                  />
                  {errors[key] && <p className="mt-1 text-xs text-red-500">⚠ {errors[key]}</p>}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Summary + CTA ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-foreground">Order Summary</span>
                <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">{pkg.name} Package</span>
              </div>
              <div className="space-y-1.5 text-sm text-muted-foreground">
                <div className="flex justify-between"><span>Destination</span><span className="text-foreground font-medium">{destinationName}</span></div>
                <div className="flex justify-between"><span>Travelers</span><span className="text-foreground font-medium">{travelers.adults} Adult{travelers.adults > 1 ? 's' : ''}{travelers.children > 0 ? `, ${travelers.children} Child${travelers.children > 1 ? 'ren' : ''}` : ''}</span></div>
                {dates.departure && <div className="flex justify-between"><span>Departure</span><span className="text-foreground font-medium">{new Date(dates.departure).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span></div>}
                {dates.returnDate && <div className="flex justify-between"><span>Return</span><span className="text-foreground font-medium">{new Date(dates.returnDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span></div>}
              </div>
              <div className="border-t border-primary/20 mt-3 pt-3 flex justify-between items-center">
                <span className="font-bold text-foreground">Total Amount</span>
                <span className="text-2xl font-bold text-primary">{totalPrice}</span>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-base hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
            >
              Proceed to Payment
              <FiChevronRight className="w-5 h-5" />
            </button>
          </motion.div>

        </div>
      </section>
    </div>
  )
}

export default BookingDetails