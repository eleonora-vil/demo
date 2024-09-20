import { axiosClient } from './config/axios-client';
import { axiosClientMultipart } from './create-trainee/axios-client-multi-form';

export const handleApiError = (error: any) => {
  try {
    const errorMessage = error.response?.data || 'An unexpected error occurred.';
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error('An unexpected error occurred.');
  }
};

export const getTrainingPrograms = async () => {
  try {
    const { data } = await axiosClient.get(`/api/TrainingProgram/GetAll`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

// delete training program
export const deleteTrainingProgram = async (programId: number) => {
  try {
    const { data } = await axiosClient.delete(`/api/TrainingProgram/Delete/${programId}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateTraningProgram = async (
  programId: string,
  trainingPrograms: {
    programName: string;
    startDate: Date;
  },
) => {
  try {
    const { data } = await axiosClient.put(`/api/TrainingProgram/UpdateTraningProgram/${programId}`, {
      programName: trainingPrograms.programName,
      startDate: trainingPrograms.startDate.toISOString(),
    });
    console.log(data);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const importCSV = async (File: File, DuplicateHandle: string) => {
  try {
    console.log(File, DuplicateHandle);
    const { data } = await axiosClientMultipart.post(`/api/TrainingProgram/importCSV`, {
      File: File,
      DuplicateHandle: DuplicateHandle,
    });
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const changeStatus = async (programId: number, status: any,name:string) => {
  console.log('before change', status);

  try {
    const { data } = await axiosClient.put(`/api/TrainingProgram/UpdateStatus?programId=${programId}&status=${status}&modifiedBy=${name}`);
    console.log('result', data);

    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getTrainingProgramById = async (programId: any) => {
  try {
    const { data } = await axiosClient.get(`/api/TrainingProgram/getDetails/${programId}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}