import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Building2, Briefcase, MapPin } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { USER_ROLES, SECTORS, REGIONS } from '../../../utils/constants';
import { Button } from '../../../components/common';
import './Register.css';

export const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState(USER_ROLES.COMPANY);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    sector: SECTORS[0],
    region: REGIONS[0],
    companyName: ''
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);
    try {
      const res = await register({
        email: formData.email,
        password: formData.password,
        role,
        profileData: {
          displayName: formData.name,
          companyName: formData.companyName,
          sector: formData.sector,
          region: formData.region
        }
      });

      if (res?.requiresConfirmation) {
        setStatusMessage({
          type: 'info',
          text: '¡Cuenta creada! Hemos enviado un enlace de confirmación a tu correo. Por favor confírmalo antes de iniciar sesión.'
        });
      } else {
        if (role === USER_ROLES.COMPANY) navigate('/company/dashboard');
        else navigate('/seller/dashboard');
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Ocurrió un error al registrar la cuenta.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-card">
      <div className="register-header">
        <h1 className="register-title">Crear cuenta en Sellio</h1>
        <p className="register-subtitle">Elige tu tipo de perfil para comenzar</p>
      </div>

      {/* Role Selection Cards */}
      <div className="register-role-grid">
        <div
          className={`register-role-option ${role === USER_ROLES.COMPANY ? 'active' : ''}`}
          onClick={() => setRole(USER_ROLES.COMPANY)}
        >
          <div className="option-icon-box">
            <Building2 size={24} />
          </div>
          <div className="option-info">
            <span className="option-title">Soy Empresa / Marca</span>
            <span className="option-sub">Quiero publicar productos y encontrar vendedores</span>
          </div>
        </div>

        <div
          className={`register-role-option ${role === USER_ROLES.SELLER ? 'active' : ''}`}
          onClick={() => setRole(USER_ROLES.SELLER)}
        >
          <div className="option-icon-box">
            <Briefcase size={24} />
          </div>
          <div className="option-info">
            <span className="option-title">Soy Comercial / Agente</span>
            <span className="option-sub">Busco productos y empresas para representar</span>
          </div>
        </div>
      </div>

      {statusMessage && (
        <div style={{
          padding: '0.85rem 1.1rem',
          borderRadius: '8px',
          marginBottom: '1.25rem',
          fontSize: '0.875rem',
          lineHeight: '1.4',
          background: statusMessage.type === 'info' ? 'rgba(59, 130, 246, 0.12)' : 'rgba(239, 68, 68, 0.12)',
          border: `1px solid ${statusMessage.type === 'info' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          color: statusMessage.type === 'info' ? '#93C5FD' : '#FCA5A5'
        }}>
          {statusMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label className="form-label" htmlFor="name">
            {role === USER_ROLES.COMPANY ? 'Nombre de contacto o responsable' : 'Nombre y apellidos'}
          </label>
          <div className="input-icon-wrapper">
            <User size={18} className="input-icon" />
            <input
              type="text"
              id="name"
              className="form-input"
              placeholder={role === USER_ROLES.COMPANY ? 'Ej. Laura Sánchez' : 'Ej. Carlos Méndez'}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
        </div>

        {role === USER_ROLES.COMPANY && (
          <div className="form-group">
            <label className="form-label" htmlFor="companyName">Razón social o Nombre Comercial</label>
            <div className="input-icon-wrapper">
              <Building2 size={18} className="input-icon" />
              <input
                type="text"
                id="companyName"
                className="form-input"
                placeholder="Ej. Distribuciones Ibéricas SL"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required
              />
            </div>
          </div>
        )}

        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label">Sector Principal</label>
            <select
              className="form-select"
              value={formData.sector}
              onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
            >
              {SECTORS.map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Zona / Región</label>
            <select
              className="form-select"
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
            >
              {REGIONS.map((r, i) => (
                <option key={i} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="reg-email">Correo electrónico corporativo</label>
          <div className="input-icon-wrapper">
            <Mail size={18} className="input-icon" />
            <input
              type="email"
              id="reg-email"
              className="form-input"
              placeholder="correo@ejemplo.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="reg-password">Contraseña (mínimo 8 caracteres)</label>
          <div className="input-icon-wrapper">
            <Lock size={18} className="input-icon" />
            <input
              type="password"
              id="reg-password"
              className="form-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
        </div>

        <Button type="submit" variant="primary" fullWidth size="lg" disabled={loading}>
          {loading ? 'Creando cuenta...' : 'Crear Cuenta Gratis'}
        </Button>
      </form>

      <div className="register-footer">
        <p>¿Ya tienes una cuenta registrada? <Link to="/login">Inicia sesión</Link></p>
      </div>
    </div>
  );
};

export default Register;
