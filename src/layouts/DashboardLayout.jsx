import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Inbox, 
  FileText, 
  User, 
  ShoppingBag, 
  Building2, 
  Users, 
  BadgePercent, 
  ShieldCheck, 
  Settings, 
  CreditCard, 
  LogOut, 
  Menu, 
  X, 
  Layers,
  MessageSquare,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { USER_ROLES, USER_ROLE_LABELS } from '../utils/constants';
import './DashboardLayout.css';

export const DashboardLayout = () => {
  const { user, userType, logout, switchRole } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleRoleChange = (role) => {
    switchRole(role);
    setRoleDropdownOpen(false);
    if (role === USER_ROLES.COMPANY) navigate('/company/dashboard');
    else if (role === USER_ROLES.SELLER) navigate('/seller/dashboard');
    else if (role === USER_ROLES.ADMIN) navigate('/admin/dashboard');
  };

  // Define role specific navigation items according to ESTRUCTURA_WEBAPP.md Section 14
  const getNavLinks = () => {
    switch (userType) {
      case USER_ROLES.COMPANY:
        return [
          { to: '/company/dashboard', label: 'Panel General', icon: LayoutDashboard },
          { to: '/company/products', label: 'Catálogo de Productos', icon: Package },
          { to: '/company/opportunities', label: 'Oportunidades de Expansión', icon: Sparkles },
          { to: '/company/requests', label: 'Solicitudes Recibidas', icon: Inbox },
          { to: '/company/contacts', label: 'Red de Comerciales', icon: Users },
          { to: '/company/messages', label: 'Mensajes', icon: MessageSquare },
          { to: '/company/profile', label: 'Perfil de Empresa', icon: Building2 },
        ];
      case USER_ROLES.SELLER:
        return [
          { to: '/seller/dashboard', label: 'Panel General', icon: LayoutDashboard },
          { to: '/seller/marketplace', label: 'Explorar Oportunidades', icon: ShoppingBag },
          { to: '/seller/companies', label: 'Directorio Empresas', icon: Building2 },
          { to: '/seller/products', label: 'Mi Cartera de Productos', icon: Package },
          { to: '/seller/requests', label: 'Candidaturas Enviadas', icon: Inbox },
          { to: '/seller/contacts', label: 'Mis Contactos', icon: Users },
          { to: '/seller/messages', label: 'Mensajes', icon: MessageSquare },
          { to: '/seller/commissions', label: 'Comisiones', icon: BadgePercent },
          { to: '/seller/profile', label: 'Mi Perfil Comercial', icon: User },
        ];
      case USER_ROLES.ADMIN:
        return [
          { to: '/admin/dashboard', label: 'Panel Global', icon: LayoutDashboard },
          { to: '/admin/users', label: 'Control Usuarios', icon: Users },
          { to: '/admin/companies', label: 'Empresas Registradas', icon: Building2 },
          { to: '/admin/sellers', label: 'Comerciales', icon: User },
          { to: '/admin/products', label: 'Moderación Catálogos', icon: Package },
          { to: '/admin/opportunities', label: 'Moderación Oportunidades', icon: Sparkles },
          { to: '/admin/transactions', label: 'Transacciones y Planes', icon: CreditCard },
          { to: '/admin/settings', label: 'Ajustes de Plataforma', icon: Settings },
        ];
      default:
        return [
          { to: '/products', label: 'Marketplace', icon: ShoppingBag },
          { to: '/companies', label: 'Empresas', icon: Building2 },
          { to: '/sellers', label: 'Comerciales', icon: Users },
        ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <div className={`dashboard-container ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <Link to="/" className="sidebar-brand">
            <div className="sidebar-logo-icon">
              <Layers size={20} />
            </div>
            {!sidebarCollapsed && <span className="sidebar-brand-name">Sellio</span>}
          </Link>
          <button 
            className="sidebar-collapse-btn" 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label="Toggle sidebar"
          >
            {sidebarCollapsed ? <Menu size={18} /> : <X size={18} />}
          </button>
        </div>

        {/* User preview badge */}
        {!sidebarCollapsed && (
          <div className="sidebar-user-preview">
            <div className="user-avatar-circle">
              {userType === USER_ROLES.COMPANY ? <Building2 size={16} /> : userType === USER_ROLES.SELLER ? <User size={16} /> : <ShieldCheck size={16} />}
            </div>
            <div className="user-preview-info">
              <span className="user-preview-name">{user?.name || 'Usuario Demo'}</span>
              <span className="user-preview-role">{USER_ROLE_LABELS[userType] || userType}</span>
            </div>
          </div>
        )}

        {/* Navigation items */}
        <nav className="sidebar-nav">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                title={sidebarCollapsed ? item.label : ''}
              >
                <Icon size={18} className="sidebar-link-icon" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="sidebar-logout-btn">
            <LogOut size={18} />
            {!sidebarCollapsed && <span>Cerrar sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area with Topbar */}
      <div className="dashboard-main">
        <header className="dashboard-topbar">
          <div className="topbar-left">
            <span className="topbar-role-badge">
              {USER_ROLE_LABELS[userType] || 'Panel'}
            </span>
          </div>

          <div className="topbar-right">
            {/* Quick Role Switcher */}
            <div className="role-switcher-container">
              <button 
                className="role-switcher-btn"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              >
                <span>Cambiar Rol Demo: <strong>{userType}</strong></span>
                <ChevronDown size={14} />
              </button>

              {roleDropdownOpen && (
                <div className="role-dropdown-menu">
                  <div className="role-dropdown-title">Ver como:</div>
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
                    <User size={16} /> Comercial
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

            <Link to="/" className="topbar-public-link">
              Ver Web Pública
            </Link>
          </div>
        </header>

        {/* Nested page view */}
        <main className="dashboard-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
