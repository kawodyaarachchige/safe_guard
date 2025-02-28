import React, { useState, useRef, useEffect } from 'react';
import { Phone, Volume2, X, Clock } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getPhoneNumber } from '../store/slices/contactSlice';
import { AppDispatch, RootState } from '../store/store';

export default function FakeCaller() {
  const dispatch = useDispatch<AppDispatch>();
  const [isActive, setIsActive] = useState(false);
  const [selectedContact, setSelectedContact] = useState('');
  const [customContact, setCustomContact] = useState({ name: '', number: '' });
  const [delay, setDelay] = useState(0);
  const [contacts, setContacts] = useState<{ name: string; number: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ringtoneRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await dispatch(getPhoneNumber()).unwrap();

        if (!Array.isArray(result)) {
          throw new Error("Invalid response format");
        }
        const formattedContacts = result.map((contact: { name: string; phone: string }) => ({
          name: contact.name,
          number: contact.phone,
        }));

        setContacts(formattedContacts);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, [dispatch]);


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
                    disabled={isLoading} // Disable while loading
                >
                  <option value="">Choose a contact</option>
                  {contacts.map((contact, index) => (
                      <option key={index} value={contact.name}>
                        {contact.name} ({contact.number})
                      </option>
                  ))}
                </select>
                {isLoading && <p className="text-sm text-gray-500">Loading contacts...</p>}
                {error && <p className="text-sm text-red-500">{error}</p>}
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
                    onChange={(e) => setDelay(Number(e.target.value))}
                    className="w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-500 focus:ring-teal-500"
                />
              </div>

              {/* Trigger Call Button */}
              <button
                  onClick={handleStartCall}
                  className="w-full flex items-center justify-center space-x-2 bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600"
                  disabled={isLoading} // Disable while loading
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