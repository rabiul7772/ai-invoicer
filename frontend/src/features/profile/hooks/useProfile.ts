import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  getProfile as getProfileApi,
  updateProfile as updateProfileApi,
  createProfile as createProfileApi
} from '../api/profile.api';
import type { ProfileData } from '../api/profile.api';

export const PROFILE_QUERY_KEY = ['profile'];

export const useProfileQuery = () => {
  const { data, isPending } = useQuery<ProfileData, Error>({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: getProfileApi,

    retry: 1
  });

  return { data, isPending };
};

export const useCreateProfile = () => {
  const queryClient = useQueryClient();

  const { mutate: createProfile, isPending: isCreating } = useMutation<
    ProfileData,
    Error,
    Omit<ProfileData, '_id'>
  >({
    mutationFn: createProfileApi,
    onSuccess: () => {
      toast.success('Profile created successfully!');
      queryClient.invalidateQueries({
        queryKey: PROFILE_QUERY_KEY
      });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to create profile.'
      );
    }
  });

  return { createProfile, isCreating };
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const { mutate: updateProfile, isPending: isUpdating } = useMutation<
    ProfileData,
    Error,
    Partial<ProfileData>
  >({
    mutationFn: updateProfileApi,
    onSuccess: () => {
      toast.success('Profile updated successfully!');
      queryClient.invalidateQueries({
        queryKey: PROFILE_QUERY_KEY
      });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || 'Failed to update profile.'
      );
    }
  });

  return { updateProfile, isUpdating };
};
