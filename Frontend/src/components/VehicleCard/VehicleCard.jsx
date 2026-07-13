import React from 'react';
import { useNavigate } from 'react-router-dom';

const VehicleCard = ({ vehicle }) => {
  const navigate = useNavigate();

  const { id, name, brand, price, horsepower, fuelType, image, year } = vehicle;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {/* Image Container */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-gray-100 to-gray-200">
            🚗
          </div>
        )}
        <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {brand}
        </div>
        <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors">
          <svg className="w-5 h-5 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {name}
            </h3>
            <p className="text-sm text-gray-500">{year}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">${price}</p>
          </div>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-3 gap-2 my-4 py-3 border-t border-b border-gray-100">
          <div className="text-center">
            <p className="text-xs text-gray-500">Horsepower</p>
            <p className="text-sm font-semibold">{horsepower} HP</p>
          </div>
          <div className="text-center border-l border-r border-gray-100">
            <p className="text-xs text-gray-500">Fuel</p>
            <p className="text-sm font-semibold">{fuelType}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">Transmission</p>
            <p className="text-sm font-semibold">Automatic</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button 
            onClick={() => navigate(`/vehicle/${id}`)}
            className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
          >
            View Details
          </button>
          <button 
            onClick={() => navigate('/test-drive')}
            className="flex-1 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold text-sm"
          >
            Test Drive
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;