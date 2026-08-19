import React from 'react';
import { ShieldCheck, Info, Sparkles, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { calculateCommissions, SELLIO_MAX_COMMISSION_RATE } from '../../utils/commissionCalculator';
import './commissions.css';

export const CommissionBreakdown = ({
  price = 0,
  commercialCommissionRate = 15,
  commercialCommissionAmount = 0,
  commercialCommissionType = 'percentage',
  sellioCommissionRate = 2,
  sellioCommissionModel = 'fixed',
  monthlyVolume = 0,
  quantity = 1,
  title = "Desglose Económico de la Venta"
}) => {
  const calculation = calculateCommissions({
    price,
    commercialCommissionType,
    commercialCommissionRate,
    commercialCommissionAmount,
    sellioCommissionModel,
    sellioCommissionRate,
    monthlyVolume,
    quantity
  });

  const {
    saleValue,
    commercialCommission,
    commercialRateApplied,
    sellioCommission,
    sellioRateApplied,
    companyNetBeforeOtherCosts,
    isCapped
  } = calculation;

  return (
    <div className="commission-breakdown-card">
      <div className="breakdown-header">
        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          {title}
        </h4>
        <span className="badge badge-secondary" style={{ fontSize: '11px' }}>
          Moneda: EUR (€)
        </span>
      </div>

      <div className="breakdown-row">
        <span>Valor Bruto de la Venta ({quantity} ud.)</span>
        <span style={{ fontWeight: 600 }}>{formatCurrency(saleValue)}</span>
      </div>

      <div className="breakdown-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: '#059669', fontWeight: 600 }}>• Comisión Comercial</span>
          <span className="badge badge-success" style={{ fontSize: '10px', padding: '2px 6px' }}>
            {commercialCommissionType === 'fixed_amount' ? 'Fija' : `${commercialRateApplied}%`}
          </span>
        </div>
        <span className="breakdown-val-commercial">
          + {formatCurrency(commercialCommission)}
        </span>
      </div>

      <div className="breakdown-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: '#2563eb', fontWeight: 600 }}>• Comisión Sellio</span>
          <span className="badge badge-primary" style={{ fontSize: '10px', padding: '2px 6px' }}>
            {sellioCommissionModel === 'volume_tiered' ? `Tramo: ${sellioRateApplied}%` : `${sellioRateApplied}%`}
          </span>
        </div>
        <span className="breakdown-val-sellio">
          - {formatCurrency(sellioCommission)}
        </span>
      </div>

      {isCapped && (
        <div style={{ fontSize: '11px', color: '#b45309', background: '#fffbeb', padding: '6px 8px', borderRadius: '4px', margin: '4px 0' }}>
          <Info size={12} style={{ display: 'inline', marginRight: '4px' }} />
          Sellio aplica un límite máximo de {SELLIO_MAX_COMMISSION_RATE}%.
        </div>
      )}

      <div className="breakdown-row highlight">
        <div>
          <span>Margen Neto Empresa</span>
          <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted)' }}>
            Tras liquidación comercial y Sellio
          </p>
        </div>
        <span className="breakdown-val-net">
          {formatCurrency(companyNetBeforeOtherCosts)}
        </span>
      </div>

      <div style={{ marginTop: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
        <ShieldCheck size={13} color="#059669" />
        <span>La comisión del comercial se transfiere 100% íntegra (Sellio no descuenta nada de ella).</span>
      </div>
    </div>
  );
};

export default CommissionBreakdown;
