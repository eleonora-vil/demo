import { toast } from 'react-toastify';
import { axiosClient } from '../config/axios-client';

export interface ResendOtpData {
  email: string;
  link: string;
}

export interface ResendOtpResponse {
  success: boolean;
  result: {
    message: string;
  };
}

export const resendOtp = async (resendOtpData: ResendOtpData) => {
  try {
    const response = await axiosClient.post(`/api/User/ReSendOTP`, resendOtpData);
    return response.data as ResendOtpResponse;
  } catch (error) {
    handleApiError(error);
  }
};

const handleApiError = (error: any) => {
  throw error;
};
