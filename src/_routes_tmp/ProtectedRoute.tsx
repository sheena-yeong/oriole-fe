import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function ProtectedRoute() {
  const { isAuthenticated, initializing } = useAuth();

  if (initializing) return null;

  if (!isAuthenticated) {
    return <Navigate to="/" replace/>;
  }

  return <Outlet />;
}

export default ProtectedRoute;
