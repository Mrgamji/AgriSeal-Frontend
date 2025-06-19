import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { 
  ArrowLeft, 
  MapPin, 
  User, 
  Phone, 
  Calendar, 
  Package,
  MessageCircle,
  ShoppingCart
} from 'lucide-react';

const ListingDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestData, setRequestData] = useState({
    quantity: '',
    offeredPrice: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const response = await axios.get(`/api/listings/${id}`);
      setListing(response.data);
    } catch (error) {
      console.error('Error fetching listing:', error);
      navigate('/listings');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`/api/listings/user/listing${id}/request`, requestData);
      alert('Purchase request sent successfully!');
      setShowRequestForm(false);
      setRequestData({ quantity: '', offeredPrice: '', message: '' });
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to send request');
    } finally {
      setSubmitting(false);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Listing not found</h2>
          <button onClick={() => navigate('/listings')} className="btn-primary">
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/listings')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back to Listings</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Images */}
            <div className="card overflow-hidden mb-6">
              {listing.images && listing.images.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                  {listing.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${listing.title} ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  ))}
                </div>
              ) : (
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <Package className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>

            {/* Details */}
            <div className="card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className={`badge ${getCategoryColor(listing.category)} mb-2`}>
                    {listing.category}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {listing.title}
                  </h1>
                </div>
                {listing.price && (
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary-600">
                      ${listing.price}
                    </div>
                    {listing.price_unit && (
                      <div className="text-gray-600">
                        per {listing.price_unit}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">
                  {listing.description || 'No description provided.'}
                </p>
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {listing.quantity && (
                  <div className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">
                      Quantity: {listing.quantity}
                    </span>
                  </div>
                )}
                {listing.location && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{listing.location}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-700">
                    Posted {new Date(listing.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Seller Info */}
            <div className="card p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h3>
              
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {listing.seller_name}
                  </div>
                  {listing.seller_verified && (
                    <span className="badge badge-success text-xs">Verified</span>
                  )}
                </div>
              </div>

              {listing.seller_phone && (
                <div className="flex items-center space-x-2 mb-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{listing.seller_phone}</span>
                </div>
              )}

              {listing.seller_location && (
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-700">{listing.seller_location}</span>
                </div>
              )}

              {/* Contact Actions */}
              {user && user.role === 'buyer' && user.id !== listing.user_id && (
                <div className="space-y-3">
                  <button
                    onClick={() => setShowRequestForm(true)}
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart size={18} />
                    <span>Send Purchase Request</span>
                  </button>
                  <button className="btn-outline w-full flex items-center justify-center space-x-2">
                    <MessageCircle size={18} />
                    <span>Send Message</span>
                  </button>
                </div>
              )}

              {!user && (
                <div className="space-y-3">
                  <button
                    onClick={() => navigate('/login')}
                    className="btn-primary w-full"
                  >
                    Login to Contact Seller
                  </button>
                </div>
              )}
            </div>

            {/* Safety Tips */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Tips</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Meet in a public place for transactions</li>
                <li>• Inspect products before payment</li>
                <li>• Use secure payment methods</li>
                <li>• Report suspicious activity</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Purchase Request Modal */}
        {showRequestForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Send Purchase Request
              </h3>
              
              <form onSubmit={handleRequestSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    required
                    value={requestData.quantity}
                    onChange={(e) => setRequestData(prev => ({ ...prev, quantity: e.target.value }))}
                    className="input-field"
                    placeholder="Enter quantity needed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Offered Price (optional)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={requestData.offeredPrice}
                    onChange={(e) => setRequestData(prev => ({ ...prev, offeredPrice: e.target.value }))}
                    className="input-field"
                    placeholder="Your price offer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message (optional)
                  </label>
                  <textarea
                    rows={3}
                    value={requestData.message}
                    onChange={(e) => setRequestData(prev => ({ ...prev, message: e.target.value }))}
                    className="input-field"
                    placeholder="Additional details or questions..."
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="btn-outline flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary flex-1"
                  >
                    {submitting ? 'Sending...' : 'Send Request'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingDetail;