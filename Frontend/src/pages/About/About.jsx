import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <p className="text-lg text-gray-700 mb-4">
            Luxury Motors is your premier destination for high-end luxury vehicles. 
            We specialize in providing exceptional quality cars that combine performance, 
            elegance, and cutting-edge technology.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            With years of experience in the automotive industry, our team of experts 
            is dedicated to helping you find the perfect vehicle that matches your 
            lifestyle and preferences.
          </p>
          <p className="text-lg text-gray-700">
            From Porsche to Mercedes-Benz, Tesla to Lexus, we offer an extensive 
            selection of certified pre-owned and new luxury vehicles.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;