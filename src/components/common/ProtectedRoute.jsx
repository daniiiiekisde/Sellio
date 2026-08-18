import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { USER_ROLES } from '../../utils/constants';
import LoadingScreen from './LoadingScreen';

/**
 * Componente de protección de rutas por autenticación y rol.
 * - Valida si la sesión está cargando y muestra loader desacoplado.
 * - Redirige a /login si no está autenticado, conservando la ruta intentada en state.
 * - Redirige al dashboard correspondiente si el rol no tiene permisos.
 */
export const ProtectedRoute = ({ allowedRoles = null, children }) => {
  const { isAuthenticated, userType, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingScreen message="Verificando credenciales..." fullScreen={true} size="md" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(userType)) {
    // Redirigir al dashboard natural del usuario si intenta entrar a una sección no permitida
    if (userType === USER_ROLES.COMPANY) {
      return <Navigate to="/company/dashboard" replace />;
    } else if (userType === USER_ROLES.SELLER) {
      return <Navigate to="/seller/dashboard" replace />;
    } else if (userType === USER_ROLES.ADMIN) {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
