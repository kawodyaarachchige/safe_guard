import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { saveIncident, setLoading, setError, clearIncidents } from '../store/slices/incidentSlice';
import {RootState} from "@reduxjs/toolkit/query";
import {incidentApi} from "../services/incidentApi.ts";


export default function ReportPage() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    location: '',
  });

  const { loading, error } = useSelector((state: RootState) => state.incidents);

  const [success, setSuccess] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setLoading(true));

    try {
      const incident = await incidentApi.saveIncident({
        user:user?.id,  // Ensure user is always included
        type: formData.type || "Unknown", // Prevent empty fields
        description: formData.description || "No description provided",
        location: formData.location || "Unknown",
        timestamp: new Date().toISOString(),
      });

      dispatch(saveIncident(incident));
      setSuccess(true);
      setFormData({ type: '', description: '', location: '' });

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Failed to report incident:', error);
      dispatch(setError('Failed to report incident.'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const confirmClearIncidents = () => {
    setModalOpen(false); // Close the modal
    dispatch(clearIncidents());
  };

  return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-8">
          Report an Incident
        </h1>

        {success && (
            <div className="bg-green-100 text-green-700 p-4 rounded-xl mb-6 flex items-center">
              <span className="mr-2">✓</span>
              Incident reported successfully. Redirecting to dashboard...
            </div>
        )}

        {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-6">
              {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="glass-effect rounded-xl p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Incident Type</label>
            <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="">Select type</option>
              <option value="harassment">Harassment</option>
              <option value="stalking">Stalking</option>
              <option value="theft">Theft</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={4}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="Please provide details about the incident..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="Enter the location of the incident"
            />
          </div>

          <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 button-gradient text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50"
          >
            <AlertTriangle className="h-5 w-5" />
            <span>{loading ? 'Submitting...' : 'Report Incident'}</span>
          </button>
        </form>

        <button
            onClick={() => setModalOpen(true)}
            className="mt-6 text-red-500 underline"
        >
          Clear All Incidents
        </button>

        {/* Confirmation Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-lg font-bold text-gray-800">Confirm Action</h2>
                <p className="text-sm text-gray-600 mt-2">
                  Are you sure you want to clear all incidents? This action cannot be undone.
                </p>
                <div className="flex items-center justify-end space-x-4 mt-4">
                  <button
                      onClick={confirmClearIncidents}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Clear All
                  </button>
                  <button
                      onClick={() => setModalOpen(false)}
                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}
