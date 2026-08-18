import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ShieldCheck, Mail, Globe } from 'lucide-react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        {/* Brand Column */}
        <div className="footer-brand-col">
          <div className="footer-logo">
            <div className="footer-logo-icon">
              <Layers size={18} />
            </div>
            <span className="footer-brand-name">Sellio</span>
          </div>
          <p className="footer-desc">
            El ecosistema B2B que conecta empresas fabricantes con comerciales independientes y agentes de ventas para acelerar el crecimiento comercial.
          </p>
          <div className="footer-trust-badge">
            <ShieldCheck size={16} className="trust-icon" />
            <span>Marketplace B2B Verificado</span>
          </div>
        </div>

        {/* Links Column: Marketplace */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Marketplace</h4>
          <ul className="footer-links">
            <li><Link to="/products">Oportunidades y Productos</Link></li>
            <li><Link to="/companies">Directorio de Empresas</Link></li>
            <li><Link to="/sellers">Directorio de Comerciales</Link></li>
            <li><Link to="/register">Publicar Oportunidad</Link></li>
          </ul>
        </div>

        {/* Links Column: Plataforma */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Plataforma</h4>
          <ul className="footer-links">
            <li><Link to="/login">Acceso Clientes</Link></li>
            <li><Link to="/register">Registro Empresas</Link></li>
            <li><Link to="/register">Registro Comerciales</Link></li>
            <li><Link to="/company/dashboard">Panel Empresa Demo</Link></li>
          </ul>
        </div>

        {/* Links Column: Contacto & Legal */}
        <div className="footer-links-col">
          <h4 className="footer-col-title">Contacto</h4>
          <div className="footer-contact-item">
            <Mail size={16} />
            <span>hola@sellio.com</span>
          </div>
          <div className="footer-contact-item">
            <Globe size={16} />
            <span>España & Internacional</span>
          </div>
          <p className="footer-legal-note">
            &copy; {new Date().getFullYear()} Sellio B2B Marketplace. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
