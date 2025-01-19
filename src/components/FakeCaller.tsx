import React, { useState, useRef } from 'react';
import { Phone, Volume2, X, Clock } from 'lucide-react';

export default function FakeCaller() {
  const [isActive, setIsActive] = useState(false);
  const [selectedContact, setSelectedContact] = useState('');
  const [customContact, setCustomContact] = useState({ name: '', number: '' });
  const [delay, setDelay] = useState(0);
  const ringtoneRef = useRef(null);

  const fakeContacts = [
    { name: 'Mom', number: '+1234567890' },
    { name: 'Dad', number: '+1234567891' },
    { name: 'Home', number: '+1234567892' },
  ];

  const handleStartCall = () => {
    if (!selectedContact && !customContact.name) {
      alert('Please select or add a contact');
      return;
    }

    if (delay > 0) {
      setTimeout(() => {
        startCall();
      }, delay * 1000);
    } else {
      startCall();
    }
  };

  const startCall = () => {
    setIsActive(true);
    if (ringtoneRef.current) {
      ringtoneRef.current.play();
    }
  };

  const handleEndCall = () => {
    setIsActive(false);
    setSelectedContact('');
    setCustomContact({ name: '', number: '' });
    if (ringtoneRef.current) {
      ringtoneRef.current.pause();
      ringtoneRef.current.currentTime = 0;
    }
  };

  return (
      <div className="bg-white rounded-2xl hover-lift shadow-lg p-6">
        <audio ref={ringtoneRef} src="/ringtone.mp3" preload="auto" />

        <div className="flex items-center space-x-2 mb-6">
          <Phone className="h-6 w-6 text-purple-500" />
          <h2 className="text-xl font-semibold text-black-800">Fake Incoming Call</h2>
        </div>

        {!isActive ? (
            <div className="space-y-4">
              {/* Select Contact */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Contact
                </label>
                <select
                    value={selectedContact}
                    onChange={(e) => setSelectedContact(e.target.value)}
                    className="w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-teal-500"
                >
                  <option value="">Choose a contact</option>
                  {fakeContacts.map((contact, index) => (
                      <option key={index} value={contact.name}>
                        {contact.name} ({contact.number})
                      </option>
                  ))}
                </select>
              </div>

              {/* Custom Contact */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Or Add a Custom Contact
                </label>
                <input
                    type="text"
                    placeholder="Name"
                    value={customContact.name}
                    onChange={(e) => setCustomContact({ ...customContact, name: e.target.value })}
                    className="w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-teal-500"
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={customContact.number}
                    onChange={(e) => setCustomContact({ ...customContact, number: e.target.value })}
                    className="w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-teal-500"
                />
              </div>

              {/* Set Delay */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Schedule Call (in seconds)
                </label>
                <input
                    type="number"
                    min="0"
                    value={delay}
                    onChange={(e) => setDelay(e.target.value)}
                    className="w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-teal-500"
                />
              </div>

              {/* Trigger Call Button */}
              <button
                  onClick={handleStartCall}
                  className="w-full flex items-center justify-center space-x-2 bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600"
              >
                <Phone className="h-5 w-5" />
                <span>Trigger Fake Call</span>
              </button>

              <p className="text-sm text-gray-500 text-center">
                Use this feature to simulate an incoming call for emergencies or practice situations.
              </p>
            </div>
        ) : (
            <div className="text-center space-y-4">
              <div className="animate-pulse">
                <Volume2 className="h-12 w-12 text-green-500 mx-auto" />
                <p className="text-lg font-medium mt-2">
                  Incoming call from{' '}
                  {selectedContact || `${customContact.name} (${customContact.number})`}...
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
