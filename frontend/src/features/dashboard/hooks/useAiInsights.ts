import { useQuery } from '@tanstack/react-query';
import { getAiInsights } from '../api/ai.api';

export const useAiInsights = () => {
  return useQuery({
    queryKey: ['ai-insights'],
    queryFn: getAiInsights,
    staleTime: 1000 * 60 * 30, // 30 minutes - insights don't change that often
    retry: 1
  });
};
