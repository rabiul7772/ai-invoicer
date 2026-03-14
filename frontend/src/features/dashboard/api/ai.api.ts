import { api } from '../../../services/api';

export interface AiInsight {
  icon: string;
  iconColor: string;
  content: string;
}

export const getAiInsights = async (): Promise<AiInsight[]> => {
  const response = await api.get('/ai/insights');
  return response.data.data;
};
