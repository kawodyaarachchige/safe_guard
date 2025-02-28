import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import {cycleApi} from "../../services/cycleApi.ts";

export interface Cycle {
    _id: string;
    startDate: string;
    flow: string;
    symptoms: string[];
    notes: string;
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

const isValidDateString = (dateString: string) => {
    return !isNaN(Date.parse(dateString));
};

// Fetch Cycles
export const fetchCycles = createAsyncThunk(
    "cycle/fetchCycles",
    async (_, { rejectWithValue }) => {
        try {
            const cycles = await cycleApi.fetchCycles();
            return cycles;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch cycles');
        }
    }
);

// Save Cycle
export const saveCycle = createAsyncThunk(
    "cycle/saveCycle",
    async (cycle: Omit<Cycle, '_id'>, { rejectWithValue }) => {
        try {
            const savedCycle = await cycleApi.saveCycle(cycle);
            return savedCycle;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to save cycle');
        }
    }
);

// Update Cycle
export const updateCycle = createAsyncThunk(
    "cycle/updateCycle",
    async (cycle: Cycle, { rejectWithValue }) => {
        try {
            const updatedCycle = await cycleApi.updateCycle(cycle);
            return updatedCycle;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to update cycle');
        }
    }
);

// Delete Cycle
export const deleteCycle = createAsyncThunk(
    "cycle/deleteCycle",
    async (id: string, { rejectWithValue }) => {
        try {
            await cycleApi.deleteCycle(id);
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
            calculateAverage(state);
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Cycles
            .addCase(fetchCycles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCycles.fulfilled, (state, action: PayloadAction<Cycle[]>) => {
                state.loading = false;
                //state.cycles = action.payload.filter(c => isValidDateString(c.startDate));
                state.cycles = action.payload;
                updateCycleDates(state);
            })
            .addCase(fetchCycles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Save Cycle
            .addCase(saveCycle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(saveCycle.fulfilled, (state, action: PayloadAction<Cycle>) => {
                state.loading = false;
                state.cycles.push(action.payload);
                updateCycleDates(state);
                calculateAverage(state);
            })
            .addCase(saveCycle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Update Cycle
            .addCase(updateCycle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCycle.fulfilled, (state, action: PayloadAction<Cycle>) => {
                state.loading = false;
                const index = state.cycles.findIndex(c => c._id === action.payload._id);
                if (index !== -1) {
                    state.cycles[index] = action.payload;
                }
                updateCycleDates(state);
                calculateAverage(state);
            })
            .addCase(updateCycle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Delete Cycle
            .addCase(deleteCycle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCycle.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.cycles = state.cycles.filter(c => c._id !== action.payload);
                updateCycleDates(state);
                calculateAverage(state);
            })
            .addCase(deleteCycle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

const calculateAverage = (state: CycleState) => {
    if (state.cycles.length > 1) {
        const totalDays = state.cycles
            .slice(0, -1)
            .reduce((acc, cycle, index) => {
                const nextCycle = state.cycles[index + 1];
                const diff = new Date(nextCycle.startDate).getTime() - new Date(cycle.startDate).getTime();
                return acc + Math.floor(diff / (1000 * 60 * 60 * 24));
            }, 0);

        state.averageCycleLength = Math.round(totalDays / (state.cycles.length - 1));
    }
};

const updateCycleDates = (state: CycleState) => {
    //const validCycles = state.cycles.filter(c => isValidDateString(c.startDate));
    const validCycles = state.cycles;
    if (validCycles.length >= 0) {
        const lastCycle = validCycles[validCycles.length - 1];
        state.lastPeriodDate = lastCycle.startDate;
        state.nextPeriodDate = calculateNextPeriodDate(lastCycle.startDate, state.averageCycleLength);
    } else {
        state.lastPeriodDate = null;
        state.nextPeriodDate = null;
    }
};

const calculateNextPeriodDate = (lastDate: string, averageLength: number): string | null => {
    if (!isValidDateString(lastDate)) return null;
    const date = new Date(lastDate);
    date.setDate(date.getDate() + averageLength);
    return date.toISOString();
};

export const { calculateAverageCycle } = cycleSlice.actions;
export default cycleSlice.reducer;