import { motion } from 'framer-motion'
import { FiStar } from 'react-icons/fi'
import type { Testimonial } from '../data/testimonials'

interface TestimonialCardProps {
  testimonial: Testimonial
  index?: number
}

function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-2xl p-6 shadow-lg"
    >
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <FiStar
            key={i}
            className={`w-5 h-5 ${
              i < testimonial.rating
                ? 'text-accent fill-accent'
                : 'text-muted-foreground'
            }`}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-card-foreground mb-6 leading-relaxed">
        "{testimonial.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold text-card-foreground">{testimonial.name}</h4>
          <p className="text-sm text-muted-foreground">{testimonial.location}</p>
        </div>
      </div>

      {/* Tour Tag */}
      <div className="mt-4 pt-4 border-t border-border">
        <span className="text-xs text-muted-foreground">Traveled with:</span>
        <span className="ml-2 text-sm font-medium text-primary">{testimonial.tour}</span>
      </div>
    </motion.div>
  )
}

export default TestimonialCard
