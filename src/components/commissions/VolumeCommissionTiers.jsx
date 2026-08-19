import React from 'react';
import { DEFAULT_VOLUME_TIERS, SELLIO_MAX_COMMISSION_RATE } from '../../utils/commissionCalculator';
import { ShieldCheck, Info } from 'lucide-react';
import './commissions.css';

export const VolumeCommissionTiers = ({
  currentMonthlyVolume = 0,
  tiers = DEFAULT_VOLUME_TIERS,
  onSelectTier = null,
  readOnly = false
}) => {
  return (
    <div className="volume-tiers-wrapper">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <h5 style={{ margin: 0, fontSize: '0.925rem', fontWeight: 700 }}>
          Escalado Progresivo de Sellio por Volumen Mensual
        </h5>
        <span className="badge badge-primary" style={{ fontSize: '10px' }}>
          Tope máx: {SELLIO_MAX_COMMISSION_RATE}%
        </span>
      </div>

      <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '0.85rem' }}>
        A mayor volumen acumulado de ventas generadas en el mes natural, menor es la comisión que retiene la plataforma.
      </p>

      <div className="volume-tiers-container">
        {tiers.map((tier, index) => {
          const min = tier.minVolume || 0;
          const max = tier.maxVolume === null || tier.maxVolume === undefined ? Infinity : tier.maxVolume;
          const isActive = currentMonthlyVolume >= min && currentMonthlyVolume <= max;

          return (
            <div
              key={index}
              className={`tier-item-row ${isActive ? 'active' : ''}`}
              onClick={() => onSelectTier && !readOnly && onSelectTier(tier)}
              style={{ cursor: !readOnly && onSelectTier ? 'pointer' : 'default' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 600, color: isActive ? 'var(--primary)' : 'var(--text-primary)' }}>
                  {tier.label}
                </span>
                {isActive && (
                  <span className="badge badge-success" style={{ fontSize: '9px', padding: '2px 6px' }}>
                    Tramo Actual
                  </span>
                )}
              </div>
              <span className="tier-rate-badge">
                {tier.rate}% Sellio
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VolumeCommissionTiers;
