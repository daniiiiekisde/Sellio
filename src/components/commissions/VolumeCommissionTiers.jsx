import React, { useState } from 'react';
import { DEFAULT_VOLUME_TIERS, SELLIO_MAX_COMMISSION_RATE, parseRate } from '../../utils/commissionCalculator';
import { formatCurrency } from '../../utils/formatters';
import { Layers, AlertTriangle, CheckCircle2, Plus, Trash2, ShieldCheck } from 'lucide-react';
import './VolumeCommissionTiers.css';

export const VolumeCommissionTiers = ({
  tiers = DEFAULT_VOLUME_TIERS,
  onChange,
  readOnly = false
}) => {
  const [tierList, setTierList] = useState(tiers);

  const handleRateChange = (index, newRate) => {
    const val = parseFloat(newRate) || 0;
    const updated = tierList.map((t, i) => i === index ? { ...t, rate: Math.min(SELLIO_MAX_COMMISSION_RATE, Math.max(0, val)) } : t);
    setTierList(updated);
    if (onChange) onChange(updated);
  };

  const hasExceededRate = tierList.some(t => parseRate(t.rate) > SELLIO_MAX_COMMISSION_RATE);

  return (
    <div className="volume-commission-tiers-card">
      <div className="tiers-header">
        <div className="tiers-title-group">
          <Layers size={16} className="text-primary" />
          <h4 className="tiers-title">Modelo Escalonado Sellio por Volumen Mensual</h4>
        </div>
        <span className="tiers-cap-badge">
          <ShieldCheck size={13} /> Tope máximo: {SELLIO_MAX_COMMISSION_RATE}%
        </span>
      </div>

      <p className="tiers-description">
        A mayor volumen acumulado en el mes, menor porcentaje cobra Sellio a la empresa. La comisión del comercial no se ve afectada.
      </p>

      {hasExceededRate && (
        <div className="tiers-warning-alert">
          <AlertTriangle size={14} />
          <span>Ningún tramo puede superar el límite del {SELLIO_MAX_COMMISSION_RATE}%.</span>
        </div>
      )}

      <div className="tiers-table-wrap">
        <table className="tiers-table">
          <thead>
            <tr>
              <th>Tramo de Facturación Mensual</th>
              <th style={{ width: '130px', textAlign: 'center' }}>Comisión Sellio</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {tierList.map((tier, idx) => {
              const isOverCap = parseRate(tier.rate) > SELLIO_MAX_COMMISSION_RATE;
              return (
                <tr key={idx} className={isOverCap ? 'row-invalid' : ''}>
                  <td className="tier-range-cell">
                    <strong>{tier.label || (tier.maxVolume ? `${formatCurrency(tier.minVolume)} – ${formatCurrency(tier.maxVolume)}` : `+ ${formatCurrency(tier.minVolume)}`)}</strong>
                  </td>
                  <td className="tier-rate-cell">
                    {readOnly ? (
                      <span className="tier-rate-badge">{tier.rate}%</span>
                    ) : (
                      <div className="rate-input-wrap">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max={SELLIO_MAX_COMMISSION_RATE}
                          value={tier.rate}
                          onChange={(e) => handleRateChange(idx, e.target.value)}
                          className={`tier-input ${isOverCap ? 'input-error' : ''}`}
                        />
                        <span className="rate-suffix">%</span>
                      </div>
                    )}
                  </td>
                  <td className="tier-status-cell">
                    {isOverCap ? (
                      <span className="badge-error-pill">Supera el 5%</span>
                    ) : (
                      <span className="badge-valid-pill">
                        <CheckCircle2 size={12} /> Válido
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VolumeCommissionTiers;
