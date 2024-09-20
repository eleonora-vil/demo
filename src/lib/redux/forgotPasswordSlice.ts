import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
import { axiosClient } from '../api/config/axios-client';
import { link } from 'fs';
import { toast } from 'react-toastify';

//State
interface ForgotPasswordState {
  email: string;
  isEmailSubmitSuccessful?: boolean;
  isOTPSubmitSuccessful?: boolean;
}

//Initial state
const initialState: ForgotPasswordState = {
  email: '',
  isEmailSubmitSuccessful: false,
  isOTPSubmitSuccessful: false,
};

//Async thunk
export const sendEmail = createAsyncThunk('forgotPassword/sendEmail', async ({ email, link }: { email: string; link: string }, { rejectWithValue }) => {
  try {
    const { data } = await axiosClient.post(`/api/User/ForgotPass`, {
      email: email,
      link: link,
    });
    return { error: null, data };
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const sendOTP = createAsyncThunk('forgotPassword/sendOTP', async ({ email, otp }: { email: string; otp: string }, { rejectWithValue }) => {
  try {
    const { data } = await axiosClient.post(`/api/User/SubmitOTP`, {
      email: email,
      otp: otp,
    });
    return { error: null, data };
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const resetPassword = createAsyncThunk(
  'forgotPassword/resetPassword',
  async ({ email, password, confirmPassword }: { email: string; password: string; confirmPassword: string }, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.patch(`/api/User/UpdatePass`, {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      return { error: null, data };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

//Slice
const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload.email;
    },
    resetState(state) {
      state.isEmailSubmitSuccessful = false;
      state.isOTPSubmitSuccessful = false;
      state.email = '';
    },
  },
  extraReducers(builder) {
    builder.addCase(sendEmail.fulfilled, (state, action) => {
      const data = action.payload?.data;
      if (data.success) {
        state.isEmailSubmitSuccessful = true;
        toast.success(data.result.message, {
          position: 'top-center',
        });
      }
    });
    builder.addCase(sendEmail.rejected, (state, action) => {
      if (action.payload) {
        const data = action.payload as {
          success: boolean;
          result: { message: string };
        };
        if (!data.success) {
          toast.error(data.result.message, {
            position: 'top-center',
          });
        }
      }
    });
    builder.addCase(sendOTP.fulfilled, (state, action) => {
      const data = action.payload?.data;
      if (data.success) {
        state.isOTPSubmitSuccessful = true;
        toast.success(data.result.message, {
          position: 'top-center',
        });
      }
    }),
      builder.addCase(sendOTP.rejected, (state, action) => {
        if (action.payload) {
          const data = action.payload as {
            success: boolean;
            result: { message: string };
          };
          if (!data.success) {
            toast.error(data.result.message, {
              position: 'top-center',
            });
          }
        }
      });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      const data = action.payload?.data;
      if (data.success) {
        toast.success(data.result.message, {
          position: 'top-center',
        });
      }
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      if (action.payload) {
        const data = action.payload as {
          success: boolean;
          result: { message: string };
        };
        if (!data.success) {
          toast.error(data.result.message, {
            position: 'top-center',
          });
        }
      }
    });
  },
});

export const { setEmail, resetState } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;
