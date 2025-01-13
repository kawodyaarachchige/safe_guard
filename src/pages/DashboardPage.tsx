import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {Shield, MapPin, Bell, Users} from 'lucide-react';
import SafetyAlerts from '../components/SafetyAlerts';
import SafetyTips from '../components/SafetyTips';
import SafeRouteMap from '../components/SafeRouteMap';
import FakeCaller from '../components/FakeCaller';

export default function DashboardPage() {
    const {user} = useSelector((state: RootState) => state.user);
    const {incidents} = useSelector((state: RootState) => state.incidents);
    const {isTracking} = useSelector((state: RootState) => state.location);

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-teal-200 via-blue-200 to-teal-400 text-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-semibold  mb-4">
                    Welcome back, {user?.name}!
                </h1>
                <p className="text-gray-700">
                    Stay safe and connected with your trusted network.
                </p>
            </div>
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-16">
                <div className="bg-white p-6 rounded-lg shadow-lg text-center border-t-4 border-teal-500">
                    <Shield className="h-12 w-12 text-teal-500 mx-auto mb-4"/>
                    <h3 className="text-xl font-semibold text-blue-800 mb-2">Safety Status</h3>
                    <p className="text-gray-600">Active and Protected</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center border-t-4 border-blue-500">
                    <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-4"/>
                    <h3 className="text-xl font-semibold text-blue-800 mb-2">Location Tracking</h3>
                    <p className="text-gray-600">
                        {isTracking ? 'Active' : 'Inactive'}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center border-t-4 border-yellow-500">
                    <Bell className="h-12 w-12 text-yellow-500 mx-auto mb-4"/>
                    <h3 className="text-xl font-semibold text-blue-800 mb-2">Recent Incidents</h3>
                    <p className="text-gray-600">{incidents.length} Reports</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center border-t-4 border-indigo-500">
                    <Users className="h-12 w-12 text-indigo-500 mx-auto mb-4"/>
                    <h3 className="text-xl font-semibold text-blue-800 mb-2">Trusted Contacts</h3>
                    <p className="text-gray-600">3 Active</p>
                </div>
            </div>

            {/* Safety Alerts and Tips Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SafetyAlerts/>
                <SafetyTips/>
            </div>

            {/* Safe Route Map and Fake Caller Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SafeRouteMap/>
                <FakeCaller/>
            </div>
        </div>
    );
}
