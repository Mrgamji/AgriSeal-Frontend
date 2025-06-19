import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Edit, Trash2, Package, MapPin, Calendar, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const EditModal = ({ open, onClose, listing, onSave }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    price_unit: '',
    quantity: '',
    category: '',
  });

  useEffect(() => {
    if (listing) {
      setForm({
        title: listing.title || '',
        description: listing.description || '',
        location: listing.location || '',
        price: listing.price || '',
        price_unit: listing.price_unit || '',
        quantity: listing.quantity || '',
        category: listing.category || '',
      });
    }
  }, [listing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <h3 className="text-xl font-bold mb-4">Edit Listing</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="input w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="input w-full"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="input w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="input w-full"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Unit</label>
              <input
                type="text"
                name="price_unit"
                value={form.price_unit}
                onChange={handleChange}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                className="input w-full"
                min="0"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              className="btn-outline"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ViewListings = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingListing, setEditingListing] = useState(null);

  useEffect(() => {
    if (user) fetchMyListings();
    // eslint-disable-next-line
  }, [user]);

  const fetchMyListings = async () => {
    try {
      const res = await axios.get(`/api/listings/user/my-listings`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setListings(res.data);
    } catch (err) {
      console.error('Error fetching listings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;
    try {
      await axios.delete(`/api/listings/user/listings/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setListings(prev => prev.filter(item => (item._id || item.id) !== id));
    } catch (err) {
      alert('Failed to delete listing.');
    }
  };

  const handleEditClick = (listing) => {
    setEditingListing(listing);
    setEditModalOpen(true);
  };

  const handleEditSave = async (form) => {
    if (!editingListing) return;
    try {
      const id = editingListing._id || editingListing.id;
      await axios.put(`/api/listings/user/listings/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setEditModalOpen(false);
      // Show a notification for edit successful
      if (window && window.alert) {
        window.alert('Listing updated successfully!');
      }
      setEditingListing(null);
      await fetchMyListings();
    } catch (err) {
      console.error('Failed to update listing:', err);
      alert(
        err?.response?.data?.error
          ? `Failed to update listing: ${err.response.data.error}`
          : 'Failed to update listing.'
      );
    }
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setEditingListing(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Listings</h2>

      <EditModal
        open={editModalOpen}
        onClose={handleEditModalClose}
        listing={editingListing}
        onSave={handleEditSave}
      />

      {listings.length === 0 ? (
        <p className="text-gray-600">You have not posted any listings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listings.map(listing => (
            <div key={listing._id || listing.id} className="card p-4">
              {listing.images?.[0] ? (
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-4">
                  <Package className="text-gray-400 w-12 h-12" />
                </div>
              )}

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {listing.title}
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                {listing.location}
              </p>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Posted on {new Date(listing.created_at).toLocaleDateString()}
                </p>
                <span
                  className={
                    "inline-block px-2 py-0.5 rounded-full text-xs font-semibold " +
                    (listing.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : listing.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : listing.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800")
                  }
                >
                  {listing.status ? listing.status.charAt(0).toUpperCase() + listing.status.slice(1) : "Unknown"}
                </span>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleEditClick(listing)}
                  className="btn-outline flex items-center space-x-1"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(listing._id || listing.id)}
                  className="btn-danger flex items-center space-x-1"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewListings;
