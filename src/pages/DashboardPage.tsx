import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Shield, MapPin, Bell, Users } from 'lucide-react';
import SafetyAlerts from '../components/SafetyAlerts';
import SafetyTips from '../components/SafetyTips';
import SafeRouteMap from '../components/SafeRouteMap';
import FakeCaller from '../components/FakeCaller';

export default function DashboardPage() {
  const { user } = useSelector((state: RootState) => state.user);
  const { incidents } = useSelector((state: RootState) => state.incidents);
  const { isTracking } = useSelector((state: RootState) => state.location);

  return (
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-purple-800 mb-4">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Stay safe and connected with your trusted network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-purple-50 p-6 rounded-lg">
            <Shield className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-semibold">Safety Status</h3>
            <p className="text-sm text-gray-600">Active and Protected</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <MapPin className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-semibold">Location Tracking</h3>
            <p className="text-sm text-gray-600">
              {isTracking ? 'Active' : 'Inactive'}
            </p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <Bell className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-semibold">Recent Incidents</h3>
            <p className="text-sm text-gray-600">{incidents.length} Reports</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <Users className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-semibold">Trusted Contacts</h3>
            <p className="text-sm text-gray-600">3 Active</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SafetyAlerts />
          <SafetyTips />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SafeRouteMap />
          <FakeCaller />
        </div>
      </div>
  );
}