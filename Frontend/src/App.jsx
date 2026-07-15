import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
 
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Vehicles from './pages/Vehicles/Vehicles';
import VehicleDetails from './pages/VehicleDetails/VehicleDetails';
import TestDrive from './pages/TestDrive/TestDrive';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Compare from './pages/Compare/Compare';
import Dashboard from './pages/Dashboard/Dashboard';
 
import MyProfile from './components/Dashboard/MyProfile';
import MyBookings from './components/Dashboard/MyBookings';
import MyTestDrives from './components/Dashboard/MyTestDrives';
import MyFavorites from './components/Dashboard/MyFavorites';
import MyInquiries from './components/Dashboard/MyInquiries';
import PaymentHistory from './components/Dashboard/PaymentHistory';
import Notifications from './components/Dashboard/Notifications';
import Settings from './components/Dashboard/Settings';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
          <Route path="/test-drive" element={<TestDrive />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/compare" element={<Compare />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/profile" element={<MyProfile />} />
          <Route path="/dashboard/bookings" element={<MyBookings />} />
          <Route path="/dashboard/test-drives" element={<MyTestDrives />} />
          <Route path="/dashboard/favorites" element={<MyFavorites />} />
          <Route path="/dashboard/inquiries" element={<MyInquiries />} />
          <Route path="/dashboard/payment" element={<PaymentHistory />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
          <Route path="/dashboard/settings" element={<Settings />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;