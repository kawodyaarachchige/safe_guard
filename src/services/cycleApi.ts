import axios from "axios";

import Cookies from "js-cookie";
import {Cycle} from "../store/slices/cycleSlice.ts";

 const API_BASE_URL = "https://safeguard-5cfr.onrender.com/cycle/";
 // const API_BASE_URL = "http://localhost:5002/api/cycle/";

export const cycleApi = {
    fetchCycles: async (): Promise<Cycle[]> => {
        try {
            const response = await axios.get(`${API_BASE_URL}user/${Cookies.get('user_id')}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching cycles:", error);
            throw new Error("Failed to fetch cycles.");
        }
    },

    saveCycle: async (cycle: Omit<Cycle, '_id'>): Promise<Cycle> => {
        try {
            const response = await axios.post(`${API_BASE_URL}save`, cycle);
            return response.data;
        } catch (error) {
            console.error("Error saving cycle:", error);
            throw new Error("Failed to save cycle.");
        }
    },

    updateCycle: async (cycle: Cycle): Promise<Cycle> => {
        try {
            const response = await axios.put(`${API_BASE_URL}update/${cycle._id}`, cycle);
            return response.data;
        } catch (error) {
            console.error("Error updating cycle:", error);
            throw new Error("Failed to update cycle.");
        }
    },

    deleteCycle: async (id: string): Promise<void> => {
        try {
            await axios.delete(`${API_BASE_URL}delete/${id}`);
        } catch (error) {
            console.error("Error deleting cycle:", error);
            throw new Error("Failed to delete cycle.");
        }
    },
};