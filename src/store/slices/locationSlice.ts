import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Location {
  latitude: number;
  longitude: number;
}

interface LocationState {
  currentLocation: Location | null;
  isTracking: boolean;
}

const initialState: LocationState = {
  currentLocation: null,
  isTracking: false,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCurrentLocation: (state, action: PayloadAction<Location>) => {
      state.currentLocation = action.payload;
    },
    setIsTracking: (state, action: PayloadAction<boolean>) => {
      state.isTracking = action.payload;
      if (!action.payload) {
        state.currentLocation = null;
      }
    },


  },
});

export const { setCurrentLocation, setIsTracking } = locationSlice.actions;
export default locationSlice.reducer;