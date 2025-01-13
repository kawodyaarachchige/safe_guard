import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { api } from '../services/api';

export default function EmergencyButton() {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useSelector((state: RootState) => state.user);
  const { currentLocation } = useSelector((state: RootState) => state.location);

  const handleEmergency = async () => {
    if (!user) {
      alert('Please log in to use the emergency feature');
      return;
    }

    if (isActive) return; // Prevent multiple clicks while alerting

    const confirmAlert = window.confirm('Are you sure you want to send an emergency alert?');
    if (!confirmAlert) return;

    setIsActive(true);
    setError(null); // Reset error message

    try {
      await api.sendEmergencyAlert({
        userId: user.id,
        location: currentLocation,
        timestamp: new Date().toISOString(),
      });

      // Simulate calling emergency services
      setTimeout(() => {
        alert('Emergency services have been notified. Stay safe!');
        setIsActive(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to send emergency alert:', error);
      setError('Failed to send the emergency alert. Please try again later.');
      setIsActive(false);
    }
  };

  return (
      <div className="fixed bottom-6 right-6">
        <button
            onClick={handleEmergency}
            disabled={isActive}
            className={`
          flex items-center justify-center
          w-16 h-16 rounded-full
          shadow-lg transition-all duration-300
          ${isActive
                ? 'bg-red-600 animate-pulse'
                : 'bg-red-500 hover:bg-red-600'
            }
        `}
        >
          <AlertCircle className="h-8 w-8 text-white" />
        </button>
        <span className="block text-center text-sm mt-2 font-medium text-gray-600">
        {isActive ? 'Alerting...' : 'Emergency'}
      </span>
        {error && (
            <div className="mt-2 text-center text-sm text-red-600">
              {error}
            </div>
        )}
      </div>
  );
}
