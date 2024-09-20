import { ICreateTrainingProgramUnits } from '@/types/SyllabusDetails';
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
export const getAllSyllabuses = async () => {
  try {
    const { data } = await axiosClient.get(`/api/Syllabus/GetAllSyllaBus?pageNumber=1&pageSize=100`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getSyllabusDetailById = async (id: string) => {
  try {
    const { data } = await axiosClient.get(`/api/Syllabus/${id}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const createFullSyllabus = async (syllabus: any) => {
  try {
    const { data } = await axiosClient.post(`/api/CreateFullSyllabus/CreateFullSyllabus`, syllabus);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const createSyllabus = async (syllabus: any) => {
  try {

    if(Number(syllabus.version)<0){
      return handleApiError({response:{data:"Version is wrong"}})
    }
    
      const { data } = await axiosClient.post(`/api/Syllabus/Create`, syllabus);
      return { error: null, data };
    

  } catch (error) {
    return handleApiError(error);
  }
};
export const duplicateSyllabus = async (syllabusId: number) => {
  try {
    const { data } = await axiosClient.put(`/api/Syllabus/Duplicate/${syllabusId}`);

    return { error: null, data: data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const changeStatus = async (syllabusId: number, status: any) => {
  try {
    const { data } = await axiosClient.put(`/api/Syllabus/UpdateStatus/${syllabusId}`, { status: status });

    return { error: null, data: data.data, success: true };
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateFullSyllabus = async (
  syllabusId: string,
  syllabus: {
    name: string;
    code: string;
    level: string;
    version: string;
    courseObjectives: string;
    technicalRequirement: string;
    attendeeNumber: number;
    trainingDelivery: string;
    instructorId: number;
  },
  createTrainingProgramUnits: ICreateTrainingProgramUnits[],
  status: string,
  assessmentSchemeSyllabusModels: any[],
) => {
  try {
    const { data } = await axiosClient.put(`/api/Syllabus/Update/${syllabusId}`, {
      syllabusModel: {
        name: syllabus.name,
        code: syllabus.code,
        level: syllabus.level,
        version: syllabus.version,
        courseObjectives: syllabus.courseObjectives,
        technicalRequirement: syllabus.technicalRequirement,
        attendeeNumber: syllabus.attendeeNumber,
        trainingDelivery: syllabus.trainingDelivery?.length > 0 ? syllabus.trainingDelivery : 'string',
        description: '',
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
        createdBy: '',
        outline: 'outline',
        instructorId: syllabus?.instructorId || 1,
        status: status,
        slot: createTrainingProgramUnits?.length || 0,
        inStructorName: 'UyDev',
      },
      createTrainingProgramUnits: createTrainingProgramUnits,
      assessmentSchemeSyllabusModels: assessmentSchemeSyllabusModels || [],
    });
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const createAssessmentScheme = async ({ assessmentSchemeName, percentMark }: { assessmentSchemeName: string; percentMark: number }) => {
  try {
    const { data } = await axiosClient.post(`/api/AssessmentScheme/CreateAssessmentScheme`, {
      assessmentSchemeName: assessmentSchemeName,
      percentMark: percentMark,
    });
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getAssessmentSchemes = async () => {
  try {
    const { data } = await axiosClient.get(`/api/AssessmentScheme/GetAllAssessmentSchemes`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};
