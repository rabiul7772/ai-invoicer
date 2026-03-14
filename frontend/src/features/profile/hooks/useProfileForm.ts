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
import { useUser } from '../../auth/hooks/useAuth';
import { toast } from 'react-hot-toast';

/**
 * Owns all profile form state.
 *
 * Key design decision: we use React Hook Form's `values` option instead of
 * `defaultValues` + useEffect.  When `values` changes (i.e. after the query
 * resolves) RHF automatically resets the form — no side-effects needed.
 */
export const useProfileForm = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { data: profileData, isPending: isProfilePending } = useProfileQuery();
  const { data: userData, isPending: isUserPending } = useUser();
  const { createProfile, isCreating } = useCreateProfile();
  const { updateProfile, isUpdating } = useUpdateProfile();

  const isSaving = isCreating || isUpdating;
  const isPending = isProfilePending || isUserPending;

  const user = userData?.data?.user;

  const methods = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    // `values` keeps the form in sync with async data automatically.
    // RHF resets whenever this object reference changes (i.e. on first fetch).
    values: {
      fullName: profileData?.fullName ?? user?.fullName ?? '',
      email: profileData?.email ?? user?.email ?? '',
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
      const logoInput = document.getElementById(
        'companyLogo'
      ) as HTMLInputElement | null;
      const logoFile = logoInput?.files?.[0];

      let companyLogoUrl = data.companyLogoUrl;

      // Mandatory check for company logo
      if (!companyLogoUrl && !logoFile) {
        toast.error('Please upload your company logo');
        // If the input exists, we can focus it or highlight it
        return;
      }

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
        companyLogoUrl: companyLogoUrl || '',
        avatarUrl: avatarUrl || ''
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
    userData,
    onSubmit
  };
};
