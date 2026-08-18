import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { USER_ROLES } from '../../utils/constants';

export const Dashboard = () => {
  const { userType, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (userType === USER_ROLES.COMPANY) {
    return <Navigate to="/company/dashboard" replace />;
  } else if (userType === USER_ROLES.SELLER) {
    return <Navigate to="/seller/dashboard" replace />;
  } else if (userType === USER_ROLES.ADMIN) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Navigate to="/" replace />;
};

export default Dashboard;
