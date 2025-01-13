import React, { useState } from 'react';
import { Phone, Volume2, X } from 'lucide-react';

export default function FakeCaller() {
  const [isActive, setIsActive] = useState(false);
  const [selectedContact, setSelectedContact] = useState('');

  const fakeContacts = [
    { name: 'Mom', number: '+1234567890' },
    { name: 'Dad', number: '+1234567891' },
    { name: 'Home', number: '+1234567892' },
  ];

  const handleStartCall = () => {
    if (!selectedContact) {
      alert('Please select a contact');
      return;
    }
    setIsActive(true);
    // In a real app, this would play a ringtone sound
  };

  const handleEndCall = () => {
    setIsActive(false);
    setSelectedContact('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Phone className="h-6 w-6 text-purple-600" />
        <h2 className="text-xl font-semibold">Fake Incoming Call</h2>
      </div>

      {!isActive ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Contact
            </label>
            <select
              value={selectedContact}
              onChange={(e) => setSelectedContact(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="">Choose a contact</option>
              {fakeContacts.map((contact, index) => (
                <option key={index} value={contact.name}>
                  {contact.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleStartCall}
            className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700"
          >
            <Phone className="h-5 w-5" />
            <span>Trigger Fake Call</span>
          </button>

          <p className="text-sm text-gray-500 text-center">
            Use this feature to receive a fake incoming call in uncomfortable situations
          </p>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <div className="animate-pulse">
            <Volume2 className="h-12 w-12 text-purple-600 mx-auto" />
            <p className="text-lg font-medium mt-2">
              Incoming call from {selectedContact}...
            </p>
          </div>

          <button
            onClick={handleEndCall}
            className="flex items-center justify-center space-x-2 mx-auto bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600"
          >
            <X className="h-5 w-5" />
            <span>End Call</span>
          </button>
        </div>
      )}
    </div>
  );
}