import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiPlus, FiSearch, FiEdit, FiTrash2, FiEye, 
  FiFilter, FiDownload, FiChevronLeft, FiChevronRight 
} from 'react-icons/fi';

const VehicleList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState('all');

  const vehicles = [
    { id: 1, name: 'Porsche 911', brand: 'Porsche', year: 2024, price: 179990, status: 'Available', image: '🚗', fuelType: 'Petrol' },
    { id: 2, name: 'Mercedes S-Class', brand: 'Mercedes', year: 2024, price: 253990, status: 'Available', image: '🚗', fuelType: 'Petrol' },
    { id: 3, name: 'Audi Q7', brand: 'Audi', year: 2024, price: 169990, status: 'Sold', image: '🚗', fuelType: 'Diesel' },
    { id: 4, name: 'Tesla Model S', brand: 'Tesla', year: 2024, price: 199990, status: 'Available', image: '🚗', fuelType: 'Electric' },
    { id: 5, name: 'Lexus LS', brand: 'Lexus', year: 2024, price: 189990, status: 'Available', image: '🚗', fuelType: 'Petrol' },
    { id: 6, name: 'BMW 7 Series', brand: 'BMW', year: 2024, price: 210990, status: 'Coming Soon', image: '🚗', fuelType: 'Petrol' },
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Available': 'bg-green-100 text-green-700',
      'Sold': 'bg-red-100 text-red-700',
      'Coming Soon': 'bg-yellow-100 text-yellow-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Vehicles</h1>
          <p className="text-gray-500">Add, edit, or remove vehicles from your inventory</p>
        </div>
        <button
          onClick={() => navigate('/admin/vehicles/add')}
          className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
        >
          <FiPlus className="w-5 h-5" />
          Add Vehicle
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search vehicles by name or brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
          >
            <option value="all">All Status</option>
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
            <option value="Coming Soon">Coming Soon</option>
          </select>
          <button className="px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <FiFilter className="w-4 h-4" />
            Filters
          </button>
          <button className="px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <FiDownload className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fuel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{vehicle.image}</span>
                      <span className="font-medium text-gray-900">{vehicle.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{vehicle.brand}</td>
                  <td className="px-6 py-4 text-gray-700">{vehicle.year}</td>
                  <td className="px-6 py-4 font-semibold text-blue-600">{formatPrice(vehicle.price)}</td>
                  <td className="px-6 py-4 text-gray-700">{vehicle.fuelType}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(vehicle.status)}`}>
                      {vehicle.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                        <FiEdit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing 1-6 of 24 vehicles</p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50">
              <FiChevronLeft className="w-4 h-4" />
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">1</button>
            <button className="px-3 py-1 hover:bg-gray-100 rounded-lg text-sm">2</button>
            <button className="px-3 py-1 hover:bg-gray-100 rounded-lg text-sm">3</button>
            <button className="px-3 py-1 hover:bg-gray-100 rounded-lg text-sm">4</button>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleList;