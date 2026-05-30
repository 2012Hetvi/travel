import { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import { FiStar, FiHeart, FiMapPin } from 'react-icons/fi'
import { AppContext, WishlistItem } from '../App'
import type { Destination } from '../data/destinations'
import DestinationDetailModal from './DestinationDetailModal'

interface DestinationCardProps {
  destination: Destination
  index?: number
}

function DestinationCard({ destination, index = 0 }: DestinationCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(AppContext)
  const inWishlist = isInWishlist(destination.id)

  const [selectedDestId, setSelectedDestId] = useState<number | null>(null)

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const item: WishlistItem = {
      id: destination.id,
      name: destination.name,
      image: destination.image,
      price: destination.price,
      type: 'destination'
    }

    if (inWishlist) {
      removeFromWishlist(destination.id)
    } else {
      addToWishlist(item)
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        onClick={() => setSelectedDestId(destination.id)}
        className="cursor-pointer"
      >
        <div className="group block bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={destination.image}
              alt={destination.name}
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

            {/* Price Badge */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
              From {destination.price}
            </div>

            {/* Location */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
              <FiMapPin className="w-4 h-4" />
              <span className="text-sm font-medium">{destination.country}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
                {destination.name}
              </h3>
              <div className="flex items-center gap-1">
                <FiStar className="w-4 h-4 text-accent fill-accent" />
                <span className="text-sm font-medium text-card-foreground">{destination.rating}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {destination.description}
            </p>
            <div className="mt-4">
              <span className="inline-block px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium">
                {destination.category}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <DestinationDetailModal
        destinationId={selectedDestId}
        onClose={() => setSelectedDestId(null)}
      />
    </>
  )
}

export default DestinationCard
