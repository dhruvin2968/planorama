import React from "react";

export const Footer = () => {
  return (
    <footer className="relative -z-0 bg-Bluee text-gray-700 bg-fixed">
      {/* Wavy Border */}
      <div className="relative -top-4 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 1 1200 120"
          preserveAspectRatio="none"
          className="w-full h-8 fill-current text-blue-900"
        >
          <path d="M0,120 C150,100 350,0 600,0 C850,0 1050,100 1200,120 L1200,0 L0,0 Z"></path>
        </svg>
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <h2 className="text-2xl font-bold text-blue-600">Planorama</h2>
            <p className="mt-4 text-sm">
              Your ultimate travel itinerary planner. Simplify, explore, and
              make every journey unforgettable with Planorama.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-blue-500">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="/about" className="hover:text-blue-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-600">
                  Contact
                </a>
              </li>
              <li>
                <a href="/destinations" className="hover:text-blue-600">
                  Destinations
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-blue-600">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-blue-500">Contact Us</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Email: support@planorama.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Travel Lane, Wanderlust City</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-blue-500">
              Stay Updated
            </h3>
            <p className="mt-4 text-sm">
              Subscribe to our newsletter for the latest travel tips and
              exclusive offers.
            </p>
            <form className="mt-4 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 p-2 border border-blue-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-blue-200 pt-4 text-center text-sm">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Planorama. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <a
              href="/"
              className="text-blue-400 hover:text-blue-600 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/"
              className="text-blue-400 hover:text-blue-600 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

