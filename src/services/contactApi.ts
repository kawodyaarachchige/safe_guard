import axios from "axios";
import { Contact } from "../store/slices/contactSlice.ts";

const API_BASE_URL = "http://localhost:5002/api/contact/";

export const contactApi = {
    fetchContacts: async (): Promise<Contact[]> => {
        const response = await axios.get(`${API_BASE_URL}all`);
        return response.data;
    },

    saveContact: async (contact: Contact): Promise<Contact> => {
        const response = await axios.post(`${API_BASE_URL}save`, contact);
        return response.data;
    },

    updateContact: async (contact: Contact): Promise<Contact> => {
        const response = await axios.put(`${API_BASE_URL}update/${contact._id}`, contact);
        return response.data;
    },

    deleteContact: async (id: string): Promise<void> => {
        await axios.delete(`${API_BASE_URL}delete/${id}`);
    },
};
