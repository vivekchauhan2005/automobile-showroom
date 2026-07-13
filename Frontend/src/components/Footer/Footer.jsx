import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              <span className="text-blue-500">LUXURY</span>
              <span className="text-white"> MOTORS</span>
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Your premier destination for luxury vehicles. Drive your dream car today.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">📱</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">📘</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">📷</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">▶️</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/vehicles" className="text-gray-400 hover:text-white transition-colors">Inventory</Link></li>
              <li><Link to="/brand" className="text-gray-400 hover:text-white transition-colors">Brand</Link></li>
              <li><Link to="/finance" className="text-gray-400 hover:text-white transition-colors">Finance</Link></li>
              <li><Link to="/test-drive" className="text-gray-400 hover:text-white transition-colors">Test Drive</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📞 +1 (555) 123-4567</li>
              <li>📧 info@luxurymotors.com</li>
              <li>📍 123 Luxury Ave, Beverly Hills, CA 90210</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-3">Subscribe to get exclusive offers and updates</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; 2026 Luxury Motors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;