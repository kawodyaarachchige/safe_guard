import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MapPin, Bell, Users } from 'lucide-react';

export default function HomePage() {
  return (
      <div className="space-y-12 bg-gray-100 min-h-screen py-12">
        {/* Hero Section */}
        <section className="text-center bg-gradient-to-r from-teal-500 via-blue-600 to-teal-500 text-white py-16">
          <h1 className="text-4xl font-extrabold mb-4">SafeGuard App</h1>
          <p className="text-lg max-w-2xl mx-auto font-medium">
            Your safety is our mission. Empowering women with tools to stay secure and connected, anytime and anywhere.
          </p>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-16">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center border-t-4 border-teal-500">
            <Shield className="h-12 w-12 text-teal-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Emergency Alert</h3>
            <p className="text-gray-600">Access emergency help instantly with just a tap.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center border-t-4 border-blue-500">
            <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Live Location Sharing</h3>
            <p className="text-gray-600">Let your trusted network track your live location.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center border-t-4 border-yellow-500">
            <Bell className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Incident Reporting</h3>
            <p className="text-gray-600">Report incidents and help create a safer community.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center border-t-4 border-indigo-500">
            <Users className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-800 mb-2">Trusted Network</h3>
            <p className="text-gray-600">Stay connected with your trusted safety contacts.</p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <h2 className="text-2xl font-bold mb-6">Ready to Take Charge of Your Safety?</h2>
          <Link
              to="/signup"
              className="inline-block bg-yellow-400 text-gray-800 font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-yellow-500 transition-all"
          >
            Get Started Now
          </Link>
        </section>
      </div>
  );
}
