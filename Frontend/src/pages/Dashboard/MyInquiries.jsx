import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import DashboardSidebar from '../../pages/Dashboard/DashboardSidebar';

const MyInquiries = () => {
  const [inquiries] = useState([
    {
      id: 1,
      subject: 'Pricing Inquiry',
      message: 'I would like to know more about the financing options available for the Porsche 911.',
      date: '2024-05-10',
      status: 'Replied',
      vehicle: 'Porsche 911'
    },
    {
      id: 2,
      subject: 'Test Drive Request',
      message: 'I would like to schedule a test drive for the Mercedes S-Class.',
      date: '2024-05-15',
      status: 'Pending',
      vehicle: 'Mercedes S-Class'
    },
    {
      id: 3,
      subject: 'Vehicle Availability',
      message: 'Is the Audi Q7 available in the showroom for viewing?',
      date: '2024-05-20',
      status: 'Replied',
      vehicle: 'Audi Q7'
    },
    {
      id: 4,
      subject: 'Trade-in Inquiry',
      message: 'I would like to inquire about trading in my current vehicle.',
      date: '2024-05-25',
      status: 'Pending',
      vehicle: 'General'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <DashboardSidebar activePage="inquiries" />
          
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">My Inquiries</h2>
              
              <div className="space-y-4">
                {inquiries.map((inquiry) => (
                  <div key={inquiry.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{inquiry.subject}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            inquiry.status === 'Replied' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {inquiry.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Vehicle: {inquiry.vehicle}</p>
                        <p className="text-gray-700 mt-2">{inquiry.message}</p>
                        <p className="text-xs text-gray-400 mt-2">{inquiry.date}</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyInquiries;