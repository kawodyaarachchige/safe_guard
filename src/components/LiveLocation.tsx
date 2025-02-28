import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MapPin, Navigation } from 'lucide-react';
import axios from 'axios';
import { RootState } from '../store/store';
import { setCurrentLocation, setIsTracking } from '../store/slices/locationSlice';

export default function LiveLocation() {
  const dispatch = useDispatch();
  const { currentLocation, isTracking } = useSelector((state: RootState) => state.location);
  const [error, setError] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  // Function to fetch the address using a geocoding API
  const fetchAddress = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
        params: {
          key: import.meta.env.VITE_GEOCODE_API_KEY,
          q: `${latitude},${longitude}`,
        },
      });

      if (response.data.results.length > 0) {
        setAddress(response.data.results[0].formatted || 'Unknown location');
      } else {
        setAddress('Address not found');
      }
    } catch (error) {
      setError('Failed to fetch address: ' + error.message);
    }
  };

  useEffect(() => {
    if (isTracking && 'geolocation' in navigator) {
      const watchId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            dispatch(setCurrentLocation({ latitude, longitude }));
            setError('');
            fetchAddress(latitude, longitude);
          },
          (err) => {
            setError('Failed to get location: ' + err.message);
            dispatch(setIsTracking(false));
          }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [isTracking, dispatch]);

  const toggleTracking = () => {
    if (!isTracking) {
      if ('geolocation' in navigator) {
        dispatch(setIsTracking(true));
      } else {
        setError('Geolocation is not supported by your browser');
      }
    } else {
      dispatch(setIsTracking(false));
    }
  };

  return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <MapPin className="h-6 w-6 text-purple-600 mr-2" />
            Live Location
          </h2>
          <button
              onClick={toggleTracking}
              className={`
            flex items-center space-x-2 px-4 py-2 rounded-md
            ${isTracking
                  ? 'bg-red-100 text-red-600 hover:bg-red-200'
                  : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
              }
          `}
          >
            <Navigation className="h-4 w-4" />
            <span>{isTracking ? 'Stop Tracking' : 'Start Tracking'}</span>
          </button>
        </div>

        {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
              {error}
            </div>
        )}

        {currentLocation ? (
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Latitude:</span> {currentLocation.latitude}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Longitude:</span> {currentLocation.longitude}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Address:</span> {address || 'Fetching address...'}
              </p>
              <p className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </p>
            </div>
        ) : (
            <p className="text-gray-600">
              {isTracking ? 'Getting location...' : 'Location tracking is disabled'}
            </p>
        )}

        <button
            onClick={() => {
              if (currentLocation) {
                const locationURL = `https://www.google.com/maps?q=${currentLocation.latitude},${currentLocation.longitude}`;
                const message = `Check out this location: ${locationURL}`;

                const recipientEmail = prompt('Enter the recipient email address:');
                if (recipientEmail) {
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (emailRegex.test(recipientEmail)) {
                    const mailtoLink = `mailto:${recipientEmail}?subject=Location Sharing&body=${encodeURIComponent(message)}`;
                    window.location.href = mailtoLink;
                  } else {
                    alert('Please enter a valid email address.');
                  }
                } else {
                  alert('Email address is required to share via email.');
                }
              } else {
                alert('Current location is unavailable. Start tracking first.');
              }
            }}
            className="mt-4 px-4 py-2 bg-green-100 text-green-600 rounded-md hover:bg-green-200"
        >
          Share Location via Email
        </button>
      </div>
  );
}