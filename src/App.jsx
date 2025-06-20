import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Listings from './pages/Listings';
import ListingDetail from './pages/ListingDetail';
import ViewListings from './pages/ViewListings';
import CreateListing from './pages/CreateListing';
import FarmersHub from './pages/FarmersHub';
import Gallery from './pages/Gallery'
import ProjectsPage from './pages/ProjectsPage'
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import TeamPage from './pages/TeamPage';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';
import PostsPage from './pages/PostsPage';


function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/blog" element={<PostsPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/listings" element={<Listings />} />
                <Route path="/listings/:id" element={<ListingDetail />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/create-listing" element={
                  <ProtectedRoute roles={['farmer', 'supplier']}>
                    <CreateListing />
                  </ProtectedRoute>
                } />
                
                <Route path="/farmers-hub" element={
                  <ProtectedRoute>
                    <FarmersHub />
                  </ProtectedRoute>
                } />
                 <Route path="/view-listings" element={
                  <ProtectedRoute roles={['farmer', 'supplier', 'admin']}>
                    <ViewListings />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute roles={['admin']}>
                    <AdminPanel />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;