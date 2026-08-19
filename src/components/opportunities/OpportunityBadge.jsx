import React from 'react';
import { Sparkles, Zap, ShieldCheck, Flame, TrendingUp, Clock } from 'lucide-react';
import './opportunities.css';

export const OpportunityBadge = ({ type = 'NUEVA', text = null }) => {
  const badgeMap = {
    NUEVA: {
      label: 'NUEVA',
      className: 'opp-badge-new',
      icon: Sparkles
    },
    'ALTA COMISIÓN': {
      label: 'ALTA COMISIÓN',
      className: 'opp-badge-high-comm',
      icon: TrendingUp
    },
    'EMPRESA VERIFICADA': {
      label: 'EMPRESA VERIFICADA',
      className: 'opp-badge-verified',
      icon: ShieldCheck
    },
    URGENTE: {
      label: 'URGENTE',
      className: 'opp-badge-urgent',
      icon: Zap
    },
    POPULAR: {
      label: 'POPULAR',
      className: 'opp-badge-popular',
      icon: Flame
    }
  };

  const badgeConfig = badgeMap[type] || badgeMap['NUEVA'];
  const IconComponent = badgeConfig.icon;
  const labelText = text || badgeConfig.label;

  return (
    <span className={`opportunity-badge-pill ${badgeConfig.className}`}>
      <IconComponent size={11} />
      <span>{labelText}</span>
    </span>
  );
};

export default OpportunityBadge;
