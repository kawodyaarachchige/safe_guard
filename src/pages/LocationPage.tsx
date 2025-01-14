import React from 'react';
import LiveLocation from '../components/LiveLocation';


export default function LocationPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-purple-800">Location Tracking</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <LiveLocation />
      </div>
    </div>
  );
}