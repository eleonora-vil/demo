import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface DataTableState {
  isRender: boolean;
}

// Define the initial state using that type
const initialState: DataTableState = {
  isRender: false,
};

export const dataTableSlice = createSlice({
  name: 'dataTable',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateReRenderFunction: (state) => {
      state.isRender = !state.isRender;
    },
  },
});

export const { updateReRenderFunction } = dataTableSlice.actions;

export default dataTableSlice.reducer;
