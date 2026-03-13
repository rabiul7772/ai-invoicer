import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupFields } from '../validation';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { motion } from 'motion/react';
import { UserPlus } from 'lucide-react';

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignupFields>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data: SignupFields) => {
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
        <h2 className="text-3xl font-black gradient-text">Join the Future</h2>
        <p className="text-sm text-(--color-text-dim)">
          Create your account and start invoicing with AI
        </p>
      </div>

      <Input
        label="Full Name"
        placeholder="John Doe"
        error={errors.name?.message}
        {...register('name')}
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
        size="lg"
        isLoading={isSubmitting}
        icon={UserPlus}
      >
        Create Account
      </Button>
    </motion.form>
  );
};
