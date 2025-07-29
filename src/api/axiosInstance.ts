import axios from 'axios';

const { VITE_BACKEND_URL } = import.meta.env

const axiosInstance = axios.create({
  baseURL: VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createAuthInstance = (token: string | null) => {
  const authInstance = axios.create({
    baseURL: VITE_BACKEND_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (token) {
    authInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete authInstance.defaults.headers.common['Authorization'];
  }

  return authInstance;
};

export default axiosInstance;