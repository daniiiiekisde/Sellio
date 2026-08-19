import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Users,
  Building2,
  Sparkles,
  ShieldCheck,
  ShoppingBag,
  Activity,
  Globe
} from 'lucide-react';
import { DashboardHeader, StatsCard } from '../../../components/dashboard';
import { analyticsService } from '../../../services/analyticsService';

export const AdminAnalytics = () => {
  const [metrics, setMetrics] = useState({
    totalCompanies: 128,
    totalSellers: 482,
    totalOpportunities: 310,
    totalVolume: 152000,
    totalCommissionsPaid: 22800,
    totalPlatformRevenue: 3040,
    matchingSuccessRate: '68.4%',
    disputeResolutionRate: '98.2%'
  });

  useEffect(() => {
    const load = async () => {
      const data = await analyticsService.getAdminGlobalMetrics();
      setMetrics(data);
    };
    load();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <DashboardHeader
        title="Analítica Global y Salud de la Plataforma Sellio"
        subtitle="Métricas consolidadas de adopción, volumen comercial, matching y retención."
      />

      {/* Global KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-xl)', padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Total Empresas</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '2px' }}>{metrics.totalCompanies}</div>
          <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>88% verificadas</span>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-xl)', padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Total Comerciales</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#2563eb', marginTop: '2px' }}>{metrics.totalSellers}</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>64 con nivel PRO/EXPERT</span>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-xl)', padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Oportunidades Publicadas</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f59e0b', marginTop: '2px' }}>{metrics.totalOpportunities}</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>En 8 comunidades autónomas</span>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-xl)', padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Tasa de Éxito de Matching</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#059669', marginTop: '2px' }}>{metrics.matchingSuccessRate}</div>
          <span style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 700 }}>De solicitud a acuerdo</span>
        </div>
      </div>

      {/* Analytics breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div style={{ background: '#ffffff', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 800 }}>Distribución por Sectores Más Activos</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {[
              { sector: 'Alimentación y Bebidas (HORECA)', pct: '45%' },
              { sector: 'Industrial, Energía y Maquinaria', pct: '28%' },
              { sector: 'Salud, Farmacia y Cosmética', pct: '17%' },
              { sector: 'Software y Tecnología B2B', pct: '10%' }
            ].map(s => (
              <div key={s.sector}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600 }}>{s.sector}</span>
                  <strong>{s.pct}</strong>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ width: s.pct, height: '100%', background: 'var(--primary)', borderRadius: '9999px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#ffffff', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 800 }}>Índice de Resolución de Disputas</h3>
          <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Disputas resueltas satisfactoriamente:</span>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#059669', margin: '0.5rem 0' }}>{metrics.disputeResolutionRate}</div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Tiempo promedio de resolución: <strong>Menos de 24 horas</strong> mediante el sistema de auditoría y versiones inmutables.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
