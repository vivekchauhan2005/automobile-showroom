import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/Login/AdminLogin';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import VehicleList from './pages/Vehicles/VehicleList';
import AddVehicle from './pages/Vehicles/AddVehicle';
import EditVehicle from './pages/Vehicles/EditVehicle';
import CategoryList from './pages/Categories/CategoryList';
import AddCategory from './pages/Categories/AddCategory';
import CustomerList from './pages/Customers/CustomerList';
import BookingList from './pages/Bookings/BookingList';
import TestDriveList from './pages/TestDrives/TestDriveList';
import ReviewList from './pages/Reviews/ReviewList';
import PaymentList from './pages/Payments/PaymentList';
import AnalyticsDashboard from './pages/Analytics/AnalyticsDashboard';
import AdminSettings from './pages/Settings/AdminSettings';
import AdminProfile from './pages/Profile/AdminProfile';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAdminAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AdminAuthProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Toaster position="top-right" />
        <Routes>
          {/* Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="vehicles" element={<VehicleList />} />
            <Route path="vehicles/add" element={<AddVehicle />} />
            <Route path="vehicles/edit/:id" element={<EditVehicle />} />
            <Route path="categories" element={<CategoryList />} />
            <Route path="categories/add" element={<AddCategory />} />
            <Route path="customers" element={<CustomerList />} />
            <Route path="bookings" element={<BookingList />} />
            <Route path="test-drives" element={<TestDriveList />} />
            <Route path="reviews" element={<ReviewList />} />
            <Route path="payments" element={<PaymentList />} />
            <Route path="analytics" element={<AnalyticsDashboard />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
          
         
          <Route path="*" element={<Navigate to="/admin/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AdminAuthProvider>
  );
}

export default App;