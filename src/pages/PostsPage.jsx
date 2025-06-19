import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Filter, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Award,
  Seedling,
  Users,
  BookOpen
} from 'lucide-react';

const PostsPage = () => {
  // Sample posts data
  const allPosts = [
    {
      id: 1,
      title: "AgriSeal Shines at AgricTech Expo 2024",
      date: "2024-03-15",
      category: "Events",
      excerpt: "We showcased our biohacked seeds to over 5,000 visitors at the Affluent Event Center, receiving the 'Most Innovative Agri-Solution' award.",
      image: "/posts/expo-2024.jpg",
      content: "Our team demonstrated how seed biohacking can reduce fertilizer use by 50%... [full content]",
      highlights: ["500+ farmer consultations", "15 partnership leads", "Media coverage in 3 outlets"]
    },
    {
      id: 2,
      title: "New Partnership with Kano State Extension Services",
      date: "2024-02-28",
      category: "Partnerships",
      excerpt: "AgriSeal will train 200 extension agents on biohacked seed technology across 12 LGAs.",
      image: "/posts/kano-partnership.jpg"
    },
    {
      id: 3,
      title: "Farmers Report 45% Fertilizer Savings",
      date: "2024-02-10",
      category: "Results",
      excerpt: "First cohort of 1,200 farmers using our seeds show significant cost reductions.",
      image: "/posts/harvest-results.jpg"
    },
    {
      id: 4,
      title: "Mobile Learning App Launch",
      date: "2024-01-22",
      category: "Product",
      excerpt: "Our new app brings agricultural training to rural farmers in Hausa language.",
      image: "/posts/app-launch.jpg"
    }
  ];

  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  // Filter posts
  const filteredPosts = activeFilter === "All" 
    ? allPosts 
    : allPosts.filter(post => post.category === activeFilter);

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Categories for filter
  const categories = ["All", "Events", "Partnerships", "Results", "Product"];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Latest Post */}
      <section className="relative bg-gradient-to-r from-green-800 to-green-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 text-sm font-medium mb-4">
                <Calendar className="mr-2 w-4 h-4" /> 
                {new Date(allPosts[0].date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{allPosts[0].title}</h1>
              <p className="text-xl mb-6 opacity-90">{allPosts[0].excerpt}</p>
              <div className="flex flex-wrap gap-3 mb-8">
                {allPosts[0].highlights?.map((item, i) => (
                  <span key={i} className="flex items-center bg-white/10 px-3 py-1 rounded-full text-sm">
                    <CheckCircle className="mr-1 w-4 h-4" /> {item}
                  </span>
                ))}
              </div>
              <Link 
                to={`/posts/${allPosts[0].id}`}
                className="inline-flex items-center bg-white text-green-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
              >
                Read Full Story <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src={allPosts[0].image} 
                alt={allPosts[0].title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid with Filter */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filter Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <h2 className="text-3xl font-bold text-gray-900">Latest Updates</h2>
            <div className="flex items-center gap-2 bg-white p-1 rounded-full border">
              <Filter className="ml-2 text-gray-500 w-5 h-5" />
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveFilter(category);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 text-sm rounded-full transition ${activeFilter === category ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentPosts.slice(1).map(post => (
              <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <Calendar className="mr-1 w-4 h-4" />
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Link 
                    to={`/posts/${post.id}`}
                    className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition"
                  >
                    Read more <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full bg-white border disabled:opacity-50 hover:bg-gray-50 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-full ${currentPage === i + 1 ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full bg-white border disabled:opacity-50 hover:bg-gray-50 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-green-800">
        <div className="max-w-4xl mx-auto text-center text-white px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated with AgriSeal</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest news, events, and agricultural innovations
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <button className="bg-yellow-400 hover:bg-yellow-300 text-green-900 px-6 py-3 rounded-lg font-semibold transition whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostsPage;