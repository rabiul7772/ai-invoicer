import { FormProvider } from 'react-hook-form';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ProfileHeader } from '../features/profile/components/ProfileHeader';
import { PersonalProfileForm } from '../features/profile/components/PersonalProfileForm';
import { BusinessInfoForm } from '../features/profile/components/BusinessInfoForm';
import { BrandingForm } from '../features/profile/components/BrandingForm';
import { useProfileForm } from '../features/profile/hooks/useProfileForm';
import { PageSpinner } from '../components/ui/Spinner';

const Profile = () => {
  const { methods, isPending, isSaving, isUploading, profileData, onSubmit } =
    useProfileForm();

  if (isPending) {
    return (
      <DashboardLayout>
        <PageSpinner size="lg" />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-3xl">
          <ProfileHeader
            name={profileData?.fullName}
            email={profileData?.email}
            avatarUrl={profileData?.avatarUrl}
          />

          <div className="flex flex-col gap-12">
            <PersonalProfileForm />

            <div className="h-px bg-[rgba(255,255,255,0.05)]" />

            <BusinessInfoForm />

            <div className="h-px bg-[rgba(255,255,255,0.05)]" />

            <BrandingForm isSaving={isSaving} isUploading={isUploading} />
          </div>

          <div className="mt-12 flex justify-end">
            <button
              type="submit"
              className="btn-neon-primary px-8"
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </FormProvider>
    </DashboardLayout>
  );
};

export default Profile;
