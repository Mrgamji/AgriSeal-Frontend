import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Sprout,
  Dna,
  FlaskConical,
  Leaf,
  Shield,
  MessageCircle,
  TrendingUp,
  Award,
  Users,
  Calendar
} from 'lucide-react';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <Dna className="w-8 h-8 text-green-600" />,
      title: "Biohacked Seed Technology",
      description: "Our patented seed treatment alters plant metabolism to increase nutrient absorption efficiency by 40-50%"
    },
    {
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      title: "Reduced Fertilizer Dependency",
      description: "Field tests show our seeds require 50% less NPK fertilizers while maintaining optimal yields"
    },
    {
      icon: <FlaskConical className="w-8 h-8 text-green-600" />,
      title: "Biotech Collaboration",
      description: "Developed in partnership with Bayero University's biochemistry and biotechnology departments"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-600" />,
      title: "Data-Driven Agriculture",
      description: "Machine learning models optimize seed treatments for specific soil conditions across Nigeria"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Certified Organic",
      description: "All biohacking methods comply with international organic farming standards"
    },
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: "2024 Agri-Innovation Award",
      description: "Recognized by FAO for sustainable agricultural innovation in West Africa"
    }
  ];

  const milestones = [
    { year: "2023 Q1", event: "Concept developed by computer science student", icon: <Calendar /> },
    { year: "2023 Q2", event: "Biotech team formed at BUK", icon: <Users /> },
    { year: "2023 Q4", event: "First successful maize seed treatment", icon: <Sprout /> },
    { year: "2024 Q1", event: "Pilot farms established in 3 states", icon: <Award /> }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-800 to-green-600 text-white py-24 relative overflow-hidden">
        {/* Subtle farm pattern background */}
        <div className="absolute inset-0 bg-[url('/images/farm-pattern.png')] opacity-10"></div>
        {/* Blurry picture background from the right */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-2/3 md:w-1/2 z-0"
          aria-hidden="true"
        >
          <img
            src="/images/tool.jpeg"
            alt=""
            className="object-cover h-full w-full blur-2xl opacity-40"
            style={{
              objectPosition: 'right center',
              filter: 'blur(1px)',
              mixBlendMode: 'lighten'
            }}
          />
        </div>
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          <div className="mb-2 flex justify-center">
            <span className="bg-green-700 text-xs font-semibold px-3 py-1 rounded-full">
              INNOVATION SINCE 2023
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-100">
              Biohacked Seeds
            </span> Revolutionizing African Agriculture
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            AgriSeal's breakthrough seed technology reduces fertilizer needs by 50% while increasing yields, born from an unlikely collaboration between computer science and biochemistry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/projects" className="bg-yellow-400 text-green-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition flex items-center gap-2">
              <FlaskConical size={18} /> Our Projects
            </Link>
            <Link to="/gallery" className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2">
              <Award size={18} /> View Gallery
            </Link>
            <Link to="/blog" className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition flex items-center gap-2">
              <MessageCircle size={18} /> View Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                The <span className="text-green-600">Unlikely</span> Origin Story
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                In early 2023, a computer science student fascinated by agricultural technology met with two brilliant researchers from Bayero University's biochemistry and biotechnology departments.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Combining computational modeling with cutting-edge plant biochemistry, they developed a novel seed treatment protocol that alters metabolic pathways to enhance nutrient uptake efficiency.
              </p>
              <div className="bg-green-50 border-l-4 border-green-600 p-4">
                <p className="italic text-green-800">
                  "Our approach doesn't modify plant DNA - we 'train' seeds to utilize existing nutrients more efficiently through precisely timed biochemical triggers."
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg">
              <img 
                src="/images/team-lab.jpg" 
                alt="AgriSeal founding team in lab" 
                className="w-full h-auto object-cover"
              />
              <div className="p-4 text-sm text-gray-600">
                The founding team testing first seed treatment prototypes at BUK's biotechnology lab
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Our <span className="text-green-600">Biohacking</span> Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Combining biotechnology with computational agriculture for sustainable solutions
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition border border-gray-100">
                <div className="flex justify-center mb-4">
                  <div className="bg-green-100 p-3 rounded-full">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Our <span className="text-green-600">Journey</span> So Far
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 h-full w-0.5 bg-green-200 transform -translate-x-1/2"></div>
            
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                className={`relative mb-8 ${index % 2 === 0 ? 'pr-8 pl-16' : 'pl-8 pr-16'} ${index === milestones.length - 1 ? 'mb-0' : ''}`}
              >
                <div className={`absolute top-0 w-6 h-6 rounded-full bg-green-600 border-4 border-white ${index % 2 === 0 ? 'right-0 transform translate-x-1/2' : 'left-0 transform -translate-x-1/2'}`}></div>
                <div className={`p-6 rounded-lg shadow-md ${index % 2 === 0 ? 'bg-green-50 text-right' : 'bg-gray-50 text-left'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {milestone.icon}
                    <span className="font-bold text-green-700">{milestone.year}</span>
                  </div>
                  <p className="text-gray-800">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-700 to-green-800">
        <div className="max-w-5xl mx-auto text-center text-white px-4">
          <h2 className="text-4xl font-bold mb-6">
            Join the <span className="text-yellow-300">Agricultural Revolution</span>
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Whether you're a farmer, researcher, or investor, help us scale this innovation across Africa's agricultural landscape.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/technology" className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Learn About Our Technology
            </Link>
            <Link to="/contact" className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition">
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;