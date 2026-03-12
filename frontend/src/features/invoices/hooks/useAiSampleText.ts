import { useMutation } from '@tanstack/react-query';
import { getAiSampleText } from '../api/getAiSample';
import toast from 'react-hot-toast';

export const useAiSampleText = () => {
  const mutation = useMutation({
    mutationFn: getAiSampleText,
    onSuccess: async data => {
      try {
        await navigator.clipboard.writeText(data);
        toast.success('Smart Sample copied to clipboard!');
      } catch (err) {
        toast.error('Failed to copy to clipboard');
      }
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || 'Failed to generate smart sample'
      );
    }
  });

  return {
    generateAndCopy: mutation.mutate,
    isGenerating: mutation.isPending
  };
};
