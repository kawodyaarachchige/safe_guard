import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Contact {
  id: string;
  name: string;
  phone: string;
}

interface EmergencyState {
  contacts: Contact[];
  lastLocation: {
    latitude: number | null;
    longitude: number | null;
  };
  panicMode: {
    active: boolean;
    recording: boolean;
  };
}

const initialState: EmergencyState = {
  contacts: [],
  lastLocation: {
    latitude: null,
    longitude: null,
  },
  panicMode: {
    active: false,
    recording: false,
  },
};

const emergencySlice = createSlice({
  name: 'emergency',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
    },
    removeContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    },
    updateLocation: (state, action: PayloadAction<{ latitude: number; longitude: number }>) => {
      state.lastLocation = action.payload;
    },
    togglePanicMode: (state) => {
      state.panicMode.active = !state.panicMode.active;
    },
    setRecording: (state, action: PayloadAction<boolean>) => {
      state.panicMode.recording = action.payload;
    },
  },
});

export const { addContact, removeContact, updateLocation, togglePanicMode, setRecording } = emergencySlice.actions;
export default emergencySlice.reducer;
