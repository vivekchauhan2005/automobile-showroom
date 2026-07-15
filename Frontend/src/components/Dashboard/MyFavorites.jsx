import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import DashboardSidebar from './DashboardSidebar';

const MyFavorites = () => {
  const navigate = useNavigate();
  const [favorites] = useState([
    { id: 1, name: 'Porsche 911 Carrera', price: '$179,990', year: '2024' },
    { id: 2, name: 'Mercedes S-Class', price: '$253,990', year: '2024' },
    { id: 3, name: 'Audi Q7', price: '$169,990', year: '2024' },
    { id: 4, name: 'Tesla Model S', price: '$199,990', year: '2024' },
    { id: 5, name: 'Lexus LS', price: '$189,990', year: '2024' }
  ]);

  const [favoriteIds, setFavoriteIds] = useState([1, 2, 3, 4, 5]);

  const removeFavorite = (id) => {
    setFavoriteIds(favoriteIds.filter(favId => favId !== id));
  };

  const filteredFavorites = favorites.filter(fav => favoriteIds.includes(fav.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <DashboardSidebar />
          
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">My Favorites</h2>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  ← Back to Dashboard
                </button>
              </div>
              
              {filteredFavorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredFavorites.map((car) => (
                    <div key={car.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">🚗</div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{car.name}</h3>
                          <p className="text-sm text-gray-500">{car.year}</p>
                          <p className="text-blue-600 font-bold">{car.price}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button 
                          onClick={() => navigate(`/vehicle/${car.id}`)}
                          className="flex-1 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                        >
                          View Details
                        </button>
                        <button 
                          onClick={() => removeFavorite(car.id)}
                          className="py-1.5 px-3 bg-red-50 text-red-600 rounded-lg text-sm hover:bg-red-100 transition-colors"
                        >
                          ♥
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">❤️</div>
                  <h3 className="text-xl font-semibold text-gray-700">No favorites yet</h3>
                  <p className="text-gray-500 mt-2">Start adding vehicles to your favorites</p>
                  <button 
                    onClick={() => navigate('/vehicles')}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Browse Vehicles
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyFavorites;