import { axiosClient } from './config/axios-client';
import { handleApiError } from './user-api';
import { AccessLevel } from '@/types/permission';
export const getData = async () => {
  try {
    const { data } = await axiosClient.get(`/api/Permission/GetAll`);

    return { error: null, data };
  } catch (error: any) {
    const code = error.response.status;

    if (code == 403) {
      error.response.data = 'You do not have permission';
    } else if (code == 500) {
      error.response.data = 'Server have problems';
    }

    return handleApiError(error);
  }
};
export const updateData = async (updateData: any) => {
  try {
    const { data } = await axiosClient.put(`/api/Permission/Update`, updateData);

    return { error: null, data };
  } catch (error: any) {
    const code = error.response.status;

    if (code == 403) {
      error.response.data = 'You do not have permission';
    } else if (code == 500) {
      error.response.data = 'Server have problems';
    } else if (code == 400) {
      error.response.data = 'Bad request';
    }

    return handleApiError(error);
  }
};

export type PermissionByRoleResponse = {
  success: boolean;
  result: {
    permission: {
      permissionId: number;
      syllabusAccess: AccessLevel;
      programAccess: AccessLevel;
      userAccess: AccessLevel;
      classAccess: AccessLevel;
      materialAccess: AccessLevel;
      roleID: number;
      role: null;
    };
  };
};

export const getPermissionByRole = async (roleId: number) => {
  console.log(roleId);
  try {
    const { data } = await axiosClient.get<PermissionByRoleResponse>(`/api/Permission/GetByRoleId/${roleId}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};
