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
export const getOutputStandard = async (id: string) => {
  try {
    const { data } = await axiosClient.get(`/api/OutputStandard/GetOutPutStandardById/${id}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};
