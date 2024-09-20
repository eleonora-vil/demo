import { axiosClient } from './config/axios-client';

export const handleApiError = (error: any) => {
  try {
    const errorMessage = error.response?.data || 'An unexpected error occurred.';
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error('An unexpected error occurred.');
  }
};

export const getAllSemester = async () => {
  try {
    const { data } = await axiosClient.get(`/api/Semester`);
    return { error: null, data: data.result };
  } catch (error) {
    return handleApiError(error);
  }
};
