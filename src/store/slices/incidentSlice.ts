import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {incidentApi} from "../../services/incidentApi.ts";


interface Incident {
  _id: string;
  type: string;
  description: string;
  location: string;
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

export const fetchIncidents = createAsyncThunk(
    'incidents/fetchIncidents',
    async (_, { rejectWithValue }) => {
      try {
        const incidents = await incidentApi.fetchIncidents(); // Use the API function
        console.log('API Response:', incidents); // Log the API response
        return incidents; // Return the array of incidents
      } catch (error) {
        console.error('Error fetching incidents:', error); // Log the error
        return rejectWithValue(error.message || 'Failed to fetch incidents');
      }
    }
);

const incidentSlice = createSlice({
  name: 'incidents',
  initialState,
  reducers: {
    saveIncident: (state, action) => {
      state.incidents.unshift(action.payload);
    },
    updateIncidentStatus: (state, action) => {
      const incident = state.incidents.find(inc => inc._id === action.payload._id);
      if (incident) {
        incident.status = action.payload.status;
      }
    },
    clearIncidents: (state) => {
      state.incidents = [];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchIncidents.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchIncidents.fulfilled, (state, action) => {
          state.loading = false;
          state.incidents = action.payload; // Populate incidents with the API response
        })
        .addCase(fetchIncidents.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
  },
});

export const {
  saveIncident,
  updateIncidentStatus,
  clearIncidents,
  setLoading,
  setError,
} = incidentSlice.actions;
export default incidentSlice.reducer;