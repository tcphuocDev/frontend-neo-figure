import { useState } from 'react';
import {
  Save,
  Globe,
  Mail,
  Lock,
  Bell,
  CreditCard,
  Shield,
} from 'lucide-react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payment', label: 'Payment', icon: CreditCard },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary dark:text-white mb-1">
          Settings
        </h1>
        <p className="text-text-secondary dark:text-gray-400">
          Manage your application settings and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-background-card dark:bg-gray-800 rounded-xl shadow-sm border border-border dark:border-gray-700 overflow-hidden">
        <div className="border-b border-border dark:border-gray-700">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-primary text-primary bg-primary-light'
                    : 'border-transparent text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-white hover:bg-background dark:hover:bg-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-4">
                  General Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary dark:text-gray-300 mb-2">
                      Store Name
                    </label>
                    <input
                      type="text"
                      defaultValue="NEO FIGURE"
                      className="w-full px-4 py-2.5 border border-border dark:border-gray-600 rounded-lg bg-background-card dark:bg-gray-700 text-text-primary dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary dark:text-gray-300 mb-2">
                      Store Description
                    </label>
                    <textarea
                      rows={3}
                      defaultValue="Premium anime figures and collectibles store"
                      className="w-full px-4 py-2.5 border border-border dark:border-gray-600 rounded-lg bg-background-card dark:bg-gray-700 text-text-primary dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary dark:text-gray-300 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      defaultValue="contact@neofigure.com"
                      className="w-full px-4 py-2.5 border border-border dark:border-gray-600 rounded-lg bg-background-card dark:bg-gray-700 text-text-primary dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue="+84 901 234 567"
                      className="w-full px-4 py-2.5 border border-border dark:border-gray-600 rounded-lg bg-background-card dark:bg-gray-700 text-text-primary dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary dark:text-gray-300 mb-2">
                      Currency
                    </label>
                    <select className="w-full px-4 py-2.5 border border-border dark:border-gray-600 rounded-lg bg-background-card dark:bg-gray-700 text-text-primary dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all">
                      <option value="VND">Vietnamese Dong (VND)</option>
                      <option value="USD">US Dollar (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Email Settings */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-4">
                  Email Configuration
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary dark:text-gray-300 mb-2">
                      SMTP Host
                    </label>
                    <input
                      type="text"
                      placeholder="smtp.gmail.com"
                      className="w-full px-4 py-2.5 border border-border dark:border-gray-600 rounded-lg bg-background-card dark:bg-gray-700 text-text-primary dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-primary dark:text-gray-300 mb-2">
                        SMTP Port
                      </label>
                      <input
                        type="number"
                        placeholder="587"
                        className="w-full px-4 py-2.5 border border-border dark:border-gray-600 rounded-lg bg-background-card dark:bg-gray-700 text-text-primary dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary dark:text-gray-300 mb-2">
                        Encryption
                      </label>
                      <select className="w-full px-4 py-2.5 border border-border dark:border-gray-600 rounded-lg bg-background-card dark:bg-gray-700 text-text-primary dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all">
                        <option value="tls">TLS</option>
                        <option value="ssl">SSL</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary dark:text-gray-300 mb-2">
                      SMTP Username
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-border dark:border-gray-600 rounded-lg bg-background-card dark:bg-gray-700 text-text-primary dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary dark:text-gray-300 mb-2">
                      SMTP Password
                    </label>
                    <input
                      type="password"
                      className="w-full px-4 py-2.5 border border-border dark:border-gray-600 rounded-lg bg-background-card dark:bg-gray-700 text-text-primary dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-4">
                  Security Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-background dark:bg-gray-900/50 rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-text-primary dark:text-white">
                        Two-Factor Authentication
                      </p>
                      <p className="text-sm text-text-secondary dark:text-gray-400">
                        Add an extra layer of security
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-background dark:bg-gray-900/50 rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-text-primary dark:text-white">
                        Login Alerts
                      </p>
                      <p className="text-sm text-text-secondary dark:text-gray-400">
                        Get notified of new logins
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 dark:peer-focus:ring-cyan-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600"></div>
                    </label>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Change Password
                    </h4>
                    <div className="space-y-3">
                      <input
                        type="password"
                        placeholder="Current Password"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                      />
                      <input
                        type="password"
                        placeholder="New Password"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                      />
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Notification Preferences
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      title: 'New Orders',
                      description: 'Get notified when new orders are placed',
                    },
                    {
                      title: 'Low Stock Alerts',
                      description: 'Alerts when inventory is running low',
                    },
                    {
                      title: 'Customer Messages',
                      description: 'Notifications for customer inquiries',
                    },
                    {
                      title: 'Daily Reports',
                      description: 'Receive daily performance reports',
                    },
                    {
                      title: 'System Updates',
                      description: 'Important system and security updates',
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-background dark:bg-gray-900/50 rounded-lg border border-border"
                    >
                      <div>
                        <p className="font-medium text-text-primary dark:text-white">
                          {item.title}
                        </p>
                        <p className="text-sm text-text-secondary dark:text-gray-400">
                          {item.description}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked={index < 3}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Payment Settings */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-4">
                  Payment Methods
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'Cash on Delivery', enabled: true },
                    { name: 'Bank Transfer', enabled: true },
                    { name: 'Credit/Debit Card', enabled: false },
                    { name: 'MoMo', enabled: true },
                    { name: 'ZaloPay', enabled: false },
                  ].map((method, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-background dark:bg-gray-900/50 rounded-lg border border-border"
                    >
                      <div>
                        <p className="font-medium text-text-primary dark:text-white">
                          {method.name}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked={method.enabled}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end pt-6 border-t border-border dark:border-gray-700 mt-6">
            <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg">
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
