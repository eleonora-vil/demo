import { link } from 'fs';
import { axiosClient } from '../config/axios-client';
import { toast } from 'react-toastify';

export interface submitData {
  emails: string[];
  link: string;
}

export const handleApiError = (error: any) => {
  console.log(error.response.data);
  const errorData = error.response.data;
  if (!errorData.success) {
    toast.error(errorData.result.message);
  }
};

export const createManyTrainee = async ({ emails, link }: submitData) => {
  try {
    const response = await axiosClient.post(`/api/User/CreateListAccount`, {
      emails: emails,
      link: link,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
