import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { USER_ROLES } from '../../utils/constants';

/**
 * Componente de protección de rutas por autenticación y rol.
 * - Valida si la sesión está cargando y muestra loader.
 * - Redirige a /login si no está autenticado, conservando la ruta intentada en state.
 * - Redirige al dashboard correspondiente si el rol no tiene permisos.
 */
export const ProtectedRoute = ({ allowedRoles = null, children }) => {
  const { isAuthenticated, userType, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-primary, #0B0F19)',
        color: 'var(--text-primary, #F8FAFC)',
        fontFamily: 'var(--font-sans, system-ui, sans-serif)'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(255, 255, 255, 0.1)',
          borderTopColor: 'var(--color-primary, #3B82F6)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          marginBottom: '1rem'
        }} />
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #94A3B8)' }}>
          Verificando credenciales...
        </p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
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
