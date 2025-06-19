import React from 'react';
import { Link } from 'react-router-dom';
import { Play, ArrowRight } from 'lucide-react';

const GalleryPage = () => {
  const galleryItems = [
    {
      type: 'image',
      src: '/images/commissionerict.jpg',
      caption: 'Our CEO with Hon. Commissioner, Ministry of Science, Technology and Innovation, Kano State',
      category: 'Research & Development'
    },
    {
      type: 'image',
      src: '/images/expo.jpg',
      caption: 'AgriSeal team displaying their products at DSC Exhibition, 2025',
      category: 'Field Trials'
    },
    {
      type: 'image',
      src: 'images/nitda.jpg',
      caption: 'AgriSeal Team with Zonal Coordinator, NITDA and Director of Operations',
      category: 'Community Outreach'
    },
    {
      type: 'image',
      src: '/images/ceopresent.jpg',
      caption: 'AgriSeal\'s CEO receives Digital Skills for Entreprenuers Certificate from Hon. Commissioner, Ministry of Rural and Community Development, Kano State',
      category: 'Results'
    },
    {
      type: 'image',
      src: '/gallery/team-meeting.jpg',
      caption: 'Our interdisciplinary team discussing new formulations',
      category: 'Team'
    },
    {
      type: 'image',
      src: '/gallery/conference.jpg',
      caption: 'Presenting our findings at the African Agri-Tech Summit',
      category: 'Events'
    },
    {
      type: 'image',
      src: '/gallery/seed-packaging.jpg',
      caption: 'Quality control in our seed packaging facility',
      category: 'Production'
    },
    {
      type: 'image',
      src: '/gallery/soil-testing.jpg',
      caption: 'Conducting soil analysis for customized treatments',
      category: 'Research & Development'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Video Hero Section */}
      <section className="relative bg-black">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 z-10"></div>
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-[70vh] object-cover opacity-90"
        >
          <source src="/videos/intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute bottom-0 left-0 z-20 p-8 md:p-12 w-full">
          <div className="max-w-6xl mx-auto">
            <button className="mb-6 flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-white/30 transition">
              <Play size={18} /> Watch Our Story
            </button>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              AgriSeal <span className="text-green-300">in Action</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Explore our journey through research labs, farm fields, and community impact across Nigeria
            </p>
          </div>
        </div>
      </section>

    

      {/* Gallery Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryItems.map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={item.src} 
                    alt={item.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="p-4 absolute bottom-0 left-0 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <span className="inline-block px-2 py-1 bg-green-600 text-white text-xs font-medium rounded mb-1">
                    {item.category}
                  </span>
                  <p className="text-white font-medium">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-12 text-center">
            <button className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition">
              Load More <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-green-800">
        <div className="max-w-4xl mx-auto text-center text-white px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want to See Our Work <span className="text-yellow-300">Firsthand?</span>
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Schedule a visit to our research facilities or demonstration farms
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Book a Tour
            </Link>
            <Link to="/research" className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition">
              Research Publications
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;