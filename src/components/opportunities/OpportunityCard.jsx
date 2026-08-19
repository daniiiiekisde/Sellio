import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Building2,
  Tag,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Briefcase,
  Layers,
  Sparkles,
  Calendar
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { calculateCommissions } from '../../utils/commissionCalculator';
import { CommissionBadge } from '../commissions/CommissionBadge';
import { OpportunityBadge } from './OpportunityBadge';
import { OpportunityStatus } from './OpportunityStatus';
import './opportunities.css';

export const OpportunityCard = ({
  opportunity = {},
  onInterestClick = null,
  onCompareToggle = null,
  isComparing = false,
  showCompareOption = true
}) => {
  const {
    id,
    title,
    product_name,
    product = {},
    company_name,
    company = {},
    category = 'Distribución y Ventas',
    sector = 'Consumo',
    target_region = 'España',
    price = 100,
    commercial_commission_rate = 15,
    commercial_commission_amount = 0,
    commercial_commission_type = 'percentage',
    sellio_commission_rate = 2,
    required_experience = 'Media (2-3 años)',
    status = 'published',
    badge_type = 'NUEVA',
    is_verified_company = false,
    matching_score = null,
    active_until = null,
    offer_version = 1
  } = opportunity;

  const actualProductName = product_name || product?.name || title || 'Oportunidad Comercial';
  const actualCompanyName = company_name || company?.name || 'Empresa Colaboradora';
  const actualPrice = typeof price === 'number' ? price : (parseFloat(String(price).replace('€', '').trim()) || 0);

  const calc = calculateCommissions({
    price: actualPrice,
    commercialCommissionType: commercial_commission_type,
    commercialCommissionRate: commercial_commission_rate,
    commercialCommissionAmount: commercial_commission_amount,
    sellioCommissionRate: sellio_commission_rate
  });

  return (
    <div className="opportunity-card">
      <div>
        {/* Top Badges */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            {badge_type && <OpportunityBadge type={badge_type} />}
            <span className="badge badge-secondary" style={{ fontSize: '11px', padding: '2px 8px' }}>
              <Tag size={11} /> {category}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {matching_score && (
              <span className="badge badge-primary" style={{ fontSize: '11px', fontWeight: 800 }}>
                <Sparkles size={11} /> {matching_score}% Match
              </span>
            )}
            <OpportunityStatus status={status} />
          </div>
        </div>

        {/* Product & Company */}
        <div style={{ marginBottom: '1rem' }}>
          <h4 style={{ margin: '0 0 0.35rem 0', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.3 }}>
            {actualProductName}
          </h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <Building2 size={14} color="var(--primary)" />
            <span style={{ fontWeight: 600 }}>{actualCompanyName}</span>
            {is_verified_company && (
              <span style={{ display: 'inline-flex', alignItems: 'center', color: '#059669', fontSize: '11px' }}>
                <ShieldCheck size={13} style={{ marginRight: '2px' }} /> Verificada
              </span>
            )}
          </div>
        </div>

        {/* Economics Block (Visible and Transparent) */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: 'var(--radius-lg)',
          padding: '1rem',
          marginBottom: '1rem'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.65rem' }}>
            <div>
              <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block' }}>
                Precio Producto
              </span>
              <strong style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                {formatCurrency(calc.saleValue)}
              </strong>
            </div>

            <div>
              <span style={{ fontSize: '0.725rem', color: '#047857', textTransform: 'uppercase', display: 'block' }}>
                Tu Comisión ({calc.commercialRateApplied}%)
              </span>
              <strong style={{ fontSize: '1.15rem', color: '#059669' }}>
                {formatCurrency(calc.commercialCommission)} <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>/ venta</span>
              </strong>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid #edf2f7', paddingTop: '0.5rem' }}>
            <span>Sellio: {formatCurrency(calc.sellioCommission)} ({calc.sellioRateApplied}%)</span>
            <span>Versión {offer_version}</span>
          </div>
        </div>

        {/* Key Parameters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MapPin size={14} color="#64748b" />
            <span>Zona comercial: <strong>{target_region}</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Briefcase size={14} color="#64748b" />
            <span>Experiencia: <strong>{required_experience}</strong></span>
          </div>
          {active_until && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#94a3b8' }}>
              <Calendar size={13} />
              <span>Válida hasta: {new Date(active_until).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
        {showCompareOption && onCompareToggle && (
          <button
            type="button"
            onClick={() => onCompareToggle(opportunity)}
            style={{
              padding: '0.55rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              border: isComparing ? '1px solid #2563eb' : '1px solid #e2e8f0',
              background: isComparing ? '#eff6ff' : '#ffffff',
              color: isComparing ? '#1d4ed8' : 'var(--text-secondary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Layers size={14} />
            {isComparing ? 'Comparando' : 'Comparar'}
          </button>
        )}

        <button
          type="button"
          onClick={() => onInterestClick ? onInterestClick(opportunity) : null}
          style={{
            flex: 1,
            padding: '0.65rem 1rem',
            background: 'var(--primary)',
            color: '#ffffff',
            borderRadius: 'var(--radius-md)',
            fontWeight: 700,
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
            transition: 'background var(--transition-fast)'
          }}
        >
          <span>Me Interesa</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default OpportunityCard;
