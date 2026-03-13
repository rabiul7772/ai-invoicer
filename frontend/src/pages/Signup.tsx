import { Link } from 'react-router';
import { SignupForm } from '../features/auth/components/SignupForm';

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-(--color-bg-deep)">
      <div className="w-full max-w-md flex flex-col gap-8">
        <SignupForm />
        <p className="text-center text-sm text-(--color-text-dim)">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-(--color-primary) hover:underline font-bold"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
