import React from 'react';
import { ShieldCheck, ShieldAlert, Clock, AlertCircle } from 'lucide-react';

export const VerificationBadge = ({
  status = 'verified', // 'unverified' | 'pending' | 'verified' | 'rejected'
  type = 'company', // 'company' | 'seller'
  showText = true,
  size = 'md'
}) => {
  const configs = {
    verified: {
      label: type === 'company' ? 'Empresa Verificada' : 'Comercial Verificado',
      className: 'badge-success',
      icon: ShieldCheck,
      color: '#059669',
      bg: '#ecfdf5',
      border: 'rgba(16, 185, 129, 0.3)'
    },
    pending: {
      label: 'Verificación en Trámite',
      className: 'badge-warning',
      icon: Clock,
      color: '#d97706',
      bg: '#fffbeb',
      border: 'rgba(245, 158, 11, 0.3)'
    },
    rejected: {
      label: 'Verificación Rechazada',
      className: 'badge-danger',
      icon: ShieldAlert,
      color: '#dc2626',
      bg: '#fef2f2',
      border: 'rgba(220, 38, 38, 0.3)'
    },
    unverified: {
      label: 'Sin Verificar',
      className: 'badge-secondary',
      icon: AlertCircle,
      color: '#64748b',
      bg: '#f8fafc',
      border: '#e2e8f0'
    }
  };

  const current = configs[status] || configs.unverified;
  const IconComponent = current.icon;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: size === 'sm' ? '0.2rem 0.5rem' : '0.3rem 0.65rem',
        borderRadius: '9999px',
        fontSize: size === 'sm' ? '0.725rem' : '0.8rem',
        fontWeight: 700,
        background: current.bg,
        color: current.color,
        border: `1px solid ${current.border}`
      }}
    >
      <IconComponent size={size === 'sm' ? 12 : 14} />
      {showText && <span>{current.label}</span>}
    </span>
  );
};

export default VerificationBadge;
