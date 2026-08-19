import React from 'react';
import { BadgePercent, Sparkles, ShieldCheck } from 'lucide-react';
import './commissions.css';

export const CommissionBadge = ({
  rate = 0,
  amount = null,
  type = 'percentage',
  variant = 'emerald', // emerald | blue | amber | neutral
  showIcon = true,
  size = 'md', // sm | md | lg
  label = null
}) => {
  const displayValue = amount !== null && amount !== undefined
    ? `${amount} €`
    : `${String(rate).replace('%', '')}%`;

  const variantClass = `commission-badge-${variant}`;

  return (
    <span className={`commission-badge-container ${variantClass} size-${size}`}>
      {showIcon && <BadgePercent size={size === 'sm' ? 12 : 14} />}
      <span>{label ? `${label}: ` : ''}{displayValue}</span>
    </span>
  );
};

export default CommissionBadge;
