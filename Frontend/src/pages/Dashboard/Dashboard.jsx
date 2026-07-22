import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import DashboardSidebar from '../../components/Dashboard/DashboardSidebar';
import axios from 'axios';

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    testDrives: 0,
    favorites: 0,
    inquiries: 0,
    recentBookings: [],
    upcomingTestDrives: [],
    recommended: [
      { id: 1, name: 'Lexus LS', price: '$189,99' },
      { id: 2, name: 'Tesla Model S', price: '$199,99' },
      { id: 3, name: 'BMW 7 Series', price: '$210,99' },
      { id: 4, name: 'Range Rover Vogue', price: '$230,99' }
    ],
    profileCompletion: 0,
    memberSince: 'Feb 2024',
    totalSpent: '$0',
    loyaltyPoints: '0 pts'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          setLoading(false);
          return;
        }

        // Fetch bookings
        try {
          const bookingsRes = await axios.get('http://localhost:5000/api/bookings/user', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const bookings = bookingsRes.data.bookings || [];
          
          setDashboardData(prev => ({
            ...prev,
            totalBookings: bookings.length,
            recentBookings: bookings.slice(0, 3)
          }));
        } catch (e) {
          console.log('Bookings error:', e);
        }

        // Fetch test drives
        try {
          const testDrivesRes = await axios.get('http://localhost:5000/api/test-drives/user', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const testDrives = testDrivesRes.data.testDrives || [];
          
          setDashboardData(prev => ({
            ...prev,
            testDrives: testDrives.length,
            upcomingTestDrives: testDrives.filter(td => td.status === 'Confirmed' || td.status === 'Pending').slice(0, 2)
          }));
        } catch (e) {
          console.log('Test drives error:', e);
        }

        // Fetch wishlist
        try {
          const wishlistRes = await axios.get('http://localhost:5000/api/wishlist', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const wishlist = wishlistRes.data.wishlist || [];
          
          setDashboardData(prev => ({
            ...prev,
            favorites: wishlist.length
          }));
        } catch (e) {
          console.log('Wishlist error:', e);
        }

        // Fetch enquiries
        try {
          const enquiriesRes = await axios.get('http://localhost:5000/api/enquiries/user', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const enquiries = enquiriesRes.data.enquiries || [];
          
          setDashboardData(prev => ({
            ...prev,
            inquiries: enquiries.length
          }));
        } catch (e) {
          console.log('Enquiries error:', e);
        }

        // Profile completion
        let completion = 0;
        if (user?.fullName) completion += 25;
        if (user?.email) completion += 25;
        if (user?.phone) completion += 25;
        if (user?.address) completion += 25;

        setDashboardData(prev => ({
          ...prev,
          profileCompletion: completion,
          memberSince: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Feb 2024'
        }));

      } catch (error) {
        console.error('Dashboard error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  if (!user) {
    navigate('/login');
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Welcome Back, <span className="text-blue-600">{user?.fullName || 'User'}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <DashboardSidebar />
          
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div 
                onClick={() => navigate('/dashboard/bookings')}
                className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <p className="text-sm text-gray-500">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.totalBookings}</p>
              </div>
              <div 
                onClick={() => navigate('/dashboard/test-drives')}
                className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <p className="text-sm text-gray-500">Test Drives</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.testDrives}</p>
              </div>
              <div 
                onClick={() => navigate('/dashboard/favorites')}
                className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <p className="text-sm text-gray-500">Favorites</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.favorites}</p>
              </div>
              <div 
                onClick={() => navigate('/dashboard/inquiries')}
                className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <p className="text-sm text-gray-500">Inquiries</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.inquiries}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <button 
                onClick={() => navigate('/dashboard/bookings')}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-left"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">View all bookings</span>
                  <span className="text-blue-600">→</span>
                </div>
              </button>
              <button 
                onClick={() => navigate('/dashboard/test-drives')}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-left"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">View all test drives</span>
                  <span className="text-blue-600">→</span>
                </div>
              </button>
              <button 
                onClick={() => navigate('/dashboard/favorites')}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-left"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">View your favorites</span>
                  <span className="text-blue-600">→</span>
                </div>
              </button>
              <button 
                onClick={() => navigate('/dashboard/inquiries')}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow text-left"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">View all inquiries</span>
                  <span className="text-blue-600">→</span>
                </div>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Bookings</h3>
                {dashboardData.recentBookings.length > 0 ? (
                  <div className="space-y-4">
                    {dashboardData.recentBookings.map((booking, index) => (
                      <div key={index} className="border-b border-gray-100 pb-3 last:border-0">
                        <p className="font-semibold text-gray-900">
                          {booking.vehicle?.name || booking.name || 'Vehicle'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : 'Date TBD'} • {booking.bookingTime || 'Time TBD'}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No bookings yet</p>
                )}
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Test Drives</h3>
                {dashboardData.upcomingTestDrives.length > 0 ? (
                  dashboardData.upcomingTestDrives.map((drive, index) => (
                    <div key={index} className="mb-4 border-b border-gray-100 pb-3 last:border-0">
                      <p className="font-semibold text-gray-900">
                        {drive.vehicle?.name || drive.name || 'Vehicle'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {drive.date ? new Date(drive.date).toLocaleDateString() : 'Date TBD'} • {drive.time || 'Time TBD'}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        drive.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                        drive.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {drive.status || 'Pending'}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No upcoming test drives</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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