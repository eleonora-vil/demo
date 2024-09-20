import { axiosClient } from '@/lib/api/config/axios-client';
import { User } from '@/types/user';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type GetAllResponse = {
  success: boolean;
  result: {
    users: User[];
  };
};

interface AttendeeState {
  allUser: User[];
  slectedAttendees: number[];
}

const initialState: AttendeeState = {
  allUser: [],
  slectedAttendees: [],
};

export const getAllTrainee = createAsyncThunk('attendeeList/getAllTrainee', async () => {
  const response = await axiosClient.get<GetAllResponse>('/api/User/GetAll');
  return response.data.result.users;
});

const attendeeListSlice = createSlice({
  name: 'attendeeList',
  initialState,
  reducers: {
    setAllUser(state, action) {
      state.allUser = action.payload;
    },
    setSelectedAttendees(state, action) {
      state.slectedAttendees = action.payload;
    },
    addSelectedAttendees(state, action) {
      state.slectedAttendees.push(action.payload);
    },
    removeSelectedAttendees(state, action) {
      state.slectedAttendees = state.slectedAttendees.filter((id) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTrainee.fulfilled, (state, action) => {
      const allUser = action.payload;
      const allTrainee = allUser.filter((user) => user.roleID === 4);
      state.allUser = allTrainee;
    });
  },
});

export const { setAllUser, setSelectedAttendees, addSelectedAttendees, removeSelectedAttendees } = attendeeListSlice.actions;
export default attendeeListSlice.reducer;
