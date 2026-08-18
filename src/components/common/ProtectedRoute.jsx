import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { USER_ROLES } from '../../utils/constants';
import LoadingScreen from './LoadingScreen';

/**
 * Protege rutas por autenticación y rol.
 * La autorización real debe seguir respaldada por Supabase/RLS; este guard
 * controla la experiencia de navegación en el cliente.
 */
export const ProtectedRoute = ({ allowedRoles = null, children }) => {
  const { isAuthenticated, userType, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen message="Verificando credenciales…" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(userType)) {
    if (userType === USER_ROLES.COMPANY) return <Navigate to="/company/dashboard" replace />;
    if (userType === USER_ROLES.SELLER) return <Navigate to="/seller/dashboard" replace />;
    if (userType === USER_ROLES.ADMIN) return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children ?? <Outlet />;
};

export default ProtectedRoute;
