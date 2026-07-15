import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import DashboardSidebar from './DashboardSidebar';

const MyTestDrives = () => {
  const navigate = useNavigate();
  const [testDrives] = useState([
    {
      id: 1,
      name: 'BMW 7 Series',
      date: '18 May 2024',
      time: '11:00 AM',
      location: 'Luxury Motors Showroom, New York',
      status: 'Confirmed'
    },
    {
      id: 2,
      name: 'Porsche 911 Carrera',
      date: '25 May 2024',
      time: '02:30 PM',
      location: 'Luxury Motors Showroom, Los Angeles',
      status: 'Pending'
    }
  ]);

  const getStatusColor = (status) => {
    return status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <DashboardSidebar />
          
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">My Test Drives</h2>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  ← Back to Dashboard
                </button>
              </div>
              
              <div className="space-y-4">
                {testDrives.map((drive) => (
                  <div key={drive.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{drive.name}</h3>
                        <p className="text-sm text-gray-500">{drive.date} • {drive.time}</p>
                        <p className="text-sm text-gray-500">{drive.location}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(drive.status)}`}>
                          {drive.status}
                        </span>
                        <button className="block mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyTestDrives;