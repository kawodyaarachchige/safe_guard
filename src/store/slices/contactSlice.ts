import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { contactApi } from "../../services/contactApi.ts";

export interface Contact {
    _id: string;
    name: string;
    phone: string;
    email: string;
    relationship: string;
    isEmergencyContact: boolean;
    lastUpdated: string;
    isFavorite: boolean;
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

export const fetchContacts = createAsyncThunk("contact/fetchContacts", async () => {
    return await contactApi.fetchContacts();
});

export const saveContact = createAsyncThunk("contact/saveContact", async (contact: Contact) => {
    return await contactApi.saveContact(contact);
});

export const updateContact = createAsyncThunk("contact/updateContact", async (contact: Contact) => {
    return await contactApi.updateContact(contact);
});

export const deleteContact = createAsyncThunk("contact/deleteContact", async (id: string) => {
    await contactApi.deleteContact(id);
    return id; // Return ID to filter out from state
});

const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        // Set selected contact
        setSelectedContact: (state, action: PayloadAction<string>) => {
            state.selectedContact = state.contacts.find(contact => contact._id === action.payload) || null;
        },
        // Clear error
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Contacts
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts = action.payload;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch contacts';
            })

            // Save Contact
            .addCase(saveContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(saveContact.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts.push(action.payload);
            })
            .addCase(saveContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to save contact';
            })

            // Update Contact
            .addCase(updateContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateContact.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.contacts.findIndex(contact => contact._id === action.payload._id);
                if (index !== -1) {
                    state.contacts[index] = action.payload;
                }
            })
            .addCase(updateContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to update contact';
            })

            // Delete Contact
            .addCase(deleteContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts = state.contacts.filter(contact => contact._id !== action.payload);
            })
            .addCase(deleteContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to delete contact';
            });
    },
});

export const { setSelectedContact, clearError } = contactSlice.actions;
export default contactSlice.reducer;