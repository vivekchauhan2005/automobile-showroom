import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FiHome, 
  FiTruck, 
  FiTag, 
  FiUsers, 
  FiCalendar, 
  FiMessageSquare, 
  FiStar, 
  FiCreditCard, 
  FiBarChart2, 
  FiSettings, 
  FiUser, 
  FiLogOut, 
  FiShield 
} from 'react-icons/fi';
import { useAdminAuth } from '../../context/AdminAuthContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/admin/vehicles', icon: FiTruck, label: 'Vehicles' },
    { path: '/admin/categories', icon: FiTag, label: 'Categories' },
    { path: '/admin/customers', icon: FiUsers, label: 'Customers' },
    { path: '/admin/bookings', icon: FiCalendar, label: 'Bookings' },
    { path: '/admin/test-drives', icon: FiMessageSquare, label: 'Test Drives' },
    { path: '/admin/reviews', icon: FiStar, label: 'Reviews' },
    { path: '/admin/payments', icon: FiCreditCard, label: 'Payments' },
    { path: '/admin/analytics', icon: FiBarChart2, label: 'Analytics' },
  ];

  const bottomItems = [
    { path: '/admin/settings', icon: FiSettings, label: 'Settings' },
    { path: '/admin/profile', icon: FiUser, label: 'Profile' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <aside 
      className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 px-4 border-b border-gray-200 ${isOpen ? 'justify-start' : 'justify-center'}`}>
        <FiShield className={`text-blue-600 ${isOpen ? 'w-8 h-8' : 'w-6 h-6'}`} />
        {isOpen && (
          <span className="ml-2 text-xl font-bold text-gray-800">
            <span className="text-blue-600">Luxury</span> Motors
          </span>
        )}
      </div>

      {/* Menu Items */}
      <div className="flex flex-col justify-between h-[calc(100vh-4rem)]">
        <nav className="p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                } ${isOpen ? 'px-4 py-2.5 gap-3' : 'px-3 py-3 justify-center'}`
              }
              title={!isOpen ? item.label : ''}
            >
              <item.icon className={`${isOpen ? 'w-5 h-5' : 'w-6 h-6'}`} />
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Menu */}
        <div className="p-4 border-t border-gray-200 space-y-1">
          {bottomItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                } ${isOpen ? 'px-4 py-2.5 gap-3' : 'px-3 py-3 justify-center'}`
              }
              title={!isOpen ? item.label : ''}
            >
              <item.icon className={`${isOpen ? 'w-5 h-5' : 'w-6 h-6'}`} />
              {isOpen && <span className="text-sm font-medium">{item.label}</span>}
            </NavLink>
          ))}
          
          <button
            onClick={handleLogout}
            className={`flex items-center w-full rounded-lg transition-all duration-200 text-red-600 hover:bg-red-50 ${
              isOpen ? 'px-4 py-2.5 gap-3' : 'px-3 py-3 justify-center'
            }`}
            title={!isOpen ? 'Logout' : ''}
          >
            <FiLogOut className={`${isOpen ? 'w-5 h-5' : 'w-6 h-6'}`} />
            {isOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;