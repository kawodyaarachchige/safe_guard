import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


interface CycleData {
    startDate: string;
    endDate: string;
}

interface Cycle {
    id: string;
    startDate: string;
    endDate: string;
    cycleLength: number;
    periodLength: number;
    symptoms: { date: string; flow: string; symptoms: string[]; notes: string }[];
}

interface CycleState {
    cycles: Cycle[];
    averageCycleLength: number;
    lastPeriodDate: string | null;
    nextPeriodDate: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: CycleState = {
    cycles: [],
    averageCycleLength: 28,
    lastPeriodDate: null,
    nextPeriodDate: null,
    loading: false,
    error: null,
};

export const fetchCycles = createAsyncThunk(
    'cycle/fetchCycles',
    async (_, { rejectWithValue }) => {
        try {
            // Simulate an API call to fetch cycles
            const response = await fetch('/api/cycles');
            const data = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch cycles');
        }
    }
);

export const saveCycle = createAsyncThunk(
    'cycle/saveCycle',
    async (cycle: CycleData, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/cycles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cycle),
            });
            const data = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to save cycle');
        }
    }
);

export const updateCycle = createAsyncThunk(
    'cycle/updateCycle',
    async (cycle: CycleData, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/cycles/${cycle.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cycle),
            });
            const data = await response.json();
            return data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to update cycle');
        }
    }
);

export const deleteCycle = createAsyncThunk(
    'cycle/deleteCycle',
    async (id: string, { rejectWithValue }) => {
        try {

            await fetch(`/api/cycles/${id}`, {
                method: 'DELETE',
            });
            return id;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to delete cycle');
        }
    }
);


const cycleSlice = createSlice({
    name: 'cycle',
    initialState,
    reducers: {

        calculateAverageCycle: (state) => {
            if (state.cycles.length > 1) {
                const totalLength = state.cycles.reduce((sum, cycle, index) => {
                    if (index === state.cycles.length - 1) return sum;
                    const currentStart = new Date(cycle.startDate);
                    const nextStart = new Date(state.cycles[index + 1].startDate);
                    return sum + Math.floor((nextStart.getTime() - currentStart.getTime()) / (1000 * 60 * 60 * 24));
                }, 0);
                state.averageCycleLength = Math.round(totalLength / (state.cycles.length - 1));
            }
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchCycles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCycles.fulfilled, (state, action: PayloadAction<CycleData[]>) => {
                state.loading = false;
                state.cycles = action.payload;
                // Update lastPeriodDate and nextPeriodDate based on fetched data
                if (state.cycles.length > 0) {
                    const lastCycle = state.cycles[state.cycles.length - 1];
                    state.lastPeriodDate = lastCycle.startDate;
                    const nextDate = new Date(lastCycle.startDate);
                    nextDate.setDate(nextDate.getDate() + state.averageCycleLength);
                    state.nextPeriodDate = nextDate.toISOString();
                }
            })
            .addCase(fetchCycles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


            .addCase(saveCycle.pending, (state) => {
                state.error = null;
            })
            .addCase(saveCycle.fulfilled, (state, action: PayloadAction<CycleData>) => {
                state.cycles.push(action.payload);
                // Update lastPeriodDate and nextPeriodDate
                state.lastPeriodDate = action.payload.startDate;
                const nextDate = new Date(action.payload.startDate);
                nextDate.setDate(nextDate.getDate() + state.averageCycleLength);
                state.nextPeriodDate = nextDate.toISOString();
            })
            .addCase(saveCycle.rejected, (state, action) => {
                state.error = action.payload as string;
            })


            .addCase(updateCycle.pending, (state) => {
                state.error = null;
            })
            .addCase(updateCycle.fulfilled, (state, action: PayloadAction<CycleData>) => {
                const index = state.cycles.findIndex(cycle => cycle.id === action.payload.id);
                if (index !== -1) {
                    state.cycles[index] = action.payload;
                }
            })
            .addCase(updateCycle.rejected, (state, action) => {
                state.error = action.payload as string;
            })

            .addCase(deleteCycle.pending, (state) => {
                state.error = null;
            })
            .addCase(deleteCycle.fulfilled, (state, action: PayloadAction<string>) => {
                state.cycles = state.cycles.filter(cycle => cycle.id !== action.payload);

                if (state.cycles.length > 0) {
                    const lastCycle = state.cycles[state.cycles.length - 1];
                    state.lastPeriodDate = lastCycle.startDate;
                    const nextDate = new Date(lastCycle.startDate);
                    nextDate.setDate(nextDate.getDate() + state.averageCycleLength);
                    state.nextPeriodDate = nextDate.toISOString();
                } else {
                    state.lastPeriodDate = null;
                    state.nextPeriodDate = null;
                }
            })
            .addCase(deleteCycle.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});


export const { calculateAverageCycle } = cycleSlice.actions;
export default cycleSlice.reducer;