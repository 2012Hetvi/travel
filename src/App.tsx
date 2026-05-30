import { Routes, Route } from 'react-router-dom'
import { useState, useEffect, createContext } from 'react'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import Destinations from './pages/Destinations'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Wishlist from './pages/Wishlist'
import Bookings from './pages/Bookings'
import Payment from './pages/Payment'
import BookingDetails from './pages/BookingDetails'   // ✅ NEW
import destinationsData from './data/destinations'

export interface WishlistItem {
  id: number
  name: string
  image: string
  price: string
  type: 'destination' | 'tour'
}

export interface User {
  id: number
  name: string
  email: string
}

interface AppContextType {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
  wishlist: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: number) => void
  isInWishlist: (id: number) => boolean
  user: User | null
  token: string | null
  login: (token: string, user: User) => void
  logout: () => void
}

export const AppContext = createContext<AppContextType>({
  darkMode: false,
  setDarkMode: () => {},
  wishlist: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
})

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })
  
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token') || null
  })

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('wishlist')
    return saved ? JSON.parse(saved) : []
  })

  // Theme Sync
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Local Storage Wishlist Sync (only for non-logged-in users)
  useEffect(() => {
    if (!token) {
      localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }
  }, [wishlist, token])

  // Sync Wishlist from Backend when Logged In
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!token) return
      try {
        const res = await fetch('/api/wishlist', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (res.ok) {
          const dbWishlist = await res.json() as Array<{ item_id: number, item_type: 'tour' | 'destination' }>
          const items: WishlistItem[] = dbWishlist.map((w) => {
            const dest = destinationsData.find(d => d.id === w.item_id)
            return dest ? { id: dest.id, name: dest.name, image: dest.image, price: dest.price, type: 'destination' as const } : null
          }).filter(Boolean) as WishlistItem[]
          setWishlist(items)
        }
      } catch (err) {
        console.error('Failed to fetch backend wishlist:', err)
      }
    }
    fetchWishlist()
  }, [token])

  const login = (newToken: string, newUser: User) => {
    setToken(newToken)
    setUser(newUser)
    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    setWishlist([])
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('wishlist')
  }

  const addToWishlist = async (item: WishlistItem) => {
    if (wishlist.find((i) => i.id === item.id && i.type === item.type)) return

    if (token) {
      try {
        const res = await fetch('/api/wishlist/toggle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ item_id: item.id, item_type: item.type })
        })
        if (res.ok) {
          setWishlist((prev) => [...prev, item])
        }
      } catch (err) {
        console.error('Failed to add wishlist item on server:', err)
      }
    } else {
      setWishlist((prev) => [...prev, item])
    }
  }

  const removeFromWishlist = async (id: number) => {
    const item = wishlist.find((i) => i.id === id)
    if (!item) return

    if (token) {
      try {
        const res = await fetch('/api/wishlist/toggle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ item_id: item.id, item_type: item.type })
        })
        if (res.ok) {
          setWishlist((prev) => prev.filter((i) => i.id !== id))
        }
      } catch (err) {
        console.error('Failed to remove wishlist item from server:', err)
      }
    } else {
      setWishlist((prev) => prev.filter((i) => i.id !== id))
    }
  }

  const isInWishlist = (id: number) => {
    return wishlist.some((item) => item.id === id)
  }

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        user,
        token,
        login,
        logout,
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="destinations" element={<Destinations />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="booking-details" element={<BookingDetails />} />  {/* ✅ NEW */}
          <Route path="payment" element={<Payment />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  )
}

export default App