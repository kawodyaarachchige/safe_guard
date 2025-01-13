import React from 'react';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
      <footer className="bg-gradient-to-r from-teal-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* SafeGuard Branding */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-yellow-400" />
                <span className="text-lg font-extrabold tracking-wide">SafeGuard</span>
              </div>
              <p className="text-gray-200">
                Empowering women with safety tools and community support.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-yellow-400 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-200">
                <li className="hover:text-yellow-400 transition-colors">About Us</li>
                <li className="hover:text-yellow-400 transition-colors">Safety Tips</li>
                <li className="hover:text-yellow-400 transition-colors">Community</li>
                <li className="hover:text-yellow-400 transition-colors">Support</li>
              </ul>
            </div>

            {/* Emergency Contacts */}
            <div>
              <h3 className="font-semibold text-yellow-400 mb-4">Emergency</h3>
              <ul className="space-y-2 text-gray-200">
                <li className="flex items-center space-x-2 hover:text-yellow-400 transition-colors">
                  <Phone className="h-4 w-4" />
                  <span>Emergency: 911</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-yellow-400 transition-colors">
                  <Phone className="h-4 w-4" />
                  <span>Helpline: 1-800-SAFE</span>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="font-semibold text-yellow-400 mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-200">
                <li className="flex items-center space-x-2 hover:text-yellow-400 transition-colors">
                  <Mail className="h-4 w-4" />
                  <span>support@safeguard.com</span>
                </li>
                <li className="flex items-center space-x-2 hover:text-yellow-400 transition-colors">
                  <MapPin className="h-4 w-4" />
                  <span>123 Safety Street, Secure City</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-500 mt-8 pt-8 text-center text-gray-200">
            <p>&copy; {new Date().getFullYear()} SafeGuard. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
}
