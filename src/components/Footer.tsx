import { Link } from 'react-router-dom'
import {
  FiMail,
  FiPhone,
  FiMapPin,
} from 'react-icons/fi'

function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              Quick Links
            </h4>

            <ul className="space-y-3">
              <li>
                <Link to="/destinations" className="text-background/70 hover:text-primary transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/tours" className="text-background/70 hover:text-primary transition-colors">
                  Tours
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-background/70 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-background/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              Services
            </h4>

            <ul className="space-y-3">
              <li><span className="text-background/70">Flight Booking</span></li>
              <li><span className="text-background/70">Hotel Reservations</span></li>
              <li><span className="text-background/70">Tour Packages</span></li>
              <li><span className="text-background/70">Travel Insurance</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              Contact Us
            </h4>

            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <FiMapPin className="w-5 h-5 text-primary" />
                <span className="text-background/70">123 Travel Lane, Ahmedabad</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="w-5 h-5 text-primary" />
                <span className="text-background/70">+1 9726129554</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="w-5 h-5 text-primary" />
                <span className="text-background/70">hetvimaheshwari7@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-background/10 text-center">
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} Wanderlust. All rights reserved.
            Made with passion for travel.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
