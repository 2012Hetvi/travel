import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import DestinationCard from '../components/DestinationCard'
import TestimonialCard from '../components/TestimonialCard'
import Services from '../components/Services'
import MoodRecommendations from '../components/MoodRecommendations'
import destinations from '../data/destinations'
import testimonials from '../data/testimonials'

function Home() {
  const featuredDestinations = destinations.filter((d) => d.featured)

  return (
    <div>
      <Hero />

      {/* Featured Destinations */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
          >
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Featured Destinations
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Explore our handpicked destinations loved by travelers worldwide
              </p>
            </div>
            <Link
              to="/destinations"
              className="mt-4 md:mt-0 text-primary font-medium hover:underline"
            >
              View All Destinations
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map((destination, index) => (
              <DestinationCard key={destination.id} destination={destination} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <Services />

      {/* Mood Recommendations */}
      <MoodRecommendations />

      {/* Testimonials */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What Travelers Say
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Real experiences from real travelers who explored with us
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 6).map((testimonial, index) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Start planning your dream trip today and create memories that last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/destinations"
                className="px-8 py-4 bg-background text-foreground rounded-full font-medium hover:bg-background/90 transition-colors"
              >
                Explore Destinations
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-transparent border-2 border-primary-foreground text-primary-foreground rounded-full font-medium hover:bg-primary-foreground/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home