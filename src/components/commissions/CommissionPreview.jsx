import React from 'react';
import { BadgePercent, ArrowRight, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { calculateCommissions } from '../../utils/commissionCalculator';
import './commissions.css';

export const CommissionPreview = ({
  price = 0,
  commercialCommissionRate = 15,
  commercialCommissionAmount = 0,
  commercialCommissionType = 'percentage',
  sellioCommissionRate = 2,
  compact = false
}) => {
  const {
    saleValue,
    commercialCommission,
    commercialRateApplied,
    sellioCommission,
    sellioRateApplied,
    companyNetBeforeOtherCosts
  } = calculateCommissions({
    price,
    commercialCommissionType,
    commercialCommissionRate,
    commercialCommissionAmount,
    sellioCommissionRate
  });

  if (compact) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
        <span style={{ color: '#059669', fontWeight: 700 }}>
          Comercial: {formatCurrency(commercialCommission)} ({commercialRateApplied}%)
        </span>
        <span style={{ color: 'var(--text-muted)' }}>|</span>
        <span style={{ color: 'var(--text-secondary)' }}>
          Sellio: {formatCurrency(sellioCommission)} ({sellioRateApplied}%)
        </span>
      </div>
    );
  }

  return (
    <div style={{
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      borderRadius: 'var(--radius-md)',
      padding: '1rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '0.75rem',
      textAlign: 'center'
    }}>
      <div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>
          Precio Venta
        </span>
        <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>
          {formatCurrency(saleValue)}
        </strong>
      </div>
      <div>
        <span style={{ fontSize: '0.75rem', color: '#047857', display: 'block', textTransform: 'uppercase' }}>
          Comercial ({commercialRateApplied}%)
        </span>
        <strong style={{ fontSize: '1.1rem', color: '#059669' }}>
          {formatCurrency(commercialCommission)}
        </strong>
      </div>
      <div>
        <span style={{ fontSize: '0.75rem', color: '#1d4ed8', display: 'block', textTransform: 'uppercase' }}>
          Sellio ({sellioRateApplied}%)
        </span>
        <strong style={{ fontSize: '1.1rem', color: '#2563eb' }}>
          {formatCurrency(sellioCommission)}
        </strong>
      </div>
    </div>
  );
};

export default CommissionPreview;
