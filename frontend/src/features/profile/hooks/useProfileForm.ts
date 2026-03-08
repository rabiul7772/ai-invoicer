import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, type ProfileFormValues } from '../validation';
import {
  useProfileQuery,
  useUpdateProfile,
  useCreateProfile
} from './useProfile';
import { uploadImage } from '../../../lib/api.cloudinary';

/**
 * Owns all profile form state.
 *
 * Key design decision: we use React Hook Form's `values` option instead of
 * `defaultValues` + useEffect.  When `values` changes (i.e. after the query
 * resolves) RHF automatically resets the form — no side-effects needed.
 */
export const useProfileForm = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { data: profileData, isPending } = useProfileQuery();
  const { createProfile, isCreating } = useCreateProfile();
  const { updateProfile, isUpdating } = useUpdateProfile();

  const isSaving = isCreating || isUpdating;

  const methods = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    // `values` keeps the form in sync with async data automatically.
    // RHF resets whenever this object reference changes (i.e. on first fetch).
    values: {
      fullName: profileData?.fullName ?? '',
      email: profileData?.email ?? '',
      businessName: profileData?.businessName ?? '',
      phoneNumber: profileData?.phoneNumber ?? '',
      address: profileData?.address ?? '',
      companyLogoUrl: profileData?.companyLogoUrl ?? '',
      avatarUrl: profileData?.avatarUrl ?? ''
    }
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      // 1. Handle Logo Upload
      const logoFile = (
        document.getElementById('companyLogo') as HTMLInputElement | null
      )?.files?.[0];

      let companyLogoUrl = data.companyLogoUrl;
      if (logoFile) {
        setIsUploading(true);
        companyLogoUrl = await uploadImage(logoFile);
        setIsUploading(false);
      }

      // 2. Handle Avatar Upload
      const avatarFile = (
        document.getElementById('avatarInput') as HTMLInputElement | null
      )?.files?.[0];

      let avatarUrl = data.avatarUrl;
      if (avatarFile) {
        avatarUrl = await uploadImage(avatarFile);
      }

      // 3. Prepare final data for backend (JSON)
      const finalData = {
        ...data,
        companyLogoUrl,
        avatarUrl
      };

      if (profileData) {
        updateProfile(finalData);
      } else {
        createProfile(finalData);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return {
    methods,
    isPending,
    isSaving,
    isUploading,
    profileData,
    onSubmit
  };
};
