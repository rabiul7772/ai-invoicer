import { User } from 'lucide-react';
import { Input } from '../../../components/ui/Input';
import { useFormContext } from 'react-hook-form';
import type { ProfileFormValues } from '../validation';

export const PersonalProfileForm = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<ProfileFormValues>();
  return (
    <div className="mb-6 sm:mb-10">
      <div className="flex items-center gap-2 mb-6 text-(--color-primary) font-bold text-sm tracking-wide uppercase">
        <User className="w-5 h-5" />
        <span>Personal Profile</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          {...register('fullName')}
          error={errors.fullName?.message}
        />
        <Input
          label="Email Address"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
      </div>
    </div>
  );
};
