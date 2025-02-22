import {AlertTriangle, ChevronRight, Clock, MapPin} from "lucide-react";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@reduxjs/toolkit/query";
import {fetchIncidents} from "../store/slices/incidentSlice.ts";

export default function IncidentNotifications() {
    const dispatch = useDispatch();
    const { incidents, loading, error } = useSelector((state: RootState) => state.incidents);

    useEffect(() => {
        dispatch(fetchIncidents()); // Fetch incidents when the component mounts
    }, [dispatch]);

    console.log('Incidents in Redux Store:', incidents); // Log the incidents array

    if (loading) {
        return <p>Loading incidents...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const getIncidentColor = (type?: string) => {
        if (!type) return 'text-gray-600 bg-gray-50'; // Default color if type is missing
        switch (type.toLowerCase()) {
            case 'harassment':
                return 'text-red-600 bg-red-50';
            case 'stalking':
                return 'text-orange-600 bg-orange-50';
            case 'theft':
                return 'text-yellow-600 bg-yellow-50';
            default:
                return 'text-purple-600 bg-purple-50';
        }
    };

    const formatTimestamp = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    if (incidents.length === 0) {
        return (
            <div className="bg-white hover-lift rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-2 mb-6">
                    <AlertTriangle className="h-6 w-6 text-purple-600" />
                    <h2 className="text-xl font-semibold">Recent Incidents</h2>
                </div>
                <p className="text-gray-600 text-center py-8">No incidents reported yet.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg hover-lift p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-6 w-6 text-purple-600" />
                    <h2 className="text-xl font-semibold">Recent Incidents</h2>
                </div>
                <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
          {incidents.length} Reports
        </span>
            </div>

            <div className="space-y-4">
                {incidents.map((incident) => (
                    <div
                        key={incident._id} // Use _id as the key
                        className="group hover-lift glass-effect rounded-xl p-4 cursor-pointer"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getIncidentColor(incident.type)}`}>
                    {incident.type}
                  </span>
                                    <span className="text-gray-500 text-sm flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                                        {formatTimestamp(incident.timestamp)}
                  </span>
                                </div>
                                <p className="text-gray-700 mb-2">{incident.description}</p>
                                <div className="flex items-center text-gray-500 text-sm">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {incident.location}
                                </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}