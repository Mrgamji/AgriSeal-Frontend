import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FlaskConical, 
  Leaf, 
  TrendingUp, 
  BadgeCheck, 
  MonitorPlay,
  Users,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Award,
  Calendar,
  CheckCircle
} from 'lucide-react';

const ProjectsPage = () => {
  const [activeSlide, setActiveSlide] = useState({
    biohacking: 0,
    marketplace: 0,
    lms: 0
  });

  const projects = {
    biohacking: {
      title: "Seed Biohacking Initiative",
      tagline: "Reducing fertilizer dependency through biotechnology",
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      images: [
        '/projects/biohack/seeds.jpg',
        '/projects/seed-treatment.jpg',
        '/projects/field-comparison.jpg',
        '/projects/research-team.jpg'
      ],
      description: [
        "Our flagship project combines computational modeling with plant biochemistry to develop seed treatments that enhance nutrient absorption efficiency. By altering metabolic pathways without genetic modification, we've created seeds that require 50% less fertilizer while maintaining or improving yields.",
        "The treatment protocol involves precisely timed biochemical triggers that 'train' plants to utilize existing soil nutrients more effectively. This innovation is particularly transformative for smallholder farmers who spend 60-70% of their input costs on fertilizers."
      ],
      milestones: [
        { date: "Q1 2023", event: "Concept developed by interdisciplinary team", icon: <Users size={16} /> },
        { date: "Q2 2023", event: "First successful maize seed treatment", icon: <CheckCircle size={16} /> },
        { date: "Q3 2023", event: "Pilot farms established in 3 states", icon: <Award size={16} /> },
        { date: "Q1 2024", event: "50,000+ treated seeds distributed", icon: <TrendingUp size={16} /> },
        { date: "Q2 2024", event: "FAO recognition for sustainable innovation", icon: <Award size={16} /> }
      ],
      stats: [
        { value: "50%", label: "Reduction in fertilizer use" },
        { value: "15-20%", label: "Yield increase" },
        { value: "10K+", label: "Farmers impacted" }
      ]
    },
    marketplace: {
      title: "AgriSeal Marketplace",
      tagline: "Digital ecosystem for agricultural transactions",
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      images: [
        '/projects/marketplace/1.png',
        '/projects/marketplace/2.png',
        '/projects/marketplace/3.png',
        '/projects/marketplace/4.png',
      ],
      description: [
        "A comprehensive platform connecting all agricultural stakeholders: farmers, input suppliers, processors, and buyers. Our verification system ensures trust in every transaction through a tiered badge system (Verified, Premium Verified, and AgriSeal Certified).",
        "Key features include seed booking 6 months in advance, land leasing with contract templates, equipment rental marketplace, and direct produce sales with quality certification. The platform reduces middlemen costs by up to 30% while increasing farmer incomes by 25-40%."
      ],
      milestones: [
        { date: "Q3 2023", event: "MVP launched with basic listings", icon: <Calendar size={16} /> },
        { date: "Q4 2023", event: "Verification system implemented", icon: <BadgeCheck size={16} /> },
        { date: "Q1 2024", event: "10,000+ registered users", icon: <Users size={16} /> },
        { date: "Q2 2024", event: "Mobile app released", icon: <MonitorPlay size={16} /> }
      ],
      stats: [
        { value: "85%", label: "Verified users" },
        { value: "₦250k+", label: "Total transactions" },
        { value: "4.8/5", label: "User rating" }
      ]
    },
    lms: {
      title: "AgriAcademy LMS",
      tagline: "Digital upskilling for rural farmers",
      icon: <BookOpen className="w-8 h-8 text-green-600" />,
      images: [
        '/projects/lms-dashboard.jpg',
        '/projects/farmer-training.jpg',
        '/projects/mobile-learning.jpg',
        '/projects/certification.jpg'
      ],
      description: [
        "Our learning management system delivers agricultural education to farmers' mobile devices, even in low-bandwidth areas. Courses cover modern farming techniques, financial literacy, and climate-smart agriculture, available in 5 local languages.",
        "The platform features interactive video lessons, voice-narrated modules for illiterate farmers, and a certification system recognized by the Federal Ministry of Agriculture. Our unique 'Community Learning Hub' model uses village champions to facilitate group learning."
      ],
      milestones: [
        { date: "Q4 2023", event: "Pilot launched with 3 courses", icon: <Calendar size={16} /> },
        { date: "Q1 2024", event: "10,000 course completions", icon: <CheckCircle size={16} /> },
        { date: "Q2 2024", event: "Partnership with NAERLS", icon: <Award size={16} /> }
      ],
      stats: [
        { value: "25+", label: "Courses available" },
        { value: "78%", label: "Completion rate" },
        { value: "92%", label: "Satisfaction rate" }
      ]
    }
  };

  const navigateSlide = (project, direction) => {
    setActiveSlide(prev => {
      const projectImages = projects[project].images;
      const current = prev[project];
      const next = direction === 'next' 
        ? (current + 1) % projectImages.length 
        : (current - 1 + projectImages.length) % projectImages.length;
      return { ...prev, [project]: next };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AgriSeal <span className="text-yellow-300">Innovation Portfolio</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Three transformative projects redefining agricultural ecosystems in Nigeria through technology and biotechnology
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        {/* Biohacking Project */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-20">
          <div className="md:flex">
            {/* Image Slideshow */}
            <div className="md:w-1/2 relative">
              <div className="relative h-64 md:h-full overflow-hidden">
                <img 
                  src={projects.biohacking.images[activeSlide.biohacking]} 
                  alt={projects.biohacking.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {projects.biohacking.images.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveSlide({...activeSlide, biohacking: index})}
                    className={`w-3 h-3 rounded-full ${activeSlide.biohacking === index ? 'bg-green-600' : 'bg-white/50'}`}
                  />
                ))}
              </div>
              <button 
                onClick={() => navigateSlide('biohacking', 'prev')}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
              >
                <ChevronLeft className="text-green-700" />
              </button>
              <button 
                onClick={() => navigateSlide('biohacking', 'next')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
              >
                <ChevronRight className="text-green-700" />
              </button>
            </div>

            {/* Content */}
            <div className="md:w-1/2 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-2 rounded-full">
                  {projects.biohacking.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {projects.biohacking.title}
                </h2>
              </div>
              <p className="text-green-600 font-medium mb-4">
                {projects.biohacking.tagline}
              </p>

              {projects.biohacking.description.map((paragraph, i) => (
                <p key={i} className="text-gray-600 mb-4">
                  {paragraph}
                </p>
              ))}

              <div className="grid grid-cols-3 gap-4 my-6">
                {projects.biohacking.stats.map((stat, i) => (
                  <div key={i} className="bg-green-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-700">{stat.value}</p>
                    <p className="text-xs text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FlaskConical size={18} /> Project Milestones
                </h3>
                <ul className="space-y-3">
                  {projects.biohacking.milestones.map((milestone, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-0.5">
                        {milestone.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{milestone.event}</p>
                        <p className="text-xs text-gray-500">{milestone.date}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <Link 
                to="/biohacking" 
                className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                Learn More About This Project
              </Link>
            </div>
          </div>
        </div>

        {/* Marketplace Project */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-20">
          <div className="md:flex flex-row-reverse">
            {/* Image Slideshow */}
            <div className="md:w-1/2 relative">
              <div className="relative h-64 md:h-full overflow-hidden">
                <img 
                  src={projects.marketplace.images[activeSlide.marketplace]} 
                  alt={projects.marketplace.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {projects.marketplace.images.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveSlide({...activeSlide, marketplace: index})}
                    className={`w-3 h-3 rounded-full ${activeSlide.marketplace === index ? 'bg-green-600' : 'bg-white/50'}`}
                  />
                ))}
              </div>
              <button 
                onClick={() => navigateSlide('marketplace', 'prev')}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
              >
                <ChevronLeft className="text-green-700" />
              </button>
              <button 
                onClick={() => navigateSlide('marketplace', 'next')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
              >
                <ChevronRight className="text-green-700" />
              </button>
            </div>

            {/* Content */}
            <div className="md:w-1/2 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-2 rounded-full">
                  {projects.marketplace.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {projects.marketplace.title}
                </h2>
              </div>
              <p className="text-green-600 font-medium mb-4">
                {projects.marketplace.tagline}
              </p>

              {projects.marketplace.description.map((paragraph, i) => (
                <p key={i} className="text-gray-600 mb-4">
                  {paragraph}
              </p>
              ))}

              <div className="grid grid-cols-3 gap-4 my-6">
                {projects.marketplace.stats.map((stat, i) => (
                  <div key={i} className="bg-green-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-700">{stat.value}</p>
                    <p className="text-xs text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp size={18} /> Project Milestones
                </h3>
                <ul className="space-y-3">
                  {projects.marketplace.milestones.map((milestone, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-0.5">
                        {milestone.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{milestone.event}</p>
                        <p className="text-xs text-gray-500">{milestone.date}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <Link 
                to="/marketplace" 
                className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                Explore Marketplace
              </Link>
            </div>
          </div>
        </div>

        {/* LMS Project */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Image Slideshow */}
            <div className="md:w-1/2 relative">
              <div className="relative h-64 md:h-full overflow-hidden">
                <img 
                  src={projects.lms.images[activeSlide.lms]} 
                  alt={projects.lms.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {projects.lms.images.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setActiveSlide({...activeSlide, lms: index})}
                    className={`w-3 h-3 rounded-full ${activeSlide.lms === index ? 'bg-green-600' : 'bg-white/50'}`}
                  />
                ))}
              </div>
              <button 
                onClick={() => navigateSlide('lms', 'prev')}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
              >
                <ChevronLeft className="text-green-700" />
              </button>
              <button 
                onClick={() => navigateSlide('lms', 'next')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow"
              >
                <ChevronRight className="text-green-700" />
              </button>
            </div>

            {/* Content */}
            <div className="md:w-1/2 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-2 rounded-full">
                  {projects.lms.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {projects.lms.title}
                </h2>
              </div>
              <p className="text-green-600 font-medium mb-4">
                {projects.lms.tagline}
              </p>

              {projects.lms.description.map((paragraph, i) => (
                <p key={i} className="text-gray-600 mb-4">
                  {paragraph}
                </p>
              ))}

              <div className="grid grid-cols-3 gap-4 my-6">
                {projects.lms.stats.map((stat, i) => (
                  <div key={i} className="bg-green-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-700">{stat.value}</p>
                    <p className="text-xs text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <BookOpen size={18} /> Project Milestones
                </h3>
                <ul className="space-y-3">
                  {projects.lms.milestones.map((milestone, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-0.5">
                        {milestone.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{milestone.event}</p>
                        <p className="text-xs text-gray-500">{milestone.date}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <Link 
                to="/agriacademy" 
                className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                View Course Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-700 to-green-800">
        <div className="max-w-4xl mx-auto text-center text-white px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Want to <span className="text-yellow-300">Collaborate</span> on These Projects?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            We're seeking partners, investors, and research collaborators to scale these innovations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Partner With Us
            </Link>
            <Link to="/invest" className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition">
              Investment Opportunities
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;