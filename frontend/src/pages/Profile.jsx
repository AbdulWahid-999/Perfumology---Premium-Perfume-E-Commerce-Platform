import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { FiUser, FiMail, FiPhone, FiLock, FiMapPin, FiEdit2, FiTrash2, FiPlus, FiSave, FiX } from 'react-icons/fi';

const Profile = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  const [addressMode, setAddressMode] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [toast, setToast] = useState(null);

  // Profile form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Password form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Address form
  const [addressForm, setAddressForm] = useState({
    label: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Pakistan',
    isDefault: false,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await api.get('/auth/profile');
      setProfile(data);
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone || '');
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put('/auth/profile', { name, email, phone });
      setProfile(data);
      setUser({ ...user, name: data.name, email: data.email });
      setEditMode(false);
      showToast('Profile updated successfully', 'success');
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to update profile', 'error');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    if (newPassword.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }

    try {
      await api.put('/auth/change-password', { currentPassword, newPassword });
      setPasswordMode(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showToast('Password changed successfully', 'success');
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to change password', 'error');
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/addresses', addressForm);
      setProfile({ ...profile, addresses: data });
      setAddressMode(false);
      resetAddressForm();
      showToast('Address added successfully', 'success');
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to add address', 'error');
    }
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(`/auth/addresses/${editingAddress}`, addressForm);
      setProfile({ ...profile, addresses: data });
      setEditingAddress(null);
      resetAddressForm();
      showToast('Address updated successfully', 'success');
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to update address', 'error');
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;

    try {
      const { data } = await api.delete(`/auth/addresses/${addressId}`);
      setProfile({ ...profile, addresses: data });
      showToast('Address deleted successfully', 'success');
    } catch (error) {
      showToast(error.response?.data?.message || 'Failed to delete address', 'error');
    }
  };

  const startEditAddress = (address) => {
    setEditingAddress(address._id);
    setAddressForm({
      label: address.label,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      isDefault: address.isDefault,
    });
  };

  const resetAddressForm = () => {
    setAddressForm({
      label: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Pakistan',
      isDefault: false,
    });
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600 mb-4"></div>
          <p className="text-xl text-gray-600 font-semibold">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-8">
      {toast && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="pointer-events-auto animate-scale-in">
            <div className={`bg-gradient-to-r ${
              toast.type === 'success' ? 'from-green-600 to-green-700' :
              toast.type === 'error' ? 'from-red-600 to-red-700' :
              'from-primary-600 to-accent-600'
            } text-white px-6 py-4 rounded-lg shadow-2xl`}>
              <p className="font-medium">{toast.message}</p>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FiUser className="text-primary-600" />
                  Personal Information
                </h2>
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    <FiEdit2 /> Edit
                  </button>
                )}
              </div>

              {editMode ? (
                <form onSubmit={handleUpdateProfile}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-2 rounded-xl hover:from-primary-700 hover:to-accent-700 transition-all"
                      >
                        <FiSave /> Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditMode(false);
                          setName(profile.name);
                          setEmail(profile.email);
                          setPhone(profile.phone || '');
                        }}
                        className="flex items-center gap-2 bg-gray-300 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-400 transition-all"
                      >
                        <FiX /> Cancel
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FiUser className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-semibold text-gray-900">{profile.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiMail className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-semibold text-gray-900">{profile.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiPhone className="text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-semibold text-gray-900">{profile.phone || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Change Password */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FiLock className="text-primary-600" />
                  Change Password
                </h2>
                {!passwordMode && (
                  <button
                    onClick={() => setPasswordMode(true)}
                    className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    <FiEdit2 /> Change
                  </button>
                )}
              </div>

              {passwordMode ? (
                <form onSubmit={handleChangePassword}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Current Password</label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength={6}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-2 rounded-xl hover:from-primary-700 hover:to-accent-700 transition-all"
                      >
                        <FiSave /> Update Password
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPasswordMode(false);
                          setCurrentPassword('');
                          setNewPassword('');
                          setConfirmPassword('');
                        }}
                        className="flex items-center gap-2 bg-gray-300 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-400 transition-all"
                      >
                        <FiX /> Cancel
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <p className="text-gray-600">Click "Change" to update your password</p>
              )}
            </div>
          </div>

          {/* Addresses */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FiMapPin className="text-primary-600" />
                  Addresses
                </h2>
                {!addressMode && !editingAddress && (
                  <button
                    onClick={() => setAddressMode(true)}
                    className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    <FiPlus /> Add
                  </button>
                )}
              </div>

              {(addressMode || editingAddress) && (
                <form onSubmit={editingAddress ? handleUpdateAddress : handleAddAddress} className="mb-6">
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Label (e.g., Home, Office)"
                      value={addressForm.label}
                      onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                      required
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={addressForm.street}
                      onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                      required
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 text-sm"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="City"
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        required
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={addressForm.state}
                        onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                        required
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Zip Code"
                        value={addressForm.zipCode}
                        onChange={(e) => setAddressForm({ ...addressForm, zipCode: e.target.value })}
                        required
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Country"
                        value={addressForm.country}
                        onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                        required
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 text-sm"
                      />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={addressForm.isDefault}
                        onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                        className="w-4 h-4 text-primary-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Set as default</span>
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-2 rounded-xl hover:from-primary-700 hover:to-accent-700 transition-all text-sm font-semibold"
                      >
                        {editingAddress ? 'Update' : 'Add'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAddressMode(false);
                          setEditingAddress(null);
                          resetAddressForm();
                        }}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-400 transition-all text-sm font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {profile.addresses && profile.addresses.length > 0 ? (
                  profile.addresses.map((address) => (
                    <div key={address._id} className="border-2 border-gray-200 rounded-xl p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-gray-900">{address.label}</p>
                          {address.isDefault && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditAddress(address)}
                            className="text-primary-600 hover:text-primary-700"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAddress(address._id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {address.street}<br />
                        {address.city}, {address.state} {address.zipCode}<br />
                        {address.country}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No addresses added yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
