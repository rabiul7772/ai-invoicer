import { Briefcase } from 'lucide-react';
import { Input } from '../../../components/ui/Input';
import { Textarea } from '../../../components/ui/Textarea';
import { useFormContext } from 'react-hook-form';
import type { ProfileFormValues } from '../validation';

export const BusinessInfoForm = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<ProfileFormValues>();
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-6 text-(--color-primary) font-bold text-sm tracking-wide uppercase">
        <Briefcase className="w-5 h-5" />
        <span>Business Information</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Input
          label="Business Name"
          {...register('businessName')}
          error={errors.businessName?.message}
        />
        <Input
          label="Phone Number"
          type="tel"
          {...register('phoneNumber')}
          error={errors.phoneNumber?.message}
        />
      </div>

      <Textarea
        label="Address"
        {...register('address')}
        error={errors.address?.message}
        rows={4}
      />
    </div>
  );
};
