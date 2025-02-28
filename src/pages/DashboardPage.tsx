import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Shield, MapPin, Bell, Users } from 'lucide-react';
import SafetyAlerts from '../components/SafetyAlerts';
import SafetyTips from '../components/SafetyTips';
import SafeRouteMap from '../components/SafeRouteMap';
import FakeCaller from '../components/FakeCaller';
import IncidentNotifications from '../components/IncidentNotifications';
import VoiceActivatedSOS from "../components/VoiceActivatedSOS.tsx";


export default function DashboardPage() {
    const { user } = useSelector((state: RootState) => state.user);
    const { incidents } = useSelector((state: RootState) => state.incidents);
    const { isTracking } = useSelector((state: RootState) => state.location);
    const { contacts } = useSelector((state: RootState) => state.contacts);
    const favoriteContacts = contacts.filter(contact => contact.isFavorite);

    return (
        <div className="space-y-8">
            <div className="glass-effect rounded-2xl p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-4">
                    Welcome back, {user?.name}!
                </h1>
                <p className="text-gray-600">
                    Stay safe and connected with your trusted network.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="glass-effect p-6 rounded-2xl hover-lift border-t-4 border-pink-500">
                    <Shield className="h-8 w-8 text-pink-600 mb-2"/>
                    <h3 className="font-semibold">Safety Status</h3>
                    <p className="text-sm text-gray-600">Active and Protected</p>
                </div>
                <div className="glass-effect p-6 rounded-2xl hover-lift border-t-4 border-purple-500">
                    <MapPin className="h-8 w-8 text-purple-500 mb-2"/>
                    <h3 className="font-semibold">Location Tracking</h3>
                    <p className="text-sm text-gray-600">
                        {isTracking ? 'Active' : 'Inactive'}
                    </p>
                </div>
                <div className="glass-effect p-6 rounded-2xl hover-lift border-t-4 border-rose-500">
                    <Bell className="h-8 w-8 text-rose-500 mb-2"/>
                    <h3 className="font-semibold">Recent Incidents</h3>
                    <p className="text-sm text-gray-600">{incidents.length} Reports</p>
                </div>
                <div className="glass-effect p-6 rounded-2xl hover-lift border-t-4 border-blue-500">
                    <Users className="h-8 w-8 text-blue-600 mb-2"/>
                    <h3 className="font-semibold">My Contacts</h3>
                    <p className="text-sm text-gray-600">{contacts.length} Active</p>
                </div>

            </div>
            <div className="glass-effect p-6 rounded-2xl hover-lift border-t-4 border-blue-500">
                <Users className="h-8 w-8 text-blue-600 mb-2"/>
                <h3 className="font-semibold">Favorite Contacts</h3>
                <p className="text-sm text-gray-600">
                    {favoriteContacts.length} Favorites
                </p>
                <ul>
                    {favoriteContacts.map(contact => (
                        <li key={contact.id} className="mb-2">
                            {contact.name} - {contact.phone}
                        </li>
                    ))}
                </ul>
            </div>
                <VoiceActivatedSOS/>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <IncidentNotifications/>
                <SafetyAlerts/>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SafetyTips/>
                <FakeCaller/>
            </div>

            <SafeRouteMap/>
        </div>
    );
}