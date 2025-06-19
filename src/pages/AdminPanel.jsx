import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Users, 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle,
  Shield,
  TrendingUp,
  Eye,
  FileText,
  ShoppingCart,
  DollarSign,
  CheckSquare,
  PauseCircle,
  PlayCircle,
  Search,
  MessageCircle
} from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({});
  const [pendingListings, setPendingListings] = useState([]);
  const [allListings, setAllListings] = useState([]);
  const [users, setUsers] = useState([]);
  const [verificationRequests, setVerificationRequests] = useState([]);
  const [groupRequests, setGroupRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allListingsLoading, setAllListingsLoading] = useState(false);
  const [groupRequestsLoading, setGroupRequestsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // For search and filter in All Listings
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterFrozen, setFilterFrozen] = useState('');

  useEffect(() => {
    fetchDashboardStats();
    fetchPendingListings();
    fetchUsers();
    fetchVerificationRequests();
  }, []);

  useEffect(() => {
    if (activeTab === 'allListings') {
      fetchAllListings();
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'groupRequests') {
      fetchGroupRequests();
    }
  }, [activeTab]);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get('/api/admin/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchPendingListings = async () => {
    try {
      const response = await axios.get('/api/admin/listings/pending');
      setPendingListings(response.data);
    } catch (error) {
      console.error('Error fetching pending listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllListings = async () => {
    setAllListingsLoading(true);
    try {
      const response = await axios.get('/api/admin/listings/all');
      setAllListings(response.data);
    } catch (error) {
      console.error('Error fetching all listings:', error);
      setError('Failed to fetch all listings');
    } finally {
      setAllListingsLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchVerificationRequests = async () => {
    try {
      const response = await axios.get('/api/admin/verification-requests');
      setVerificationRequests(response.data);
    } catch (error) {
      console.error('Error fetching verification requests:', error);
    }
  };

  // Fetch group requests (pending approval)
  const fetchGroupRequests = async () => {
    setGroupRequestsLoading(true);
    try {
      // This endpoint should return groups with is_approved = 0
      const response = await axios.get('/api/admin/group-requests');
      setGroupRequests(response.data);
    } catch (error) {
      console.error('Error fetching group requests:', error);
      setError('Failed to fetch group requests');
    } finally {
      setGroupRequestsLoading(false);
    }
  };

  // Approve or reject group request
  const handleGroupRequestAction = async (groupId, action) => {
    try {
      await axios.put(`/api/admin/group-requests/${groupId}/${action}`);
      setMessage(`Group ${action === 'approve' ? 'approved' : 'rejected'} successfully!`);
      fetchGroupRequests();
    } catch (error) {
      setError(error.response?.data?.error || `Failed to ${action} group`);
    }
  };

  const handleListingAction = async (listingId, status) => {
    try {
      await axios.put(`/api/admin/listings/${listingId}/status`, { status });
      setMessage(`Listing ${status} successfully!`);
      fetchPendingListings();
      fetchDashboardStats();
      if (activeTab === 'allListings') {
        fetchAllListings();
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update listing');
    }
  };

  const handleFreezeUnfreezeListing = async (listingId, freeze) => {
    try {
      await axios.put(`/api/admin/listings/${listingId}/${freeze ? 'freeze' : 'unfreeze'}`);
      setMessage(`Listing ${freeze ? 'frozen' : 'unfrozen'} successfully!`);
      fetchAllListings();
      fetchDashboardStats();
    } catch (error) {
      setError(error.response?.data?.error || `Failed to ${freeze ? 'freeze' : 'unfreeze'} listing`);
    }
  };

  const handleVerificationAction = async (requestId, status, badgeType = 'verified') => {
    try {
      await axios.put(`/api/admin/verification-requests/${requestId}`, {
        status,
        badgeType,
        adminNotes: status === 'approved' ? 'Verified by admin' : 'Verification rejected'
      });
      setMessage(`Verification request ${status} successfully!`);
      fetchVerificationRequests();
      fetchUsers();
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to process verification');
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      crops: 'bg-green-100 text-green-800',
      seeds: 'bg-blue-100 text-blue-800',
      land: 'bg-yellow-100 text-yellow-800',
      labor: 'bg-purple-100 text-purple-800',
      tools: 'bg-gray-100 text-gray-800',
      chemicals: 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getRoleBadge = (role) => {
    const badges = {
      farmer: 'bg-green-100 text-green-800',
      buyer: 'bg-blue-100 text-blue-800',
      supplier: 'bg-purple-100 text-purple-800'
    };
    return badges[role] || 'bg-gray-100 text-gray-800';
  };

  // Filtered and searched listings for All Listings tab
  const filteredListings = allListings.filter((listing) => {
    // Search
    const search = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !search ||
      (listing.title && listing.title.toLowerCase().includes(search)) ||
      (listing.description && listing.description.toLowerCase().includes(search)) ||
      (listing.seller_name && listing.seller_name.toLowerCase().includes(search)) ||
      (listing.seller_email && listing.seller_email.toLowerCase().includes(search)) ||
      (listing.location && listing.location.toLowerCase().includes(search));
    // Category filter
    const matchesCategory = !filterCategory || listing.category === filterCategory;
    // Status filter
    const matchesStatus = !filterStatus || listing.status === filterStatus;
    // Frozen filter
    const matchesFrozen =
      !filterFrozen ||
      (filterFrozen === 'frozen' && listing.is_frozen) ||
      (filterFrozen === 'not_frozen' && !listing.is_frozen);

    return matchesSearch && matchesCategory && matchesStatus && matchesFrozen;
  });

  // Get unique categories and statuses for filter dropdowns
  const uniqueCategories = Array.from(new Set(allListings.map(l => l.category))).filter(Boolean);
  const uniqueStatuses = Array.from(new Set(allListings.map(l => l.status))).filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="mt-2 text-gray-600">
            Manage listings, users, and platform operations
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
                onClick={() => setActiveTab('dashboard')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'dashboard'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <TrendingUp className="inline w-4 h-4 mr-2" />
                Dashboard
              </button>
              
              <button
                onClick={() => setActiveTab('listings')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'listings'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Package className="inline w-4 h-4 mr-2" />
                Pending Listings ({pendingListings.length})
              </button>

              <button
                onClick={() => setActiveTab('allListings')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'allListings'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Package className="inline w-4 h-4 mr-2" />
                All Listings
              </button>
              
              <button
                onClick={() => setActiveTab('users')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="inline w-4 h-4 mr-2" />
                Users
              </button>
              
              <button
                onClick={() => setActiveTab('verification')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'verification'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Shield className="inline w-4 h-4 mr-2" />
                Verification ({verificationRequests.length})
              </button>

              <button
                onClick={() => setActiveTab('groupRequests')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'groupRequests'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <MessageCircle className="inline w-4 h-4 mr-2" />
                Group Requests
                {groupRequests.length > 0 && (
                  <span className="ml-1 inline-block bg-yellow-200 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                    {groupRequests.length}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Stats Cards - 2 rows, larger size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* First Row */}
              <div className="card p-4 min-h-[170px] flex flex-col justify-center">
                <div className="flex items-center">
                  <div className="p-5 bg-blue-100 rounded-xl">
                    <Users className="w-10 h-10 text-blue-600" />
                  </div>
                  <div className="ml-6">
                    <p className="text-lg font-medium text-gray-600">Total Users</p>
                    <p className="text-4xl font-extrabold text-gray-900">{stats.totalUsers || 0}</p>
                  </div>
                </div>
              </div>

              <div className="card p-4 min-h-[170px] flex flex-col justify-center">
                <div className="flex items-center">
                  <div className="p-5 bg-green-100 rounded-xl">
                    <Package className="w-10 h-10 text-green-600" />
                  </div>
                  <div className="ml-6">
                    <p className="text-lg font-medium text-gray-600">Total Listings</p>
                    <p className="text-4xl font-extrabold text-gray-900">{stats.totalListings || 0}</p>
                  </div>
                </div>
              </div>

              <div className="card p-4 min-h-[170px] flex flex-col justify-center">
                <div className="flex items-center">
                  <div className="p-5 bg-yellow-100 rounded-xl">
                    <Clock className="w-10 h-10 text-yellow-600" />
                  </div>
                  <div className="ml-6">
                    <p className="text-lg font-medium text-gray-600">Pending Listings</p>
                    <p className="text-4xl font-extrabold text-gray-900">{stats.pendingListings || 0}</p>
                  </div>
                </div>
              </div>

              <div className="card p-4 min-h-[170px] flex flex-col justify-center">
                <div className="flex items-center">
                  <div className="p-5 bg-purple-100 rounded-xl">
                    <Shield className="w-10 h-10 text-purple-600" />
                  </div>
                  <div className="ml-6">
                    <p className="text-lg font-medium text-gray-600">Pending Verifications</p>
                    <p className="text-4xl font-extrabold text-gray-900">{stats.pendingVerifications || 0}</p>
                  </div>
                </div>
              </div>

              {/* Second Row */}
              <div className="card p-4 min-h-[170px] flex flex-col justify-center">
                <div className="flex items-center">
                  <div className="p-5 bg-orange-100 rounded-xl">
                    <ShoppingCart className="w-10 h-10 text-orange-600" />
                  </div>
                  <div className="ml-6">
                    <p className="text-lg font-medium text-gray-600">Initiated Bookings</p>
                    <p className="text-4xl font-extrabold text-gray-900">{stats.initiatedBookings || 0}</p>
                  </div>
                </div>
              </div>

              <div className="card p-4 min-h-[120px] flex flex-col justify-center">
                <div className="flex items-center">
                  <div className="p-5 bg-teal-100 rounded-xl">
                    <CheckSquare className="w-10 h-10 text-teal-600" />
                  </div>
                  <div className="ml-6">
                    <p className="text-lg font-medium text-gray-600">Completed Transactions</p>
                    <p className="text-4xl font-extrabold text-gray-900">{stats.completedTransactions || 0}</p>
                  </div>
                </div>
              </div>

              <div className="card p-4 min-h-[170px] flex flex-col justify-center">
                <div className="flex items-center">
                  <div className="p-5 bg-emerald-100 rounded-xl">
                    <DollarSign className="w-10 h-10 text-emerald-600" />
                  </div>
                  <div className="ml-6">
                    <p className="text-lg font-medium text-gray-600">Revenue Generated</p>
                    <p className="text-1xl font-extrabold text-gray-900">
                      {typeof stats.revenueGenerated === 'number'
                        ? `N${stats.revenueGenerated.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                        : 'N0.00'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Empty cell for even grid if needed */}
              <div className="hidden lg:block"></div>
            </div>

            {/* User Distribution */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Distribution by Role</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.usersByRole?.map((roleData) => (
                  <div key={roleData.role} className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{roleData.count}</p>
                    <p className="text-sm text-gray-600 capitalize">{roleData.role}s</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : pendingListings.length > 0 ? (
              <div className="space-y-6">
                {pendingListings.map((listing) => (
                  <div key={listing.id} className="card p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`badge ${getCategoryColor(listing.category)}`}>
                            {listing.category}
                          </span>
                          <span className="badge badge-warning">Pending Review</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {listing.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{listing.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <span className="text-sm text-gray-500">Seller:</span>
                            <p className="font-medium">{listing.seller_name}</p>
                            <p className="text-sm text-gray-600">{listing.seller_email}</p>
                          </div>
                          {listing.price && (
                            <div>
                              <span className="text-sm text-gray-500">Price:</span>
                              <p className="font-medium text-green-600">
                                ${listing.price}
                                {listing.price_unit && ` per ${listing.price_unit}`}
                              </p>
                            </div>
                          )}
                          {listing.quantity && (
                            <div>
                              <span className="text-sm text-gray-500">Quantity:</span>
                              <p className="font-medium">{listing.quantity}</p>
                            </div>
                          )}
                        </div>

                        {listing.location && (
                          <p className="text-sm text-gray-600 mb-4">
                            <strong>Location:</strong> {listing.location}
                          </p>
                        )}
                      </div>

                      {listing.images && listing.images.length > 0 && (
                        <div className="ml-6">
                          <img
                            src={listing.images[0]}
                            alt={listing.title}
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleListingAction(listing.id, 'approved')}
                        className="btn-primary flex items-center space-x-2"
                      >
                        <CheckCircle size={18} />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleListingAction(listing.id, 'rejected')}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                      >
                        <XCircle size={18} />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No pending listings
                </h3>
                <p className="text-gray-600">
                  All listings have been reviewed. New submissions will appear here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* All Listings Tab */}
        {activeTab === 'allListings' && (
          <div>
            {/* Search and Filter Controls */}
            <div className="mb-4 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
              <div className="relative w-full md:w-1/3">
                <input
                  type="text"
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary-200"
                  placeholder="Search by title, seller, email, location..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              </div>
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {uniqueCategories.map(cat => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
              >
                <option value="">All Statuses</option>
                {uniqueStatuses.map(status => (
                  <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                ))}
              </select>
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-200"
                value={filterFrozen}
                onChange={e => setFilterFrozen(e.target.value)}
              >
                <option value="">All</option>
                <option value="frozen">Frozen</option>
                <option value="not_frozen">Not Frozen</option>
              </select>
            </div>
            {allListingsLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : filteredListings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 bg-white rounded-lg shadow">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frozen</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredListings.map((listing) => (
                      <tr key={listing.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2 whitespace-nowrap max-w-[180px]">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900 truncate">{listing.title}</span>
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <span className={`badge ${getCategoryColor(listing.category)} text-xs`}>
                            {listing.category}
                          </span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <span className={`badge text-xs ${
                            listing.status === 'approved'
                              ? 'badge-success'
                              : listing.status === 'pending'
                              ? 'badge-warning'
                              : 'badge-error'
                          }`}>
                            {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {(() => {
                            const user = users.find(u => u.id === listing.user_id);
                            return (
                              <>
                                <div className="text-xs text-gray-900">{user ? user.full_name : '-'}</div>
                                <div className="text-xs text-gray-500">{user ? user.email : '-'}</div>
                              </>
                            );
                          })()}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {listing.price ? (
                            <span className="text-xs text-green-700 font-medium">
                              ${listing.price}
                              {listing.price_unit && `/${listing.price_unit}`}
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {listing.quantity ? (
                            <span className="text-xs">{listing.quantity}</span>
                          ) : (
                            <span className="text-xs text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <span className="text-xs">{listing.location || '-'}</span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {listing.is_frozen ? (
                            <span className="badge bg-gray-400 text-white text-xs">Frozen</span>
                          ) : (
                            <span className="badge bg-green-100 text-green-800 text-xs">Active</span>
                          )}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          {listing.status==='pending' ? (
                            <button
                              onClick={() => handleFreezeUnfreezeListing(listing.id, false)}
                              className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded flex items-center space-x-1 text-xs"
                              title="Unfreeze"
                            >
                              <PlayCircle size={14} />
                              <span>Unfreeze</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleFreezeUnfreezeListing(listing.id, true)}
                              className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded flex items-center space-x-1 text-xs"
                              title="Freeze"
                            >
                              <PauseCircle size={14} />
                              <span>Freeze</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No listings found
                </h3>
                <p className="text-gray-600">
                  There are currently no listings to display.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">All Users</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.full_name}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`badge ${getRoleBadge(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>{user.phone || 'N/A'}</div>
                        <div className="text-gray-500">{user.location || 'N/A'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.is_verified ? (
                          <span className="badge badge-success">
                            Verified {user.verification_badge}
                          </span>
                        ) : (
                          <span className="badge badge-warning">Unverified</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Verification Tab */}
        {activeTab === 'verification' && (
          <div>
            {verificationRequests.length > 0 ? (
              <div className="space-y-6">
                {verificationRequests.map((request) => (
                  <div key={request.id} className="card p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {request.full_name}
                        </h3>
                        <p className="text-gray-600 mb-2">{request.email}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <span className="text-sm text-gray-500">Document Type:</span>
                            <p className="font-medium capitalize">
                              {request.document_type.replace('-', ' ')}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Submitted:</span>
                            <p className="font-medium">
                              {new Date(request.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <a
                            href={`http://localhost:5000${request.document_path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700"
                          >
                            <FileText size={18} />
                            <span>View Document</span>
                            <Eye size={16} />
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleVerificationAction(request.id, 'approved')}
                        className="btn-primary flex items-center space-x-2"
                      >
                        <CheckCircle size={18} />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleVerificationAction(request.id, 'rejected')}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                      >
                        <XCircle size={18} />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No pending verifications
                </h3>
                <p className="text-gray-600">
                  All verification requests have been processed. New requests will appear here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Group Requests Tab */}
        {activeTab === 'groupRequests' && (
          <div>
            {groupRequestsLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : groupRequests.length > 0 ? (
              <div className="space-y-6">
                {groupRequests.map((group) => (
                  <div key={group.id} className="card p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {group.name}
                        </h3>
                        <p className="text-gray-600 mb-2">{group.description}</p>
                        <div className="mb-2">
                          <span className="text-sm text-gray-500">Created by:</span>{' '}
                          <span className="font-medium">{group.creator_name || '-'}</span>
                        </div>
                        <div className="mb-2">
                          <span className="text-sm text-gray-500">Created at:</span>{' '}
                          <span className="font-medium">
                            {group.created_at ? new Date(group.created_at).toLocaleString() : '-'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleGroupRequestAction(group.id, 'approve')}
                        className="btn-primary flex items-center space-x-2"
                      >
                        <CheckCircle size={18} />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleGroupRequestAction(group.id, 'reject')}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                      >
                        <XCircle size={18} />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No new group requests
                </h3>
                <p className="text-gray-600">
                  All group requests have been processed. New requests will appear here.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;