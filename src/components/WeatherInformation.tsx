import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface WeatherData {
    temperature: number;
    description: string;
    icon: string;
    location: string;
}

export default function WeatherInformation({ latitude, longitude }: { latitude: number; longitude: number }) {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                setLoading(true);
                setError('');
                const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
                const response = await axios.get(
                    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}&aqi=no`
                );

                const data = response.data;
                setWeatherData({
                    temperature: data.current.temp_c,
                    description: data.current.condition.text,
                    icon: data.current.condition.icon,
                    location: data.location.name,
                });
            } catch (err) {
                setError('Failed to fetch weather data');
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [latitude, longitude]);

    if (loading) return <p>Loading weather...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-purple-600">Weather Information</h2>
            <div className="flex items-center space-x-4">
                <img src={weatherData?.icon} alt={weatherData?.description} className="h-16 w-16" />
                <div>
                    <p className="text-gray-600">
                        <strong>Location:</strong> {weatherData?.location}
                    </p>
                    <p className="text-gray-600">
                        <strong>Temperature:</strong> {weatherData?.temperature}°C
                    </p>
                    <p className="text-gray-600 capitalize">
                        <strong>Condition:</strong> {weatherData?.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
