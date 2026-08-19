import React from 'react';
import { X, Layers, Check, ArrowRight, ShieldCheck, Tag, MapPin, Briefcase } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { calculateCommissions } from '../../utils/commissionCalculator';
import './opportunities.css';

export const OpportunityCompare = ({
  opportunities = [],
  onClose,
  onSelectOpportunity
}) => {
  if (!opportunities || opportunities.length === 0) return null;

  return (
    <div className="compare-modal-backdrop" onClick={onClose}>
      <div className="compare-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={22} color="var(--primary)" />
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>
                Comparador de Oportunidades Comerciales
              </h3>
              <p style={{ margin: 0, fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                Comparando {opportunities.length} ofertas lado a lado para evaluar rentabilidad y adecuación.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Comparison Table */}
        <table className="compare-table">
          <thead>
            <tr>
              <th style={{ width: '220px' }}>Criterio</th>
              {opportunities.map((opp, idx) => (
                <th key={opp.id || idx}>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                    {opp.product_name || opp.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
                    {opp.company_name || 'Empresa'}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* 1. Precio Base */}
            <tr>
              <td style={{ fontWeight: 600 }}>Precio del Producto</td>
              {opportunities.map((opp, idx) => (
                <td key={idx} style={{ fontWeight: 700, fontSize: '1rem' }}>
                  {formatCurrency(opp.price || 0)}
                </td>
              ))}
            </tr>

            {/* 2. Comisión Comercial */}
            <tr>
              <td style={{ fontWeight: 600, color: '#059669' }}>Comisión Comercial (%)</td>
              {opportunities.map((opp, idx) => (
                <td key={idx} style={{ color: '#059669', fontWeight: 700 }}>
                  <span className="badge badge-success" style={{ fontSize: '12px' }}>
                    {opp.commercial_commission_rate || 15}%
                  </span>
                </td>
              ))}
            </tr>

            {/* 3. Ganancia Neta por Venta */}
            <tr>
              <td style={{ fontWeight: 700, color: '#047857' }}>Ganancia Neta por Venta (€)</td>
              {opportunities.map((opp, idx) => {
                const calc = calculateCommissions({
                  price: opp.price || 0,
                  commercialCommissionRate: opp.commercial_commission_rate || 15,
                  sellioCommissionRate: opp.sellio_commission_rate || 2
                });
                return (
                  <td key={idx} style={{ color: '#047857', fontWeight: 800, fontSize: '1.1rem' }}>
                    {formatCurrency(calc.commercialCommission)}
                  </td>
                );
              })}
            </tr>

            {/* 4. Comisión Sellio (Plataforma) */}
            <tr>
              <td style={{ fontWeight: 600 }}>Comisión Sellio</td>
              {opportunities.map((opp, idx) => (
                <td key={idx} style={{ color: '#2563eb' }}>
                  {opp.sellio_commission_rate || 2}% (a cargo de empresa)
                </td>
              ))}
            </tr>

            {/* 5. Territorio / Región */}
            <tr>
              <td style={{ fontWeight: 600 }}>Zona Comercial</td>
              {opportunities.map((opp, idx) => (
                <td key={idx}>
                  <MapPin size={13} style={{ display: 'inline', marginRight: '4px', color: '#64748b' }} />
                  {opp.target_region || 'Nacional'}
                </td>
              ))}
            </tr>

            {/* 6. Experiencia Requerida */}
            <tr>
              <td style={{ fontWeight: 600 }}>Experiencia</td>
              {opportunities.map((opp, idx) => (
                <td key={idx}>
                  <Briefcase size={13} style={{ display: 'inline', marginRight: '4px', color: '#64748b' }} />
                  {opp.required_experience || 'No especificada'}
                </td>
              ))}
            </tr>

            {/* 7. Empresa Verificada */}
            <tr>
              <td style={{ fontWeight: 600 }}>Verificación Empresa</td>
              {opportunities.map((opp, idx) => (
                <td key={idx}>
                  {opp.is_verified_company ? (
                    <span style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}>
                      <ShieldCheck size={16} /> Verificada
                    </span>
                  ) : (
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Sin verificar</span>
                  )}
                </td>
              ))}
            </tr>

            {/* 8. Acción */}
            <tr>
              <td style={{ fontWeight: 600 }}>Acción</td>
              {opportunities.map((opp, idx) => (
                <td key={idx}>
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectOpportunity) onSelectOpportunity(opp);
                      onClose();
                    }}
                    style={{
                      padding: '0.5rem 1rem',
                      background: 'var(--primary)',
                      color: '#ffffff',
                      borderRadius: 'var(--radius-md)',
                      fontWeight: 700,
                      fontSize: '0.825rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <span>Ver y Postular</span>
                    <ArrowRight size={14} />
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OpportunityCompare;
