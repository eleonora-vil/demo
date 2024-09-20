import { axiosClient } from '../config/axios-client';

interface submitData {
  email: string;
  otp: string;
}

export interface submitOtpResponse {
  success: boolean;
  result: {
    message: string;
  };
}

const handleError = (error: any) => {
  if (error.response) {
    return error.response.data;
  }
  return error;
};

export const submitOtp = async ({ email, otp }: submitData) => {
  try {
    const response = await axiosClient.post('/api/User/SubmitOTP', {
      email,
      otp,
    });
    const data: submitOtpResponse = response.data;
    return data;
  } catch (error) {
    return handleError(error);
  }
};
