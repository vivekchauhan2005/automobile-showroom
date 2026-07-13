import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { vehicles } from '../../data/mockData';

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
  
    const foundVehicle = vehicles.find(v => v.id === parseInt(id));
    setVehicle(foundVehicle || null);
    setImageError(false);
  }, [id]);

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold">Vehicle not found</h2>
          <button 
            onClick={() => navigate('/vehicles')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Inventory
          </button>
        </div>
        <Footer />
      </div>
    );
  }
 
  const getFeatures = (brand) => {
    const featuresMap = {
      'Porsche': ['Leather Seats', 'Navigation System', 'Premium Sound', 'Parking Sensors', 'Sport Exhaust'],
      'Mercedes': ['Massage Seats', 'Ambient Lighting', 'Air Suspension', 'Premium Audio', 'Burmester Sound'],
      'Audi': ['Quattro AWD', 'Virtual Cockpit', 'Bang & Olufsen Sound', 'Adaptive Cruise Control'],
      'Tesla': ['Autopilot', 'Glass Roof', 'Premium Interior', 'Supercharging'],
      'Lexus': ['Mark Levinson Sound', 'Lexus Safety System', 'Heated Seats', 'Panoramic View'],
      'BMW': ['iDrive System', 'Harman Kardon Sound', 'Laser Lights', 'Driving Assistance']
    };
    return featuresMap[brand] || ['Premium Features', 'Advanced Safety', 'Luxury Interior', 'Performance Package'];
  };

  const features = getFeatures(vehicle.brand);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <button 
          onClick={() => navigate('/vehicles')}
          className="mb-6 text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Inventory
        </button>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Section */}
            <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
              {vehicle.image && !imageError ? (
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name} 
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-gray-100 to-gray-200">
                  🚗
                </div>
              )}
              {/* Brand Badge */}
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                {vehicle.brand}
              </div>
              {/* Year Badge */}
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg text-sm font-semibold">
                {vehicle.year}
              </div>
            </div>

            {/* Details Section */}
            <div className="p-8">
              <h1 className="text-3xl font-bold mb-2 text-gray-900">{vehicle.name}</h1>
              <p className="text-gray-600 text-lg mb-4">{vehicle.brand} • {vehicle.year}</p>
              <p className="text-4xl font-bold text-blue-600 mb-6">${vehicle.price}</p>
              
              {/* Specifications */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Horsepower</p>
                  <p className="font-bold text-gray-900">{vehicle.horsepower} HP</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Fuel</p>
                  <p className="font-bold text-gray-900">{vehicle.fuelType}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Transmission</p>
                  <p className="font-bold text-gray-900">{vehicle.transmission}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6 leading-relaxed">{vehicle.description}</p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Key Features:</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {features.map((feature, index) => (
                    <li key={index} className="text-gray-600 flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => navigate('/test-drive')}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Book a Test Drive
                </button>
                <button 
                  onClick={() => navigate('/vehicles')}
                  className="flex-1 border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  View More Vehicles
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VehicleDetails;