import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useUser();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
    { id: 'profile', label: 'My Profile', icon: '👤', path: '/dashboard/profile' },
    { id: 'bookings', label: 'My Bookings', icon: '📅', path: '/dashboard/bookings' },
    { id: 'testdrives', label: 'My Test Drives', icon: '🚗', path: '/dashboard/test-drives' },
    { id: 'favorites', label: 'My Favorites', icon: '❤️', path: '/dashboard/favorites' },
    { id: 'inquiries', label: 'My Inquiries', icon: '✉️', path: '/dashboard/inquiries' },
    { id: 'payment', label: 'Payment History', icon: '💰', path: '/dashboard/payment' },
    { id: 'notifications', label: 'Notifications', icon: '🔔', path: '/dashboard/notifications' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/dashboard/settings' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{user?.fullName || 'User'}</p>
            <p className="text-sm text-gray-500">{user?.email || 'user@example.com'}</p>
          </div>
        </div>

        {/* Menu Items */}
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Dashboard</h2>
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => navigate(item.path)}
                className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors flex items-center gap-3 ${
                  isActive(item.path) 
                    ? 'bg-blue-50 text-blue-600 font-medium' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Logout Button */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-3"
          >
            <span className="text-lg">🚪</span>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;