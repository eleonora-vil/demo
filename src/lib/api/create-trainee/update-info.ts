import { axiosClientMultipart } from './axios-client-multi-form';
import { axiosClient } from '../config/axios-client';
export interface UpdateInfoData {
  email: string;
  body: {
    UserName: string;
    Password: string;
    FullName: string;
    Gender: string;
    Level: string;
    Address: string;
    BirthDate: Date;
    PhoneNumber: string;
    Avatar: File | undefined;
  };
}

export interface updateInfoResponse {
  success: boolean;
  result: {
    user: any;
    message: string;
  };
}

export const updateInfo = async (data: UpdateInfoData) => {
  const response = await axiosClientMultipart.put(`/api/User/UpdateInfo?email=${data.email}`, data.body);
  console.log(response.data);
  return response.data as updateInfoResponse;
};
