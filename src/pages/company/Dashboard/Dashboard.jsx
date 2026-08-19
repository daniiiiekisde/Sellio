import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Inbox,
  Users,
  TrendingUp,
  Plus,
  ArrowRight,
  Check,
  X,
  Sparkles,
  ShieldCheck,
  Award,
  BadgePercent,
  Euro,
  Building2
} from 'lucide-react';
import { Button } from '../../../components/common';
import { StatsCard, DashboardHeader } from '../../../components/dashboard';
import { analyticsService } from '../../../services/analyticsService';
import { requestsService } from '../../../services/requests';
import { agreementsService } from '../../../services/agreements';
import { salesService } from '../../../services/sales';
import './Dashboard.css';

export const CompanyDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalVolume: 42500,
    totalCommercialCommissions: 6250,
    totalSellioFee: 850,
    activeSellersCount: 18,
    activeOpportunitiesCount: 12,
    pendingRequestsCount: 3,
    conversionRate: 14.3
  });
  const [recentRequests, setRecentRequests] = useState([]);
  const [topCommercials, setTopCommercials] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [met, reqs, agrs, sales] = await Promise.all([
        analyticsService.getCompanyMetrics('usr_comp_1'),
        requestsService.getAll(),
        agreementsService.getAll(),
        salesService.getAll()
      ]);

      setMetrics(met);
      setRecentRequests(reqs.slice(0, 3));

      // Mapear comerciales destacados en base a acuerdos y ventas
      const commList = agrs.map(agr => {
        const sellerSales = sales.filter(s => s.seller_id === agr.seller_id);
        const volume = sellerSales.reduce((acc, s) => acc + (Number(s.sale_value) || 0), 0);
        return {
          code: agr.seller_name || 'Comercial #A482',
          level: 'PRO',
          salesCount: sellerSales.length || 28,
          volume: `${(volume || 14200).toLocaleString()} €`,
          region: agr.target_region || 'Cataluña',
          status: agr.status === 'active' ? 'Activo' : 'Negociación'
        };
      });

      setTopCommercials(commList.length > 0 ? commList : [
        { code: 'Comercial #A482', level: 'PRO', salesCount: 28, volume: '14.200 €', region: 'Cataluña', status: 'Activo' },
        { code: 'Comercial #B193', level: 'ACTIVE', salesCount: 12, volume: '6.100 €', region: 'Madrid', status: 'Activo' }
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    window.addEventListener('sellio_requests_updated', loadData);
    return () => window.removeEventListener('sellio_requests_updated', loadData);
  }, []);

  const handleAcceptRequest = async (id) => {
    await requestsService.updateStatus(id, 'Aceptada');
    loadData();
  };

  const handleRejectRequest = async (id) => {
    await requestsService.updateStatus(id, 'Descartada');
    loadData();
  };

  const stats = [
    { title: 'Ventas Generadas (Volumen)', value: `${metrics.totalVolume.toLocaleString()} €`, change: `+${metrics.conversionRate}% conversión global`, icon: TrendingUp, color: 'success' },
    { title: 'Comisiones Abonadas', value: `${metrics.totalCommercialCommissions.toLocaleString()} €`, change: '100% pagadas a comerciales', icon: BadgePercent, color: 'primary' },
    { title: 'Coste Plataforma Sellio', value: `${metrics.totalSellioFee.toLocaleString()} €`, change: '2% por operación liquidada', icon: Euro, color: 'info' },
    { title: 'Comerciales Activos', value: `${metrics.activeSellersCount}`, change: 'En red comercial activa', icon: Users, color: 'warning' }
  ];

  return (
    <div className="company-dashboard" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Company Verification & Performance Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#ffffff',
        borderRadius: 'var(--radius-2xl)',
        padding: '1.75rem',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900, color: '#ffffff' }}>
                Iberia Gourmet SL
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
                <ShieldCheck size={13} /> Empresa Verificada
              </span>
              <span style={{
                background: 'rgba(59, 130, 246, 0.2)',
                color: '#93c5fd',
                padding: '2px 8px',
                borderRadius: '9999px',
                fontSize: '11px',
                fontWeight: 700
              }}>
                Sellio Score: 94/100
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: '#94a3b8' }}>
              <span>Barcelona · Alimentación y Bebidas</span>
              <span>·</span>
              <span>{metrics.activeOpportunitiesCount} oportunidades activas</span>
              <span>·</span>
              <span>{metrics.activeSellersCount} comerciales independientes conectados</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Link to="/company/opportunities">
              <Button variant="primary" icon={Plus}>
                Publicar Oportunidad
              </Button>
            </Link>
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

      {/* Grid: Top Commercials CRM & Recent Applications */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
        {/* Top Commercials (Mini CRM) */}
        <div style={{ background: '#ffffff', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', fontWeight: 800 }}>
                Comerciales de Mayor Rendimiento
              </h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Red comercial independiente activa generando ventas
              </p>
            </div>
            <Link to="/company/crm" style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--primary)' }}>
              Ver CRM Completo
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {topCommercials.map((c, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-lg)',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{c.code}</strong>
                    <span style={{ fontSize: '10px', fontWeight: 800, background: '#eff6ff', color: '#1d4ed8', padding: '1px 6px', borderRadius: '4px' }}>
                      {c.level}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>
                    📍 {c.region} · {c.salesCount} ventas confirmadas
                  </span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <strong style={{ fontSize: '1rem', color: '#059669', display: 'block' }}>
                    {c.volume}
                  </strong>
                  <span style={{ fontSize: '0.725rem', color: '#15803d', fontWeight: 600 }}>
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Solicitudes Recientes */}
        <div style={{ background: '#ffffff', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', fontWeight: 800 }}>
                Nuevas Candidaturas ({recentRequests.filter(r => r.status === 'Pendiente').length} pendientes)
              </h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Comerciales que han mostrado interés en tus productos
              </p>
            </div>
            <Link to="/company/requests" style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--primary)' }}>
              Ver todas
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {recentRequests.map((r) => (
              <div
                key={r.id}
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-lg)',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <strong style={{ fontSize: '0.875rem' }}>{r.sellerAnonymousId || r.sellerName || 'Comercial'}</strong>
                    <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)' }}>{r.productName || r.opportunityTitle}</div>
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 800, background: '#ecfdf5', color: '#047857', padding: '2px 8px', borderRadius: '9999px' }}>
                    <Sparkles size={11} style={{ display: 'inline', marginRight: '2px' }} /> {r.sellerMatchScore || 94}% Match
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #edf2f7', paddingTop: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>📍 {r.sellerRegion || 'Cataluña'} · {r.appliedDate || 'Reciente'}</span>
                  {r.status === 'Pendiente' ? (
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <Button variant="primary" size="sm" icon={Check} onClick={() => handleAcceptRequest(r.id)}>Aceptar</Button>
                      <Button variant="outline" size="sm" icon={X} onClick={() => handleRejectRequest(r.id)}>Descartar</Button>
                    </div>
                  ) : (
                    <span style={{ fontWeight: 700, color: r.status === 'Aceptada' ? '#059669' : '#b91c1c' }}>
                      {r.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
