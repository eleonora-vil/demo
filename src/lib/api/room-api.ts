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

export const getAllRooms = async () => {
  try {
    const { data } = await axiosClient.get(`/api/Rooms/GetAllRooms`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const checkFreeSlots = async (roomId: number, date: string) => {
    const request = {
        startDate: date,
        endDate: date,
    }
  try {
    const { data } = await axiosClient.post(`/api/Rooms/${roomId}/check-free-slots`, request);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};
