import { AlertTriangle, ChevronRight, Clock, MapPin, Edit, Trash, Check, X } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import {deleteIncident, fetchIncidents, Incident, updateIncident} from "../store/slices/incidentSlice";
import { AppDispatch } from "../store/store";

export default function IncidentNotifications() {
    const dispatch = useDispatch<AppDispatch>();
    const { incidents, loading, error } = useSelector((state: RootState) => state.incidents);
    const [editingIncidentId, setEditingIncidentId] = useState<string | null>(null);
    const [editedIncident, setEditedIncident] = useState<Incident | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchData = useCallback(() => {
        dispatch(fetchIncidents());
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const getIncidentColor = (type?: string) => {
        if (!type) return 'text-gray-600 bg-gray-50';
        switch (type.toLowerCase()) {
            case 'harassment': return 'text-red-600 bg-red-50';
            case 'stalking': return 'text-orange-600 bg-orange-50';
            case 'theft': return 'text-yellow-600 bg-yellow-50';
            default: return 'text-purple-600 bg-purple-50';
        }
    };

    const formatTimestamp = (timestamp: string) => {
        try {
            const date = new Date(timestamp);
            return date.toLocaleString();
        } catch (error) {
            console.error('Invalid timestamp:', error);
            return 'Invalid date';
        }
    };

    const handleEdit = (incident: Incident) => {
        setEditingIncidentId(incident._id);
        setEditedIncident({ ...incident });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        field: keyof Pick<Incident, 'description' | 'location'>
    ) => {
        if (editedIncident) {
            setEditedIncident({
                ...editedIncident,
                [field]: e.target.value,
            });
        }
    };

    const handleSave = async (incident: Incident) => {
        if (!editedIncident) return;

        try {
            setIsUpdating(true);
            await dispatch(updateIncident(editedIncident)).unwrap();

            // Update the local state first
            const updatedIncidents = incidents.map(inc =>
                inc._id === editedIncident._id ? editedIncident : inc
            );

            // Reset states
            setEditingIncidentId(null);
            setEditedIncident(null);

            // Then fetch fresh data
            await dispatch(fetchIncidents());
        } catch (error) {
            console.error("Error updating incident:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleCancel = () => {
        setEditingIncidentId(null);
        setEditedIncident(null);
    };

    const handleDelete = async (incidentId: string) => {
        if (window.confirm("Are you sure you want to delete this incident?")) {
            await dispatch(deleteIncident(incidentId));
        }
    };

    if (loading && !isUpdating) return <div className="p-6">Loading incidents...</div>;
    if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-6 w-6 text-purple-600"/>
                    <h2 className="text-xl font-semibold">Recent Incidents</h2>
                </div>
                <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
                    {incidents.length} Reports
                </span>
            </div>

            <div className="space-y-4">
                {incidents.map((incident) => (
                    <div
                        key={incident._id} // Ensure this key is unique
                        className={`group rounded-xl p-4 transition-all duration-200 ${
                            isUpdating && editingIncidentId === incident._id
                                ? 'opacity-70'
                                : 'opacity-100'
                        }`}
                    >
                        {/* Render incident details */}
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getIncidentColor(incident.type)}`}>
                            {incident.type}
                        </span>
                                    <span className="text-gray-500 text-sm flex items-center">
                            <Clock className="h-4 w-4 mr-1"/>
                                        {formatTimestamp(incident.timestamp)}
                        </span>
                                </div>

                                {editingIncidentId === incident._id ? (
                                    <input
                                        type="text"
                                        value={editedIncident?.description || ""}
                                        onChange={(e) => handleChange(e, "description")}
                                        className="border rounded-lg p-2 w-full mb-2"
                                        disabled={isUpdating}
                                    />
                                ) : (
                                    <p className="text-gray-700 mb-2">{incident.description}</p>
                                )}

                                <div className="flex items-center text-gray-500 text-sm">
                                    <MapPin className="h-4 w-4 mr-1"/>
                                    {editingIncidentId === incident._id ? (
                                        <input
                                            type="text"
                                            value={editedIncident?.location || ""}
                                            onChange={(e) => handleChange(e, "location")}
                                            className="border rounded-lg p-2 w-full"
                                            disabled={isUpdating}
                                        />
                                    ) : (
                                        <span>{incident.location}</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                {editingIncidentId === incident._id ? (
                                    <>
                                        <button
                                            onClick={() => handleSave(incident)}
                                            className="text-green-600 hover:text-green-800 transition-colors p-1"
                                            disabled={isUpdating}
                                        >
                                            <Check className="h-5 w-5"/>
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="text-gray-400 hover:text-red-600 transition-colors p-1"
                                            disabled={isUpdating}
                                        >
                                            <X className="h-5 w-5"/>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEdit(incident)}
                                            className="text-gray-400 hover:text-blue-600 transition-colors p-1"
                                        >
                                            <Edit className="h-5 w-5"/>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(incident._id)}
                                            className="text-gray-400 hover:text-red-600 transition-colors p-1"
                                        >
                                            <Trash className="h-5 w-5"/>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}