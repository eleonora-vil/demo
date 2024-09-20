// import { changeStatusType } from '@/types/changeStatus';

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { StatusType } from '@/types/changeStatus';

interface changeStatusState {
  value: boolean;
}

const initialState: changeStatusState = {
  value: true,
};

export const changeStatusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { set } = changeStatusSlice.actions;
export const selectCount = (state: RootState) => state.counter.value;

export default changeStatusSlice.reducer;
