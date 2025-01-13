// Mock API service
interface User {
  id: string;
  name: string;
  email: string;
}

interface Location {
  latitude: number;
  longitude: number;
}

interface EmergencyAlert {
  userId: string;
  location: Location | null;
  timestamp: string;
}

interface Incident {
  id: string;
  type: string;
  description: string;
  location: Location;
  timestamp: string;
}

// Simulated delay function
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  login: async (email: string, password: string): Promise<User> => {
    await delay(1000); // Simulate API call
    if (email && password) {
      return {
        id: '1',
        name: 'Tharu Arachchige',
        email,
      };
    }
    throw new Error('Invalid credentials');
  },

  signup: async (name: string, email: string, password: string): Promise<User> => {
    await delay(1000); // Simulate API call
    if (name && email && password) {
      return {
        id: '1',
        name,
        email,
      };
    }
    throw new Error('Failed to create account');
  },

  sendEmergencyAlert: async (alert: EmergencyAlert): Promise<void> => {
    await delay(1000); // Simulate API call
    console.log('Emergency alert sent:', alert);
  },

  reportIncident: async (data: Partial<Incident>): Promise<Incident> => {
    await delay(1000); // Simulate API call
    return {
      id: Date.now().toString(),
      type: data.type || '',
      description: data.description || '',
      location: data.location || { latitude: 0, longitude: 0 },
      timestamp: new Date().toISOString(),
    };
  },
};