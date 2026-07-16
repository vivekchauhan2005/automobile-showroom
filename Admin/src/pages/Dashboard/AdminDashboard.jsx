import React, { useState } from 'react';
import { 
  FiTruck, 
  FiUsers, 
  FiCalendar, 
  FiMessageSquare, 
  FiTrendingUp, 
  FiTrendingDown, 
  FiArrowRight,
  FiEye, 
  FiStar, 
  FiClock 
} from 'react-icons/fi';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const [stats] = useState({
    totalVehicles: 24,
    totalCustomers: 156,
    totalBookings: 89,
    totalEnquiries: 45,
    revenue: 1245670,
    growth: 12.5
  });

  const revenueData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 5000 },
    { name: 'Apr', revenue: 4500 },
    { name: 'May', revenue: 6000 },
    { name: 'Jun', revenue: 5500 },
    { name: 'Jul', revenue: 7000 },
  ];

  const salesData = [
    { name: 'Porsche', sales: 12 },
    { name: 'Mercedes', sales: 8 },
    { name: 'BMW', sales: 6 },
    { name: 'Audi', sales: 4 },
    { name: 'Tesla', sales: 3 },
  ];

  const pieData = [
    { name: 'Sedan', value: 30 },
    { name: 'SUV', value: 25 },
    { name: 'Sports', value: 20 },
    { name: 'Luxury', value: 15 },
    { name: 'Electric', value: 10 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];

  const recentActivities = [
    { id: 1, type: 'booking', title: 'New booking for Porsche 911', user: 'John Doe', time: '5 min ago', icon: FiCalendar, color: 'blue' },
    { id: 2, type: 'testdrive', title: 'Test drive request for Tesla Model S', user: 'Sarah Smith', time: '1 hour ago', icon: FiClock, color: 'green' },
    { id: 3, type: 'enquiry', title: 'New enquiry about Mercedes S-Class', user: 'Mike Johnson', time: '3 hours ago', icon: FiMessageSquare, color: 'purple' },
    { id: 4, type: 'review', title: '5-star review for BMW 7 Series', user: 'Emily Brown', time: '5 hours ago', icon: FiStar, color: 'yellow' },
  ];

  const StatCard = ({ title, value, icon: Icon, color, change, changeType }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-xs mt-1 flex items-center gap-1 ${changeType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {changeType === 'up' ? <FiTrendingUp /> : <FiTrendingDown />}
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-50 text-${color}-600`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening with your showroom.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Vehicles"
          value={stats.totalVehicles}
          icon={FiTruck}
          color="blue"
          change="+2 new this month"
          changeType="up"
        />
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={FiUsers}
          color="green"
          change="+12 this month"
          changeType="up"
        />
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={FiCalendar}
          color="purple"
          change="+8 this month"
          changeType="up"
        />
        <StatCard
          title="Total Enquiries"
          value={stats.totalEnquiries}
          icon={FiMessageSquare}
          color="orange"
          change="-3 this month"
          changeType="down"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
              <p className="text-sm text-gray-500">Monthly revenue from bookings</p>
            </div>
            <span className="text-sm font-medium text-green-600">+12.5%</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Sales by Brand</h3>
              <p className="text-sm text-gray-500">Vehicles sold per brand</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="sales" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Categories</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {pieData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                <span className="text-xs text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
              View all <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`p-2 rounded-lg bg-${activity.color}-50 text-${activity.color}-600`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{activity.user}</span>
                    <span>•</span>
                    <span>{activity.time}</span>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;