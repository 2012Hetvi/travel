import { motion } from 'framer-motion'
import { FiTarget, FiHeart, FiAward, FiUsers } from 'react-icons/fi'

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '500+', label: 'Destinations' },
  { value: '50K+', label: 'Happy Travelers' },
  { value: '100+', label: 'Expert Guides' }
]

const values = [
  {
    icon: FiTarget,
    title: 'Our Mission',
    description: 'To inspire and enable people to explore the world through authentic, sustainable, and unforgettable travel experiences.'
  },
  {
    icon: FiHeart,
    title: 'Our Passion',
    description: 'We believe travel has the power to transform lives, broaden perspectives, and create connections that transcend borders.'
  },
  {
    icon: FiAward,
    title: 'Our Promise',
    description: 'Every journey with us is crafted with care, attention to detail, and a commitment to creating memories that last a lifetime.'
  },
  {
    icon: FiUsers,
    title: 'Our Community',
    description: 'Join a global family of adventure seekers, culture enthusiasts, and nature lovers who share a passion for exploration.'
  }
]

const team = [
  {
    name: 'Sarah Mitchell',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop',
    bio: 'World traveler with 20+ years of experience curating unforgettable journeys.'
  },
  {
    name: 'David Chen',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop',
    bio: 'Logistics expert ensuring every trip runs smoothly from start to finish.'
  },
  {
    name: 'Emma Rodriguez',
    role: 'Lead Travel Designer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop',
    bio: 'Creative visionary who transforms travel dreams into reality.'
  },
  {
    name: 'James Wilson',
    role: 'Customer Experience',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop',
    bio: 'Dedicated to making every traveler feel valued and supported.'
  }
]

function About() {
  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&auto=format&fit=crop"
            alt="Road trip adventure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              About Wanderlust
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              {"We're more than a travel company. We're your partners in adventure, curating experiences that inspire, connect, and transform."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Wanderlust was born from a simple belief: that travel is the greatest teacher. Founded in 2014 by passionate travelers, we set out to create a different kind of travel company - one that prioritizes authentic experiences over tourist traps, connection over consumption.
                </p>
                <p>
                  Over the years, {"we've"} grown from a small team of adventure enthusiasts to a global community of travelers, guides, and local partners. But our core mission remains the same: to help you discover not just new places, but new perspectives.
                </p>
                <p>
                  Every destination we offer, every tour we design, is crafted with care and a deep respect for local cultures and environments. {"We're"} committed to sustainable tourism that benefits both travelers and the communities they visit.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800&auto=format&fit=crop"
                alt="Travel adventure"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/10 rounded-2xl -z-10" />
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary/10 rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What Drives Us
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our values shape every journey we create and every relationship we build
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-lg"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passionate travelers dedicated to making your journey extraordinary
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-40 h-40 rounded-full object-cover mx-auto"
                  />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
