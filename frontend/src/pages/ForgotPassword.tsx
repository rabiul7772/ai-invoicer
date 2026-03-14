import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { ForgotPasswordForm } from '../features/auth/components/ForgotPasswordForm';

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-(--color-bg-deep)">
      <div className="w-full max-w-md flex flex-col gap-8">
        <ForgotPasswordForm />
        <Link
          to="/login"
          className="flex items-center justify-center gap-2 text-sm text-(--color-text-dim) hover:text-(--color-primary) transition-colors font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
