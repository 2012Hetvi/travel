export interface Destination {
  id: number
  name: string
  country: string
  image: string
  price: string
  rating: number
  description: string
  category: string
  featured: boolean
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&auto=format&fit=crop",
    price: "₹799",
    rating: 4.9,
    description: "Tropical paradise with stunning temples, rice terraces, and pristine beaches",
    category: "Beach",
    featured: true
  },
  {
    id: 2,
    name: "Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&auto=format&fit=crop",
    price: "₹1,299",
    rating: 4.8,
    description: "Iconic white-washed buildings overlooking the stunning Aegean Sea",
    category: "Romantic",
    featured: true
  },
  {
    id: 3,
    name: "Swiss Alps",
    country: "Switzerland",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&auto=format&fit=crop",
    price: "₹1,599",
    rating: 4.9,
    description: "Majestic mountain peaks, charming villages, and world-class skiing",
    category: "Adventure",
    featured: true
  },
  {
    id: 4,
    name: "Tokyo",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop",
    price: "₹1,199",
    rating: 4.7,
    description: "Where ancient traditions meet cutting-edge technology",
    category: "Culture",
    featured: true
  },
  {
    id: 5,
    name: "Maldives",
    country: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&auto=format&fit=crop",
    price: "₹2,199",
    rating: 5.0,
    description: "Crystal clear waters and overwater bungalows in paradise",
    category: "Beach",
    featured: false
  },
  {
    id: 6,
    name: "Machu Picchu",
    country: "Peru",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&auto=format&fit=crop",
    price: "₹1,399",
    rating: 4.8,
    description: "Ancient Incan citadel set high in the Andes Mountains",
    category: "Adventure",
    featured: false
  },
  {
    id: 7,
    name: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop",
    price: "₹999",
    rating: 4.6,
    description: "The city of love, lights, art, and exquisite cuisine",
    category: "Romantic",
    featured: false
  },
  {
    id: 8,
    name: "Safari Kenya",
    country: "Kenya",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop",
    price: "₹1,899",
    rating: 4.9,
    description: "Witness the great migration and Big Five wildlife",
    category: "Nature",
    featured: false
  },
  {
    id: 9,
    name: "New Zealand",
    country: "New Zealand",
    image: "https://images.unsplash.com/photo-1469521669194-babb45599def?w=800&auto=format&fit=crop",
    price: "₹1,799",
    rating: 4.8,
    description: "Breathtaking landscapes from mountains to beaches",
    category: "Adventure",
    featured: false
  },
  {
    id: 10,
    name: "Dubai",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop",
    price: "₹1,099",
    rating: 4.5,
    description: "Futuristic skyline, luxury shopping, and desert adventures",
    category: "Culture",
    featured: false
  },
  {
    id: 11,
    name: "Iceland",
    country: "Iceland",
    image: "https://images.unsplash.com/photo-1520769669658-f07657f5a307?w=800&auto=format&fit=crop",
    price: "₹1,499",
    rating: 4.9,
    description: "Land of fire and ice with northern lights and geysers",
    category: "Nature",
    featured: false
  },
  {
    id: 12,
    name: "Amalfi Coast",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1534008897995-27a23e859048?w=800&auto=format&fit=crop",
    price: "₹1,349",
    rating: 4.7,
    description: "Dramatic coastline with colorful villages and Mediterranean charm",
    category: "Romantic",
    featured: false
  }
]

export default destinations
