import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Filter, MapPin, User, Star, Eye } from 'lucide-react';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    search: ''
  });

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'crops', label: 'Crops' },
    { value: 'seeds', label: 'Seeds' },
    { value: 'land', label: 'Land Rental' },
    { value: 'labor', label: 'Labor Services' },
    { value: 'tools', label: 'Tools & Equipment' },
    { value: 'chemicals', label: 'Chemicals & Fertilizers' }
  ];

  useEffect(() => {
    fetchListings();
  }, [filters]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.location) params.append('location', filters.location);
      
      const response = await axios.get(`/api/listings?${params.toString()}`);
      setListings(response.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const filteredListings = listings.filter(listing =>
    listing.title.toLowerCase().includes(filters.search.toLowerCase()) ||
    listing.description?.toLowerCase().includes(filters.search.toLowerCase())
  );

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Agricultural Marketplace
          </h1>
          <p className="text-gray-600">
            Discover crops, seeds, land, tools, and services from verified farmers and suppliers
          </p>
        </div>

        {/* Filters */}
        <div className="card p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search listings..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="input-field"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Location..."
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <div key={listing.id} className="card overflow-hidden">
                  {/* Image */}
                  <div className="h-48 bg-gray-200 relative">
                    {listing.images && listing.images.length > 0 ? (
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <Eye className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className={`badge ${getCategoryColor(listing.category)}`}>
                        {listing.category}
                      </span>
                    </div>
                    {listing.is_featured && (
                      <div className="absolute top-4 right-4">
                        <Star className="w-6 h-6 text-yellow-500 fill-current" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {listing.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {listing.description}
                    </p>

                    {/* Price */}
                    {listing.price && (
                      <div className="mb-4">
                        <span className="text-2xl font-bold text-primary-600">
                        ₦{listing.price}
                        </span>
                        {listing.price_unit && (
                          <span className="text-gray-600 ml-1">
                            /{listing.price_unit}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Seller Info */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {listing.seller_name}
                        </span>
                        {listing.seller_verified && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
<polygon fill="#42a5f5" points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"></polygon><polygon fill="#fff" points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"></polygon>
</svg>
                          </span>
                        )}
                      </div>
                      {listing.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {listing.location}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <Link
                      to={`/listings/${listing.id}`}
                      className="btn-primary w-full text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No listings found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or check back later for new listings.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;