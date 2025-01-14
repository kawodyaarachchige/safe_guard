import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

interface Incident {
  id: string;
  type: string;
  description: string;
  location: string;
  coordinates?: Location;
  timestamp: string;
  status?: 'pending' | 'investigating' | 'resolved';
}

interface IncidentState {
  incidents: Incident[];
  loading: boolean;
  error: string | null;
}

const initialState: IncidentState = {
  incidents: [],
  loading: false,
  error: null,
};

const incidentSlice = createSlice({
  name: 'incidents',
  initialState,
  reducers: {
    addIncident: (state, action: PayloadAction<Incident>) => {
      state.incidents.unshift(action.payload);
    },
    updateIncidentStatus: (state, action: PayloadAction<{ id: string; status: string }>) => {
      const incident = state.incidents.find(inc => inc.id === action.payload.id);
      if (incident) {
        incident.status = action.payload.status as 'pending' | 'investigating' | 'resolved';
      }
    },
    clearIncidents: (state) => {
      state.incidents = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addIncident,
  updateIncidentStatus,
  clearIncidents,
  setLoading,
  setError,
} = incidentSlice.actions;
export default incidentSlice.reducer;