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

  authInstance.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.warn('Token non valido o scaduto, reindirizzo al login...');
        localStorage.removeItem('token');
        window.location.replace('/login');
      }
      return Promise.reject(error);
    }
  );

  return authInstance;
};

export default axiosInstance;