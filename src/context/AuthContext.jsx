import React, { createContext, useState, useEffect } from 'react';
import { USER_ROLES } from '../utils/constants';
import authService from '../services/auth';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sellio_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sincronización inicial
    const initAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (err) {
        console.error('Error al inicializar sesión:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listener de Supabase Auth
    if (isSupabaseConfigured() && supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          const u = await authService.getCurrentUser();
          setUser(u);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      });

      return () => {
        subscription?.unsubscribe();
      };
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('sellio_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sellio_user');
    }
  }, [user]);

  const isDemoMode = Boolean(user?.isDemo || !isSupabaseConfigured() || import.meta.env.DEV);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const res = await authService.login(credentials);
      setUser(res.user);
      return res.user;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await authService.register(userData);
      // Si requiere confirmación de email, no asignamos la sesión inmediatamente
      if (!res.requiresConfirmation && res.user) {
        setUser(res.user);
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const switchRole = (newRole) => {
    if (!user) return;
    
    // Seguridad: en producción real con Supabase no se permite cambio arbitrario de rol en el cliente
    if (!isDemoMode && !user.isDemo) {
      console.warn('Cambio de rol no permitido en entorno de producción sin autorización.');
      return;
    }

    setUser(prev => ({
      ...prev,
      role: newRole,
      name: newRole === USER_ROLES.COMPANY 
        ? (prev.companyName || 'TechNova Soluciones B2B')
        : newRole === USER_ROLES.SELLER 
          ? (prev.publicAlias || 'Comercial #A482') 
          : 'Super Admin Sellio'
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        userType: user?.role || null,
        isDemoMode,
        loading,
        login,
        register,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
