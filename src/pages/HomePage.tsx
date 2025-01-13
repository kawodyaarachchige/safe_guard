import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, MapPin, Bell, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-purple-800 mb-4">
          Your Safety is Our Priority
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Stay connected, protected, and empowered with our comprehensive women's safety platform.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Emergency Alert</h3>
          <p className="text-gray-600">Quick access to emergency services with just one tap.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <MapPin className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Live Location</h3>
          <p className="text-gray-600">Share your real-time location with trusted contacts.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Bell className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Incident Reporting</h3>
          <p className="text-gray-600">Report and track safety incidents in your area.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Trusted Network</h3>
          <p className="text-gray-600">Connect with trusted contacts for immediate support.</p>
        </div>
      </section>

      <section className="text-center">
        <Link
          to="/signup"
          className="inline-block bg-purple-600 text-white py-3 px-8 rounded-md hover:bg-purple-700 transition-colors duration-200"
        >
          Get Started Now
        </Link>
      </section>
    </div>
  );
}