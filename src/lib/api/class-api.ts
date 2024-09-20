import { number } from 'zod';
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

export const getAllClass = async () => {
  try {
    const { data } = await axiosClient.get('/api/Class/GetAllClass/1?pageSize=100');
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};
export const deleteClass = async (id: number) => {
    try {
        const { data } = await axiosClient.delete (
        `/api/Class/Delete/?classId=${id}`
    );
        return { error: null, data };
        } catch (error) {
         return handleApiError(error);
    };
}

export const changeStatus = async (classId: number, status: any) => {
  try {
    const { data } = await axiosClient.put(`/api/Class/UpdateStatus?id=${classId}&status=${status}`);
    return { error: null, data: data.data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

type createClassDTO = {
  className: string;
  programId: number;
  instructorId: number;
  semesterId: number;
  status: string;
};

export const createClass = async (dto: createClassDTO) => {
  console.log("dto", dto)
  try {
    console.log("dto", dto);

    if (dto.programId < 0) {
      return handleApiError({ response: { data: "Training Program have no syllabus.Please choose again" } })
    }
    const { data } = await axiosClient.post(`/api/Class/Create`, dto);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
}

export const editClass = async (classId: number, dto: any) => {
  try {
    const { data } = await axiosClient.put(`/api/Class/Update/${classId}`, dto);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
}

export const getClassDetail = async (classId: string) => {
  try {
    const { data } = await axiosClient.get(`/api/Class/Detail/${classId}`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
}

export const createSchedule = async (classId: number, semesterId: number, scheduleDetails: any) => {
  try {
    const { data } = await axiosClient.post("/create-class-schedule", { classId, semesterId, scheduleDetails });
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
}

export const getSchedule = async (classId: string) => {
  try {
    const { data } = await axiosClient.get(`/api/Class/GetClassSchedule/${classId}`);
    return { error: null, data: data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
} 

// export const deleteClass = async (classId: number) => {
//   try {
//     const { data } = await axiosClient.delete(`/api/Class/Delete`, classId);
//     return { error: null, data: data, success: true };
//   } catch (error) {
//     return handleApiError(error);
//   }
// } 