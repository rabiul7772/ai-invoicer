import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: authApi.getMe,
    retry: false,
    staleTime: 5 * 60 * 1000
  });
};

export const useLogin = (options?: { onSuccessCallback?: () => void }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: data => {
      queryClient.setQueryData(['user'], data);
      toast.success('Successfully logged in!');
      if (options?.onSuccessCallback) options.onSuccessCallback();
      else navigate('/dashboard');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  });
};

export const useRegister = (options?: { onSuccessCallback?: () => void }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: data => {
      queryClient.setQueryData(['user'], data);
      toast.success('please fill up your business info to create an invoice', {
        duration: 10000
      });
      if (options?.onSuccessCallback) options.onSuccessCallback();
      else navigate('/profile');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.clear();
      toast.success('Logged out successfully');
      navigate('/');
    }
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: () => {
      toast.success('Reset link sent to your email!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
      toast.success('Password reset successfully! Please login.');
      navigate('/login');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  });
};
