import React from 'react';
import { calculateCommissions, SELLIO_MAX_COMMISSION_RATE } from '../../utils/commissionCalculator';
import { formatCurrency } from '../../utils/formatters';
import { ShieldCheck, CheckCircle2, Clock, FileCheck, Coins, AlertCircle } from 'lucide-react';
import './CommissionBreakdown.css';

export const CommissionBreakdown = ({
  product,
  role = 'seller', // 'seller' | 'company'
  quantity = 1,
  showConditions = true
}) => {
  if (!product) return null;

  const price = product.price || product.product_price || 0;
  const commercialRate = product.commercial_commission_rate || product.commissionRate || 15;
  const commercialType = product.commercial_commission_type || 'percentage';
  const commercialAmount = product.commercial_commission_amount || 0;
  const sellioRate = product.sellio_commission_rate || 2.0;
  const sellioModel = product.sellio_commission_model || 'fixed';

  const calc = calculateCommissions({
    price,
    commercialCommissionRate: commercialRate,
    commercialCommissionType: commercialType,
    commercialCommissionAmount: commercialAmount,
    sellioCommissionRate: sellioRate,
    sellioCommissionModel: sellioModel,
    quantity
  });

  const paymentTriggerLabels = {
    paid_sale: 'Venta cobrada por la empresa',
    confirmed_sale: 'Pedido / Contrato confirmado',
    other: 'Acuerdo específico'
  };

  const triggerLabel = paymentTriggerLabels[product.commission_payment_trigger] || 'Venta cobrada y confirmada';
  const paymentPeriod = product.payment_period || '30 días fin de mes';
  const minimumSale = product.minimum_sale_value ? formatCurrency(product.minimum_sale_value) : 'Sin mínimo';

  return (
    <div className={`commission-breakdown-card role-${role}`}>
      <div className="breakdown-badge-tag">
        {role === 'seller' ? 'Modelo de Remuneración del Comercial' : 'Desglose Económico de la Oferta'}
      </div>

      {role === 'seller' ? (
        <div className="breakdown-seller-view">
          <div className="breakdown-highlight-box">
            <span className="box-sub">Tu comisión por venta unitaria:</span>
            <div className="box-main-value">
              <span className="main-number">{formatCurrency(calc.commercialCommission)}</span>
              <span className="main-rate">({calc.commercialRateApplied}%)</span>
            </div>
            <div className="box-guarantee">
              <CheckCircle2 size={14} />
              <span>100% íntegra para ti. Sellio no descuenta nada de tu retribución.</span>
            </div>
          </div>

          <div className="breakdown-kv-list">
            <div className="kv-item">
              <span className="kv-key">Precio orientativo (PVP)</span>
              <span className="kv-val">{formatCurrency(calc.saleValue)}</span>
            </div>
            <div className="kv-item">
              <span className="kv-key">Momento de devengo</span>
              <span className="kv-val">{triggerLabel}</span>
            </div>
            <div className="kv-item">
              <span className="kv-key">Plazo de liquidación</span>
              <span className="kv-val">{paymentPeriod}</span>
            </div>
            <div className="kv-item">
              <span className="kv-key">Pedido mínimo comisionable</span>
              <span className="kv-val">{minimumSale}</span>
            </div>
          </div>

          <div className="sellio-transparency-pill">
            <ShieldCheck size={14} className="text-primary" />
            <span>Sellio cobra una comisión adicional del {calc.sellioRateApplied}% directamente a la empresa por la intermediación tecnológica.</span>
          </div>
        </div>
      ) : (
        <div className="breakdown-company-view">
          <div className="company-finance-table">
            <div className="finance-row">
              <span className="fin-label">Venta bruta (PVP)</span>
              <span className="fin-val font-bold">{formatCurrency(calc.saleValue)}</span>
            </div>
            <div className="finance-row fin-subtraction">
              <span className="fin-label">Comisión comercial ({calc.commercialRateApplied}%)</span>
              <span className="fin-val text-danger">-{formatCurrency(calc.commercialCommission)}</span>
            </div>
            <div className="finance-row fin-subtraction">
              <span className="fin-label">Comisión Sellio ({calc.sellioRateApplied}%)</span>
              <span className="fin-val text-primary">-{formatCurrency(calc.sellioCommission)}</span>
            </div>
            <div className="finance-row fin-total">
              <span className="fin-label">Resultado empresa (antes de otros costes)</span>
              <span className="fin-val text-success font-extrabold">{formatCurrency(calc.companyNetBeforeOtherCosts)}</span>
            </div>
          </div>

          {showConditions && (
            <div className="breakdown-kv-list" style={{ marginTop: '1rem' }}>
              <div className="kv-item">
                <span className="kv-key">Criterio de liquidación</span>
                <span className="kv-val">{triggerLabel}</span>
              </div>
              <div className="kv-item">
                <span className="kv-key">Periodo pactado</span>
                <span className="kv-val">{paymentPeriod}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommissionBreakdown;
