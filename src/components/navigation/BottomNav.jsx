import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Heart,
  MessageSquare,
  Handshake,
  Package,
  Users,
  ShoppingCart,
  ShieldCheck,
  BadgePercent
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { USER_ROLES } from '../../utils/constants';

export const BottomNav = () => {
  const { userType } = useAuth();

  const getLinks = () => {
    switch (userType) {
      case USER_ROLES.COMPANY:
        return [
          { to: '/company/dashboard', label: 'Inicio', icon: LayoutDashboard },
          { to: '/company/products', label: 'Productos', icon: Package },
          { to: '/company/crm', label: 'CRM', icon: Users },
          { to: '/company/sales', label: 'Ventas', icon: ShoppingCart },
          { to: '/company/messages', label: 'Mensajes', icon: MessageSquare }
        ];
      case USER_ROLES.SELLER:
        return [
          { to: '/seller/dashboard', label: 'Inicio', icon: LayoutDashboard },
          { to: '/seller/marketplace', label: 'Mercado', icon: ShoppingBag },
          { to: '/seller/saved', label: 'Guardados', icon: Heart },
          { to: '/seller/agreements', label: 'Acuerdos', icon: Handshake },
          { to: '/seller/messages', label: 'Mensajes', icon: MessageSquare }
        ];
      case USER_ROLES.ADMIN:
        return [
          { to: '/admin/dashboard', label: 'Global', icon: LayoutDashboard },
          { to: '/admin/users', label: 'Usuarios', icon: Users },
          { to: '/admin/verification', label: 'Verificar', icon: ShieldCheck },
          { to: '/admin/commissions', label: 'Comisiones', icon: BadgePercent },
          { to: '/admin/settings', label: 'Ajustes', icon: LayoutDashboard }
        ];
      default:
        return [];
    }
  };

  const links = getLinks();
  if (links.length === 0) return null;

  return (
    <nav className="mobile-bottom-nav" aria-label="Navegación Móvil">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon size={20} />
            <span>{link.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default BottomNav;
