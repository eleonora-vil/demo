import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface roomState {
    rooms: any[];
}

const initialState: roomState = {
    rooms: [],
};

export const roomSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setRooms: (state, action: PayloadAction<any[]>) => {
            state.rooms = action.payload;
        }
    },
});

export const { setRooms } = roomSlice.actions;

export default roomSlice.reducer;
