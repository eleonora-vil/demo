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

export const getAllRoleApi = async () => {
  try {
    const { data } = await axiosClient.get(`/api/UserRoles`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const changeRoleApi = async (userId: number, roleId: number) => {
  try {
    console.log(`/api/User/ChangeRole/${roleId}/${userId}`);
    const { data } = await axiosClient.put(`/api/User/ChangeRole/${roleId}/${userId}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};
