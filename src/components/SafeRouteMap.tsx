import React, { useState } from 'react';
import { Map, Navigation2 } from 'lucide-react';

export default function SafeRouteMap() {
  const [startPoint, setStartPoint] = useState('');
  const [endPoint, setEndPoint] = useState('');

  const handleFindRoute = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would integrate with a maps API
    alert('This feature would show the safest route between two points, avoiding high-risk areas.');
  };

  return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Map className="h-6 w-6 text-teal-500" />
          <h2 className="text-xl font-semibold text-teal-800">Safe Route Planner</h2>
        </div>

        <form onSubmit={handleFindRoute} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Point</label>
            <input
                type="text"
                value={startPoint}
                onChange={(e) => setStartPoint(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                placeholder="Enter starting location"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
            <input
                type="text"
                value={endPoint}
                onChange={(e) => setEndPoint(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                placeholder="Enter destination"
            />
          </div>

          <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600"
          >
            <Navigation2 className="h-5 w-5" />
            <span>Find Safe Route</span>
          </button>
        </form>

        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-600">
            Safe routes are calculated based on:
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Well-lit streets</li>
              <li>High-traffic areas</li>
              <li>Police station proximity</li>
              <li>Recent incident reports</li>
            </ul>
          </p>
        </div>
      </div>
  );
}
