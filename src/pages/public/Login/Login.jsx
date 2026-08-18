import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Building2, Briefcase, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { USER_ROLES } from '../../../utils/constants';
import { Button } from '../../../components/common';
import './Login.css';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: USER_ROLES.COMPANY
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    try {
      const loggedUser = await login(formData);
      const userRole = loggedUser?.role || formData.role;
      
      const fromPath = location.state?.from?.pathname;
      if (fromPath && (
        (userRole === USER_ROLES.COMPANY && fromPath.startsWith('/company')) ||
        (userRole === USER_ROLES.SELLER && fromPath.startsWith('/seller')) ||
        (userRole === USER_ROLES.ADMIN && fromPath.startsWith('/admin'))
      )) {
        navigate(fromPath, { replace: true });
      } else {
        if (userRole === USER_ROLES.COMPANY) navigate('/company/dashboard', { replace: true });
        else if (userRole === USER_ROLES.SELLER) navigate('/seller/dashboard', { replace: true });
        else navigate('/admin/dashboard', { replace: true });
      }
    } catch (err) {
      setErrorMessage(err.message || 'Credenciales inválidas o error de conexión.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (role) => {
    setFormData(prev => ({ ...prev, role }));
  };

  return (
    <div className="login-card">
      <div className="login-header">
        <h1 className="login-title">Iniciar sesión</h1>
        <p className="login-subtitle">Accede a tu panel en Sellio B2B</p>
      </div>

      {errorMessage && (
        <div style={{
          padding: '0.85rem 1.1rem',
          borderRadius: '8px',
          marginBottom: '1.25rem',
          fontSize: '0.875rem',
          lineHeight: '1.4',
          background: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: '#FCA5A5'
        }}>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="login-form">
        {/* Role Selector Pills */}
        <div className="form-group">
          <label className="form-label">Acceder como:</label>
          <div className="role-selector-pills">
            <button
              type="button"
              className={`role-pill ${formData.role === USER_ROLES.COMPANY ? 'active' : ''}`}
              onClick={() => handleQuickDemo(USER_ROLES.COMPANY)}
            >
              <Building2 size={16} /> Empresa
            </button>
            <button
              type="button"
              className={`role-pill ${formData.role === USER_ROLES.SELLER ? 'active' : ''}`}
              onClick={() => handleQuickDemo(USER_ROLES.SELLER)}
            >
              <Briefcase size={16} /> Comercial
            </button>
            <button
              type="button"
              className={`role-pill ${formData.role === USER_ROLES.ADMIN ? 'active' : ''}`}
              onClick={() => handleQuickDemo(USER_ROLES.ADMIN)}
            >
              <ShieldCheck size={16} /> Admin
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">Correo electrónico</label>
          <div className="input-icon-wrapper">
            <Mail size={18} className="input-icon" />
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="nombre@empresa.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <div className="label-with-link">
            <label className="form-label" htmlFor="password">Contraseña</label>
            <a href="#recuperar" className="forgot-password-link">¿Olvidaste tu contraseña?</a>
          </div>
          <div className="input-icon-wrapper">
            <Lock size={18} className="input-icon" />
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
        </div>

        <Button type="submit" variant="primary" fullWidth size="lg" disabled={loading}>
          {loading ? 'Accediendo...' : 'Iniciar Sesión'}
        </Button>
      </form>

      <div className="login-footer">
        <p>¿Todavía no tienes cuenta en Sellio? <Link to="/register">Regístrate gratis</Link></p>
      </div>
    </div>
  );
};

export default Login;
