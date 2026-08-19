import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Users,
  BadgePercent,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  ShieldCheck,
  Building2,
  MapPin,
  Flame,
  ArrowUpRight,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { Button } from '../../../components/common';
import { StatsCard, DashboardHeader } from '../../../components/dashboard';
import { OpportunityCard } from '../../../components/opportunities';
import { useOpportunities } from '../../../hooks/useOpportunities';
import { DEFAULT_COMMERCIAL_PROFILE } from '../../../utils/sellioMatch';

export const SellerDashboard = () => {
  const { opportunities } = useOpportunities();
  const profile = DEFAULT_COMMERCIAL_PROFILE;

  const stats = [
    { title: 'Ganado este mes', value: '1.240 €', change: '+18.4% vs mes anterior', icon: BadgePercent, color: 'success' },
    { title: 'Ventas Confirmadas', value: '18', change: '4 pendientes de liquidar', icon: TrendingUp, color: 'primary' },
    { title: 'Acuerdos Activos', value: '7', change: 'En 6 empresas distintas', icon: Building2, color: 'info' },
    { title: 'Oportunidades Guardadas', value: '12', change: '3 con +90% Match', icon: Bookmark, color: 'warning' }
  ];

  return (
    <div className="seller-dashboard-page" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Commercial Reputation Header Card */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#ffffff',
        borderRadius: 'var(--radius-2xl)',
        padding: '1.75rem',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: 'var(--radius-xl)',
              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 900,
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)'
            }}>
              PRO
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900, color: '#ffffff' }}>
                  Comercial {profile.code}
                </h2>
                <span style={{
                  background: 'rgba(16, 185, 129, 0.2)',
                  color: '#34d399',
                  border: '1px solid rgba(52, 211, 153, 0.3)',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <ShieldCheck size={13} /> Verificado
                </span>
                <span style={{
                  background: 'rgba(251, 191, 36, 0.2)',
                  color: '#fbbf24',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontWeight: 700
                }}>
                  ⭐ {profile.rating} / 5.0
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: '#94a3b8', flexWrap: 'wrap' }}>
                <span>{profile.years_experience} años experiencia</span>
                <span>·</span>
                <span>{profile.regions.slice(0, 2).join(' · ')}</span>
                <span>·</span>
                <span>{profile.languages.join(' · ')}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Link to="/seller/marketplace">
              <Button variant="primary" icon={ShoppingBag}>
                Explorar Marketplace
              </Button>
            </Link>
          </div>
        </div>

        {/* Reputation Progress Bar towards EXPERT */}
        <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px' }}>
            <span>Nivel Actual: <strong style={{ color: '#60a5fa' }}>PRO (47 ventas)</strong></span>
            <span>Siguiente Nivel: <strong style={{ color: '#fbbf24' }}>EXPERT (50 ventas)</strong></span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{ width: '94%', height: '100%', background: 'linear-gradient(90deg, #3b82f6, #10b981)', borderRadius: '9999px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginTop: '6px' }}>
            <span>Volumen histórico: <strong>18.450 €</strong></span>
            <span>Conversión comercial: <strong>14.8%</strong></span>
            <span>Empresas colaboradoras: <strong>6</strong></span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        {stats.map((s, i) => (
          <StatsCard
            key={i}
            title={s.title}
            value={s.value}
            change={s.change}
            icon={s.icon}
            color={s.color}
          />
        ))}
      </div>

      {/* Revenue Performance & Top Product Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Visual Revenue Sparkline */}
        <div style={{ background: '#ffffff', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', fontWeight: 800 }}>
                Evolución de Comisiones Comerciales
              </h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Ingresos netos generados por ventas registradas
              </p>
            </div>
            <strong style={{ fontSize: '1.25rem', color: '#059669' }}>+ 3.420 € acumulados</strong>
          </div>

          {/* Simple Visual Bar Chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '120px', padding: '1rem 0.5rem 0 0.5rem', borderBottom: '1px solid #e2e8f0' }}>
            {[
              { month: 'Ene', amount: '650 €', height: '45%' },
              { month: 'Feb', amount: '820 €', height: '60%' },
              { month: 'Mar', amount: '1.050 €', height: '75%' },
              { month: 'Abr', amount: '1.240 €', height: '90%', active: true }
            ].map((bar) => (
              <div key={bar.month} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 }}>
                <span style={{ fontSize: '0.725rem', fontWeight: 700, color: bar.active ? '#15803d' : '#64748b' }}>
                  {bar.amount}
                </span>
                <div style={{
                  width: '36px',
                  height: bar.height,
                  background: bar.active ? 'linear-gradient(180deg, #10b981 0%, #059669 100%)' : '#e2e8f0',
                  borderRadius: '6px 6px 0 0'
                }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: bar.active ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                  {bar.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Best Performing Product Card */}
        <div style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
          border: '1px solid #bbf7d0',
          borderRadius: 'var(--radius-xl)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#15803d', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              <Award size={16} /> Tu Producto Estrella
            </div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.15rem', fontWeight: 900, color: '#14532d' }}>
              Aceite de Oliva D.O. Ecológico
            </h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#166534' }}>
              Iberia Gourmet SL · 15% comisión pactada
            </p>
          </div>

          <div style={{ marginTop: '1.25rem', background: '#ffffff', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid #86efac' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.775rem', color: '#166534', fontWeight: 600 }}>Generado este mes:</span>
              <strong style={{ fontSize: '1.2rem', color: '#15803d' }}>420 €</strong>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              28 ventas confirmadas
            </div>
          </div>
        </div>
      </div>

      {/* High Affinity Opportunities (Sellio Match 90%+) */}
      <div style={{ background: '#ffffff', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={18} color="var(--primary)" /> Oportunidades "Para ti" (Sellio Match +85%)
            </h3>
            <p style={{ margin: 0, fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Basado en tus sectores (Alimentación & HORECA) y territorio (Cataluña).
            </p>
          </div>

          <Link to="/seller/marketplace" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary)' }}>
            <span>Ver todas en Marketplace</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {opportunities.slice(0, 2).map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              showCompareOption={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
