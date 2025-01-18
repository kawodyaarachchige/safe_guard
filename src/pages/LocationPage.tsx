import React from 'react';
import LiveLocation from '../components/LiveLocation';
import WeatherInformation from '../components/WeatherInformation';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function LocationPage() {
    const { currentLocation } = useSelector((state: RootState) => state.location);

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-purple-800">Location Tracking</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Live Location */}
                <LiveLocation />

                {/* Right: Weather Information */}
                {currentLocation ? (
                    <WeatherInformation
                        latitude={currentLocation.latitude}
                        longitude={currentLocation.longitude}
                    />
                ) : (
                    <div className="bg-gray-100 rounded-lg shadow-md p-6 text-gray-600">
                        Start tracking your location to see the weather information.
                    </div>
                )}
            </div>
        </div>
    );
}
