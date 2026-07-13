import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Vehicles from './pages/Vehicles/Vehicles';
import VehicleDetails from './pages/VehicleDetails/VehicleDetails';
import TestDrive from './pages/TestDrive/TestDrive';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Compare from './pages/Compare/Compare';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/vehicle/:id" element={<VehicleDetails />} />
        <Route path="/test-drive" element={<TestDrive />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
    </Router>
  );
}

export default App;