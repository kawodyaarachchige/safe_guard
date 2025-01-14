import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import locationReducer from './slices/locationSlice';
import incidentReducer from './slices/incidentSlice';
import contactReducer from './slices/contactSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    location: locationReducer,
    incidents: incidentReducer,
    contacts: contactReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;