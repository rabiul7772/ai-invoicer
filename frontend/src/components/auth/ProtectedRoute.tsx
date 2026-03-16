import { Navigate, Outlet, useLocation } from 'react-router';
import { useUser } from '../../features/auth/hooks/useAuth';

export const ProtectedRoute = ({
  children
}: {
  children?: React.ReactNode;
}) => {
  const { data: userResponse, isLoading, isError } = useUser();
  const location = useLocation();
  const user = userResponse?.data?.user;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-(--color-bg-deep) flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-(--color-primary) border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || isError) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
