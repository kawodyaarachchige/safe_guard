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
    updating: {[key: string]: boolean};
    error: string | null;
    selectedContact: Contact | null;
}

const initialState: ContactState = {
    contacts: [],
    loading: false,
    updating: {},
    error: null,
    selectedContact: null,
};

export const fetchContacts = createAsyncThunk(
    "contact/fetchContacts",
    async (_, { rejectWithValue }) => {
        try {
            const contacts = await contactApi.fetchContacts();
            return contacts;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch contacts');
        }
    }
);

export const saveContact = createAsyncThunk(
    "contact/saveContact",
    async (contact: Contact, { rejectWithValue }) => {
        try {
            const savedContact = await contactApi.saveContact(contact);
            return savedContact;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to save contact');
        }
    }
);

export const updateContact = createAsyncThunk(
    "contact/updateContact",
    async (contact: Contact, { rejectWithValue }) => {
        try {
            const updatedContact = await contactApi.updateContact(contact);
            return updatedContact;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to update contact');
        }
    }
);

export const deleteContact = createAsyncThunk(
    "contact/deleteContact",
    async (id: string, { rejectWithValue }) => {
        try {
            await contactApi.deleteContact(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to delete contact');
        }
    }
);
export const getPhoneNumber = createAsyncThunk(
    "contact/getPhoneNumber",
    async (id: string, { rejectWithValue }) => {
        try {
            const phoneNumber = await contactApi.getContactNumbers();
            return phoneNumber;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to get phone number');
        }
    }
)

const contactSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        setSelectedContact: (state, action: PayloadAction<string>) => {
            state.selectedContact = state.contacts.find(contact => contact._id === action.payload) || null;
        },
        clearError: (state) => {
            state.error = null;
        },
        optimisticUpdateContact: (state, action: PayloadAction<Contact>) => {
            const index = state.contacts.findIndex(contact => contact._id === action.payload._id);
            if (index !== -1) {
                const oldContact = state.contacts[index];
                state.contacts[index] = action.payload;
                return oldContact;
            }
        }
    },
    extraReducers: (builder) => {
        builder
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
                state.error = action.payload as string;
            })

            .addCase(saveContact.pending, (state) => {
                state.error = null;
            })
            .addCase(saveContact.fulfilled, (state, action) => {
                state.contacts.unshift(action.payload);
            })
            .addCase(saveContact.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            .addCase(updateContact.pending, (state, action) => {
                state.updating[action.meta.arg._id] = true;
                state.error = null;
            })
            .addCase(updateContact.fulfilled, (state, action) => {
                const index = state.contacts.findIndex(contact => contact._id === action.payload._id);
                if (index !== -1) {
                    state.contacts[index] = action.payload;
                }
                delete state.updating[action.payload._id];
            })
            .addCase(updateContact.rejected, (state, action) => {
                if (action.meta?.arg?._id) {
                    delete state.updating[action.meta.arg._id];
                }
                state.error = action.payload as string;
            })


            .addCase(deleteContact.pending, (state, action) => {
                state.updating[action.meta.arg] = true;
                state.error = null;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.contacts = state.contacts.filter(contact => contact._id !== action.payload);
                delete state.updating[action.payload];
            })
            .addCase(deleteContact.rejected, (state, action) => {
                if (action.meta?.arg) {
                    delete state.updating[action.meta.arg];
                }
                state.error = action.payload as string;
            });
    },
});

export const { setSelectedContact, clearError, optimisticUpdateContact } = contactSlice.actions;
export default contactSlice.reducer;