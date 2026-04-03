import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Lock, Save, ArrowLeft, Shield, Settings } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { api } from '../services/api';

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'security'
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = () => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
    setFormData({
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      address: userData.address || '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userId = user._id || user.id;
      const { data } = await api.put(`/users/${userId}`, formData);

      // Update local storage
      const updatedUser = { ...user, ...data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('Password must be at least 6 characters!');
      return;
    }

    setLoading(true);
    try {
      const userId = user._id || user.id;
      await api.put(`/users/${userId}/password`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      alert('Password updated successfully!');
    } catch (error) {
      console.error('Error updating password:', error);
      alert(error.response?.data?.message || 'Failed to update password.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-dark">
      <Header />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Profile Header */}
        <div className="bg-dark-card border border-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center ring-2 ring-primary/30">
              <User className="w-10 h-10 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <p className="text-gray-400">{user.email}</p>
              <span className="inline-block mt-2 text-xs px-3 py-1 bg-primary/20 text-primary rounded-full">
                {user.role === 'admin' ? '👑 Admin' : '👤 Customer'}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-dark-card border border-gray-800 rounded-lg mb-6 overflow-hidden">
          <div className="flex border-b border-gray-800">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary text-white border-b-2 border-primary shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-dark-card border border-gray-800 rounded-lg p-8 shadow-xl min-h-[500px]">
          {activeTab === 'profile' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Profile Information</h2>
                  <p className="text-sm text-gray-400">Update your personal information</p>
                </div>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-lg text-white focus:border-primary focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-lg text-white focus:border-primary focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-lg text-white focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-lg text-white focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-primary/20"
                  >
                    <Save className="w-4 h-4" />
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Change Password</h2>
                  <p className="text-sm text-gray-400">Update your password to keep your account secure</p>
                </div>
              </div>

              <form onSubmit={handleUpdatePassword} className="space-y-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">
                    <Lock className="w-4 h-4 inline mr-2" />
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-lg text-white focus:border-primary focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      <Lock className="w-4 h-4 inline mr-2" />
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-lg text-white focus:border-primary focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      <Lock className="w-4 h-4 inline mr-2" />
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 bg-dark border border-gray-700 rounded-lg text-white focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-primary/20"
                  >
                    <Lock className="w-4 h-4" />
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                  <p className="mt-3 text-xs text-gray-500">
                    ⚠️ Password must be at least 6 characters long
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
