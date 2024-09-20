import axios from 'axios';
import { BASE_URL, axiosClient } from './config/axios-client';
import { handleApiError } from './user-api';
type UserAccount = {
  email: string;
  password: string;
};
export const checkUser = async (params: UserAccount) => {
  // let result:any=""
  try {
    const { data } = await axiosClient.post('/api/Auth/Login', { email: params.email, password: params.password });
    // data.map((item:UserAccount)=>{
    //   if(item.username == params.username && item.password == params.password){
    //     return result=item
    //   }
    // })

    console.log(data);
    return { error: null, data };
  } catch (error: any) {
    console.log('error', error);
    if (error.code == 'ERR_NETWORK') {
      return {
        error: 'BE Server is not running',
        data: null,
      };
    }
    else if(error.status == 500 ){
      console.log(error);
      return{
        error: 'Internal Server Error',
        data: null,
      }
      
    }
    else{
      return {
        error: error?.response?.data?.result?.message || 'Wrong email or password',
        data: null,
      };
    }
    
  }
};
export const registerUser = async (params: {
  email: string;
  password: string;
  fullname: string;
  username: string;
  gender: string;
  level: string;
  address: string;
  fsu: string;
  phone: string;
}) => {
  try {
    const { data } = await axiosClient.post('/api/Auth/Signup', {
      email: params.email,
      password: params.password,
      fullname: params.username,
      username: params.username,
      gender: params.gender,
      level: params.level,
      address: params.address,
      fsu: params.fsu,
      phone: params.phone,
    });

    return { error: null, data };
  } catch (error: any) {
    console.log(error);
    if (error.code == 'ERR_NETWORK') {
      return { error: 'BE Server is not running' };
    }

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

export const checkToken = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const { data } = await axios
      .create({
        baseURL: BASE_URL,
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .get('/api/Auth/CheckToken');
    return { error: null, data };
  } catch (error) {
    return handleApiError(error);
  }
};
