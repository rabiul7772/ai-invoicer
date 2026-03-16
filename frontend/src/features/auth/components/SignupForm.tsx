import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupFields } from '../validation';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { motion } from 'motion/react';
import { UserPlus } from 'lucide-react';
import { useLocation } from 'react-router';
import { api } from '../../../services/api';

import { useRegister } from '../hooks/useAuth';

export const SignupForm = () => {
  const location = useLocation();
  const returnTo = location.state?.returnTo;
  const planId = location.state?.planId;

  const { mutate: registerUser, isPending } = useRegister(
    returnTo === 'checkout' && planId
      ? {
          onSuccessCallback: async () => {
            try {
              const response = await api.post(
                '/stripe/create-checkout-session',
                {
                  planId
                }
              );
              window.location.href = response.data.url;
            } catch (error) {
              console.error('Failed to auto-redirect to checkout', error);
              window.location.href = '/profile';
            }
          }
        }
      : undefined
  );

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignupFields>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = (data: SignupFields) => {
    registerUser(data);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full max-w-md"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-black gradient-text">Join the Future</h2>
        <p className="text-sm text-(--color-text-dim)">
          Create your account and start invoicing with AI
        </p>
      </div>

      <Input
        label="Full Name"
        placeholder="John Doe"
        error={errors.fullName?.message}
        {...register('fullName')}
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="name@company.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Password"
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
      </div>

      <Button
        type="submit"
        fullWidth
        size="md"
        isLoading={isPending}
        icon={UserPlus}
      >
        Create Account
      </Button>
    </motion.form>
  );
};
