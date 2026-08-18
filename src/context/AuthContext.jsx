import React, { createContext, useState, useEffect } from 'react';
import { USER_ROLES } from '../utils/constants';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sellio_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('sellio_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sellio_user');
    }
  }, [user]);

  const login = async (userData) => {
    setLoading(true);
    // Mock login behavior for initial MVP structure
    const authenticatedUser = {
      id: userData.id || 'usr_demo_123',
      name: userData.name || (userData.role === USER_ROLES.COMPANY ? 'TechNova Soluciones B2B' : 'Carlos Méndez (Comercial)'),
      email: userData.email || 'demo@sellio.com',
      role: userData.role || USER_ROLES.COMPANY,
      avatar: userData.avatar || null,
      companyName: userData.role === USER_ROLES.COMPANY ? 'TechNova SL' : null
    };

    setUser(authenticatedUser);
    localStorage.setItem('sellio_token', 'mock_jwt_token_sample');
    setLoading(false);
    return authenticatedUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sellio_user');
    localStorage.removeItem('sellio_token');
  };

  const switchRole = (newRole) => {
    if (!user) return;
    setUser(prev => ({
      ...prev,
      role: newRole,
      name: newRole === USER_ROLES.COMPANY 
        ? 'TechNova Soluciones B2B' 
        : newRole === USER_ROLES.SELLER 
          ? 'Carlos Méndez (Comercial)' 
          : 'Super Admin Sellio'
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        userType: user?.role || null,
        loading,
        login,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
