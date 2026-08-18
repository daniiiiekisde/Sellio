import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Building2, Briefcase, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { USER_ROLES } from '../../utils/constants';
import Button from '../../components/Button';
import './Login.css';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: USER_ROLES.COMPANY
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(formData);
    setLoading(false);

    if (formData.role === USER_ROLES.COMPANY) navigate('/company/dashboard');
    else if (formData.role === USER_ROLES.SELLER) navigate('/seller/dashboard');
    else navigate('/admin/dashboard');
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
