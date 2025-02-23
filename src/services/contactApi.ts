import axios from "axios";
import { Contact } from "../store/slices/contactSlice.ts";

const API_BASE_URL = "http://localhost:5002/api/contact/";

export const contactApi = {
    fetchContacts: async (): Promise<Contact[]> => {
        try {
            const response = await axios.get(`${API_BASE_URL}all`);
            return response.data;
        } catch (error) {
            console.error("Error fetching contacts:", error);
            throw new Error("Failed to fetch contacts.");
        }
    },

    saveContact: async (contact: Contact): Promise<Contact> => {
        try {
            const response = await axios.post(`${API_BASE_URL}save`, contact);
            return response.data;
        } catch (error) {
            console.error("Error saving contact:", error);
            throw new Error("Failed to save contact.");
        }
    },

    updateContact: async (contact: Contact): Promise<Contact> => {
        try {
            const response = await axios.put(`${API_BASE_URL}update/${contact._id}`, contact);
            return response.data;
        } catch (error) {
            console.error("Error updating contact:", error);
            throw new Error("Failed to update contact.");
        }
    },

    deleteContact: async (id: string): Promise<void> => {
        try {
            console.log('Deleting contact with ID:', id);
            await axios.delete(`${API_BASE_URL}delete/${id}`);
        } catch (error) {
            console.error("Error deleting contact:", error);
            throw new Error("Failed to delete contact.");
        }
    },

    getContactNumbers: async (): Promise<{ name: string; phone: string }[]> => {
        try {
            const response = await axios.get(`${API_BASE_URL}getContactNumbers/`);
            return response.data;
        } catch (error) {
            console.error("Error fetching contact numbers:", error);
            throw new Error("Failed to fetch contact numbers.");
        }
    },
};
