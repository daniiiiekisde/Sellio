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
  ChevronDown,
  Handshake,
  ShoppingCart,
  AlertTriangle,
  History,
  Heart,
  BarChart3,
  CheckCircle,
  TrendingUp,
  SlidersHorizontal
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { USER_ROLES, USER_ROLE_LABELS } from '../utils/constants';
import { NotificationBell } from '../components/notifications';
import { BottomNav } from '../components/navigation/BottomNav';
import './DashboardLayout.css';

export const DashboardLayout = () => {
  const { user, userType, isDemoMode, logout, switchRole } = useAuth();
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

  const getNavSections = () => {
    switch (userType) {
      case USER_ROLES.COMPANY:
        return [
          {
            title: 'Inicio',
            links: [
              { to: '/company/dashboard', label: 'Panel General', icon: LayoutDashboard }
            ]
          },
          {
            title: 'Catálogo & Ofertas',
            links: [
              { to: '/company/products', label: 'Productos', icon: Package },
              { to: '/company/opportunities', label: 'Oportunidades', icon: Sparkles }
            ]
          },
          {
            title: 'Actividad Comercial',
            links: [
              { to: '/company/requests', label: 'Solicitudes', icon: Inbox },
              { to: '/company/crm', label: 'CRM Comerciales', icon: Users },
              { to: '/company/agreements', label: 'Acuerdos', icon: Handshake },
              { to: '/company/messages', label: 'Mensajes', icon: MessageSquare }
            ]
          },
          {
            title: 'Finanzas & Analítica',
            links: [
              { to: '/company/sales', label: 'Ventas Confirmadas', icon: ShoppingCart },
              { to: '/company/commissions', label: 'Liquidaciones', icon: BadgePercent },
              { to: '/company/analytics', label: 'Sellio Pulse', icon: BarChart3 }
            ]
          },
          {
            title: 'Cuenta',
            links: [
              { to: '/company/profile', label: 'Perfil de Empresa', icon: Building2 }
            ]
          }
        ];

      case USER_ROLES.SELLER:
        return [
          {
            title: 'Inicio',
            links: [
              { to: '/seller/dashboard', label: 'Panel General', icon: LayoutDashboard }
            ]
          },
          {
            title: 'Marketplace',
            links: [
              { to: '/seller/marketplace', label: 'Oportunidades B2B', icon: ShoppingBag },
              { to: '/seller/saved', label: 'Guardados', icon: Heart },
              { to: '/seller/companies', label: 'Empresas', icon: Building2 }
            ]
          },
          {
            title: 'Actividad',
            links: [
              { to: '/seller/requests', label: 'Candidaturas', icon: Inbox },
              { to: '/seller/agreements', label: 'Mis Acuerdos', icon: Handshake },
              { to: '/seller/messages', label: 'Mensajes', icon: MessageSquare }
            ]
          },
          {
            title: 'Finanzas',
            links: [
              { to: '/seller/sales', label: 'Mis Ventas', icon: ShoppingCart },
              { to: '/seller/commissions', label: 'Ganancias', icon: BadgePercent }
            ]
          },
          {
            title: 'Cuenta',
            links: [
              { to: '/seller/profile', label: 'Mi Perfil Comercial', icon: User }
            ]
          }
        ];

      case USER_ROLES.ADMIN:
        return [
          {
            title: 'Control Global',
            links: [
              { to: '/admin/dashboard', label: 'Panel Global', icon: LayoutDashboard },
              { to: '/admin/analytics', label: 'Analítica', icon: BarChart3 }
            ]
          },
          {
            title: 'Entidades & Compliance',
            links: [
              { to: '/admin/users', label: 'Usuarios', icon: Users },
              { to: '/admin/companies', label: 'Empresas', icon: Building2 },
              { to: '/admin/sellers', label: 'Comerciales', icon: User },
              { to: '/admin/verification', label: 'Verificación', icon: ShieldCheck }
            ]
          },
          {
            title: 'Moderación & Finanzas',
            links: [
              { to: '/admin/products', label: 'Catálogos', icon: Package },
              { to: '/admin/opportunities', label: 'Oportunidades', icon: Sparkles },
              { to: '/admin/commissions', label: 'Comisiones', icon: BadgePercent },
              { to: '/admin/transactions', label: 'Transacciones', icon: CreditCard }
            ]
          },
          {
            title: 'Auditoría & Ajustes',
            links: [
              { to: '/admin/disputes', label: 'Disputas', icon: AlertTriangle },
              { to: '/admin/audit', label: 'Auditoría', icon: History },
              { to: '/admin/settings', label: 'Ajustes', icon: Settings }
            ]
          }
        ];

      default:
        return [
          {
            title: 'Explorar',
            links: [
              { to: '/products', label: 'Marketplace', icon: ShoppingBag },
              { to: '/companies', label: 'Empresas', icon: Building2 },
              { to: '/sellers', label: 'Comerciales', icon: Users }
            ]
          }
        ];
    }
  };

  const navSections = getNavSections();

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

        {/* Navigation Grouped Items */}
        <nav className="sidebar-nav" style={{ overflowY: 'auto' }}>
          {navSections.map((section, sIdx) => (
            <div key={sIdx} style={{ marginBottom: '1.25rem' }}>
              {!sidebarCollapsed && (
                <div style={{
                  padding: '0 0.85rem 0.35rem 0.85rem',
                  fontSize: '0.675rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#94a3b8'
                }}>
                  {section.title}
                </div>
              )}
              {section.links.map((item) => {
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
            </div>
          ))}
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

          <div className="topbar-right" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <NotificationBell />

            {/* Quick Role Switcher (Solo visible en Modo Demo / Desarrollo) */}
            {isDemoMode ? (
              <div className="role-switcher-container">
                <button 
                  className="role-switcher-btn"
                  onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                  title="Herramienta de desarrollo: cambiar rol para previsualizar vistas"
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      background: 'rgba(59, 130, 246, 0.15)',
                      color: 'var(--color-primary, #3B82F6)',
                      padding: '0.15rem 0.4rem',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}>Demo</span>
                    Vista: <strong>{USER_ROLE_LABELS[userType] || userType}</strong>
                  </span>
                  <ChevronDown size={14} />
                </button>

                {roleDropdownOpen && (
                  <div className="role-dropdown-menu">
                    <div className="role-dropdown-title">Previsualizar como:</div>
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
            ) : (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.85rem',
                color: 'var(--text-secondary, #94A3B8)',
                background: 'rgba(255, 255, 255, 0.04)',
                padding: '0.4rem 0.8rem',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <ShieldCheck size={15} color="#10B981" />
                <span>Sesión verificada: <strong style={{ color: '#F8FAFC' }}>{USER_ROLE_LABELS[userType] || userType}</strong></span>
              </div>
            )}

            <Link to="/" className="topbar-public-link">
              Ver Web Pública
            </Link>
          </div>
        </header>

        {/* Nested page view */}
        <main className="dashboard-body">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
};

export default DashboardLayout;
