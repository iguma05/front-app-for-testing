import { ReactNode } from 'react';
import Cookies from 'js-cookie';
import { Navigate, useLocation } from 'react-router-dom';

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  if (Cookies.get('is_auth')) {
    return <>{children}</>;
  }
  return <Navigate to='/login' state={{ from: location }} />;
};
