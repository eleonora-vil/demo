import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
export interface UserFormState {
  userId: string;
}

// Define the initial state using that type
const initialState: {
  user: UserFormState;
  isUpdateFormOpen: boolean;
  isCreateFormOpen: boolean;
  isCreateTraineeDialogOpen: boolean;
} = {
  user: {
    userId: '',
  },
  isUpdateFormOpen: false,
  isCreateFormOpen: false,
  isCreateTraineeDialogOpen: false,
};

export const userFormSlice = createSlice({
  name: 'userForm',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateUserForm: (state, action) => {
      state.user.userId = action.payload.userId;
    },
    setIsUpdateFormOpen: (state, action) => {
      state.isUpdateFormOpen = action.payload;
    },
    setIsCreateFormOpen: (state, action) => {
      state.isCreateFormOpen = action.payload;
    },
    setIsCreateTraineeDialogOpen: (state, action) => {
      state.isCreateTraineeDialogOpen = action.payload;
    },
  },
});

export const { updateUserForm, setIsUpdateFormOpen, setIsCreateFormOpen, setIsCreateTraineeDialogOpen } = userFormSlice.actions;

export default userFormSlice.reducer;
