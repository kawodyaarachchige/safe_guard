import axios from "axios";


const API_BASE_URL = 'http://localhost:5002/api/emergency/';

/*export const emergencyApi = {
    sendEmergencyAlert: async (data: {
        userId: string;
        location: string;
        timestamp: string;
    }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}save`, data);
            return response.data;
        } catch (error) {
            console.error('Error sending emergency alert:', error);
            throw error;
        }
    },

}*/

export const emergencyApi = {
    sendEmergencyAlert: async (data: {
        userId: string;
        contacts: any[]; // Update this type if you have a specific interface for contacts
        lastLocation: {
            latitude: number;
            longitude: number;
        };
        panicMode: {
            active: boolean;
            recording: boolean;
        };
    }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}save`, data);
            return response.data;
        } catch (error) {
            console.error('Error sending emergency alert:', error);
            throw error;
        }
    },
};
