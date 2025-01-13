import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Users, UserPlus, X } from 'lucide-react';
import { RootState } from '../store/store';
import { addContact, removeContact } from '../store/slices/userSlice';

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export default function TrustedContacts() {
  const dispatch = useDispatch();
  const { trustedContacts } = useSelector((state: RootState) => state.user);
  const [isAdding, setIsAdding] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    relationship: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addContact({
      id: Date.now().toString(),
      ...newContact,
    }));
    setNewContact({ name: '', phone: '', relationship: '' });
    setIsAdding(false);
  };

  const handleRemove = (contactId: string) => {
    if (window.confirm('Are you sure you want to remove this contact?')) {
      dispatch(removeContact(contactId));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center">
          <Users className="h-6 w-6 text-purple-600 mr-2" />
          Trusted Contacts
        </h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center space-x-2 bg-purple-100 text-purple-600 px-4 py-2 rounded-md hover:bg-purple-200"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add Contact</span>
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              required
              value={newContact.name}
              onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              required
              value={newContact.phone}
              onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Relationship</label>
            <input
              type="text"
              required
              value={newContact.relationship}
              onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
            >
              Add Contact
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {trustedContacts.map((contact: Contact) => (
          <div
            key={contact.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-md"
          >
            <div>
              <h3 className="font-medium">{contact.name}</h3>
              <p className="text-sm text-gray-600">{contact.phone}</p>
              <p className="text-xs text-gray-500">{contact.relationship}</p>
            </div>
            <button
              onClick={() => handleRemove(contact.id)}
              className="text-red-500 hover:text-red-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ))}
        {trustedContacts.length === 0 && (
          <p className="text-gray-500 text-center">No trusted contacts added yet.</p>
        )}
      </div>
    </div>
  );
}