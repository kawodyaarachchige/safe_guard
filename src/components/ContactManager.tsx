import React, {useCallback, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserPlus, Edit2, Trash2, Star, Phone, Mail, Heart } from 'lucide-react';
import {AppDispatch, RootState} from '../store/store';
import { Contact, fetchContacts, saveContact, updateContact, deleteContact } from '../store/slices/contactSlice';


export default function ContactManager() {
    const dispatch = useDispatch<AppDispatch>();
    const { contacts, loading, error } = useSelector((state: RootState) => state.contacts);
    const user = useSelector((state: RootState) => state.user.user);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        relationship: '',
        isEmergencyContact: false,
        isFavorite: false,
    });
    const fetchData = useCallback(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const contactData = {
            ...(selectedContact && { _id: selectedContact._id }), // Only include _id for updates
            ...formData,
            lastUpdated: new Date().toISOString(),
            user: '67b7d41f88cfa607351e0ca3',
        };

        if (selectedContact) {
            await dispatch(updateContact(contactData));
        } else {
            await dispatch(saveContact(contactData));
        }

        resetForm();
        dispatch(fetchContacts());
    };


    const handleEdit = (contact: Contact) => {
        setSelectedContact(contact);
        setFormData({
            name: contact.name,
            phone: contact.phone,
            email: contact.email,
            relationship: contact.relationship,
            isEmergencyContact: contact.isEmergencyContact,
            isFavorite: contact.isFavorite,
        });
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            await dispatch(deleteContact(id));
            dispatch(fetchContacts());
        }
    };

    const resetForm = () => {
        setSelectedContact(null);
        setFormData({
            name: '',
            phone: '',
            email: '',
            relationship: '',
            isEmergencyContact: false,
            isFavorite: false,
        });
        setIsEditing(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                    Contact Management
                </h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="button-gradient text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                        <UserPlus className="h-5 w-5" />
                        <span>Add Contact</span>
                    </button>
                )}
            </div>

            {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
                    {error}
                </div>
            )}

            {isEditing && (
                <form onSubmit={handleSubmit} className="glass-effect rounded-xl p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                            <input
                                type="text"
                                required
                                value={formData.relationship}
                                onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="isEmergencyContact"
                            checked={formData.isEmergencyContact}
                            onChange={(e) => setFormData({ ...formData, isEmergencyContact: e.target.checked })}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <label htmlFor="isEmergencyContact" className="ml-2 text-sm text-gray-700">
                            Emergency Contact
                        </label>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="isFavorite"
                            checked={formData.isFavorite}
                            onChange={(e) => setFormData({ ...formData, isFavorite: e.target.checked })}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <label htmlFor="isFavorite" className="ml-2 text-sm text-gray-700">
                            Mark as Favorite
                        </label>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={resetForm}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="button-gradient text-white px-6 py-2 rounded-lg flex items-center space-x-2"
                        >
                            {loading ? 'Saving...' : selectedContact ? 'Update Contact' : 'Add Contact'}
                        </button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contacts.map((contact) => (
                    <div
                        key={contact._id}
                        className="glass-effect rounded-xl p-4 hover-lift"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="font-semibold text-lg flex items-center">
                                    {contact.name}
                                    {contact.isEmergencyContact && (
                                        <Heart className="h-4 w-4 text-pink-500 ml-2" />
                                    )}
                                    {contact.isFavorite && (
                                        <Star className="h-4 w-4 text-yellow-500 ml-2" />
                                    )}
                                </h3>
                                <p className="text-sm text-gray-600">{contact.relationship}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEdit(contact)}
                                    className="text-gray-600 hover:text-purple-600"
                                >
                                    <Edit2 className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(contact._id)}
                                    className="text-gray-600 hover:text-red-600"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center text-sm text-gray-600">
                                <Phone className="h-4 w-4 mr-2" />
                                {contact.phone}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <Mail className="h-4 w-4 mr-2" />
                                {contact.email}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}