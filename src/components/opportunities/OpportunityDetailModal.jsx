import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Tag,
  ShieldCheck,
  Sparkles,
  Calculator,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Clock,
  Award,
  AlertCircle,
  X
} from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { calculateCommissions } from '../../utils/commissionCalculator';
import { calculateSellioMatch } from '../../utils/sellioMatch';
import { calculateSellioPotential } from '../../utils/sellioPotential';
import { Modal, Button } from '../common';

export const OpportunityDetailModal = ({
  opportunity,
  isOpen,
  onClose,
  onApply
}) => {
  if (!opportunity) return null;

  const [salesSlider, setSalesSlider] = useState(25);
  const [pitchMessage, setPitchMessage] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const {
    id,
    title,
    product_name,
    company_name,
    category = 'Distribución y Ventas',
    sector = 'Consumo',
    target_region = 'España',
    price = 100,
    commercial_commission_rate = 15,
    commercial_commission_amount = 0,
    commercial_commission_type = 'percentage',
    sellio_commission_rate = 2,
    required_experience = 'Media (2-3 años)',
    is_verified_company = true,
    description = 'Buscamos comercial con cartera de clientes y experiencia en el sector para apertura de mercado y canal de distribución.',
    offer_version = 1
  } = opportunity;

  const actualProductName = product_name || title || 'Oportunidad Comercial';
  const actualCompanyName = company_name || 'Empresa Colaboradora';
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
    customSalesCount: salesSlider
  });

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    setIsApplying(true);
    try {
      if (onApply) {
        await onApply(opportunity, pitchMessage);
      }
      setAppliedSuccess(true);
      setTimeout(() => {
        setAppliedSuccess(false);
        onClose();
      }, 1800);
    } catch (err) {
      console.error(err);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Ficha Detallada de Oportunidad Comercial"
      size="large"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Header Ficha */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', position: 'relative', zIndex: 1 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                <span style={{ background: 'rgba(255,255,255,0.15)', padding: '2px 8px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700 }}>
                  VERSIÓN {offer_version} REGISTRADA
                </span>
                {is_verified_company && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#34d399', fontSize: '11px', fontWeight: 700 }}>
                    <ShieldCheck size={14} /> Empresa Verificada
                  </span>
                )}
              </div>
              <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                {actualProductName}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '0.9rem' }}>
                <Building2 size={16} color="#38bdf8" />
                <span style={{ fontWeight: 600, color: '#e2e8f0' }}>{actualCompanyName}</span>
                <span>·</span>
                <MapPin size={16} color="#38bdf8" />
                <span>{target_region}</span>
              </div>
            </div>

            {/* Sellio Match Badge */}
            <div style={{
              background: 'rgba(37, 99, 235, 0.25)',
              border: '1px solid rgba(96, 165, 250, 0.4)',
              borderRadius: 'var(--radius-lg)',
              padding: '0.75rem 1rem',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.75rem', color: '#93c5fd', textTransform: 'uppercase', fontWeight: 700 }}>
                Sellio Match
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <Sparkles size={20} color="#fbbf24" /> {matchData.score}%
              </div>
              <div style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>Alta compatibilidad</div>
            </div>
          </div>
        </div>

        {/* Sellio Match Explanation Banner */}
        <div style={{
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: 'var(--radius-lg)',
          padding: '1rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <Sparkles size={24} color="#2563eb" style={{ flexShrink: 0 }} />
          <div>
            <strong style={{ color: '#1e40af', fontSize: '0.9rem', display: 'block', marginBottom: '2px' }}>
              ¿Por qué es compatible con tu perfil?
            </strong>
            <p style={{ margin: 0, fontSize: '0.825rem', color: '#1e3a8a' }}>
              {matchData.reason}
            </p>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-lg)', padding: '1rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>
              Comisión Comercial
            </span>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#059669', marginTop: '2px' }}>
              {calc.commercialRateApplied}%
            </div>
            <span style={{ fontSize: '0.775rem', color: '#047857' }}>
              {formatCurrency(calc.commercialCommission)} netos por venta
            </span>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-lg)', padding: '1rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>
              Precio de Venta
            </span>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '2px' }}>
              {formatCurrency(calc.saleValue)}
            </div>
            <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
              PVP / Tarifa oficial
            </span>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-lg)', padding: '1rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'block' }}>
              Liquidación y Garantía
            </span>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1d4ed8', marginTop: '4px' }}>
              100% Íntegra
            </div>
            <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>
              Sellio cobra el 2% a la empresa
            </span>
          </div>
        </div>

        {/* Sellio Potential Interactive Calculator */}
        <div style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
          border: '1px solid #86efac',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calculator size={20} color="#15803d" />
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#166534' }}>
                Sellio Potential — ¿Cuánto podrías ganar?
              </h3>
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#15803d', background: '#ffffff', padding: '2px 10px', borderRadius: '9999px', border: '1px solid #86efac' }}>
              {formatCurrency(calc.commercialCommission)} / venta
            </span>
          </div>

          {/* Slider */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: '#166534', marginBottom: '0.5rem' }}>
              <span>Ventas estimadas: {salesSlider}</span>
              <span>Total Ganancia: {formatCurrency(potential.customTotal)}</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={salesSlider}
              onChange={(e) => setSalesSlider(Number(e.target.value))}
              style={{ width: '100%', cursor: 'pointer', accentColor: '#16a34a' }}
            />
          </div>

          {/* Quick Presets Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', textAlign: 'center' }}>
            {potential.tiers.map((t) => (
              <div
                key={t.sales}
                onClick={() => setSalesSlider(t.sales)}
                style={{
                  background: salesSlider === t.sales ? '#15803d' : '#ffffff',
                  color: salesSlider === t.sales ? '#ffffff' : '#166534',
                  padding: '0.75rem 0.5rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid #bbf7d0',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>{t.label}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 900 }}>{formatCurrency(t.total)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Description & Requirements */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem', fontWeight: 800 }}>
              Descripción de la Oportunidad
            </h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {description}
            </p>
          </div>

          <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid #e2e8f0' }}>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem', fontWeight: 800 }}>
              Requisitos del Perfil
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <div>✓ Experiencia: <strong>{required_experience}</strong></div>
              <div>✓ Zona: <strong>{target_region}</strong></div>
              <div>✓ Sector: <strong>{sector}</strong></div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmitApplication} style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem' }}>
          {appliedSuccess ? (
            <div style={{ background: '#ecfdf5', color: '#047857', padding: '1rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', fontWeight: 700 }}>
              <CheckCircle2 size={28} style={{ margin: '0 auto 6px auto' }} />
              ¡Candidatura enviada con éxito! La empresa ha recibido tu perfil comercial anónimo.
            </div>
          ) : (
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Mensaje de Presentación o Propuesta Comercial
              </label>
              <textarea
                rows={3}
                value={pitchMessage}
                onChange={(e) => setPitchMessage(e.target.value)}
                placeholder="Indica tu cartera de clientes, experiencia en el sector o cómo planeas comercializar este producto..."
                style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1', marginBottom: '0.75rem', fontSize: '0.875rem' }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  🔒 Tu identidad real permanece protegida como <strong>Comercial Anónimo (#A482)</strong>.
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <Button variant="secondary" type="button" onClick={onClose}>
                    Cerrar
                  </Button>
                  <Button variant="primary" type="submit" disabled={isApplying}>
                    {isApplying ? 'Enviando...' : 'Enviar Candidatura'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </Modal>
  );
};

export default OpportunityDetailModal;
