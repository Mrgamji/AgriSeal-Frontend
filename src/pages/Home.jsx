import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Sprout,
  Users,
  Shield,
  MessageCircle,
  TrendingUp,
  Award
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <Sprout className="w-8 h-8 text-green-600" />,
      title: "Smart Marketplace",
      description: "Connect farmers, buyers, researchers & service providers in one trusted digital ecosystem."
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Farmer-Centered Network",
      description: "Access expert support, trainings, and collaborate with Nigeria’s fastest-growing agri-community."
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Trust & Verification",
      description: "All listings and profiles are verified, ensuring quality, safety, and professionalism across the board."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      title: "Data-Driven Insights",
      description: "Get real-time analytics on market trends, fertilizer efficiency, and buyer behavior."
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-green-600" />,
      title: "Seamless Communication",
      description: "Message, negotiate, and plan deliveries right inside the platform—no middlemen, no hassle."
    },
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: "Biohacked Seeds Project",
      description: "Our innovative seed solution reduces fertilizer use by up to 50%, improving yields sustainably."
    }
  ];

  const categories = [
    { name: "Crops & Produce", image: "/images/harvest.jpeg", count: "120+" },
    { name: "Seeds & Biotech", image: "/images/plant.jpeg", count: "80+" },
    { name: "Farm Equipment", image: "/images/tool.jpeg", count: "60+" },
    { name: "Land & Lease", image: "/images/farmland.jpeg", count: "25+" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-900 text-white py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Revolutionizing Agriculture in Nigeria
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            From biohacked seeds that cut fertilizer use by 50% to a full-featured marketplace,
            AgriSeal empowers every stakeholder—from farm to market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <>
                <Link to="/register" className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                  Join AgriSeal
                </Link>
                <Link to="/listings" className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition">
                  Browse Listings
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                  Go to Dashboard
                </Link>
                <Link to="/farmers-hub" className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition">
                  Farmers Hub
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Makes AgriSeal Different?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We’re more than a platform — we’re a movement to digitally transform Nigeria’s agricultural landscape.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-6 text-center shadow hover:shadow-md transition">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Explore Agricultural Categories</h2>
            <p className="text-lg text-gray-600">Buy, lease, or list across Nigeria’s most trusted agri segments</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <Link key={i} to="/listings" className="relative group overflow-hidden rounded-xl shadow hover:shadow-lg transition">
                <img src={cat.image} alt={cat.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition" />
                <div className="absolute bottom-0 p-5 text-white">
                  <h3 className="text-xl font-bold">{cat.name}</h3>
                  <p className="opacity-90">{cat.count} listings</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-700">
        <div className="max-w-5xl mx-auto text-center text-white px-4">
          <h2 className="text-4xl font-bold mb-4">Be Part of Nigeria’s Agricultural Future</h2>
          <p className="text-lg opacity-90 mb-6">
            Whether you're a farmer, biotech innovator, or trader, AgriSeal gives you the tools to scale sustainably.
          </p>
          {!user && (
            <Link to="/register" className="bg-white text-green-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition">
              Get Started with AgriSeal
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
