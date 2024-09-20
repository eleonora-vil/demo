import { toast } from 'react-toastify';
import { axiosClient } from '../config/axios-client';

export interface firstStepData {
  email: string;
  link: string;
}

export interface firstStepResponse {
  success: boolean;
  result: {
    message: string;
  };
}

const handleApiError = (error: any) => {
  toast.error(error.response?.data?.result?.message);
  return error;
};

export const createTraineeFirstStep = async (firstStepData: firstStepData) => {
  try {
    const response = await axiosClient.post(`/api/User/FirstStep`, firstStepData);
    const data = response.data as firstStepResponse;
    if (data.success) {
      return data;
    } else {
      toast.error(data.result.message);
      return null;
    }
  } catch (error) {
    handleApiError(error);
  }
};
