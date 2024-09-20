import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface userState {
    users: any[];
    schedule: any;
}

const initialState: userState = {
    users: [],
    schedule: undefined,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<any[]>) => {
            state.users = action.payload;
        },
        setSchedule: (state, action: PayloadAction<any>) => {
            state.schedule = action.payload;
        }
    },
});

export const { setUsers, setSchedule } = userSlice.actions;

export default userSlice.reducer;
