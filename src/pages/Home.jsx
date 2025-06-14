import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Sprout, Users, Shield, MessageCircle, TrendingUp, Award } from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <Sprout className="w-8 h-8 text-primary-600" />,
      title: "Agricultural Marketplace",
      description: "Buy and sell/hire crops, seeds, land, tools, and agricultural supplies in one comprehensive platform."
    },
    {
      icon: <Users className="w-8 h-8 text-primary-600" />,
      title: "Farmers Community",
      description: "Connect with fellow farmers, share experiences, and get peer advice on farming challenges."
    },
    {
      icon: <Shield className="w-8 h-8 text-primary-600" />,
      title: "Verified Sellers",
      description: "Trust verified farmers and suppliers with our comprehensive verification system and badges."
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-primary-600" />,
      title: "Real-time Communication",
      description: "Chat directly with buyers and sellers, negotiate prices, and coordinate deliveries."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary-600" />,
      title: "Market Insights",
      description: "Get insights into market trends, pricing, and demand to make informed decisions."
    },
    {
      icon: <Award className="w-8 h-8 text-primary-600" />,
      title: "Quality Assurance",
      description: "Admin-approved listings ensure quality and authenticity of products and services."
    }
  ];

  const categories = [
    { name: "Fresh Crops", image: "/images/harvest.jpeg", count: "50+" },
    { name: "Seeds & Plants", image: "/images/plant.jpeg", count: "100+" },
    { name: "Farm Equipment", image: "/images/tool.jpeg", count: "40+" },
    { name: "Farmland Rental", image: "/images/farmland.jpeg", count: "15+" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
           
              Connect. Trade. Grow.
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              The ultimate agricultural marketplace connecting farmers, buyers, and suppliers 
              with a thriving community platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user ? (
                <>
                  <Link to="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Join AgriSeal
                  </Link>
                  <Link to="/listings" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                    Browse Listings
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Go to Dashboard
                  </Link>
                  <Link to="/farmers-hub" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                    Farmers Hub
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose AgriSeal?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive platform designed specifically for the agricultural community in Nigeria
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-6 text-center hover:scale-105 transition-transform duration-200">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Categories
            </h2>
            <p className="text-xl text-gray-600">
              Find everything you need for your agricultural business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to="/listings"
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-w-4 aspect-h-3">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl font-semibold mb-1">
                    {category.name}
                  </h3>
                  <p className="text-white opacity-90">
                    {category.count} listings
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Agricultural Business?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers, buyers, and suppliers who are already growing their business with AgriSeal.
          </p>
          {!user && (
            <Link to="/register" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              Get Started Today
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;