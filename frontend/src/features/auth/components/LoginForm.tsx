import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFields } from '../validation';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { motion } from 'motion/react';
import { LogIn } from 'lucide-react';
import { Link } from 'react-router';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFields) => {
    // Logic will be added later
    console.log(data);
    await new Promise(resolve => setTimeout(resolve, 1000));
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
        size="lg"
        isLoading={isSubmitting}
        icon={LogIn}
      >
        Sign In
      </Button>
    </motion.form>
  );
};
