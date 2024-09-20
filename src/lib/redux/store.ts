import { changeStatus } from './../api/syllabus-detail-api';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import sidebarReducer from './sidebarSlice';
import userFormReducer from './form/userFormSlice';
import currenUserReducer from './currentUserSlice';
import roleReducer from './roleSlice';
import statusReducer from './changeStatusSlice';
import dataTableReducer from './dataTableSlice';
import syllabusDetailsReducer from './syllabusDetailsSlice';
import verifyStepReducer from './verify-step';
import verifyUserReducer from './verify-user';
import createTraineeReducer from './createTraineeSlice';
import forgotPasswordReducer from './forgotPasswordSlice';
import authorizedReducer from './authorizedSlice';
import classDetailReducer from './classDetailSlice';
import trainingProgramReducer from './trainingProgramSlice';
import userReducer from './userSlice';
import roomReducer from './roomSlice';
import scheduleReducer from './scheduleSlice';
import attendeeListReducer from './attendeeListSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  sidebar: sidebarReducer,
  userForm: userFormReducer,
  currentUser: currenUserReducer,
  role: roleReducer,
  isTableRender: dataTableReducer,
  syllabusDetails: syllabusDetailsReducer,
  verifyStep: verifyStepReducer,
  verifyUser: verifyUserReducer,
  createTrainee: createTraineeReducer,
  forgotPass: forgotPasswordReducer,
  authorized: authorizedReducer,
  classDetail: classDetailReducer,
  trainingProgram: trainingProgramReducer,
  user: userReducer,
  room: roomReducer,
  schedule: scheduleReducer,
  addTrainee: attendeeListReducer,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
