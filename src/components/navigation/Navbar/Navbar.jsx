import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';
import { USER_ROLES } from '../../../utils/constants';
import Button from '../../common/Button';
import './Navbar.css';

export const Navbar = () => {
  const { user, isAuthenticated, userType, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const dashboard = userType === USER_ROLES.COMPANY ? '/company/dashboard' : userType === USER_ROLES.SELLER ? '/seller/dashboard' : '/admin/dashboard';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const close = () => setOpen(false);
  const handleLogout = () => { logout(); navigate('/'); close(); };

  const navClass = `navbar ${isHome ? (scrolled ? 'navbar-scrolled' : 'navbar-home-top') : 'navbar-standard'}`;

  return (
    <header className={navClass}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={close}>
          <span className="brand-mark">S</span>
          <span className="brand-name">Sellio</span>
        </Link>

        <nav className="navbar-nav desktop-only" aria-label="Principal">
          <NavLink to="/products" className="nav-link">Oportunidades</NavLink>
          <NavLink to="/how-it-works" className="nav-link">Cómo funciona</NavLink>
          <NavLink to="/pricing" className="nav-link">Precios</NavLink>
          <NavLink to="/trust" className="nav-link">Confianza</NavLink>
          <NavLink to="/companies" className="nav-link">Empresas</NavLink>
          <NavLink to="/sellers" className="nav-link">Comerciales</NavLink>
        </nav>


        <div className="navbar-actions desktop-only">
          {isAuthenticated ? (
            <>
              <Link to={dashboard} className="dashboard-link">Mi espacio <ArrowUpRight size={15} /></Link>
              <button onClick={handleLogout} className="btn-logout">Salir</button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-link">Iniciar sesión</Link>
              <Link to="/register"><Button variant="primary" size="sm">Entrar en Sellio</Button></Link>
            </>
          )}
        </div>

        <button className="mobile-menu-toggle mobile-only" onClick={() => setOpen(!open)} aria-label={open ? 'Cerrar menú' : 'Abrir menú'}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="mobile-drawer">
          <NavLink to="/products" className="mobile-nav-link" onClick={close}>Oportunidades</NavLink>
          <NavLink to="/how-it-works" className="mobile-nav-link" onClick={close}>Cómo funciona</NavLink>
          <NavLink to="/pricing" className="mobile-nav-link" onClick={close}>Precios</NavLink>
          <NavLink to="/trust" className="mobile-nav-link" onClick={close}>Confianza</NavLink>
          <NavLink to="/companies" className="mobile-nav-link" onClick={close}>Empresas</NavLink>
          <NavLink to="/sellers" className="mobile-nav-link" onClick={close}>Comerciales</NavLink>
          <div className="mobile-drawer-auth">

            {isAuthenticated ? (
              <>
                <Link to={dashboard} className="mobile-btn" onClick={close}>Mi espacio</Link>
                <button onClick={handleLogout} className="mobile-btn-danger">Salir</button>
              </>
            ) : (
              <>
                <Link to="/login" className="mobile-nav-link" onClick={close}>Iniciar sesión</Link>
                <Link to="/register" onClick={close}><Button variant="primary" fullWidth>Entrar en Sellio</Button></Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
