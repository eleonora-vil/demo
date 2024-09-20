import { createSlice } from '@reduxjs/toolkit';
import { set } from 'date-fns';

interface VerifyStepState {
  step: number;
  isCompleted: 'completed' | 'uncompleted' | 'failed';
}

const initialState: VerifyStepState[] = [
  {
    step: 1,
    isCompleted: 'uncompleted',
  },
  {
    step: 2,
    isCompleted: 'uncompleted',
  },
];

const verifyStepSlice = createSlice({
  name: 'verifyStep',
  initialState,
  reducers: {
    setStepCompleted: (state, action) => {
      state[action.payload].isCompleted = 'completed';
    },
    setStepUncompleted: (state, action) => {
      state[action.payload].isCompleted = 'uncompleted';
    },
    setStepFailed: (state, action) => {
      state[action.payload].isCompleted = 'failed';
    },
  },
});

export const { setStepCompleted, setStepUncompleted } = verifyStepSlice.actions;
export default verifyStepSlice.reducer;
