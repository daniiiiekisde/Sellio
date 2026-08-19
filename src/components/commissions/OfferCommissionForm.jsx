import React, { useState } from 'react';
import { 
  SELLIO_MAX_COMMISSION_RATE, 
  DEFAULT_VOLUME_TIERS,
  validateCommissionConfig, 
  parseRate 
} from '../../utils/commissionCalculator';
import CommissionPreview from './CommissionPreview';
import VolumeCommissionTiers from './VolumeCommissionTiers';
import { ShieldCheck, CheckCircle2, AlertTriangle, HelpCircle, ArrowRight } from 'lucide-react';
import './OfferCommissionForm.css';

export const OfferCommissionForm = ({
  values = {},
  onChange,
  productPrice = 100
}) => {
  // Commercial commission state
  const commercialType = values.commercial_commission_type || 'percentage';
  const commercialRate = values.commercial_commission_rate !== undefined ? values.commercial_commission_rate : 15;
  const commercialAmount = values.commercial_commission_amount || 0;
  const commercialBasis = values.commercial_commission_basis || 'sale_value';
  const commissionNotes = values.commission_notes || '';

  // Sellio commission state
  const sellioModel = values.sellio_commission_model || 'fixed';
  const sellioRate = values.sellio_commission_rate !== undefined ? values.sellio_commission_rate : 2.0;
  const volumeTiers = values.volume_tiers || DEFAULT_VOLUME_TIERS;

  // Conditions
  const paymentTrigger = values.commission_payment_trigger || 'paid_sale';
  const paymentPeriod = values.payment_period || '30 días fin de mes';
  const minimumSale = values.minimum_sale_value || '';

  const [activeTab, setActiveTab] = useState('commercial'); // 'commercial' | 'sellio' | 'conditions' | 'preview'

  const handleFieldChange = (field, value) => {
    if (onChange) {
      onChange({
        ...values,
        [field]: value
      });
    }
  };

  const validation = validateCommissionConfig({
    commercialRate,
    commercialAmount,
    commercialType,
    sellioRate,
    sellioModel,
    volumeTiers
  });

  return (
    <div className="offer-commission-form-container">
      {/* Tab Navigation */}
      <div className="form-subtabs">
        <button
          type="button"
          className={`subtab-btn ${activeTab === 'commercial' ? 'subtab-active' : ''}`}
          onClick={() => setActiveTab('commercial')}
        >
          1. Comisión Comercial
        </button>
        <button
          type="button"
          className={`subtab-btn ${activeTab === 'sellio' ? 'subtab-active' : ''}`}
          onClick={() => setActiveTab('sellio')}
        >
          2. Comisión Sellio (Máx 5%)
        </button>
        <button
          type="button"
          className={`subtab-btn ${activeTab === 'conditions' ? 'subtab-active' : ''}`}
          onClick={() => setActiveTab('conditions')}
        >
          3. Condiciones y Pagos
        </button>
        <button
          type="button"
          className={`subtab-btn ${activeTab === 'preview' ? 'subtab-active' : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          4. Simulación Económica
        </button>
      </div>

      {/* Validation Errors banner */}
      {!validation.isValid && (
        <div className="validation-error-banner">
          <AlertTriangle size={16} />
          <div>
            <strong>Atención a las condiciones:</strong>
            <ul>
              {validation.errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          </div>
        </div>
      )}

      {/* TAB 1: Comercial */}
      {activeTab === 'commercial' && (
        <div className="subtab-content">
          <div className="callout-banner callout-success">
            <CheckCircle2 size={16} className="callout-icon" />
            <div className="callout-text">
              <strong>Garantía de transparencia:</strong> Esta comisión pertenece íntegramente al comercial. Sellio no la descuenta en ningún caso.
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Tipo de Retribución</label>
              <div className="type-toggle-group">
                <button
                  type="button"
                  className={`type-toggle-btn ${commercialType === 'percentage' ? 'active' : ''}`}
                  onClick={() => handleFieldChange('commercial_commission_type', 'percentage')}
                >
                  Porcentaje (%)
                </button>
                <button
                  type="button"
                  className={`type-toggle-btn ${commercialType === 'fixed_amount' ? 'active' : ''}`}
                  onClick={() => handleFieldChange('commercial_commission_type', 'fixed_amount')}
                >
                  Importe Fijo (€)
                </button>
              </div>
            </div>

            {commercialType === 'percentage' ? (
              <div className="form-group">
                <label className="form-label">Porcentaje Comercial (%)</label>
                <div className="input-with-suffix">
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    max="100"
                    className="form-input"
                    value={commercialRate}
                    onChange={(e) => handleFieldChange('commercial_commission_rate', parseFloat(e.target.value) || 0)}
                    placeholder="15"
                  />
                  <span className="input-suffix">%</span>
                </div>
              </div>
            ) : (
              <div className="form-group">
                <label className="form-label">Importe Fijo por Venta (€)</label>
                <div className="input-with-suffix">
                  <input
                    type="number"
                    step="1"
                    min="1"
                    className="form-input"
                    value={commercialAmount}
                    onChange={(e) => handleFieldChange('commercial_commission_amount', parseFloat(e.target.value) || 0)}
                    placeholder="25.00"
                  />
                  <span className="input-suffix">€</span>
                </div>
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Base de Cálculo</label>
            <select
              className="form-select"
              value={commercialBasis}
              onChange={(e) => handleFieldChange('commercial_commission_basis', e.target.value)}
            >
              <option value="sale_value">Sobre valor de venta bruta (PVP)</option>
              <option value="net_sale">Sobre venta neta (descontando portes directos)</option>
              <option value="other">Otro acuerdo específico</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Notas o Aclaraciones de Comisión (Opcional)</label>
            <input
              type="text"
              className="form-input"
              value={commissionNotes}
              onChange={(e) => handleFieldChange('commission_notes', e.target.value)}
              placeholder="Ej: Aplica tanto a primera venta como a reposiciones recurrentes durante 12 meses"
            />
          </div>
        </div>
      )}

      {/* TAB 2: Sellio */}
      {activeTab === 'sellio' && (
        <div className="subtab-content">
          <div className="callout-banner callout-info">
            <ShieldCheck size={16} className="callout-icon" />
            <div className="callout-text">
              <strong>Tarifa de Plataforma Sellio:</strong> La comisión de Sellio se cobra directamente a la empresa y es independiente de la comisión del comercial. Límite máximo funcional del <strong>5.0%</strong>.
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Modelo de Comisión Sellio</label>
            <div className="type-toggle-group">
              <button
                type="button"
                className={`type-toggle-btn ${sellioModel === 'fixed' ? 'active' : ''}`}
                onClick={() => handleFieldChange('sellio_commission_model', 'fixed')}
              >
                Porcentaje Fijo (0% - 5%)
              </button>
              <button
                type="button"
                className={`type-toggle-btn ${sellioModel === 'volume_tiered' ? 'active' : ''}`}
                onClick={() => handleFieldChange('sellio_commission_model', 'volume_tiered')}
              >
                Escalonada por Volumen Mensual
              </button>
            </div>
          </div>

          {sellioModel === 'fixed' ? (
            <div className="form-group">
              <label className="form-label">Comisión Fija Sellio (% sobre venta)</label>
              <div className="input-with-suffix">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max={SELLIO_MAX_COMMISSION_RATE}
                  className={`form-input ${parseRate(sellioRate) > SELLIO_MAX_COMMISSION_RATE ? 'input-invalid' : ''}`}
                  value={sellioRate}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value) || 0;
                    handleFieldChange('sellio_commission_rate', Math.min(SELLIO_MAX_COMMISSION_RATE, Math.max(0, val)));
                  }}
                  placeholder="2.0"
                />
                <span className="input-suffix">%</span>
              </div>
              <span className="form-help-text">Máximo permitido en Sellio: {SELLIO_MAX_COMMISSION_RATE}%</span>
            </div>
          ) : (
            <VolumeCommissionTiers
              tiers={volumeTiers}
              onChange={(updatedTiers) => handleFieldChange('volume_tiers', updatedTiers)}
            />
          )}
        </div>
      )}

      {/* TAB 3: Condiciones */}
      {activeTab === 'conditions' && (
        <div className="subtab-content">
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Momento de Devengo de Comisión</label>
              <select
                className="form-select"
                value={paymentTrigger}
                onChange={(e) => handleFieldChange('commission_payment_trigger', e.target.value)}
              >
                <option value="paid_sale">Venta cobrada efectivamente por la empresa</option>
                <option value="confirmed_sale">Pedido / Contrato confirmado</option>
                <option value="other">Acuerdo particular</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Plazo de Liquidación</label>
              <select
                className="form-select"
                value={paymentPeriod}
                onChange={(e) => handleFieldChange('payment_period', e.target.value)}
              >
                <option value="30 días fin de mes">30 días fin de mes</option>
                <option value="15 días tras cobro">15 días tras cobro</option>
                <option value="Inmediato a liquidación">Inmediato a liquidación</option>
                <option value="Trimestral">Trimestral</option>
              </select>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Pedido Mínimo Comisionable (€)</label>
              <input
                type="number"
                min="0"
                step="50"
                className="form-input"
                value={minimumSale}
                onChange={(e) => handleFieldChange('minimum_sale_value', parseFloat(e.target.value) || '')}
                placeholder="Ej. 100 € (dejar vacío si no hay mínimo)"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Política de Devoluciones / Garantía</label>
              <input
                type="text"
                className="form-input"
                value={values.returns_policy || ''}
                onChange={(e) => handleFieldChange('returns_policy', e.target.value)}
                placeholder="Ej. 14 días desistimiento legal"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Simulación */}
      {activeTab === 'preview' && (
        <div className="subtab-content">
          <CommissionPreview
            price={productPrice}
            commercialCommissionRate={commercialRate}
            commercialCommissionType={commercialType}
            commercialCommissionAmount={commercialAmount}
            sellioCommissionRate={sellioRate}
            sellioCommissionModel={sellioModel}
            volumeTiers={volumeTiers}
          />
        </div>
      )}
    </div>
  );
};

export default OfferCommissionForm;
