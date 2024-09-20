import { createSlice } from '@reduxjs/toolkit';
import { add, set } from 'date-fns';

export interface createTraineeState {
  data: any[];
  isDataValid: boolean;
  existedEmail: string[];
  invalidCount: number;
  existedCount: number;
  duplicateCount: number;
  isLoading: boolean;
  successCount: number;
}

const initialState: createTraineeState = {
  data: [],
  isDataValid: false,
  existedEmail: [],
  invalidCount: 0,
  existedCount: 0,
  duplicateCount: 0,
  isLoading: false,
  successCount: 0,
};

export const checkValidEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const handleCheckExistedEmail = (existedEmail: string[], email: string) => {
  if (existedEmail.includes(email)) {
    return true;
  }
  return false;
};

export const checkDuplicateEmail = (data: string[], email: string) => {
  return data.indexOf(email) !== data.lastIndexOf(email);
};

const createTraineeSlice = createSlice({
  name: 'createTrainee',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload.data;
    },
    setIsDataValid: (state, action) => {
      state.isDataValid = action.payload.isDataValid;
    },
    setExistedEmail: (state, action) => {
      state.existedEmail = action.payload.existedEmail;
    },
    setInvalidCount: (state, action) => {
      state.invalidCount = action.payload.invalidCount;
    },
    setExistedCount: (state, action) => {
      state.existedCount = action.payload.existedCount;
    },
    setDuplicateCount: (state, action) => {
      state.duplicateCount = action.payload.duplicateCount;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
    },
    setSuccessCount: (state, action) => {
      state.successCount = action.payload.successCount;
    },
    removeRow: (state, action) => {
      const newData = state.data.filter((data, i) => i !== action.payload.index);
      state.data = newData;
    },
    addRow: (state, action) => {
      state.data.push(action.payload.email);
    },
    checkEmailValidityAndExistence: (state) => {
      const { data, existedEmail } = state;
      const validData = data.filter((email) => checkValidEmail(email));
      const existed = data.filter((email) => handleCheckExistedEmail(existedEmail, email));
      const duplicate = data.filter((email) => checkDuplicateEmail(data, email));

      if (validData.length === data.length && existed.length === 0 && duplicate.length === 0) {
        state.isDataValid = true;
        state.invalidCount = 0;
        state.existedCount = 0;
        state.duplicateCount = 0;
      } else {
        state.isDataValid = false;
        state.invalidCount = data.length - validData.length;
        state.existedCount = existed.length;
        state.duplicateCount = duplicate.length;
      }
    },
  },
});

export const {
  setData,
  setIsDataValid,
  setExistedEmail,
  setInvalidCount,
  setExistedCount,
  setDuplicateCount,
  setIsLoading,
  setSuccessCount,
  removeRow,
  checkEmailValidityAndExistence,
  addRow,
} = createTraineeSlice.actions;
export default createTraineeSlice.reducer;
