import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Briefcase, 
  ShieldCheck, 
  User, 
  LogOut, 
  Menu, 
  X, 
  ShoppingBag, 
  Users, 
  Layers,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { USER_ROLES } from '../../../utils/constants';
import Button from '../../common/Button';
import './Navbar.css';

export const Navbar = () => {
  const { user, isAuthenticated, userType, logout, switchRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const handleRoleChange = (role) => {
    switchRole(role);
    setRoleDropdownOpen(false);
    if (role === USER_ROLES.COMPANY) navigate('/company/dashboard');
    else if (role === USER_ROLES.SELLER) navigate('/seller/dashboard');
    else if (role === USER_ROLES.ADMIN) navigate('/admin/dashboard');
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          <div className="brand-logo-icon">
            <Layers size={22} className="logo-svg" />
          </div>
          <span className="brand-name">Sellio</span>
          <span className="brand-tag">B2B</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav desktop-only">
          <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <ShoppingBag size={16} />
            <span>Productos</span>
          </NavLink>
          <NavLink to="/companies" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Building2 size={16} />
            <span>Empresas</span>
          </NavLink>
          <NavLink to="/sellers" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Users size={16} />
            <span>Comerciales</span>
          </NavLink>
        </nav>

        {/* Right CTA / Auth controls */}
        <div className="navbar-actions desktop-only">
          {/* Quick Role Switcher for MVP Testing */}
          {isAuthenticated && (
            <div className="role-switcher-container">
              <button 
                className="role-switcher-btn"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                title="Cambiar rol activo para pruebas"
              >
                {userType === USER_ROLES.COMPANY && <Building2 size={14} />}
                {userType === USER_ROLES.SELLER && <Briefcase size={14} />}
                {userType === USER_ROLES.ADMIN && <ShieldCheck size={14} />}
                <span className="role-switcher-label">
                  {userType === USER_ROLES.COMPANY ? 'Modo Empresa' : userType === USER_ROLES.SELLER ? 'Modo Comercial' : 'Modo Admin'}
                </span>
                <ChevronDown size={14} />
              </button>

              {roleDropdownOpen && (
                <div className="role-dropdown-menu">
                  <div className="role-dropdown-title">Cambiar rol (Modo Demo):</div>
                  <button 
                    className={`role-option ${userType === USER_ROLES.COMPANY ? 'active' : ''}`}
                    onClick={() => handleRoleChange(USER_ROLES.COMPANY)}
                  >
                    <Building2 size={16} /> Empresa
                  </button>
                  <button 
                    className={`role-option ${userType === USER_ROLES.SELLER ? 'active' : ''}`}
                    onClick={() => handleRoleChange(USER_ROLES.SELLER)}
                  >
                    <Briefcase size={16} /> Comercial
                  </button>
                  <button 
                    className={`role-option ${userType === USER_ROLES.ADMIN ? 'active' : ''}`}
                    onClick={() => handleRoleChange(USER_ROLES.ADMIN)}
                  >
                    <ShieldCheck size={16} /> Administrador
                  </button>
                </div>
              )}
            </div>
          )}

          {isAuthenticated ? (
            <div className="user-logged-group">
              <Link 
                to={userType === USER_ROLES.COMPANY ? '/company/dashboard' : userType === USER_ROLES.SELLER ? '/seller/dashboard' : '/admin/dashboard'} 
                className="dashboard-link"
              >
                Panel de control
              </Link>
              <button onClick={handleLogout} className="btn-logout" title="Cerrar sesión">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="auth-buttons-group">
              <Link to="/login">
                <Button variant="ghost" size="sm">Iniciar sesión</Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">Registrarse</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu hamburger */}
        <button 
          className="mobile-menu-toggle mobile-only" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <NavLink 
            to="/products" 
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            <ShoppingBag size={18} /> Productos y Oportunidades
          </NavLink>
          <NavLink 
            to="/companies" 
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Building2 size={18} /> Directorio de Empresas
          </NavLink>
          <NavLink 
            to="/sellers" 
            className="mobile-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Users size={18} /> Directorio de Comerciales
          </NavLink>
          
          <div className="mobile-drawer-auth">
            {isAuthenticated ? (
              <>
                <Link 
                  to={userType === USER_ROLES.COMPANY ? '/company/dashboard' : userType === USER_ROLES.SELLER ? '/seller/dashboard' : '/admin/dashboard'}
                  className="mobile-btn"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Ir a mi Panel ({userType})
                </Link>
                <button onClick={handleLogout} className="mobile-btn-danger">
                  <LogOut size={16} /> Cerrar Sesión
                </button>
              </>
            ) : (
              <div className="mobile-auth-stack">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" fullWidth>Iniciar sesión</Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" fullWidth>Crear cuenta gratis</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
