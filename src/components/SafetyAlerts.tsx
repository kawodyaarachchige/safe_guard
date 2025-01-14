import React, { useState } from 'react';
import { Bell, AlertTriangle, Info } from 'lucide-react';

interface Alert {
  id: string;
  type: 'danger' | 'warning' | 'info';
  message: string;
  location: string;
  timestamp: string;
}

export default function SafetyAlerts() {
  const [alerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'danger',
      message: 'Multiple incidents reported in Downtown area',
      location: 'Downtown',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      type: 'warning',
      message: 'Construction work causing poor lighting on Main Street',
      location: 'Main Street',
      timestamp: new Date().toISOString(),
    },
    {
      id: '3',
      type: 'info',
      message: 'New police patrol added to Central Park area',
      location: 'Central Park',
      timestamp: new Date().toISOString(),
    },
  ]);

  const getAlertStyles = (type: string) => {
    switch (type) {
      case 'danger':
        return 'bg-red-50 border-purple-500 text-teal-800';
      case 'warning':
        return 'bg-yellow-50 border-rose-500 text-teal-800';
      case 'info':
        return 'bg-blue-50 border-blue-500 text-teal-800';
      default:
        return 'bg-gray-50 border-teal-500 text-teal-800';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'danger':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Bell className="h-6 w-6 text-purple-500" />
          <h2 className="text-xl font-semibold text-teal-800">Safety Alerts</h2>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => (
              <div
                  key={alert.id}
                  className={`p-4 border-l-4 rounded-lg flex items-start space-x-3 ${getAlertStyles(
                      alert.type
                  )}`}
              >
                {getAlertIcon(alert.type)}
                <div>
                  <p className="font-medium">{alert.message}</p>
                  <div className="mt-1 text-sm opacity-75">
                    <span>{alert.location}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
          ))}
        </div>

        <button className="mt-4 w-full text-black-500 hover:text-rose-700 text-sm font-medium">
          View All Alerts
        </button>
      </div>
  );
}
