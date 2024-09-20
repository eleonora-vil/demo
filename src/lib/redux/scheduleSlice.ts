import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface ScheduleState {
  classId: number;
  semesterId: number;
  scheduleDetails: {
    syllabusId: number;
    slot: number;
    trainerId: number;
    roomId: number;
    date: string;
  }[];
}

// Define the initial state using that type
const initialState: ScheduleState = {
  classId: 0,
  semesterId: 0,
  scheduleDetails: [],
};

export const scheduleSlice = createSlice({
  name: 'schedule',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setClassIdAndSemesterId: (state, action) => {
      state.classId = action.payload.classId;
      state.semesterId = action.payload.semesterId;
    },
    setScheduleDetails: (
      state,
      action: PayloadAction<
        {
          syllabusId: number;
          slot: number;
          trainerId: number;
          roomId: number;
          date: string;
        }[]
      >,
    ) => {
      state.scheduleDetails = action.payload;
    },
    setScheduleDetailsField: (state, action: PayloadAction<{ 
        syllabusId: number;
        field: string; 
        value: any 
    }>) => {
        let { syllabusId, field, value } = action.payload;
        let scheduleDetails = state.scheduleDetails;

        let newScheduleDetail = scheduleDetails.find((x) => x.syllabusId === syllabusId);
        if (newScheduleDetail) {
            newScheduleDetail = {
                ...newScheduleDetail,
                [field]: value,
            }
        }
       
        console.log(newScheduleDetail);
        
        state.scheduleDetails = scheduleDetails.map((x) => {
            if (x.syllabusId === syllabusId) {
                return newScheduleDetail || {
                    syllabusId: syllabusId,
                    slot: 0,
                    trainerId: 0,
                    roomId: 0,
                    date: new Date().toISOString(),
                };
            }
            return x
        });
    },
  },
});

export const { setClassIdAndSemesterId, setScheduleDetails, setScheduleDetailsField } = scheduleSlice.actions;

export default scheduleSlice.reducer;
