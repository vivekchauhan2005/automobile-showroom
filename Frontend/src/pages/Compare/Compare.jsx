import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const Compare = () => {
  const [selectedVehicles, setSelectedVehicles] = useState([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">Compare Vehicles</h1>
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-600 text-lg">Select vehicles to compare their features</p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <p className="text-gray-400">Select Vehicle 1</p>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <p className="text-gray-400">Select Vehicle 2</p>
            </div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <p className="text-gray-400">Select Vehicle 3</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Compare;