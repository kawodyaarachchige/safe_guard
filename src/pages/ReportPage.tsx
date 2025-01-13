import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AlertTriangle } from 'lucide-react';
import { addIncident } from '../store/slices/incidentSlice';
import { api } from '../services/api';

export default function ReportPage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const incident = await api.reportIncident({
        ...formData,
        location: {
          latitude: 0, // In a real app, get actual coordinates
          longitude: 0,
        },
      });
      dispatch(addIncident(incident));
      setSuccess(true);
      setFormData({ type: '', description: '', location: '' });
    } catch (error) {
      console.error('Failed to report incident:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-800 mb-8">Report an Incident</h1>
      
      {success && (
        <div className="bg-green-100 text-green-700 p-4 rounded-md mb-6">
          Incident reported successfully. Stay safe!
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Incident Type
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          >
            <option value="">Select type</option>
            <option value="harassment">Harassment</option>
            <option value="stalking">Stalking</option>
            <option value="theft">Theft</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={4}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="Please provide details about the incident..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="Enter the location of the incident"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
        >
          <AlertTriangle className="h-5 w-5" />
          <span>{loading ? 'Submitting...' : 'Report Incident'}</span>
        </button>
      </form>
    </div>
  );
}