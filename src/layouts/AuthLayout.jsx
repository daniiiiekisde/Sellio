import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Layers, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import './AuthLayout.css';

export const AuthLayout = () => {
  return (
    <div className="auth-layout">
      {/* Left side: hero banner */}
      <div className="auth-side-banner">
        <div className="auth-banner-content">
          <Link to="/" className="auth-brand-link">
            <div className="auth-logo-box">
              <Layers size={24} />
            </div>
            <span className="auth-brand-title">Sellio</span>
          </Link>

          <div className="auth-hero-text">
            <h2>Conectando fabricantes y fuerzas de venta B2B</h2>
            <p>
              La plataforma inteligente para expandir tus canales comerciales y encontrar oportunidades de representación en toda España.
            </p>
          </div>

          <div className="auth-features-list">
            <div className="auth-feature-pill">
              <ShieldCheck size={18} />
              <span>Directorio verificado de empresas y comerciales</span>
            </div>
            <div className="auth-feature-pill">
              <TrendingUp size={18} />
              <span>Mayor velocidad de acuerdos sin intermediación burocrática</span>
            </div>
            <div className="auth-feature-pill">
              <Users size={18} />
              <span>Matching por sector, territorio y comisiones</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: form area */}
      <div className="auth-main-content">
        <div className="auth-form-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
