import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface trainingProgramState {
    trainingProgram: any;
}

const initialState: trainingProgramState = {
    trainingProgram: undefined,
};

export const trainingProgramSlice = createSlice({
    name: 'trainingProgram',
    initialState,
    reducers: {
        setTrainingProgram: (state, action: PayloadAction<number>) => {
            state.trainingProgram = action.payload;
        }
    },
});

export const { setTrainingProgram } = trainingProgramSlice.actions;

export default trainingProgramSlice.reducer;
