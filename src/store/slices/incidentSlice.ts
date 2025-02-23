import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {incidentApi} from "../../services/incidentApi.ts";
import {contactApi} from "../../services/contactApi.ts";


export interface Incident {
  _id: string;
  type: string;
  description: string;
  location: string;
  timestamp: string;
  status?: 'pending' | 'investigating' | 'resolved';
}

export interface IncidentState {
  incidents: Incident[];
  loading: boolean;
  error: string | null;
}

export const initialState: IncidentState = {
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

export const updateIncident = createAsyncThunk(
    'incidents/updateIncident',
    async (incident: Incident, { rejectWithValue }) => {
        try {
            const updatedIncident = await incidentApi.updateIncidents(incident);
            console.log(`Updated incident with ID ${incident._id}:`, updatedIncident);
            return updatedIncident;
        } catch (error) {
            console.error('Error updating incident:', error);
            return rejectWithValue(error.message || 'Failed to update incident');
        }
    }
);
export const deleteIncident = createAsyncThunk(
  'incidents/deleteIncident',
  async (incidentId: string, { rejectWithValue }) => {
    try {
      await incidentApi.deleteIncidents(incidentId);
      return incidentId;
    } catch (error) {
      console.error('Error deleting incident:', error);
      return rejectWithValue(error.message || 'Failed to delete incident');
    }
  }
)
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
          state.error = action.error.message || 'Failed to fetch incidents';
        })

        .addCase(updateIncident.fulfilled, (state, action) => {
            const index = state.incidents.findIndex(incident => incident._id === action.payload._id);
            if (index !== -1) {
                state.incidents[index] = action.payload; // Ensure the correct update
            }
        })
        .addCase(updateIncident.rejected, (state, action) => {
            state.error = action.error.message || 'Failed to update incident status';
        })

        .addCase(deleteIncident.fulfilled, (state, action) => {
            state.incidents = state.incidents.filter(incident => incident._id !== action.payload);
        })
        .addCase(deleteIncident.rejected, (state, action) => {
            state.error = action.error.message || 'Failed to delete incident';
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