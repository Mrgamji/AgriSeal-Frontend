import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';

import axios from 'axios';
import {
  MessageCircle,
  Send,
  Plus,
  ThumbsUp,
  MessageSquare,
  CheckCircle,
  User,
  Calendar,
  Users,
  Bot
} from 'lucide-react';

const FarmersHub = () => {
  const { user } = useAuth();
  const { socket, sendMessage } = useSocket();

  // Tabs: groups, posts, ai
  const [activeTab, setActiveTab] = useState('groups');

  // Group chat state
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [groupMessages, setGroupMessages] = useState([]);
  const [newGroupMessage, setNewGroupMessage] = useState('');
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: '', description: '' });
  const [groupLoading, setGroupLoading] = useState(false);

  // Posts state (Q&A)
  const [posts, setPosts] = useState([]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'general'
  });

  // AI Ask state
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'pest-control', label: 'Pest Control' },
    { value: 'soil-health', label: 'Soil Health' },
    { value: 'weather', label: 'Weather' },
    { value: 'equipment', label: 'Equipment' },
    { value: 'market-advice', label: 'Market Advice' },
    { value: 'general', label: 'General' }
  ];

  // Fetch groups on mount
  useEffect(() => {
    fetchGroups();
  }, []);

  // Fetch group messages when group changes
  useEffect(() => {
    if (selectedGroupId) {
      fetchGroupMessages(selectedGroupId);
    } else {
      setGroupMessages([]);
    }
  }, [selectedGroupId]);

  // Socket: listen for new group messages
  useEffect(() => {
    if (socket) {
      socket.on('new-group-message', (message) => {
        if (message.group_id === selectedGroupId) {
          setGroupMessages(prev => [...prev, message]);
        }
      });
    }
    return () => {
      if (socket) {
        socket.off('new-group-message');
      }
    };
  }, [socket, selectedGroupId]);

  // Q&A posts
  useEffect(() => {
    fetchPosts();
  }, [selectedCategory]);

  // Fetch all groups
  const fetchGroups = async () => {
    setGroupLoading(true);
    try {
      const res = await axios.get('/api/chat/groups');
      setGroups(res.data);
      // Auto-select first group if none selected
      if (!selectedGroupId && res.data.length > 0) {
        setSelectedGroupId(res.data[0].id);
      }
    } catch (err) {
      setGroups([]);
    } finally {
      setGroupLoading(false);
    }
  };

  // Fetch messages for a group
  const fetchGroupMessages = async (groupId) => {
    try {
      const res = await axios.get(`/api/chat/groups/${groupId}/messages`);
      setGroupMessages(res.data);
    } catch (err) {
      setGroupMessages([]);
    }
  };

  // Send message to group
  const handleSendGroupMessage = async (e) => {
    e.preventDefault();
    if (!newGroupMessage.trim() || !selectedGroupId) return;
    try {
      await axios.post(`/api/chat/groups/${selectedGroupId}/messages`, {
        content: newGroupMessage
      });
      const messageData = {
        group_id: selectedGroupId,
        content: newGroupMessage,
        sender_name: user.fullName,
        sender_id: user.id,
        is_verified: user.verificationBadge === 'verified',
        created_at: new Date().toISOString()
      };
      sendMessage({ ...messageData, type: 'new-group-message' });
      setNewGroupMessage('');
    } catch (err) {}
  };

  // Create new group (verified only)
  const handleCreateGroup = async (e) => {
    e.preventDefault();
    if (!newGroup.name.trim()) return;
    setCreatingGroup(true);
    try {
      await axios.post('/api/chat/groups', {
        name: newGroup.name,
        description: newGroup.description
      });
      setShowCreateGroupModal(false);
      setNewGroup({ name: '', description: '' });
      fetchGroups();
    } catch (err) {
    } finally {
      setCreatingGroup(false);
    }
  };

  // Q&A posts
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/chat/hub-posts?category=${selectedCategory}`);
      setPosts(response.data);
    } catch (error) {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/chat/hub-posts', newPost);
      setNewPost({ title: '', content: '', category: 'general' });
      setShowPostForm(false);
      fetchPosts();
    } catch (error) {}
  };

  // AI Ask
  const handleAskAI = async (e) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    setAiLoading(true);
    setAiAnswer('');
    try {
      const res = await axios.post('/api/ai/ask', { question: aiQuestion });
      setAiAnswer(res.data.answer || 'No answer received.');
    } catch (err) {
      setAiAnswer('Sorry, there was an error getting an answer.');
    } finally {
      setAiLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'pest-control': 'bg-red-100 text-red-800',
      'soil-health': 'bg-green-100 text-green-800',
      'weather': 'bg-blue-100 text-blue-800',
      'equipment': 'bg-gray-100 text-gray-800',
      'market-advice': 'bg-yellow-100 text-yellow-800',
      'general': 'bg-purple-100 text-purple-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Farmers Hub</h1>
          <p className="text-gray-600">
            Connect with fellow farmers, share experiences, and get peer advice
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('groups')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'groups'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="inline w-4 h-4 mr-2" />
                Groups
              </button>
              <button
                onClick={() => setActiveTab('posts')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'posts'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <MessageSquare className="inline w-4 h-4 mr-2" />
                Q&A Posts
              </button>
              <button
                onClick={() => setActiveTab('ai')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'ai'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Bot className="inline w-4 h-4 mr-2" />
                Ask AI
              </button>
            </nav>
          </div>
        </div>

        {/* Groups Tab */}
        {activeTab === 'groups' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Groups List Sidebar */}
            <div className="lg:col-span-1">
              <div className="card p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Groups</h3>
                  {user?.verificationBadge === 'verified' && (
                    <button
                      onClick={() => setShowCreateGroupModal(true)}
                      className="btn-primary btn-xs flex items-center space-x-1"
                    >
                      <Plus size={16} />
                      <span>Create</span>
                    </button>
                  )}
                </div>
                {groupLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {groups.map((group) => (
                      <li key={group.id}>
                        <button
                          className={`w-full text-left px-3 py-2 rounded ${
                            selectedGroupId === group.id
                              ? 'bg-primary-100 text-primary-700 font-semibold'
                              : 'hover:bg-gray-100 text-gray-800'
                          }`}
                          onClick={() => setSelectedGroupId(group.id)}
                        >
                          <span className="flex items-center">
                            <Users size={16} className="mr-2" />
                            {group.name}
                          </span>
                          <div className="text-xs text-gray-500 truncate">{group.description}</div>
                        </button>
                      </li>
                    ))}
                    {groups.length === 0 && (
                      <li className="text-gray-500 text-sm text-center py-4">No groups yet.</li>
                    )}
                  </ul>
                )}
              </div>
              <div className="card p-4 mt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Community Guidelines</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Be respectful to all members</li>
                  <li>• Share helpful farming tips</li>
                  <li>• Ask questions freely</li>
                  <li>• No spam or promotional content</li>
                  <li>• Help fellow farmers succeed</li>
                </ul>
              </div>
            </div>
            {/* Group Chat */}
            <div className="lg:col-span-3">
              <div className="card h-full flex flex-col">
                <div className="flex items-center justify-between border-b px-4 py-3">
                  <div className="font-semibold text-lg text-gray-900">
                    {groups.find(g => g.id === selectedGroupId)?.name || 'Select a group'}
                  </div>
                </div>
                <div className="flex-1 h-96 overflow-y-auto p-4 space-y-4">
                  {selectedGroupId ? (
                    groupMessages.length > 0 ? (
                      groupMessages.map((message, index) => (
                        <div key={index} className="flex space-x-3">
                          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-primary-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-gray-900">
                                {message.sender_name}
                              </span>
                              {message.is_verified && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 48 48">
                                    <polygon fill="#42a5f5" points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"></polygon>
                                    <polygon fill="#fff" points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"></polygon>
                                  </svg>
                                </span>
                              )}
                              <span className="text-xs text-gray-500">
                                {new Date(message.created_at).toLocaleTimeString()}
                              </span>
                            </div>
                            <p className="text-gray-700">{message.content}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500 text-center py-8">No messages yet in this group.</div>
                    )
                  ) : (
                    <div className="text-gray-500 text-center py-8">Select a group to start chatting.</div>
                  )}
                </div>
                {/* Message Input */}
                {selectedGroupId && (
                  <div className="border-t p-4">
                    <form onSubmit={handleSendGroupMessage} className="flex space-x-2">
                      <input
                        type="text"
                        value={newGroupMessage}
                        onChange={(e) => setNewGroupMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 input-field"
                      />
                      <button type="submit" className="btn-primary px-4">
                        <Send size={18} />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div>
            {/* Post Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => setShowPostForm(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus size={18} />
                <span>Ask Question</span>
              </button>
            </div>
            {/* Posts List */}
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <div key={post.id} className="card p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`badge ${getCategoryColor(post.category)}`}>
                            {post.category.replace('-', ' ')}
                          </span>
                          {post.is_solved && (
                            <span className="badge badge-success">
                              <CheckCircle size={12} className="mr-1" />
                              Solved
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-700 mb-4">{post.content}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User size={16} />
                          <span>{post.farmer_name}</span>
                          {post.is_verified && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 48 48">
                                <polygon fill="#42a5f5" points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884"></polygon>
                                <polygon fill="#fff" points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926"></polygon>
                              </svg>
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={16} />
                          <span>{new Date(post.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <ThumbsUp size={16} />
                          <span>{post.likes_count}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare size={16} />
                          <span>{post.replies_count} replies</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {posts.length === 0 && (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No posts yet
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Be the first to ask a question or share your farming experience!
                    </p>
                    <button
                      onClick={() => setShowPostForm(true)}
                      className="btn-primary"
                    >
                      Create First Post
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Ask AI Tab */}
        {activeTab === 'ai' && (
          <div className="max-w-2xl mx-auto card p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <Bot className="w-6 h-6 mr-2" />
              Ask AI about Farm Practices
            </h2>
            <form onSubmit={handleAskAI} className="space-y-4">
              <textarea
                rows={3}
                className="input-field w-full"
                placeholder="Ask about farm practices, crop care, pest control, etc..."
                value={aiQuestion}
                onChange={e => setAiQuestion(e.target.value)}
                required
              />
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="btn-primary flex-1"
                  disabled={aiLoading}
                >
                  {aiLoading ? 'Asking...' : 'Ask AI'}
                </button>
                <button
                  type="button"
                  className="btn-outline flex-1"
                  onClick={() => {
                    setAiQuestion('');
                    setAiAnswer('');
                  }}
                >
                  Clear
                </button>
              </div>
            </form>
            {aiAnswer && (
              <div className="mt-6 bg-gray-50 border rounded p-4">
                <div className="font-semibold text-gray-700 mb-2">AI Answer:</div>
                <div className="text-gray-800 whitespace-pre-line">{aiAnswer}</div>
              </div>
            )}
          </div>
        )}

        {/* Create Post Modal */}
        {showPostForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Ask a Question
              </h3>
              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                    className="input-field"
                  >
                    {categories.slice(1).map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPost.title}
                    onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                    className="input-field"
                    placeholder="What's your question or topic?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={newPost.content}
                    onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                    className="input-field"
                    placeholder="Describe your question or share your experience in detail..."
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowPostForm(false)}
                    className="btn-outline flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1"
                  >
                    Post Question
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Create Group Modal */}
        {showCreateGroupModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Create New Group
              </h3>
              <form onSubmit={handleCreateGroup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Group Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newGroup.name}
                    onChange={e => setNewGroup(prev => ({ ...prev, name: e.target.value }))}
                    className="input-field"
                    placeholder="Enter group name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={newGroup.description}
                    onChange={e => setNewGroup(prev => ({ ...prev, description: e.target.value }))}
                    className="input-field"
                    placeholder="Describe the group (optional)"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateGroupModal(false)}
                    className="btn-outline flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1"
                    disabled={creatingGroup}
                  >
                    {creatingGroup ? 'Creating...' : 'Create Group'}
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

export default FarmersHub;