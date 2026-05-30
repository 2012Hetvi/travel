import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCompass, FiSun, FiHeart, FiFeather } from 'react-icons/fi'
import destinations from '../data/destinations'
import DestinationCard from './DestinationCard'

const moods = [
  { id: 'adventure', label: 'Adventure', icon: FiCompass, categories: ['Adventure'] },
  { id: 'relax', label: 'Relax', icon: FiSun, categories: ['Beach', 'Nature'] },
  { id: 'romantic', label: 'Romantic', icon: FiHeart, categories: ['Romantic'] },
  { id: 'nature', label: 'Nature', icon: FiFeather, categories: ['Nature', 'Adventure'] }
]

function MoodRecommendations() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  const filteredDestinations = selectedMood
    ? destinations.filter((d) =>
        moods.find((m) => m.id === selectedMood)?.categories.includes(d.category)
      )
    : []

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            How Are You Feeling Today?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select your mood and discover destinations that match your vibe
          </p>
        </motion.div>

        {/* Mood Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(selectedMood === mood.id ? null : mood.id)}
              className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-medium transition-all ${
                selectedMood === mood.id
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                  : 'bg-card text-card-foreground hover:bg-muted shadow-md'
              }`}
            >
              <mood.icon className="w-6 h-6" />
              <span>{mood.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Results */}
        {selectedMood && filteredDestinations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredDestinations.slice(0, 6).map((destination, index) => (
              <DestinationCard key={destination.id} destination={destination} index={index} />
            ))}
          </motion.div>
        )}

        {selectedMood && filteredDestinations.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground"
          >
            No destinations found for this mood. Try another one!
          </motion.p>
        )}
      </div>
    </section>
  )
}

export default MoodRecommendations
