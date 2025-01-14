import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Contact {
    id: string;
    name: string;
    phone: string;
    email: string;
    relationship: string;
    isEmergencyContact: boolean;
    lastUpdated: string;
}

interface ContactState {
    contacts: Contact[];
    loading: boolean;
    error: string | null;
    selectedContact: Contact | null;
}

const initialState: ContactState = {
    contacts: [],
    loading: false,
    error: null,
    selectedContact: null,
};

const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        // Create
        addContact: (state, action: PayloadAction<Contact>) => {
            state.contacts.push(action.payload);
        },

        // Read
        setSelectedContact: (state, action: PayloadAction<string>) => {
            state.selectedContact = state.contacts.find(contact => contact.id === action.payload) || null;
        },

        // Update
        updateContact: (state, action: PayloadAction<Contact>) => {
            const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
            if (index !== -1) {
                state.contacts[index] = action.payload;
            }
        },

        // Delete
        deleteContact: (state, action: PayloadAction<string>) => {
            state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
        },

        // Bulk actions
        setContacts: (state, action: PayloadAction<Contact[]>) => {
            state.contacts = action.payload;
        },

        // Status management
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },

        clearError: (state) => {
            state.error = null;
        },
    },
});

export const {
    addContact,
    setSelectedContact,
    updateContact,
    deleteContact,
    setContacts,
    setLoading,
    setError,
    clearError,
} = contactSlice.actions;

export default contactSlice.reducer;