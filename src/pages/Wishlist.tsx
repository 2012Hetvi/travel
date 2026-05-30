import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHeart, FiTrash2, FiArrowRight } from 'react-icons/fi'
import { AppContext } from '../App'

function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(AppContext)

  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Hero */}
      <section className="py-12 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
              <FiHeart className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                My Wishlist
              </h1>
              <p className="text-muted-foreground">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map((item, index) => (
                <motion.div
                  key={`${item.type}-${item.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl overflow-hidden shadow-lg group"
                >
                  <div className="relative aspect-[4/3]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-4 right-4 p-2 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-4 left-4">
                      <span className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs font-medium capitalize">
                        {item.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-card-foreground mb-2">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">{item.price}</span>
                      <Link
                        to={item.type === 'tour' ? `/tours/${item.id}` : '/destinations'}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        View Details
                        <FiArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <FiHeart className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Your Wishlist is Empty
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Start exploring our destinations and tours to add items to your wishlist. Click the heart icon on any item to save it for later.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/destinations"
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                  Explore Destinations
                </Link>
                <Link
                  to="/tours"
                  className="px-6 py-3 bg-muted text-muted-foreground rounded-xl font-medium hover:bg-muted/80 transition-colors"
                >
                  Browse Tours
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Wishlist
