import axios from "axios";
import { Contact } from "../store/slices/contactSlice.ts";
import Cookies from "js-cookie";
import AppClient from "../util/AppClient.ts";

const API_BASE_URL = "https://safeguard-5cfr.onrender.com/api/contact/";
 // const API_BASE_URL = "http://localhost:5002/api/contact/";

export const contactApi = {
    fetchContacts: async (): Promise<Contact[]> => {
        try {
            const response = await axios.get(`${API_BASE_URL}user/${Cookies.get('user_id')}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching contacts:", error);
            throw new Error("Failed to fetch contacts.");
        }
    },

    saveContact: async (contact: Contact): Promise<Contact> => {
        try {
            const axiosInstance = AppClient.getAxiosInstance();
            const response = await axiosInstance.post(`${API_BASE_URL}save`, contact);
            return response.data;
        } catch (error) {
            console.error("Error saving contact:", error);
            throw new Error("Failed to save contact.");
        }
    },

    updateContact: async (contact: Contact): Promise<Contact> => {
        try {
            const axiosInstance = AppClient.getAxiosInstance();
            const response = await axiosInstance.put(`${API_BASE_URL}update/${contact._id}`, contact);
            return response.data;
        } catch (error) {
            console.error("Error updating contact:", error);
            throw new Error("Failed to update contact.");
        }
    },

    deleteContact: async (id: string): Promise<void> => {
        try {
            const axiosInstance = AppClient.getAxiosInstance();
            console.log('Deleting contact with ID:', id);
            await axiosInstance.delete(`${API_BASE_URL}delete/${id}`);
        } catch (error) {
            console.error("Error deleting contact:", error);
            throw new Error("Failed to delete contact.");
        }
    },

    getContactNumbers: async (): Promise<{ name: string; phone: string }[]> => {
        try {
            const response = await axios.get(`${API_BASE_URL}getContactNumbers/${Cookies.get('user_id')}`);
            return response.data? response.data : [];
        } catch (error) {
            console.error("Error fetching contact numbers:", error);
            throw new Error("Failed to fetch contact numbers.");
        }
    },
};
