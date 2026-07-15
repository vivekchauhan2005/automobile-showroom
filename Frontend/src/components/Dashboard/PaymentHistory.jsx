import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import DashboardSidebar from './DashboardSidebar';

const PaymentHistory = () => {
  const navigate = useNavigate();
  const [payments] = useState([
    {
      id: 1,
      vehicle: 'Porsche 911 Carrera',
      amount: '$45,000',
      date: '2024-05-15',
      status: 'Completed',
      method: 'Credit Card'
    },
    {
      id: 2,
      vehicle: 'Mercedes S-Class',
      amount: '$25,000',
      date: '2024-05-22',
      status: 'Completed',
      method: 'Bank Transfer'
    },
    {
      id: 3,
      vehicle: 'Audi Q7',
      amount: '$15,000',
      date: '2024-05-29',
      status: 'Pending',
      method: 'Credit Card'
    },
    {
      id: 4,
      vehicle: 'Tesla Model S',
      amount: '$30,000',
      date: '2024-06-05',
      status: 'Completed',
      method: 'Bank Transfer'
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <DashboardSidebar />
          
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Payment History</h2>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  ← Back to Dashboard
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Vehicle</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Method</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-medium">{payment.vehicle}</td>
                        <td className="py-3 px-4 text-blue-600 font-bold">{payment.amount}</td>
                        <td className="py-3 px-4 text-gray-600">{payment.date}</td>
                        <td className="py-3 px-4 text-gray-600">{payment.method}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                            {payment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentHistory;