import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const Dashboard = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

   
  const [dashboardData] = useState({
    totalBookings: 3,
    testDrives: 2,
    favorites: 5,
    inquiries: 4,
    recentBookings: [
      { id: 1, name: 'Porsche 911 Carrera', date: '15 May 2024', time: '10:00 AM' },
      { id: 2, name: 'Mercedes S-Class', date: '22 May 2024', time: '11:00 AM' },
      { id: 3, name: 'Audi Q7', date: '29 May 2024', time: '02:00 PM' }
    ],
    upcomingTestDrives: [
      { id: 1, name: 'BMW 7 Series', date: '18 May 2024', time: '11:00 AM', location: 'Luxury Motors Showroom, New York', status: 'Confirmed' }
    ],
    recommended: [
      { id: 1, name: 'Lexus LS', price: '$189,99' },
      { id: 2, name: 'Tesla Model S', price: '$199,99' },
      { id: 3, name: 'BMW 7 Series', price: '$210,99' },
      { id: 4, name: 'Range Rover Vogue', price: '$230,99' }
    ],
    profileCompletion: 80,
    memberSince: 'Feb 2024',
    totalSpent: '$45,980',
    loyaltyPoints: '1,250 pts'
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };
 
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Welcome Back, <span className="text-blue-600">{user?.fullName || 'User'}</span>
          </h1>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Dashboard</h2>
              <ul className="space-y-2">
                <li>
                  <button className="w-full text-left px-4 py-2 text-blue-600 bg-blue-50 rounded-lg font-medium">
                    My Profile
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    My Bookings
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    My Test Drives
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    My Favorites
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    My Inquiries
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    Payment History
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    Notifications
                  </button>
                </li>
                <li>
                  <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    Settings
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-sm text-gray-500">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.totalBookings}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-sm text-gray-500">Test Drives</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.testDrives}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-sm text-gray-500">Favorites</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.favorites}</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-sm text-gray-500">Inquiries</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.inquiries}</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <button className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-left">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">View all bookings</span>
                  <span className="text-blue-600">→</span>
                </div>
              </button>
              <button className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-left">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">View all test drives</span>
                  <span className="text-blue-600">→</span>
                </div>
              </button>
              <button className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-left">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">View your favorites</span>
                  <span className="text-blue-600">→</span>
                </div>
              </button>
              <button className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-left">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">View all inquiries</span>
                  <span className="text-blue-600">→</span>
                </div>
              </button>
            </div>

      
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Recent Bookings */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Bookings</h3>
                <div className="space-y-4">
                  {dashboardData.recentBookings.map((booking) => (
                    <div key={booking.id} className="border-b border-gray-100 pb-3 last:border-0">
                      <p className="font-semibold text-gray-900">{booking.name}</p>
                      <p className="text-sm text-gray-500">{booking.date} • {booking.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Test Drives */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Upcoming Test Drive</h3>
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Confirmed</span>
                </div>
                {dashboardData.upcomingTestDrives.map((drive) => (
                  <div key={drive.id} className="mb-4">
                    <p className="font-semibold text-gray-900">{drive.name}</p>
                    <p className="text-sm text-gray-500">{drive.date} • {drive.time}</p>
                    <p className="text-sm text-gray-500">{drive.location}</p>
                    <button className="mt-2 text-blue-600 font-medium hover:text-blue-700 text-sm">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Find Your Dream Car */}
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-2">Find Your Dream Car</h3>
                <p className="text-blue-100 mb-4">Explore our premium collection</p>
                <button 
                  onClick={() => navigate('/vehicles')}
                  className="px-6 py-2 bg-white text-blue-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Browse Cars →
                </button>
              </div>

              {/* Recommended for You */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recommended for You</h3>
                <div className="space-y-3">
                  {dashboardData.recommended.map((car) => (
                    <div key={car.id} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0">
                      <span className="text-gray-700">{car.name}</span>
                      <span className="font-semibold text-blue-600">{car.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Account Overview */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Account Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Profile Completion</p>
                  <div className="mt-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 rounded-full h-2" 
                        style={{ width: `${dashboardData.profileCompletion}%` }}
                      ></div>
                    </div>
                    <p className="text-sm font-medium text-gray-700 mt-1">{dashboardData.profileCompletion}%</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-semibold text-gray-900">{dashboardData.memberSince}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Spent</p>
                  <p className="font-semibold text-gray-900">{dashboardData.totalSpent}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Loyalty Points</p>
                  <p className="font-semibold text-gray-900">{dashboardData.loyaltyPoints}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;