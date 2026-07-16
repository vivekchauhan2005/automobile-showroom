import React from 'react';
import { 
  FiTrendingUp, FiTrendingDown, FiUsers, FiShoppingBag,
  FiDollarSign, FiPercent
} from 'react-icons/fi';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';

const AnalyticsDashboard = () => {
  const revenueData = [
    { month: 'Jan', revenue: 45000, bookings: 12 },
    { month: 'Feb', revenue: 52000, bookings: 15 },
    { month: 'Mar', revenue: 48000, bookings: 13 },
    { month: 'Apr', revenue: 61000, bookings: 18 },
    { month: 'May', revenue: 58000, bookings: 16 },
    { month: 'Jun', revenue: 72000, bookings: 22 },
  ];

  const brandSales = [
    { name: 'Porsche', value: 35 },
    { name: 'Mercedes', value: 25 },
    { name: 'BMW', value: 20 },
    { name: 'Audi', value: 12 },
    { name: 'Tesla', value: 8 },
  ];

  const monthlyCustomers = [
    { month: 'Jan', new: 12, returning: 8 },
    { month: 'Feb', new: 15, returning: 10 },
    { month: 'Mar', new: 10, returning: 12 },
    { month: 'Apr', new: 18, returning: 15 },
    { month: 'May', new: 14, returning: 13 },
    { month: 'Jun', new: 20, returning: 18 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];

  const StatCard = ({ title, value, icon: Icon, change, changeType, color }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-xs mt-1 flex items-center gap-1 ${changeType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {changeType === 'up' ? <FiTrendingUp className="w-3 h-3" /> : <FiTrendingDown className="w-3 h-3" />}
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-500">Track your showroom performance metrics</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="$336,000"
          icon={FiDollarSign}
          color="green"
          change="+12.5%"
          changeType="up"
        />
        <StatCard
          title="Total Bookings"
          value="96"
          icon={FiShoppingBag}
          color="blue"
          change="+8%"
          changeType="up"
        />
        <StatCard
          title="New Customers"
          value="89"
          icon={FiUsers}
          color="purple"
          change="+15%"
          changeType="up"
        />
        <StatCard
          title="Conversion Rate"
          value="24.8%"
          icon={FiPercent}
          color="orange"
          change="-2.1%"
          changeType="down"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue & Bookings Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis yAxisId="left" stroke="#9ca3af" />
                <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" />
                <Tooltip />
                <Area yAxisId="left" type="monotone" dataKey="revenue" stackId="1" stroke="#3b82f6" fill="#93c5fd" />
                <Area yAxisId="right" type="monotone" dataKey="bookings" stackId="1" stroke="#10b981" fill="#6ee7b7" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Brand Sales */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales by Brand</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={brandSales}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {brandSales.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            {brandSales.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                <span className="text-sm text-gray-600">{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Growth */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Growth</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyCustomers}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="new" fill="#3b82f6" name="New Customers" />
              <Bar dataKey="returning" fill="#10b981" name="Returning Customers" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;