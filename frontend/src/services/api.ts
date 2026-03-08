import axios, { type AxiosResponse, type AxiosError } from 'axios';
import { BACKEND_BASE_URL } from '../constants';

// Create a global Axios instance
export const api = axios.create({
  baseURL: BACKEND_BASE_URL,
  withCredentials: true
});

// Response interceptor for error handling (optional, but good practice)
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Handle global errors here
    return Promise.reject(error);
  }
);
