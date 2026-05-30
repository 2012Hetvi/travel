import { motion } from 'framer-motion'
import { Plane, Home, Map, Shield } from 'lucide-react'

const services = [
  {
    icon: Plane,
    title: 'Flight Booking',
    description: 'Find the best flight deals to anywhere in the world with our easy booking system.'
  },
  {
    icon: Home,
    title: 'Hotel Reservations',
    description: 'From budget-friendly to luxury, book accommodations that suit your style.'
  },
  {
    icon: Map,
    title: 'Tour Packages',
    description: 'Expertly curated tour packages with local guides and unforgettable experiences.'
  },
  {
    icon: Shield,
    title: 'Travel Insurance',
    description: 'Travel with peace of mind with our comprehensive travel insurance options.'
  }
]

function Services() {
  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need for the perfect trip, all in one place
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 text-center hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
