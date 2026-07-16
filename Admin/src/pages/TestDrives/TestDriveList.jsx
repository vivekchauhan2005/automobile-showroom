import React, { useState } from 'react';
import { FiSearch, FiEye, FiCheck, FiX, FiClock } from 'react-icons/fi';

const TestDriveList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const testDrives = [
    { id: 1, customer: 'John Doe', vehicle: 'Porsche 911', date: '2024-07-20', time: '10:00 AM', status: 'Confirmed' },
    { id: 2, customer: 'Sarah Smith', vehicle: 'Tesla Model S', date: '2024-07-21', time: '02:30 PM', status: 'Pending' },
    { id: 3, customer: 'Mike Johnson', vehicle: 'BMW 7 Series', date: '2024-07-22', time: '11:00 AM', status: 'Completed' },
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Confirmed': 'bg-green-100 text-green-700',
      'Pending': 'bg-yellow-100 text-yellow-700',
      'Completed': 'bg-blue-100 text-blue-700',
      'Cancelled': 'bg-red-100 text-red-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Test Drive Requests</h1>
        <p className="text-gray-500">View and manage all test drive requests</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search test drives..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {testDrives.map((drive) => (
                <tr key={drive.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">#TD{String(drive.id).padStart(4, '0')}</td>
                  <td className="px-6 py-4 text-gray-700">{drive.customer}</td>
                  <td className="px-6 py-4 text-gray-700">{drive.vehicle}</td>
                  <td className="px-6 py-4 text-gray-700">{drive.date}</td>
                  <td className="px-6 py-4 text-gray-700">{drive.time}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(drive.status)}`}>
                      {drive.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <FiEye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TestDriveList;