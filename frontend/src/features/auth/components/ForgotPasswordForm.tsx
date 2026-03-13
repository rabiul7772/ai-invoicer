import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, type ForgotPasswordFields } from '../validation';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { motion } from 'motion/react';
import { Send } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ForgotPasswordFields>({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const onSubmit = async (data: ForgotPasswordFields) => {
    console.log(data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Reset link sent to your email!');
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 w-full max-w-md"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-black gradient-text">Reset Password</h2>
        <p className="text-sm text-(--color-text-dim)">
          Enter your registered email, we'll send you a link to reset your
          password.
        </p>
      </div>

      <Input
        label="Email Address"
        type="email"
        placeholder="name@company.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <Button
        type="submit"
        fullWidth
        size="lg"
        isLoading={isSubmitting}
        icon={Send}
      >
        Send Reset Link
      </Button>
    </motion.form>
  );
};
