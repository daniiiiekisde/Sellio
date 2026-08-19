import React, { useState } from 'react';
import { calculateCommissions, SELLIO_MAX_COMMISSION_RATE } from '../../utils/commissionCalculator';
import { formatCurrency } from '../../utils/formatters';
import { CheckCircle2, Info, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import './CommissionPreview.css';

export const CommissionPreview = ({
  price = 100,
  commercialCommissionRate = 15,
  commercialCommissionType = 'percentage',
  commercialCommissionAmount = 0,
  sellioCommissionRate = 2,
  sellioCommissionModel = 'fixed',
  monthlyVolume = 0,
  volumeTiers = undefined,
  showSimulatedQuantity = true,
  title = 'Previsualización Económica en Tiempo Real',
  compact = false
}) => {
  const [customPrice, setCustomPrice] = useState(price || 100);
  const [simulatedQty, setSimulatedQty] = useState(1);

  // Cálculo centralizado
  const calculation = calculateCommissions({
    price: customPrice,
    commercialCommissionRate,
    commercialCommissionType,
    commercialCommissionAmount,
    sellioCommissionRate,
    sellioCommissionModel,
    monthlyVolume,
    volumeTiers,
    quantity: simulatedQty
  });

  return (
    <div className={`commission-preview-card ${compact ? 'preview-compact' : ''}`}>
      <div className="preview-header">
        <div className="preview-title-wrap">
          <Sparkles size={16} className="preview-sparkle" />
          <h4 className="preview-title">{title}</h4>
        </div>
        {showSimulatedQuantity && (
          <div className="preview-sim-controls">
            <label className="sim-label">Simular PVP (€):</label>
            <input
              type="number"
              min="1"
              step="1"
              value={customPrice}
              onChange={(e) => setCustomPrice(parseFloat(e.target.value) || 0)}
              className="sim-input"
            />
            {simulatedQty > 1 && (
              <span className="sim-qty-badge">x{simulatedQty} uds</span>
            )}
          </div>
        )}
      </div>

      <div className="preview-table-wrapper">
        <table className="preview-table">
          <tbody>
            <tr className="preview-row base-row">
              <td className="row-concept">Precio total de venta</td>
              <td className="row-rate">{calculation.quantity > 1 ? `${calculation.quantity} uds` : 'Base 100%'}</td>
              <td className="row-amount highlight-base">{formatCurrency(calculation.saleValue)}</td>
            </tr>

            <tr className="preview-row commercial-row">
              <td className="row-concept">
                <span className="concept-dot commercial-dot"></span>
                <span>Comisión Comercial</span>
                <span className="concept-sub">({calculation.commercialCommissionType === 'fixed_amount' ? 'Importe fijo' : `${calculation.commercialRateApplied}%`})</span>
              </td>
              <td className="row-rate">{calculation.commercialRateApplied}%</td>
              <td className="row-amount highlight-commercial">{formatCurrency(calculation.commercialCommission)}</td>
            </tr>

            <tr className="preview-row sellio-row">
              <td className="row-concept">
                <span className="concept-dot sellio-dot"></span>
                <span>Comisión Sellio</span>
                <span className="concept-sub">({calculation.sellioCommissionModel === 'volume_tiered' ? 'Por tramo' : 'Fija'} - Máx {SELLIO_MAX_COMMISSION_RATE}%)</span>
              </td>
              <td className="row-rate">{calculation.sellioRateApplied}%</td>
              <td className="row-amount highlight-sellio">{formatCurrency(calculation.sellioCommission)}</td>
            </tr>

            <tr className="preview-divider-row">
              <td colSpan="3"><hr className="preview-hr" /></td>
            </tr>

            {/* Breakdown Result */}
            <tr className="preview-row result-row recipient-commercial">
              <td className="row-concept font-bold">
                <CheckCircle2 size={15} className="text-success" />
                <span>Comercial recibe (100% íntegro)</span>
              </td>
              <td className="row-rate text-muted">-</td>
              <td className="row-amount text-success font-bold">{formatCurrency(calculation.commercialCommission)}</td>
            </tr>

            <tr className="preview-row result-row recipient-sellio">
              <td className="row-concept font-bold">
                <ShieldCheck size={15} className="text-primary" />
                <span>Sellio recibe (a cargo de empresa)</span>
              </td>
              <td className="row-rate text-muted">-</td>
              <td className="row-amount text-primary font-bold">{formatCurrency(calculation.sellioCommission)}</td>
            </tr>

            <tr className="preview-row result-row recipient-company">
              <td className="row-concept font-bold">
                <span>Empresa recibe</span>
                <span className="asterisk-mark">*</span>
              </td>
              <td className="row-rate text-muted">-</td>
              <td className="row-amount font-extrabold highlight-company">{formatCurrency(calculation.companyNetBeforeOtherCosts)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="preview-footer-notes">
        <div className="note-item">
          <Info size={13} />
          <span><strong>Regla de oro Sellio:</strong> La comisión del comercial pertenece íntegramente al comercial. Sellio no la descuenta.</span>
        </div>
        <p className="disclaimer-text">
          * Antes de otros costes o impuestos aplicables propios del producto o actividad fiscal de la empresa.
        </p>
      </div>
    </div>
  );
};

export default CommissionPreview;
