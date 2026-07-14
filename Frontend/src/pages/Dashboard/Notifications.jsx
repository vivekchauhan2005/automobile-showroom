import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import DashboardSidebar from '../../pages/Dashboard/DashboardSidebar';

const Notifications = () => {
  const [notifications] = useState([
    {
      id: 1,
      title: 'Test Drive Confirmed',
      message: 'Your test drive for BMW 7 Series has been confirmed for 18 May 2024 at 11:00 AM.',
      date: '2024-05-16',
      time: '10:30 AM',
      read: false,
      icon: '🚗'
    },
    {
      id: 2,
      title: 'Booking Updated',
      message: 'Your booking for Porsche 911 Carrera has been updated. Please check your booking details.',
      date: '2024-05-15',
      time: '02:15 PM',
      read: false,
      icon: '📅'
    },
    {
      id: 3,
      title: 'New Inquiry Response',
      message: 'We have replied to your inquiry about the Mercedes S-Class. Please check your inbox.',
      date: '2024-05-14',
      time: '09:00 AM',
      read: true,
      icon: '✉️'
    },
    {
      id: 4,
      title: 'Payment Received',
      message: 'Your payment of $45,000 for Porsche 911 Carrera has been received successfully.',
      date: '2024-05-13',
      time: '03:45 PM',
      read: true,
      icon: '💰'
    },
    {
      id: 5,
      title: 'Special Offer',
      message: 'Exclusive offer on Audi Q7! Get 0% financing for 36 months. Limited time only.',
      date: '2024-05-12',
      time: '11:00 AM',
      read: true,
      icon: '🎉'
    }
  ]);

  const [notificationList, setNotificationList] = useState(notifications);

  const markAsRead = (id) => {
    setNotificationList(notificationList.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotificationList(notificationList.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notificationList.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <DashboardSidebar activePage="notifications" />
          
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
                  {unreadCount > 0 && (
                    <span className="text-sm text-gray-500">{unreadCount} unread</span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {notificationList.length > 0 ? (
                  notificationList.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 rounded-lg border ${notification.read ? 'border-gray-200 bg-white' : 'border-blue-200 bg-blue-50'}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">{notification.icon}</div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className={`font-semibold ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                                {notification.title}
                              </h3>
                              <p className="text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-2">
                                {notification.date} • {notification.time}
                              </p>
                            </div>
                            {!notification.read && (
                              <button 
                                onClick={() => markAsRead(notification.id)}
                                className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                              >
                                Mark as read
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔔</div>
                    <h3 className="text-xl font-semibold text-gray-700">No notifications</h3>
                    <p className="text-gray-500 mt-2">You're all caught up!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Notifications;