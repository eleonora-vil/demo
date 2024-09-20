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

export const getAllUsers = async () => {
  try {
    const { data } = await axiosClient.get(`/api/User/GetAll?page=1`);
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

export const getUserById = async (userId: string) => {
  try {
    const { data } = await axiosClient.get(`/api/User/GetBy/${userId}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};
export const deleteUser = async (userId: number) => {
  try {
    const { data } = await axiosClient.delete(`/api/User/Delete/${userId}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateUser = async (
  userId: string,
  user: {
    userName: string;
    fullName: string;
    email?: string;
    dateOfBirth: Date;
    gender: string;
    level: string;
    address: string;
    phoneNumber: string;
    password?: string;
    avatar?: File;
  },
) => {
  try {
    const { data } = await axiosClient.put(`/api/User/Update/${userId}`, {
      userName: user.userName,
      fullName: user.fullName,
      email: user.email,
      birthDate: user.dateOfBirth.toISOString(),
      gender: user.gender.toLocaleLowerCase(),
      level: user.level,
      address: user.address,
      phoneNumber: user.phoneNumber,
    });
    console.log(data);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const createUser = async (user: {
  currentUserName: string;
  roleName: string;
  userName: string;
  password: string;
  fullName: string;
  email: string;
  gender: string;
  level: string;
  address: string;
  birthDate: Date;
  phoneNumber: string;
  status: string;
}) => {
  try {
    const { data } = await axiosClient.post(`/api/User/Create`, {
      currentUserName: user.fullName,
      roleName: user.roleName,
      userName: user.userName,
      password: user.password,
      fullName: user.fullName,
      email: user.email,
      gender: user.gender,
      level: user.level,
      address: user.address,
      birthDate: user.birthDate.toISOString(),
      phoneNumber: user.phoneNumber,
      status: user.status,
    });
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};
export const changeStatus = async (userId: number, status: any) => {
  console.log('before change', status);

  try {
    const { data } = await axiosClient.put(`/api/User/ChangeStatus/${userId}`, { status: status });
    console.log('result', data);

    // return { error: null, data: data.data, success: true };
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getAllExistedEmails = async () => {
  try {
    const { data } = await axiosClient.get(`/api/User/GetAll`);
    const emails = data?.result?.users?.map((user: any) => user.email);
    return { error: null, data: emails };
  } catch (error) {
    return handleApiError(error);
  }
};

export const getUserTrainingCalendar = async (userId: string) => {
  try {
    const { data } = await axiosClient.get(`/api/ViewTrainingCalendar/View-Training-Calendar?startDay=2000-01-01&endDate=2030-01-01&userID=${userId}`);
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
}