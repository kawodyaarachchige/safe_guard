import React from 'react';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-purple-600" />
              <span className="text-lg font-bold text-purple-800">SafeGuard</span>
            </div>
            <p className="text-gray-600">
              Empowering women with safety tools and community support.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-600">
              <li>About Us</li>
              <li>Safety Tips</li>
              <li>Community</li>
              <li>Support</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Emergency</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Emergency: 911</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Helpline: 1-800-SAFE</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@safeguard.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Safety Street, Secure City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} SafeGuard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}