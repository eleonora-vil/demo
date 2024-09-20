import axios from 'axios';

// const BASE_URL: string | undefined = import.meta.env.BACKEND_URL;
export const BASE_URL = 'http://35.240.162.42:8887';

export const axiosClientMultipart = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});

axiosClientMultipart.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Accept = 'application/json';
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);
