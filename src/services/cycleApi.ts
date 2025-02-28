import axios from "axios";
import {Circle} from "@react-google-maps/api";


const API_BASE_URL = "http://localhost:5002/api/cycle/";

export const cycleApi = {
    fetchCircles: async (): Promise<Circle[]> => {
        try {
            const response = await axios.get(`${API_BASE_URL}all`);
            return response.data;
        } catch (error) {
            console.error("Error fetching circles:", error);
            throw new Error("Failed to fetch circles.");
        }
    },
    saveCircle: async (circle: Circle): Promise<Circle> => {
        try {
            const response = await axios.post(`${API_BASE_URL}save`, circle);
            return response.data;
        } catch (error) {
            console.error("Error saving circle:", error);
            throw new Error("Failed to save circle.");
        }
    },
    updateCircle: async (circle: Circle): Promise<Circle> => {
        try {
            const response = await axios.put(`${API_BASE_URL}update/${circle._id}`, circle);
            return response.data;
        } catch (error) {
            console.error("Error updating circle:", error);
            throw new Error("Failed to update circle.");
        }
    },
    deleteCircle: async (id: string): Promise<void> => {
        try {
            await axios.delete(`${API_BASE_URL}delete/${id}`);
        } catch (error) {
            console.error("Error deleting circle:", error);
            throw new Error("Failed to delete circle.");
        }
    }
};