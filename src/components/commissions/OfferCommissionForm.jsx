import React from 'react';
import { SELLIO_MAX_COMMISSION_RATE, validateCommissionConfig } from '../../utils/commissionCalculator';
import { CommissionBreakdown } from './CommissionBreakdown';
import { VolumeCommissionTiers } from './VolumeCommissionTiers';
import { Sparkles, AlertCircle, Percent, DollarSign } from 'lucide-react';
import './commissions.css';

export const OfferCommissionForm = ({
  price = 0,
  values = {
    commercialCommissionType: 'percentage',
    commercialCommissionRate: 15,
    commercialCommissionAmount: 0,
    sellioCommissionModel: 'fixed',
    sellioCommissionRate: 2
  },
  onChange,
  errors = []
}) => {
  const handleChange = (field, value) => {
    if (onChange) {
      onChange({
        ...values,
        [field]: value
      });
    }
  };

  const validation = validateCommissionConfig({
    commercialRate: values.commercialCommissionRate,
    commercialAmount: values.commercialCommissionAmount,
    commercialType: values.commercialCommissionType,
    sellioRate: values.sellioCommissionRate,
    sellioModel: values.sellioCommissionModel
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* 1. Configuración Comisión Comercial */}
      <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid #e2e8f0' }}>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          1. Comisión para el Comercial
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Modalidad de Comisión
            </label>
            <select
              value={values.commercialCommissionType}
              onChange={(e) => handleChange('commercialCommissionType', e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 0.8rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #cbd5e1',
                background: '#fff'
              }}
            >
              <option value="percentage">Porcentaje por Venta (%)</option>
              <option value="fixed_amount">Importe Fijo por Venta (€)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              {values.commercialCommissionType === 'percentage' ? 'Porcentaje Acordado (%)' : 'Importe Fijo (€)'}
            </label>
            <input
              type="number"
              min="0"
              step={values.commercialCommissionType === 'percentage' ? '0.5' : '1'}
              max={values.commercialCommissionType === 'percentage' ? '100' : '999999'}
              value={values.commercialCommissionType === 'percentage' ? values.commercialCommissionRate : values.commercialCommissionAmount}
              onChange={(e) => handleChange(
                values.commercialCommissionType === 'percentage' ? 'commercialCommissionRate' : 'commercialCommissionAmount',
                parseFloat(e.target.value) || 0
              )}
              style={{
                width: '100%',
                padding: '0.6rem 0.8rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #cbd5e1'
              }}
            />
          </div>
        </div>

        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Esta comisión la abona la empresa directamente al comercial por cada venta cerrada y confirmada.
        </p>
      </div>

      {/* 2. Configuración Comisión Sellio */}
      <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            2. Comisión de Sellio
          </h4>
          <span className="badge badge-primary" style={{ fontSize: '10px' }}>
            Máximo legal de Sellio: {SELLIO_MAX_COMMISSION_RATE}%
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              Modelo de Sellio
            </label>
            <select
              value={values.sellioCommissionModel}
              onChange={(e) => handleChange('sellioCommissionModel', e.target.value)}
              style={{
                width: '100%',
                padding: '0.6rem 0.8rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #cbd5e1',
                background: '#fff'
              }}
            >
              <option value="fixed">Tasa Fija Estándar</option>
              <option value="volume_tiered">Escalado Progresivo por Volumen</option>
            </select>
          </div>

          {values.sellioCommissionModel === 'fixed' && (
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                Tasa Fija (%) — (Máx {SELLIO_MAX_COMMISSION_RATE}%)
              </label>
              <input
                type="number"
                min="0"
                max={SELLIO_MAX_COMMISSION_RATE}
                step="0.1"
                value={values.sellioCommissionRate}
                onChange={(e) => handleChange('sellioCommissionRate', Math.min(SELLIO_MAX_COMMISSION_RATE, parseFloat(e.target.value) || 0))}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.8rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid #cbd5e1'
                }}
              />
            </div>
          )}
        </div>

        {values.sellioCommissionModel === 'volume_tiered' && (
          <VolumeCommissionTiers readOnly />
        )}
      </div>

      {/* Validaciones */}
      {!validation.isValid && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)' }}>
          {validation.errors.map((err, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#dc2626', fontSize: '0.825rem' }}>
              <AlertCircle size={14} />
              <span>{err}</span>
            </div>
          ))}
        </div>
      )}

      {/* Previsualización en Vivo */}
      <CommissionBreakdown
        price={price}
        commercialCommissionType={values.commercialCommissionType}
        commercialCommissionRate={values.commercialCommissionRate}
        commercialCommissionAmount={values.commercialCommissionAmount}
        sellioCommissionModel={values.sellioCommissionModel}
        sellioCommissionRate={values.sellioCommissionRate}
      />
    </div>
  );
};

export default OfferCommissionForm;
