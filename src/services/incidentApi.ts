import {Incident} from "../store/slices/incidentSlice.ts";
import axios from "axios";
import Cookies from "js-cookie";
import AppClient from "../util/AppClient.ts";

 // const API_BASE_URL = 'https://safeguard-5cfr.onrender.com/api/incident/';
const API_BASE_URL = 'http://localhost:5002/api/incident/';

export const incidentApi = {
    saveIncident: async (data: Partial<Incident>): Promise<Incident> => {
        try {
            const axiosInstance = AppClient.getAxiosInstance();
            const response = await axiosInstance.post<Incident>(`${API_BASE_URL}/save`, data, {
                headers: { 'Content-Type': 'application/json' },
            });

            return response.data;
        } catch (error: any) {
            if (error.response) {
                throw new Error(`Server Error: ${error.response.data}`);
            } else if (error.request) {
           
                throw new Error("No response from server.");
            } else {
                throw new Error(`Error saving incident: ${error.message}`);
            }
        }
    },

    fetchIncidents: async (): Promise<Incident[]> => {
        try {
            const response = await fetch(`${API_BASE_URL}incidents/${Cookies.get('user_id')}`);
            if (!response.ok) {
                const errorText = await response.text(); // Read error as text
                throw new Error(`Server Error: ${errorText}`);
            }

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                console.log(response)
                return await response.json();
            } else {
                const textResponse = await response.text();
                throw new Error(`Unexpected response format: ${textResponse}`);
            }
        } catch (error) {
            console.error("Error fetching incidents:", error);
            throw error;
        }
    },
    updateIncidents: async (incident:Incident): Promise<Incident> => {

        try {
            console.log(`[*] Updating incident with ID ${incident._id}:`, incident);

            const axiosInstance = AppClient.getAxiosInstance();
            const response = await axiosInstance.put(`${API_BASE_URL}update/${incident._id}`, incident);
            return response.data;
        } catch (error) {
            console.error("Error updating incident:", error);
            throw error;
        }
    },
   deleteIncidents: async (id: string): Promise<void> => {
        try {
            const axiosInstance = AppClient.getAxiosInstance();
            await axiosInstance.delete(`${API_BASE_URL}delete/${id}`);
        } catch (error) {
            console.error("Error deleting incident:", error);
            throw error;
        }
    },


};