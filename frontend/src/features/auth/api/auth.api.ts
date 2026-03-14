import { api } from '../../../services/api';
import type { LoginFields, SignupFields } from '../validation';

export const authApi = {
  login: async (data: LoginFields) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
  register: async (data: SignupFields) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },
  logout: async () => {
    const response = await api.get('/auth/logout');
    return response.data;
  },
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};
