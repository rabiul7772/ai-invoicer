import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, type ResetPasswordFields } from '../validation';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';
import { useResetPassword } from '../hooks/useAuth';
import { useParams } from 'react-router';

export const ResetPasswordForm = () => {
  const { token } = useParams();
  const { mutateAsync: resetPassword } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ResetPasswordFields>({
    resolver: zodResolver(resetPasswordSchema)
  });

  const onSubmit = async (data: ResetPasswordFields) => {
    await resetPassword({ token, password: data.password });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full max-w-md"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-black gradient-text">New Password</h2>
        <p className="text-sm text-(--color-text-dim)">
          Please enter your new password below.
        </p>
      </div>

      <Input
        label="New Password"
        type="password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register('password')}
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <Button
        type="submit"
        fullWidth
        size="md"
        isLoading={isSubmitting}
        icon={CheckCircle}
      >
        Reset Password
      </Button>
    </motion.form>
  );
};
