import { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiCalendar, FiClock, FiMapPin, FiCompass,
  FiCheckCircle, FiXCircle, FiTrash2
} from 'react-icons/fi'
import { AppContext } from '../App'
import { toast } from 'sonner'

interface Booking {
  id: number
  destinationName: string
  price: string
  status: 'Confirmed' | 'Cancelled'
  bookedAt: string
}

const STORAGE_KEY = 'wanderlust_bookings'

function Bookings() {
  const { token } = useContext(AppContext)
  const navigate = useNavigate()

  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      toast.error('Please log in to view your bookings')
      navigate('/login')
      return
    }

    // ✅ localStorage se bookings padhna — koi API nahi chahiye
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    setBookings(stored)
    setLoading(false)
  }, [token, navigate])

  const handleCancel = (id: number) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return

    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status: 'Cancelled' as const } : b
    )
    setBookings(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    toast.success('Booking cancelled successfully.')
  }

  const handleDelete = (id: number) => {
    if (!confirm('Remove this booking from your list?')) return

    const updated = bookings.filter((b) => b.id !== id)
    setBookings(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    toast.success('Booking removed.')
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading your bookings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Hero Header */}
      <section className="py-12 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
              <FiCalendar className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">My Bookings</h1>
              <p className="text-muted-foreground">
                Manage your dynamic travel itineraries and trip details
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {bookings.length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground">
                Active & Past Reservations ({bookings.length})
              </h2>

              {bookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card border border-border/60 rounded-3xl overflow-hidden shadow-md"
                >
                  <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Left — Destination Info */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <FiMapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                            #{booking.id.toString().slice(-6)}
                          </span>
                          {booking.status === 'Confirmed' ? (
                            <span className="flex items-center gap-1 px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs font-semibold rounded-full">
                              <FiCheckCircle className="w-3 h-3" />
                              Confirmed
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 px-2.5 py-0.5 bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-semibold rounded-full">
                              <FiXCircle className="w-3 h-3" />
                              Cancelled
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-card-foreground">
                          {booking.destinationName}
                        </h3>

                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1.5">
                            <FiClock className="w-3.5 h-3.5 text-primary" />
                            {new Date(booking.bookedAt).toLocaleDateString(undefined, {
                              year: 'numeric', month: 'short', day: 'numeric'
                            })}
                          </span>
                          <span className="font-bold text-primary text-base">
                            {booking.price}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right — Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {booking.status === 'Confirmed' && (
                        <button
                          onClick={() => handleCancel(booking.id)}
                          className="px-4 py-2 bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive hover:text-destructive-foreground text-xs font-semibold rounded-xl transition-all"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(booking.id)}
                        className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all"
                        title="Remove from list"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 max-w-md mx-auto"
            >
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCompass className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">No Active Bookings</h2>
              <p className="text-muted-foreground mb-8">
                You haven't booked any adventures yet! Explore destinations and book your next dream trip.
              </p>
              <Link
                to="/"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 inline-block"
              >
                Explore Destinations
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Bookings