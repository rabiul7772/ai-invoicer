import { Link, useLocation } from 'react-router';
import { LoginForm } from '../features/auth/components/LoginForm';

const Login = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-(--color-bg-deep)">
      <div className="w-full max-w-md flex flex-col gap-8">
        <LoginForm />
        <p className="text-center text-sm text-(--color-text-dim)">
          Don't have an account?{' '}
          <Link
            to="/signup"
            state={location.state}
            className="text-(--color-primary) hover:underline font-bold"
          >
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
