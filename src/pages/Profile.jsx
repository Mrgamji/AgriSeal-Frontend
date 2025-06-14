import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Shield,
  Upload,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    location: user?.location || ''
  });

  const [verificationData, setVerificationData] = useState({
    documentType: 'farm-license',
    document: null
  });

  const [purchaseRequests, setPurchaseRequests] = useState([]);

  useEffect(() => {
    if (user?.role === 'farmer') {
      fetchPurchaseRequests();
    }
  }, [user]);

  const fetchPurchaseRequests = async () => {
    try {
      const response = await axios.get('/api/users/purchase-requests');
      setPurchaseRequests(response.data);
    } catch (error) {
      console.error('Error fetching purchase requests:', error);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await axios.put('/api/users/profile', profileData);
      updateUser({ ...user, ...profileData });
      setMessage('Profile updated successfully!');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    if (!verificationData.document) {
      setError('Please select a document to upload');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('documentType', verificationData.documentType);
      formData.append('document', verificationData.document);

      await axios.post('/api/users/verify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage('Verification request submitted successfully!');
      setVerificationData({ documentType: 'farm-license', document: null });
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to submit verification');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestStatusUpdate = async (requestId, status) => {
    try {
      await axios.put(`/api/users/purchase-requests/${requestId}`, { status });
      fetchPurchaseRequests();
      setMessage(`Request ${status} successfully!`);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update request');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { class: 'badge badge-warning', icon: <Clock size={14} /> },
      accepted: { class: 'badge badge-success', icon: <CheckCircle size={14} /> },
      rejected: { class: 'badge badge-error', icon: <XCircle size={14} /> },
      completed: { class: 'badge badge-info', icon: <CheckCircle size={14} /> }
    };
    return badges[status] || { class: 'badge', icon: <Clock size={14} /> };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="mt-2 text-gray-600">
            Manage your account information and preferences
          </p>
        </div>

        {/* Messages */}
        {message && (
          <div className="mb-6 bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-lg">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <User className="inline w-4 h-4 mr-2" />
                Profile Information
              </button>
              
              {user?.role === 'farmer' && (
                <>
                  <button
                    onClick={() => setActiveTab('verification')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'verification'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Shield className="inline w-4 h-4 mr-2" />
                    Verification
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('requests')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'requests'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Purchase Requests
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Personal Information
            </h2>

            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="input-field pl-10 bg-gray-50"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={user?.role || ''}
                      disabled
                      className="input-field pl-10 bg-gray-50 capitalize"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={profileData.fullName}
                    onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="input-field pl-10"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      className="input-field pl-10"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                      className="input-field pl-10"
                      placeholder="City, State"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Member since {new Date(user?.created_at || Date.now()).toLocaleDateString()}
                  </span>
                </div>
                
                {user?.isVerified && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="badge badge-success">Verified {user.verificationBadge}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Verification Tab */}
        {activeTab === 'verification' && user?.role === 'farmer' && (
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Farmer Verification
            </h2>

            {user.isVerified ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  You are verified!
                </h3>
                <p className="text-gray-600">
                  Your farmer status has been verified with a {user.verificationBadge} badge.
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Get Verified
                  </h3>
                  <p className="text-gray-600">
                    Upload your farming documents to get verified and build trust with buyers.
                  </p>
                </div>

                <form onSubmit={handleVerificationSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Document Type
                    </label>
                    <select
                      value={verificationData.documentType}
                      onChange={(e) => setVerificationData(prev => ({ ...prev, documentType: e.target.value }))}
                      className="input-field"
                    >
                      <option value="farm-license">Farm License</option>
                      <option value="land-ownership">Land Ownership Certificate</option>
                      <option value="agricultural-id">Agricultural ID</option>
                      <option value="cooperative-membership">Cooperative Membership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Document
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <label className="cursor-pointer">
                        <span className="text-primary-600 hover:text-primary-700 font-medium">
                          Choose file
                        </span>
                        <span className="text-gray-600"> or drag and drop</span>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => setVerificationData(prev => ({ ...prev, document: e.target.files[0] }))}
                          className="hidden"
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, JPG, PNG up to 5MB
                      </p>
                      {verificationData.document && (
                        <p className="text-sm text-green-600 mt-2">
                          Selected: {verificationData.document.name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Verification Benefits</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Verified badge on your profile and listings</li>
                      <li>• Increased trust from buyers</li>
                      <li>• Higher visibility in search results</li>
                      <li>• Access to premium features</li>
                    </ul>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loading || !verificationData.document}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Submitting...' : 'Submit for Verification'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Purchase Requests Tab */}
        {activeTab === 'requests' && user?.role === 'farmer' && (
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Purchase Requests
            </h2>

            {purchaseRequests.length > 0 ? (
              <div className="space-y-4">
                {purchaseRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {request.listing_title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          From: {request.buyer_name} • Category: {request.category}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {(() => {
                          const badge = getStatusBadge(request.status);
                          return (
                            <span className={badge.class}>
                              {badge.icon}
                              <span className="ml-1">{request.status}</span>
                            </span>
                          );
                        })()}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-500">Quantity:</span>
                        <p className="font-medium">{request.quantity}</p>
                      </div>
                      {request.offered_price && (
                        <div>
                          <span className="text-sm text-gray-500">Offered Price:</span>
                          <p className="font-medium text-green-600">${request.offered_price}</p>
                        </div>
                      )}
                      <div>
                        <span className="text-sm text-gray-500">Buyer Contact:</span>
                        <p className="font-medium">{request.buyer_phone}</p>
                      </div>
                    </div>

                    {request.message && (
                      <div className="mb-4">
                        <span className="text-sm text-gray-500">Message:</span>
                        <p className="text-gray-700 mt-1">{request.message}</p>
                      </div>
                    )}

                    {request.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleRequestStatusUpdate(request.id, 'accepted')}
                          className="btn-primary text-sm px-4 py-2"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleRequestStatusUpdate(request.id, 'rejected')}
                          className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg"
                        >
                          Reject
                        </button>
                      </div>
                    )}

                    {request.status === 'accepted' && (
                      <button
                        onClick={() => handleRequestStatusUpdate(request.id, 'completed')}
                        className="btn-primary text-sm px-4 py-2"
                      >
                        Mark as Completed
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No purchase requests yet
                </h3>
                <p className="text-gray-600">
                  When buyers are interested in your listings, their requests will appear here.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;