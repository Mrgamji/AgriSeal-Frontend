import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Linkedin, MapPin, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <img src='/images/agriseallogo.png'></img>
              </div>
              <span className="text-xl font-bold">AgriSeal</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Connecting farmers, buyers, and suppliers in a comprehensive agricultural marketplace. 
              Building sustainable farming communities through technology and collaboration.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1Lmtq9BvTc/" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.linkedin.com/company/agriseal-ltd/" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://www.instagram.com/agriseal_ltd?igsh=MXBoeGptYzZvem01NA==" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/listings" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Browse Listings
                </Link>
              </li>
              <li>
                <Link to="/farmers-hub" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Farmers Hub
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Join as Farmer
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-primary-400 transition-colors">
                  Join as Buyer
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-primary-400" />
                <span className="text-gray-400">contact@agriseal.com.ng</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-primary-400" />
                <span className="text-gray-400">+234 8038624730</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin size={16} className="text-primary-400" />
                <span className="text-gray-400">Kano State, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 AgriSeal. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;