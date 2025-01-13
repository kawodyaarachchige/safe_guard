import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import locationReducer from './slices/locationSlice';
import incidentReducer from './slices/incidentSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    location: locationReducer,
    incidents: incidentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;