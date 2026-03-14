import { api } from '../../../services/api';

export const seedApi = {
  seedDemoData: async () => {
    const response = await api.post('/seed/demo');
    return response.data;
  }
};
