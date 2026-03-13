import { api } from '../../../services/api';

export const getAiSampleText = async (): Promise<string> => {
  const response = await api.get('/ai/sample');
  return response.data.data;
};
