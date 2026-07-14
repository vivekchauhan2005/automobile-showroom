import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import DashboardSidebar from '../../pages/Dashboard/DashboardSidebar';

const MyTestDrives = () => {
  const [testDrives] = useState([
    {
      id: 1,
      name: 'BMW 7 Series',
      date: '18 May 2024',
      time: '11:00 AM',
      location: 'Luxury Motors Showroom, New York',
      status: 'Confirmed',
      statusColor: 'green'
    },
    {
      id: 2,
      name: 'Porsche 911 Carrera',
      date: '25 May 2024',
      time: '02:30 PM',
      location: 'Luxury Motors Showroom, Los Angeles',
      status: 'Pending',
      statusColor: 'yellow'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <DashboardSidebar activePage="testdrives" />
          
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Test Drives</h2>
              
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
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-${drive.statusColor}-100 text-${drive.statusColor}-700`}>
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