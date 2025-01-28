import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CycleDay {
    date: string;
    flow: 'light' | 'medium' | 'heavy' | null;
    symptoms: string[];
    notes: string;



}

export interface CycleData {
    id: string;
    startDate: string;
    endDate: string | null;
    cycleLength: number;
    periodLength: number;
    symptoms: CycleDay[];
}

interface CycleState {
    cycles: CycleData[];
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

const cycleSlice = createSlice({
    name: 'cycle',
    initialState,
    reducers: {
        addCycle: (state, action: PayloadAction<CycleData>) => {
            state.cycles.push(action.payload);
            // Update last period date
            state.lastPeriodDate = action.payload.startDate;
            // Calculate next period date
            if (state.lastPeriodDate) {
                const nextDate = new Date(state.lastPeriodDate);
                nextDate.setDate(nextDate.getDate() + state.averageCycleLength);
                state.nextPeriodDate = nextDate.toISOString();
            }
        },
        updateCycle: (state, action: PayloadAction<CycleData>) => {
            const index = state.cycles.findIndex(cycle => cycle.id === action.payload.id);
            if (index !== -1) {
                state.cycles[index] = action.payload;
            }
        },
        deleteCycle: (state, action: PayloadAction<string>) => {
            state.cycles = state.cycles.filter(cycle => cycle.id !== action.payload);
            // Recalculate the next period date after deletion
            const isConfirmed = window.confirm('Are you sure you want to delete this cycle?');
            if (state.cycles.length > 0 && isConfirmed) {
                const lastCycle = state.cycles[state.cycles.length - 1];
                state.lastPeriodDate = lastCycle.startDate;
                const nextDate = new Date(lastCycle.startDate);
                nextDate.setDate(nextDate.getDate() + state.averageCycleLength);
                state.nextPeriodDate = nextDate.toISOString();
            } else {
                state.lastPeriodDate = null;
                state.nextPeriodDate = null;
            }
        },
        addSymptom: (state, action: PayloadAction<{ cycleId: string; day: CycleDay }>) => {
            const cycle = state.cycles.find(c => c.id === action.payload.cycleId);
            if (cycle) {
                cycle.symptoms.push(action.payload.day);
            }
        },
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

});


export const {
    addCycle,
    updateCycle,
    deleteCycle,
    addSymptom,
    calculateAverageCycle,
} = cycleSlice.actions;

export default cycleSlice.reducer;
