import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import DashboardSidebar from './DashboardSidebar';

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings] = useState([
    {
      id: 1,
      name: 'Porsche 911 Carrera',
      date: '15 May 2024',
      time: '10:00 AM',
      status: 'Confirmed',
      price: '$179,990'
    },
    {
      id: 2,
      name: 'Mercedes S-Class',
      date: '22 May 2024',
      time: '11:00 AM',
      status: 'Pending',
      price: '$253,990'
    },
    {
      id: 3,
      name: 'Audi Q7',
      date: '29 May 2024',
      time: '02:00 PM',
      status: 'Completed',
      price: '$169,990'
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
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
                <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  ← Back to Dashboard
                </button>
              </div>
              
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{booking.name}</h3>
                        <p className="text-sm text-gray-500">{booking.date} • {booking.time}</p>
                        <p className="text-sm font-medium text-blue-600">{booking.price}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                          {booking.status}
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

export default MyBookings;