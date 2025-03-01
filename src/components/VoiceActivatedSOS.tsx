import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Mic, MicOff, Volume2, AlertTriangle } from 'lucide-react';
import { RootState } from '../store/store';
import { emergencyApi } from '../services/emergancyApi.ts'; // Ensure the import path is correct

export default function VoiceActivatedSOS() {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.user);

    const [isListening, setIsListening] = useState(false);
    const [isActivated, setIsActivated] = useState(false);
    const [recognition, setRecognition] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const currentLocation = {
        latitude: 6.7156,
        longitude: 79.9075,
    };

    const triggerPhrases = [
        'help me',
        'emergency',
        'sos',
        'danger',
        'save me'
    ];

    useEffect(() => {
        if ('webkitSpeechRecognition' in window) {
            const recognitionInstance = new (window as any).webkitSpeechRecognition();
            recognitionInstance.continuous = true;
            recognitionInstance.interimResults = true;
            recognitionInstance.lang = 'en-US'; // Set the language

            recognitionInstance.onresult = (event: any) => {
                const transcript = Array.from(event.results)
                    .map((result: any) => result[0].transcript)
                    .join('')
                    .toLowerCase();

                if (triggerPhrases.some(phrase => transcript.includes(phrase))) {
                    handleSOSTrigger();
                }
            };

            recognitionInstance.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                if (event.error === 'no-speech') {
                    setErrorMessage('No speech detected. Please try again.');
                } else {
                    setErrorMessage('Speech recognition error. Please check your microphone and try again.');
                }
                setIsListening(false);
            };

            recognitionInstance.onsoundend = () => {
                setIsListening(false);
            };

            setRecognition(recognitionInstance);
        } else {
            setErrorMessage('Speech recognition is not supported in your browser.');
        }
    }, []);

    const handleSOSTrigger = async () => {
        if (!user) {
            alert('Please log in to use the SOS feature');
            return;
        }

        setIsActivated(true);
        try {
            await emergencyApi.sendEmergencyAlert({
                userId: user.id,
                contacts: [],
                lastLocation: {
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                },
                panicMode: {
                    active: true,
                    recording: false,
                },
            });

            setTimeout(() => {
                alert('Emergency services and trusted contacts have been notified.');
                setIsActivated(false);
            }, 2000);
        } catch (error) {
            console.error('Failed to send SOS alert:', error);
            setIsActivated(false);
        }
    };

    const toggleListening = () => {
        if (isListening) {
            recognition?.stop();
            setIsListening(false);
            setErrorMessage(null);
        } else {
            setErrorMessage(null);
            recognition?.start();
            setIsListening(true);
        }
    };

    if (!('webkitSpeechRecognition' in window)) {
        return (
            <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg">
                Voice activation is not supported in your browser.
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    {isListening ? (
                        <Mic className="h-6 w-6 text-red-500 animate-pulse" />
                    ) : (
                        <MicOff className="h-6 w-6 text-gray-400" />
                    )}
                    <h2 className="text-xl font-semibold">Voice-Activated SOS</h2>
                </div>
                <button
                    onClick={toggleListening}
                    className={`
                        px-4 py-2 rounded-full flex items-center space-x-2
                        ${isListening
                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                        : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                    }
                    `}
                >
                    {isListening ? (
                        <>
                            <Volume2 className="h-4 w-4" />
                            <span>Stop Listening</span>
                        </>
                    ) : (
                        <>
                            <Mic className="h-4 w-4" />
                            <span>Start Listening</span>
                        </>
                    )}
                </button>
            </div>

            {errorMessage && (
                <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg mb-4 flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>{errorMessage}</span>
                </div>
            )}

            {isActivated && (
                <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4 flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>SOS Alert Activated! Notifying emergency contacts...</span>
                </div>
            )}

            <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-2">Voice Commands</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                        {triggerPhrases.map((phrase, index) => (
                            <li key={index} className="flex items-center space-x-2">
                                <Mic className="h-4 w-4 text-purple-500" />
                                <span>"{phrase}"</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-medium text-purple-800 mb-2">How it works</h3>
                    <p className="text-sm text-purple-600">
                        When activated, the system listens for specific trigger phrases. Upon detection,
                        it automatically alerts emergency contacts and shares your location with emergency services.
                    </p>
                </div>
            </div>
        </div>
    );
}