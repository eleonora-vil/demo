import { createSlice } from '@reduxjs/toolkit';

interface VerifyUserState {
  email: string;
}

const initialState: VerifyUserState = {
  email: '',
};

const verifyUserSlice = createSlice({
  name: 'verifyUser',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload.email;
    },
  },
});

export const { setEmail } = verifyUserSlice.actions;
export default verifyUserSlice.reducer;
