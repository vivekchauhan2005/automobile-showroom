import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import DashboardSidebar from '../../pages/Dashboard/DashboardSidebar';

const Settings = () => {
  const { user, logout } = useUser();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newsletterSubscription: true,
    twoFactorAuth: false,
    language: 'English',
    currency: 'USD',
    timezone: 'EST'
  });

  const handleToggle = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting]
    });
  };

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <DashboardSidebar activePage="settings" />
          
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>

              <div className="space-y-6">
                {/* Notification Settings */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Notification Preferences</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Email Notifications</span>
                      <button 
                        onClick={() => handleToggle('emailNotifications')}
                        className={`relative w-12 h-6 rounded-full transition-colors ${settings.emailNotifications ? 'bg-blue-600' : 'bg-gray-300'}`}
                      >
                        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.emailNotifications ? 'translate-x-6' : ''}`} />
                      </button>
                    </label>
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">SMS Notifications</span>
                      <button 
                        onClick={() => handleToggle('smsNotifications')}
                        className={`relative w-12 h-6 rounded-full transition-colors ${settings.smsNotifications ? 'bg-blue-600' : 'bg-gray-300'}`}
                      >
                        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.smsNotifications ? 'translate-x-6' : ''}`} />
                      </button>
                    </label>
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Newsletter Subscription</span>
                      <button 
                        onClick={() => handleToggle('newsletterSubscription')}
                        className={`relative w-12 h-6 rounded-full transition-colors ${settings.newsletterSubscription ? 'bg-blue-600' : 'bg-gray-300'}`}
                      >
                        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.newsletterSubscription ? 'translate-x-6' : ''}`} />
                      </button>
                    </label>
                  </div>
                </div>

                {/* Security Settings */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Security</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Two-Factor Authentication</span>
                      <button 
                        onClick={() => handleToggle('twoFactorAuth')}
                        className={`relative w-12 h-6 rounded-full transition-colors ${settings.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-300'}`}
                      >
                        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.twoFactorAuth ? 'translate-x-6' : ''}`} />
                      </button>
                    </label>
                    <button className="w-full p-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-left">
                      Change Password
                    </button>
                  </div>
                </div>

                {/* Preferences */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                      <select
                        name="language"
                        value={settings.language}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                      <select
                        name="currency"
                        value={settings.currency}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                      <select
                        name="timezone"
                        value={settings.timezone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="EST">Eastern Time (EST)</option>
                        <option value="CST">Central Time (CST)</option>
                        <option value="MST">Mountain Time (MST)</option>
                        <option value="PST">Pacific Time (PST)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Account Actions */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="flex gap-4">
                    <button 
                      onClick={handleSave}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Save Settings
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                          alert('Account deletion request submitted.');
                        }
                      }}
                      className="px-6 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;