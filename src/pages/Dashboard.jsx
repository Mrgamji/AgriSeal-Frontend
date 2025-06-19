import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Package, 
  Plus, 
  Eye, 
  Clock, 
  CheckCircle, 
  XCircle,
  MessageSquare,
  Users,
  TrendingUp,
  ShoppingBag
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    listings: 0,
    requests: 0,
    messages: 0
  });
  const [recentListings, setRecentListings] = useState([]);
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch user's listings
      const listingsResponse = await axios.get('/api/listings/user/my-listings');
      setRecentListings(listingsResponse.data.slice(0, 5));
      setStats(prev => ({ ...prev, listings: listingsResponse.data.length }));

      // Fetch purchase requests for farmers
      if (user.role === 'farmer') {
        const requestsResponse = await axios.get('/api/users/purchase-requests');
        setRecentRequests(requestsResponse.data.slice(0, 5));
        setStats(prev => ({ ...prev, requests: requestsResponse.data.length }));
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'badge badge-warning',
      approved: 'badge badge-success',
      rejected: 'badge badge-error',
      sold: 'badge badge-info'
    };
    return badges[status] || 'badge';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock size={16} className="text-yellow-600" />,
      approved: <CheckCircle size={16} className="text-green-600" />,
      rejected: <XCircle size={16} className="text-red-600" />,
      sold: <Package size={16} className="text-blue-600" />
    };
    return icons[status] || <Clock size={16} />;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.fullName}!
          </h1>
          <p className="mt-2 text-gray-600">
            Here's what's happening with your {user.role} account.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-lg">
                <Package className="w-6 h-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Listings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.listings}</p>
              </div>
            </div>
          </div>

          {user.role === 'farmer' && (
            <div className="card p-6">
              <div className="flex items-center">
                <div className="p-3 bg-secondary-100 rounded-lg">
                  <ShoppingBag className="w-6 h-6 text-secondary-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Purchase Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.requests}</p>
                </div>
              </div>
            </div>
          )}

          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Hub Messages</p>
                <p className="text-2xl font-bold text-gray-900">{stats.messages}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(user.role === 'farmer' || user.role === 'supplier') && (
              <Link to="/create-listing" className="btn-primary flex items-center justify-center space-x-2">
                <Plus size={20} />
                <span>Create Listing</span>
              </Link>
            )}
            
            <Link to="/listings" className="btn-outline flex items-center justify-center space-x-2">
              <Eye size={20} />
              <span>Browse Market</span>
            </Link>
            
            <Link to="/farmers-hub" className="btn-secondary flex items-center justify-center space-x-2">
              <Users size={20} />
              <span>Farmers Hub</span>
            </Link>
            
            <Link to="/profile" className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
              <TrendingUp size={20} />
              <span>View Profile</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Listings */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Listings</h2>
              <Link to="/view-listings" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View all
              </Link>
            </div>
            
            {recentListings.length > 0 ? (
              <div className="space-y-4">
                {recentListings.map((listing) => (
                  <div key={listing.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(listing.status)}
                        <h3 className="font-medium text-gray-900">{listing.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {listing.category} • ${listing.price || 'N/A'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={getStatusBadge(listing.status)}>
                        {listing.status}
                      </span>
                      {listing.request_count > 0 && (
                        <span className="badge badge-info">
                          {listing.request_count} requests
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No listings yet</p>
                {(user.role === 'farmer' || user.role === 'supplier') && (
                  <Link to="/create-listing" className="btn-primary mt-4 inline-flex items-center space-x-2">
                    <Plus size={18} />
                    <span>Create Your First Listing</span>
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Recent Requests (for farmers) */}
          {user.role === 'farmer' && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Recent Purchase Requests</h2>
                <Link to="/dashboard" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View all
                </Link>
              </div>
              
              {recentRequests.length > 0 ? (
                <div className="space-y-4">
                  {recentRequests.map((request) => (
                    <div key={request.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{request.listing_title}</h3>
                        <span className={getStatusBadge(request.status)}>
                          {request.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        From: {request.buyer_name} • Qty: {request.quantity}
                      </p>
                      {request.offered_price && (
                        <p className="text-sm text-green-600 font-medium">
                          Offered: ${request.offered_price}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No purchase requests yet</p>
                </div>
              )}
            </div>
          )}

          {/* For buyers - show browse suggestions */}
          {user.role === 'buyer' && (
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Explore Marketplace</h2>
              <div className="space-y-4">
                <Link to="/listings?category=crops" className="block p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                  <h3 className="font-medium text-gray-900">Fresh Crops</h3>
                  <p className="text-sm text-gray-600">Browse available crops from local farmers</p>
                </Link>
                <Link to="/listings?category=seeds" className="block p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                  <h3 className="font-medium text-gray-900">Seeds & Plants</h3>
                  <p className="text-sm text-gray-600">Find quality seeds for your next season</p>
                </Link>
                <Link to="/listings?category=tools" className="block p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                  <h3 className="font-medium text-gray-900">Farm Equipment</h3>
                  <p className="text-sm text-gray-600">Equipment and tools for farming</p>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;