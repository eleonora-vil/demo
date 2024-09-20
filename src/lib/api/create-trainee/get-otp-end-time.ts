import { axiosClient } from '../config/axios-client';

export interface GetOtpEndTimeResponse {
  success: boolean;
  result: {
    message: string;
    endTime: string;
  };
}

const handleApiError = (error: any) => {
  if (error.response) {
    console.error('Error in get-otp-end-time.ts', error.response.data);
  } else {
    console.error('Error in get-otp-end-time.ts', error);
  }
};

export const getOtpEndTime = async (email: string) => {
  try {
    const response = await axiosClient.get(`/api/User/GetTimeOTP?email=${email}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
