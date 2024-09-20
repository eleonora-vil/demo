import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RoleType } from '@/types/role';
import { RootState } from './store';

interface roleState {
  value: RoleType[];
}

const initialState: roleState = {
  value: [],
};

export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<RoleType[]>) => {
      state.value = action.payload;
    },
  },
});

export const { set } = roleSlice.actions;
export const selectCount = (state: RootState) => state.counter.value;

export default roleSlice.reducer;
