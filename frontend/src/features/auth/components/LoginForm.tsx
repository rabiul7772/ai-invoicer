import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFields } from '../validation';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { motion } from 'motion/react';
import { LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { api } from '../../../services/api';

import { useLogin } from '../hooks/useAuth';

export const LoginForm = () => {
  const location = useLocation();
  const returnTo = location.state?.returnTo;
  const planId = location.state?.planId;

  const { mutate: login, isPending } = useLogin(
    returnTo === 'checkout' && planId
      ? {
          onSuccessCallback: async () => {
            try {
              const response = await api.post('/stripe/create-checkout-session', {
                planId
              });
              window.location.href = response.data.url;
            } catch (error) {
              console.error('Failed to auto-redirect to checkout', error);
              window.location.href = '/dashboard';
            }
          }
        }
      : undefined
  );

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'rabiulakand@gmail.com',
      password: '11223344'
    }
  });

  const onSubmit = (data: LoginFields) => {
    login(data);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full max-w-md"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-black gradient-text">Welcome Back</h2>
        <p className="text-sm text-(--color-text-dim)">
          Enter your credentials to access your account
        </p>
      </div>

      <Input
        label="Email Address"
        type="email"
        placeholder="name@company.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <div className="flex flex-col gap-2">
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />
        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-xs text-(--color-primary) transition-colors font-medium"
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      <Button
        type="submit"
        fullWidth
        size="md"
        isLoading={isPending}
        icon={LogIn}
      >
        Sign In
      </Button>
    </motion.form>
  );
};
