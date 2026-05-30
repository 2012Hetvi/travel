import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiStar, FiHeart, FiClock, FiMapPin } from 'react-icons/fi'
import { AppContext, WishlistItem } from '../App'
import type { Tour } from '../data/tours'

interface TourCardProps {
  tour: Tour
  index?: number
}

function TourCard({ tour, index = 0 }: TourCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(AppContext)
  const inWishlist = isInWishlist(tour.id)

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const item: WishlistItem = {
      id: tour.id,
      name: tour.name,
      image: tour.image,
      price: tour.price,
      type: 'tour'
    }

    if (inWishlist) {
      removeFromWishlist(tour.id)
    } else {
      addToWishlist(item)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/tours/${tour.id}`}
        className="group block bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={tour.image}
            alt={tour.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          
          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
              inWishlist
                ? 'bg-primary text-primary-foreground'
                : 'bg-background/80 text-foreground hover:bg-primary hover:text-primary-foreground'
            }`}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <FiHeart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
          </button>

          {/* Duration Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
            <FiClock className="w-4 h-4" />
            {tour.duration}
          </div>

          {/* Location */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
            <FiMapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{tour.destination}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
              {tour.name}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
              <FiStar className="w-4 h-4 text-accent fill-accent" />
              <span className="text-sm font-medium text-card-foreground">{tour.rating}</span>
              <span className="text-xs text-muted-foreground">({tour.reviews})</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {tour.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs font-medium">
                {tour.category}
              </span>
              <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs font-medium">
                {tour.difficulty}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-muted-foreground">From</span>
              <div className="text-lg font-bold text-primary">{tour.price}</div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default TourCard
