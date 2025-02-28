import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, Clock, Activity } from 'lucide-react';
import { RootState } from '../store/store';
import { saveCycle, updateCycle, deleteCycle, calculateAverageCycle, fetchCycles } from '../store/slices/cycleSlice';
import axios from 'axios';

export default function PeriodTracker() {
    const dispatch = useDispatch();
    const { cycles, averageCycleLength, lastPeriodDate, nextPeriodDate } = useSelector(
        (state: RootState) => state.cycle
    );

    const [showForm, setShowForm] = useState(false);
    const [newCycle, setNewCycle] = useState({
        startDate: '',
        flow: 'medium' as const,
        symptoms: [] as string[],
        notes: '',
    });
    const [editingCycleId, setEditingCycleId] = useState<string | null>(null);

    const symptoms = [
        'Cramps',
        'Headache',
        'Bloating',
        'Fatigue',
        'Mood Changes',
        'Back Pain',
        'Breast Tenderness',
    ];

    // Fetch cycles on component mount
    useEffect(() => {
        dispatch(fetchCycles());
    }, [dispatch]);

    // Validate date string
    const isValidDate = (dateString: string) => {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
    };

    // Format date for display
    const formatDate = (dateString: string | null) => {
        if (!dateString || !isValidDate(dateString)) return 'Not available';

        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleAddCycle = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate start date
        if (!isValidDate(newCycle.startDate)) {
            alert('Please select a valid start date');
            return;
        }

        const cycleData = {
            startDate: newCycle.startDate,
            endDate: null,
            cycleLength: averageCycleLength,
            periodLength: 5,
            symptoms: [{
                date: newCycle.startDate,
                flow: newCycle.flow,
                symptoms: newCycle.symptoms,
                notes: newCycle.notes,
            }],
        };

        try {
            const response = await axios.post('/api/cycle', cycleData);
            dispatch(saveCycle(response.data));
            dispatch(calculateAverageCycle());
            resetForm();
        } catch (error) {
            console.error('Failed to save cycle:', error);
        }
    };

    const handleUpdateCycle = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingCycleId) {
            const updatedCycleData = {
                ...newCycle,
                id: editingCycleId,
                symptoms: [{
                    date: newCycle.startDate,
                    flow: newCycle.flow,
                    symptoms: newCycle.symptoms,
                    notes: newCycle.notes,
                }],
            };

            try {
                const response = await axios.put(`/api/cycle/${editingCycleId}`, updatedCycleData);
                dispatch(updateCycle(response.data));
                dispatch(calculateAverageCycle());
                resetForm();
            } catch (error) {
                console.error('Failed to update cycle:', error);
            }
        }
    };

    const handleDeleteCycle = async (id: string) => {
        try {
            await axios.delete(`/api/cycle/${id}`);
            dispatch(deleteCycle(id));
            dispatch(calculateAverageCycle());
        } catch (error) {
            console.error('Failed to delete cycle:', error);
        }
    };

    const handleSymptomToggle = (symptom: string) => {
        setNewCycle(prev => ({
            ...prev,
            symptoms: prev.symptoms.includes(symptom)
                ? prev.symptoms.filter(s => s !== symptom)
                : [...prev.symptoms, symptom],
        }));
    };

    const resetForm = () => {
        setEditingCycleId(null);
        setShowForm(false);
        setNewCycle({
            startDate: '',
            flow: 'medium',
            symptoms: [],
            notes: '',
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <Calendar className="h-6 w-6 text-pink-500" />
                    <h2 className="text-xl font-semibold">Period Tracker</h2>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-4 py-2 bg-pink-100 text-pink-600 rounded-full hover:bg-pink-200"
                >
                    {showForm ? 'Cancel' : editingCycleId ? 'Update Period' : 'Log Period'}
                </button>
            </div>

            {showForm ? (
                <form onSubmit={editingCycleId ? handleUpdateCycle : handleAddCycle} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date
                        </label>
                        <input
                            type="date"
                            required
                            value={newCycle.startDate}
                            onChange={(e) => setNewCycle({ ...newCycle, startDate: e.target.value })}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                            min="2010-01-01"
                            max={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Flow
                        </label>
                        <select
                            value={newCycle.flow}
                            onChange={(e) => setNewCycle({ ...newCycle, flow: e.target.value as 'light' | 'medium' | 'heavy' })}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                        >
                            <option value="light">Light</option>
                            <option value="medium">Medium</option>
                            <option value="heavy">Heavy</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Symptoms
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {symptoms.map((symptom) => (
                                <button
                                    key={symptom}
                                    type="button"
                                    onClick={() => handleSymptomToggle(symptom)}
                                    className={`px-3 py-1 rounded-full text-sm ${
                                        newCycle.symptoms.includes(symptom)
                                            ? 'bg-pink-500 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {symptom}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Notes
                        </label>
                        <textarea
                            value={newCycle.notes}
                            onChange={(e) => setNewCycle({ ...newCycle, notes: e.target.value })}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
                            rows={3}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700"
                    >
                        {editingCycleId ? 'Update Period Data' : 'Save Period Data'}
                    </button>
                </form>
            ) : (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-pink-50 p-4 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                                <Clock className="h-5 w-5 text-pink-500" />
                                <h3 className="font-medium">Cycle Length</h3>
                            </div>
                            <p className="text-2xl font-bold text-pink-600">{averageCycleLength} days</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                                <Calendar className="h-5 w-5 text-purple-500" />
                                <h3 className="font-medium">Next Period</h3>
                            </div>
                            <p className="text-lg font-medium text-purple-600">
                                {formatDate(nextPeriodDate)}
                            </p>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-2 mb-4">
                            <Activity className="h-5 w-5 text-gray-600" />
                            <h3 className="font-medium">Recent Cycles</h3>
                        </div>
                        <div className="space-y-3">
                            {cycles.slice(-3).reverse().map((cycle) => (
                                <div key={cycle._id} className="bg-white p-3 rounded-md shadow-sm">
                                    <p className="text-sm font-medium">
                                        Started: {formatDate(cycle.startDate)}
                                    </p>
                                    {cycle.symptoms.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-1">
                                            {cycle.symptoms[0].symptoms.map((symptom, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-pink-100 text-pink-600 rounded-full text-xs"
                                                >
                                                    {symptom}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="mt-2 flex space-x-2">
                                        <button
                                            onClick={() => {
                                                setEditingCycleId(cycle._id);
                                                setNewCycle({
                                                    startDate: cycle.startDate,
                                                    flow: cycle.symptoms[0].flow,
                                                    symptoms: cycle.symptoms[0].symptoms,
                                                    notes: cycle.symptoms[0].notes,
                                                });
                                                setShowForm(true);
                                            }}
                                            className="px-4 py-1 text-xs text-white bg-yellow-500 rounded-full"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteCycle(cycle._id)}
                                            className="px-4 py-1 text-xs text-white bg-red-500 rounded-full"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
