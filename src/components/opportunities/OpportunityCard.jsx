import React, { useState } from 'react';
import {
  MapPin,
  Building2,
  Tag,
  ArrowUpRight,
  ShieldCheck,
  Briefcase,
  Layers,
  Sparkles,
  Heart,
  Calculator,
  ChevronDown,
  ChevronUp,
  Info,
  Check
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { calculateCommissions } from '../../utils/commissionCalculator';
import { calculateSellioMatch } from '../../utils/sellioMatch';
import { calculateSellioPotential } from '../../utils/sellioPotential';
import { OpportunityBadge } from './OpportunityBadge';
import { OpportunityStatus } from './OpportunityStatus';
import './opportunities.css';

export const OpportunityCard = ({
  opportunity = {},
  onInterestClick = null,
  onViewDetail = null,
  onCompareToggle = null,
  isComparing = false,
  showCompareOption = true,
  isSaved = false,
  onToggleSave = null,
  viewMode = 'grid'
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
    is_verified_company = true,
    matching_score = null,
    offer_version = 1
  } = opportunity;

  const [showPotential, setShowPotential] = useState(false);
  const [selectedSalesPreset, setSelectedSalesPreset] = useState(25);
  const [showMatchInfo, setShowMatchInfo] = useState(false);

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

  const matchData = calculateSellioMatch(opportunity);
  const potential = calculateSellioPotential({
    price: actualPrice,
    commissionRate: calc.commercialRateApplied,
    commissionAmount: calc.commercialCommission,
    commissionType: commercial_commission_type,
    customSalesCount: selectedSalesPreset
  });

  if (viewMode === 'list') {
    return (
      <div className="opportunity-list-card">
        <div style={{ flex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.35rem' }}>
            {badge_type && <OpportunityBadge type={badge_type} />}
            <span className="badge badge-secondary" style={{ fontSize: '11px', padding: '2px 8px' }}>
              <Tag size={11} /> {category}
            </span>
            {is_verified_company && (
              <span style={{ display: 'inline-flex', alignItems: 'center', color: '#059669', fontSize: '11px', fontWeight: 600 }}>
                <ShieldCheck size={13} style={{ marginRight: '3px' }} /> Verificada
              </span>
            )}
          </div>
          <h4 
            onClick={() => onViewDetail && onViewDetail(opportunity)}
            style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', cursor: 'pointer' }}
          >
            {actualProductName}
          </h4>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Empresa: <strong>{actualCompanyName}</strong> · 📍 {target_region}
          </p>
        </div>

        <div style={{ flex: 1, textAlign: 'center' }}>
          <div className={`sellio-match-tag ${matchData.isTopMatch ? 'top-match' : ''}`}>
            <Sparkles size={12} /> {matchData.score}% Match
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {matchData.tags[0] || 'Zona cubierta'}
          </div>
        </div>

        <div style={{ flex: 1.5, textAlign: 'right' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Comisión comercial</div>
          <strong style={{ fontSize: '1.2rem', color: '#059669' }}>
            {calc.commercialRateApplied}% ({formatCurrency(calc.commercialCommission)}/vta)
          </strong>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {onToggleSave && (
            <button
              type="button"
              className={`save-heart-btn ${isSaved ? 'is-saved' : ''}`}
              onClick={() => onToggleSave(id)}
              title={isSaved ? 'Guardado' : 'Guardar'}
            >
              <Heart size={18} fill={isSaved ? '#ef4444' : 'none'} />
            </button>
          )}

          <button
            type="button"
            onClick={() => onViewDetail ? onViewDetail(opportunity) : null}
            style={{
              padding: '0.55rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              fontSize: '0.825rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Ver Ficha
          </button>

          <button
            type="button"
            onClick={() => onInterestClick ? onInterestClick(opportunity) : null}
            style={{
              padding: '0.55rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary)',
              color: '#ffffff',
              fontSize: '0.825rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)'
            }}
          >
            <span>Me Interesa</span>
            <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="opportunity-card">
      <div>
        {/* Top Badges & Heart Save */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            {badge_type && <OpportunityBadge type={badge_type} />}
            {is_verified_company && (
              <span className="opp-badge-verified opportunity-badge-pill" style={{ fontSize: '11px' }}>
                <ShieldCheck size={12} /> Verificada
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              type="button"
              className={`sellio-match-tag ${matchData.isTopMatch ? 'top-match' : ''}`}
              onClick={() => setShowMatchInfo(!showMatchInfo)}
              title="Haz clic para ver la explicación del Match"
              style={{ border: 'none', cursor: 'pointer' }}
            >
              <Sparkles size={11} /> {matchData.score}% Match
            </button>

            {onToggleSave && (
              <button
                type="button"
                className={`save-heart-btn ${isSaved ? 'is-saved' : ''}`}
                onClick={() => onToggleSave(id)}
                title={isSaved ? 'Guardada en favoritos' : 'Guardar oportunidad'}
              >
                <Heart size={16} fill={isSaved ? '#ef4444' : 'none'} />
              </button>
            )}
          </div>
        </div>

        {/* Match Breakdown Popover */}
        {showMatchInfo && (
          <div className="sellio-match-tooltip">
            <div style={{ fontWeight: 700, color: '#1d4ed8', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={13} /> Sellio Match Inteligente ({matchData.score}%)
            </div>
            <p style={{ margin: '0 0 6px 0', fontSize: '0.75rem', color: '#334155' }}>
              {matchData.reason}
            </p>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {matchData.tags.map((t, idx) => (
                <span key={idx} style={{ fontSize: '10px', background: '#e2e8f0', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Product & Company */}
        <div style={{ marginBottom: '1rem', marginTop: showMatchInfo ? '0.5rem' : 0 }}>
          <h4 
            onClick={() => onViewDetail && onViewDetail(opportunity)}
            style={{ 
              margin: '0 0 0.35rem 0', 
              fontSize: '1.15rem', 
              fontWeight: 800, 
              color: 'var(--text-primary)', 
              lineHeight: 1.3,
              cursor: 'pointer'
            }}
          >
            {actualProductName}
          </h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <Building2 size={14} color="var(--primary)" />
            <span style={{ fontWeight: 600 }}>{actualCompanyName}</span>
          </div>
        </div>

        {/* Economics Block (Visible and Transparent) */}
        <div style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          border: '1px solid #e2e8f0',
          borderRadius: 'var(--radius-lg)',
          padding: '1rem',
          marginBottom: '0.75rem'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div>
              <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', fontWeight: 600 }}>
                Precio Venta
              </span>
              <strong style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                {formatCurrency(calc.saleValue)}
              </strong>
            </div>

            <div>
              <span style={{ fontSize: '0.725rem', color: '#047857', textTransform: 'uppercase', display: 'block', fontWeight: 700 }}>
                💰 {calc.commercialRateApplied}% Comisión
              </span>
              <strong style={{ fontSize: '1.25rem', color: '#059669', display: 'block', lineHeight: 1.1 }}>
                {formatCurrency(calc.commercialCommission)}
                <span style={{ fontSize: '0.725rem', fontWeight: 600, color: '#047857', marginLeft: '3px' }}>/ venta</span>
              </strong>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid #e2e8f0', paddingTop: '0.45rem' }}>
            <span>📍 {target_region}</span>
            <span>Versión {offer_version}</span>
          </div>
        </div>

        {/* Sellio Potential Expander Button */}
        <div style={{ marginBottom: '0.75rem' }}>
          <button
            type="button"
            onClick={() => setShowPotential(!showPotential)}
            style={{
              width: '100%',
              background: '#f0fdf4',
              border: '1px dashed #86efac',
              borderRadius: 'var(--radius-md)',
              padding: '0.45rem 0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.775rem',
              fontWeight: 700,
              color: '#15803d',
              cursor: 'pointer'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Calculator size={13} />
              ¿Cuánto podrías ganar? ({selectedSalesPreset} vtas → {formatCurrency(potential.customTotal)})
            </span>
            {showPotential ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {/* Inline Potential Quick Simulator */}
          {showPotential && (
            <div className="sellio-potential-widget">
              <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontWeight: 600 }}>
                Selecciona objetivo de ventas previsto:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px', marginBottom: '0.6rem' }}>
                {[10, 25, 50, 100].map((count) => (
                  <button
                    key={count}
                    type="button"
                    className={`potential-preset-btn ${selectedSalesPreset === count ? 'active' : ''}`}
                    onClick={() => setSelectedSalesPreset(count)}
                  >
                    {count} vtas
                  </button>
                ))}
              </div>

              <div style={{ background: '#ffffff', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #bbf7d0', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#166534' }}>
                  {selectedSalesPreset} ventas × {formatCurrency(calc.commercialCommission)} =
                </span>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#15803d' }}>
                  {formatCurrency(potential.customTotal)} <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>potenciales</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Key Parameters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Briefcase size={13} color="#64748b" />
            <span>Requisito: <strong>{required_experience}</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Tag size={13} color="#64748b" />
            <span>Categoría: <strong>{category}</strong></span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderTop: '1px solid #f1f5f9', paddingTop: '0.85rem' }}>
        {showCompareOption && onCompareToggle && (
          <button
            type="button"
            onClick={() => onCompareToggle(opportunity)}
            title="Comparar con otras oportunidades"
            style={{
              padding: '0.55rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              border: isComparing ? '1px solid #2563eb' : '1px solid #e2e8f0',
              background: isComparing ? '#eff6ff' : '#ffffff',
              color: isComparing ? '#1d4ed8' : 'var(--text-secondary)',
              fontSize: '0.775rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer'
            }}
          >
            <Layers size={13} />
            {isComparing ? '✓' : ''}
          </button>
        )}

        {onViewDetail && (
          <button
            type="button"
            onClick={() => onViewDetail(opportunity)}
            style={{
              padding: '0.6rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: 'var(--text-primary)',
              fontSize: '0.825rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Ver Ficha
          </button>
        )}

        <button
          type="button"
          onClick={() => onInterestClick ? onInterestClick(opportunity) : null}
          style={{
            flex: 1,
            padding: '0.6rem 1rem',
            background: 'var(--primary)',
            color: '#ffffff',
            borderRadius: 'var(--radius-md)',
            fontWeight: 700,
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
            cursor: 'pointer',
            border: 'none'
          }}
        >
          <span>Me Interesa</span>
          <ArrowUpRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default OpportunityCard;
