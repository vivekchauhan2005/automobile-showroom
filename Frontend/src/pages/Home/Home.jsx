import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import Footer from '../../components/Footer/Footer';
import VehicleCard from '../../components/VehicleCard/VehicleCard';
import { vehicles, testimonials } from '../../data/mockData';

const Home = () => {
  const navigate = useNavigate();
  const [featuredVehicles] = useState(vehicles.slice(0, 3));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Brands Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400 hover:text-blue-600 transition-colors cursor-pointer">
                PORSCHE
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400 hover:text-blue-600 transition-colors cursor-pointer">
                TESLA
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400 hover:text-blue-600 transition-colors cursor-pointer">
                LEXUS
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-400 hover:text-blue-600 transition-colors cursor-pointer">
                MERCEDES
              </div>
            </div>
          </div>
        </div>
      </section>
 
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🏆</div>
              <h3 className="text-xl font-semibold mb-2">Certified Vehicles</h3>
              <p className="text-gray-600">All vehicles are thoroughly inspected and certified</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">💰</div>
              <h3 className="text-xl font-semibold mb-2">Flexible Finance</h3>
              <p className="text-gray-600">Customized financing options for every budget</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">Premium Warranty</h3>
              <p className="text-gray-600">Comprehensive warranty coverage for peace of mind</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">⭐</div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">Dedicated team to assist you at every step</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Featured Vehicles</h2>
              <p className="text-gray-500 mt-2">Explore our handpicked selection of luxury vehicles</p>
            </div>
            <button 
              onClick={() => navigate('/vehicles')}
              className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
            >
              View All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Customer Testimonials</h2>
          <p className="text-center text-gray-500 mb-12">What our customers say about us</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <div className="text-yellow-400 text-sm">★★★★★</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Drive Your Dream Car?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Visit our showroom or book a test drive today and experience the luxury you deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/vehicles')}
              className="px-8 py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Browse Inventory
            </button>
            <button 
              onClick={() => navigate('/test-drive')}
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            >
              Book Test Drive
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;