import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, Info } from 'lucide-react';

interface Alert {
  id: string;
  type: 'danger' | 'warning' | 'info';
  message: string;
  location: string;
  timestamp: string;
}

export default function SafetyAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([
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

  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>(alerts);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    // Apply filter and search when either filter or search changes
    const filtered = alerts.filter(alert => {
      const matchesFilter = filter === 'all' || alert.type === filter;
      const matchesSearch = alert.message.toLowerCase().includes(search.toLowerCase()) ||
          alert.location.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
    setFilteredAlerts(filtered);
  }, [alerts, filter, search]);

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
      <div className="bg-white rounded-2xl hover-lift shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Bell className="h-6 w-6 text-purple-500" />
          <h2 className="text-xl font-semibold text-black-800">Safety Alerts</h2>
        </div>

        {/* Search Bar */}
        <input
            type="text"
            placeholder="Search by message or location"
            className="mb-4 p-2 border rounded-md w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

        {/* Filter Dropdown */}
        <div className="mb-4">
          <select
              className="p-2 border rounded-md"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Alerts</option>
            <option value="danger">Danger</option>
            <option value="warning">Warning</option>
            <option value="info">Info</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
              <div
                  key={alert.id}
                  className={`p-4 border-l-4 rounded-lg flex items-start space-x-3 ${getAlertStyles(alert.type)}`}
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

       {/* <button className="mt-4 w-full text-black-500 hover:text-rose-700 text-sm font-medium">
          View All Alerts
        </button>*/}
      </div>
  );
}
