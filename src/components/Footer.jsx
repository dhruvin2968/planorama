import React from "react";

export const Footer = () => {
  return (
    <footer
      className="relative -z-0 bg-gradient-to-l from-indigo-100 via-indigo-200 to-indigo-100
         dark:bg-black dark:from-indigo-900 dark:via-black  dark:to-black text-gray-700 dark:text-gray-300 bg-fixed"
    >

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              Planorama
            </h2>
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
              Your ultimate travel itinerary planner. Simplify, explore, and
              make every journey unforgettable with Planorama.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>
                <a
                  href="/about"
                  className="hover:text-blue-600 dark:hover:text-blue-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-blue-600 dark:hover:text-blue-300"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/destinations"
                  className="hover:text-blue-600 dark:hover:text-blue-300"
                >
                  Destinations
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="hover:text-blue-600 dark:hover:text-blue-300"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>Email: support@planorama.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Travel Lane, Wanderlust City</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-blue-500 dark:text-blue-400">
              Stay Updated
            </h3>
            <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
              Subscribe to our newsletter for the latest travel tips and
              exclusive offers.
            </p>
            <form className="mt-4 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 p-2 border border-blue-300 dark:border-blue-700 rounded-l-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none text-gray-900 dark:text-gray-100"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-blue-200 dark:border-blue-700 pt-4 text-center text-sm">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Planorama. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-4">
            <a
              href="/"
              className="text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/"
              className="text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
