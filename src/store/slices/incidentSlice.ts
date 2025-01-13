import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Location {
  latitude: number;
  longitude: number;
}

interface Incident {
  id: string;
  type: string;
  description: string;
  location: Location;
  timestamp: string;
}

interface IncidentState {
  incidents: Incident[];
}

const initialState: IncidentState = {
  incidents: [],
};

const incidentSlice = createSlice({
  name: 'incidents',
  initialState,
  reducers: {
    addIncident: (state, action: PayloadAction<Incident>) => {
      state.incidents.unshift(action.payload);
    },
    clearIncidents: (state) => {
      state.incidents = [];
    },
  },
});

export const { addIncident, clearIncidents } = incidentSlice.actions;
export default incidentSlice.reducer;