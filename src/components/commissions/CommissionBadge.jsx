import React from 'react';
import { Percent, ShieldCheck, Sparkles } from 'lucide-react';
import './CommissionBadge.css';

export const CommissionBadge = ({
  commercialRate = '15%',
  sellioRate = null,
  showSellio = false,
  variant = 'compact', // 'compact' | 'detailed' | 'pill'
  size = 'md' // 'sm' | 'md' | 'lg'
}) => {
  const formattedCommercial = typeof commercialRate === 'number' ? `${commercialRate}%` : commercialRate;
  const formattedSellio = sellioRate !== null && sellioRate !== undefined 
    ? (typeof sellioRate === 'number' ? `${sellioRate}%` : sellioRate)
    : null;

  if (variant === 'pill') {
    return (
      <div className={`comm-badge-pill comm-badge-${size}`}>
        <div className="comm-pill-commercial" title="Comisión 100% íntegra para el comercial">
          <Percent size={size === 'sm' ? 11 : 13} className="comm-icon" />
          <span className="comm-pill-label">Comercial:</span>
          <span className="comm-pill-value">{formattedCommercial}</span>
        </div>
        {showSellio && formattedSellio && (
          <div className="comm-pill-sellio" title="Comisión Sellio a cargo de la empresa (Máx 5%)">
            <span className="comm-pill-sellio-label">Sellio:</span>
            <span className="comm-pill-sellio-value">{formattedSellio}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`commission-badge-container comm-badge-${variant} comm-badge-${size}`}>
      <div className="comm-badge-card comm-badge-commercial">
        <div className="comm-badge-header">
          <Percent size={12} />
          <span className="comm-badge-tag">COMISIÓN COMERCIAL</span>
        </div>
        <div className="comm-badge-body">
          <span className="comm-rate-number">{formattedCommercial}</span>
          <span className="comm-guarantee-note">100% íntegra</span>
        </div>
      </div>

      {showSellio && formattedSellio && (
        <div className="comm-badge-card comm-badge-sellio">
          <div className="comm-badge-header">
            <ShieldCheck size={12} />
            <span className="comm-badge-tag">COMISIÓN SELLIO</span>
          </div>
          <div className="comm-badge-body">
            <span className="comm-rate-number sellio-rate">{formattedSellio}</span>
            <span className="comm-guarantee-note">Empresa</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommissionBadge;
