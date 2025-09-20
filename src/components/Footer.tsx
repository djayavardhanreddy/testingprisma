import React from 'react';
import { Heart, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-full">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">MediCare Hospital</span>
            </div>
            <p className="text-gray-400 mb-4">
              Providing exceptional healthcare services with compassion, innovation, and excellence. 
              Your health and wellbeing are our top priorities.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">info@medicare.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-gray-400">123 Medical Center Dr, Healthcare City</span>
              </div>
            </div>
          </div>

          {/* Emergency */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Emergency</h3>
            <div className="bg-red-600 p-4 rounded-lg">
              <p className="text-white font-bold text-xl">911</p>
              <p className="text-red-100 text-sm">24/7 Emergency Care</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 MediCare Hospital. All rights reserved. | Providing quality healthcare since 1985.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;