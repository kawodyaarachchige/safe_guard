import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { api } from '../services/api';

export default function EmergencyButton() {
  const [isActive, setIsActive] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const { currentLocation } = useSelector((state: RootState) => state.location);

  const handleEmergency = async () => {
    if (!user) {
      alert('Please log in to use the emergency feature');
      return;
    }

    setIsActive(true);
    try {
      await api.sendEmergencyAlert({
        userId: user.id,
        location: currentLocation,
        timestamp: new Date().toISOString(),
      });

      setTimeout(() => {
        alert('Emergency services have been notified. Stay safe!');
        setIsActive(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to send emergency alert:', error);
      setIsActive(false);
    }
  };

  return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
            onClick={handleEmergency}
            disabled={isActive}
            className={`
          relative group flex items-center justify-center
          w-16 h-16 rounded-full
          shadow-lg transition-all duration-500
          ${isActive
                ? 'bg-red-600 animate-pulse scale-110'
                : 'bg-gradient-to-r from-red-500 to-pink-500 hover:scale-110'
            }
        `}
        >
          <AlertCircle className="h-8 w-8 text-white" />
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
        </button>
        <span className="block text-center text-sm mt-2 font-medium glass-effect px-4 py-1 rounded-full">
        {isActive ? 'Alerting...' : 'Emergency'}
      </span>
      </div>
  );
}