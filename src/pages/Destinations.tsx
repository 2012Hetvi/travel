import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiFilter } from 'react-icons/fi'
import DestinationCard from '../components/DestinationCard'
import { fetchDestinations } from '../lib/api'

const categories = ['All', 'Beach', 'Adventure', 'Romantic', 'Culture', 'Nature']
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹1000', min: 0, max: 1000 },
  { label: '₹1000 - ₹1500', min: 1000, max: 1500 },
  { label: '₹1500 - ₹2000', min: 1500, max: 2000 },
  { label: 'Over ₹2000', min: 2000, max: Infinity }
]

function Destinations() {
  const [destinations, setDestinations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPriceRange, setSelectedPriceRange] = useState(0)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const data = await fetchDestinations()
        setDestinations(data)
      } catch (err: any) {
        setError(err.message || 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    loadDestinations()
  }, [])

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      const matchesSearch = destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        destination.country.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || destination.category === selectedCategory
      const price = parseInt(destination.price.replace(/[^0-9]/g, ''))
      const { min, max } = priceRanges[selectedPriceRange]
      const matchesPrice = price >= min && price <= max
      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [destinations, searchQuery, selectedCategory, selectedPriceRange])

  return (
    <div className="pt-20 min-h-screen bg-background">
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Explore Destinations
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover breathtaking destinations around the world. From tropical beaches to mountain peaks, find your perfect getaway.
            </p>
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 mb-6 px-4 py-2 bg-card border border-border rounded-lg text-foreground"
          >
            <FiFilter className="w-4 h-4" />
            <span>Filters</span>
          </button>

          <div className="flex flex-col lg:flex-row gap-8">
            <motion.aside
              initial={false}
              animate={{ height: showFilters ? 'auto' : 0, opacity: showFilters ? 1 : 0 }}
              className={`lg:w-64 shrink-0 overflow-hidden lg:!h-auto lg:!opacity-100`}
            >
              <div className="bg-card rounded-2xl p-6 shadow-lg">
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          selectedCategory === category
                            ? 'bg-primary text-primary-foreground'
                            : 'text-card-foreground hover:bg-muted'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-4">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range, index) => (
                      <button
                        key={range.label}
                        onClick={() => setSelectedPriceRange(index)}
                        className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          selectedPriceRange === index
                            ? 'bg-primary text-primary-foreground'
                            : 'text-card-foreground hover:bg-muted'
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{loading ? '...' : filteredDestinations.length}</span> destinations
                </p>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50 animate-pulse">
                      <div className="aspect-[4/3] bg-muted w-full" />
                      <div className="p-6 space-y-4">
                        <div className="h-4 bg-muted rounded w-1/4" />
                        <div className="h-6 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-5/6" />
                        <div className="flex justify-between items-center pt-4 border-t border-border/50">
                          <div className="h-6 bg-muted rounded w-1/4" />
                          <div className="h-4 bg-muted rounded w-1/4" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-20 text-destructive font-medium">
                  {error}. Please try again later.
                </div>
              ) : filteredDestinations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredDestinations.map((destination, index) => (
                    <DestinationCard key={destination.id} destination={destination} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">No destinations found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('All')
                      setSelectedPriceRange(0)
                    }}
                    className="mt-4 text-primary font-medium hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Destinations