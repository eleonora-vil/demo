import { axiosClient } from '@/lib/api/config/axios-client';

interface AddTraineeRequest {
  classId: number;
  traineeId: number;
  enrollmentDate: Date;
  status: string;
  grade: number;
}

export const addTraineeToClass = async (data: AddTraineeRequest) => {
  try {
    const response = await axiosClient.post('/api/Enrollment/Add-Student-To-Class', data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllTrainee = async (classId: number) => {
  try {
    const response = await axiosClient.get(`/api/Enrollment/GetAllUserEnrollInClass/${classId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
