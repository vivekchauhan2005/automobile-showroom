import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Drive Your Dream
              <span className="block text-blue-300">Car Today</span>
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-lg">
              Experience luxury and performance with our curated collection of premium vehicles. 
              Find your perfect match today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/vehicles')}
                className="px-8 py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Explore Inventory
              </button>
              <button 
                onClick={() => navigate('/test-drive')}
                className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
              >
                Book Test Drive
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-blue-600">
              <div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-blue-200 text-sm">Vehicles</div>
              </div>
              <div>
                <div className="text-2xl font-bold">98%</div>
                <div className="text-blue-200 text-sm">Satisfaction</div>
              </div>
              <div>
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-blue-200 text-sm">Support</div>
              </div>
            </div>
          </div>

           
          <div className="hidden lg:block">
            <div className="relative">
              <div className="bg-blue-800 rounded-2xl p-4 shadow-2xl">
                <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl p-8 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🚗</div>
                    <p className="text-blue-200">Luxury Vehicle Showcase</p>
                    <p className="text-sm text-blue-300 mt-2">Porsche | Mercedes | Audi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;