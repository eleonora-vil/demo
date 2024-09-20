import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface classDetailState {
    classDetail: any;
    hasSchedule: boolean;
}

const initialState: classDetailState = {
    classDetail: undefined,
    hasSchedule: false,
};

export const classDetailSlice = createSlice({
    name: 'classDetail',
    initialState,
    reducers: {
        setClassDetail: (state, action: PayloadAction<any>) => {
            state.classDetail = action.payload;
        },
        setHasSchedule: (state, action: PayloadAction<boolean>) => {
            state.hasSchedule = action.payload;
        },
    },
});

export const { setClassDetail, setHasSchedule } = classDetailSlice.actions;

export default classDetailSlice.reducer;
