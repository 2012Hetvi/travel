export interface Testimonial {
  id: number
  name: string
  avatar: string
  location: string
  rating: number
  text: string
  tour: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop",
    location: "New York, USA",
    rating: 5,
    text: "An absolutely incredible experience! The Bali tour exceeded all my expectations. The guides were knowledgeable and the accommodations were perfect.",
    tour: "Bali Adventure Explorer"
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop",
    location: "Toronto, Canada",
    rating: 5,
    text: "The Japan Cultural Journey was life-changing. From the serene temples of Kyoto to the bustling streets of Tokyo, every moment was magical.",
    tour: "Japan Cultural Journey"
  },
  {
    id: 3,
    name: "Emma Williams",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop",
    location: "London, UK",
    rating: 5,
    text: "The Greek Island Hopping tour was the perfect romantic getaway. Santorini sunsets and Mykonos beaches - pure bliss!",
    tour: "Greek Island Hopping"
  },
  {
    id: 4,
    name: "David Martinez",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop",
    location: "Sydney, Australia",
    rating: 4,
    text: "The Swiss Alps Adventure challenged me in the best ways possible. The mountain views were absolutely breathtaking!",
    tour: "Swiss Alps Adventure"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop",
    location: "Berlin, Germany",
    rating: 5,
    text: "Wanderlust made our honeymoon unforgettable. The attention to detail and personalized service were outstanding.",
    tour: "Maldives Luxury Escape"
  },
  {
    id: 6,
    name: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop",
    location: "Dubai, UAE",
    rating: 5,
    text: "The Kenya Safari was a dream come true. Seeing the Big Five in their natural habitat was an experience I'll never forget.",
    tour: "Kenya Safari Experience"
  }
]

export default testimonials
