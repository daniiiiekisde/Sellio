import React from 'react';
import {
  TrendingUp,
  Users,
  Target,
  Sparkles,
  BarChart3,
  Calendar,
  PieChart,
  ArrowUpRight,
  Flame,
  Award
} from 'lucide-react';
import { DashboardHeader, StatsCard } from '../../../components/dashboard';

export const CompanyAnalytics = () => {
  const channelData = [
    { channel: 'Restaurantes y Hostelería (HORECA)', percentage: 48, revenue: '20.400 €', sellers: 8 },
    { channel: 'Tiendas Gourmet y Delicatessen', percentage: 32, revenue: '13.600 €', sellers: 6 },
    { channel: 'Distribuidores Regionales', percentage: 20, revenue: '8.500 €', sellers: 4 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <DashboardHeader
        title="Sellio Pulse — Analítica y Rendimiento de Expansión"
        subtitle="Métricas avanzadas de conversión de oportunidades, canales y volumen por comercial."
      />

      {/* Pulse Funnel Card */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: '#ffffff',
        borderRadius: 'var(--radius-2xl)',
        padding: '2rem',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
          <Sparkles size={20} color="#38bdf8" />
          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: '#ffffff' }}>
            Sellio Pulse — Embudo de Conversión de Oportunidades
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', textAlign: 'center' }}>
          {[
            { label: 'Visitas a Oportunidades', count: '342', rate: '100%' },
            { label: 'Solicitudes Comerciales', count: '42', rate: '12.3%' },
            { label: 'Contactos Aceptados', count: '18', rate: '42.8%' },
            { label: 'Acuerdos Formalizados', count: '9', rate: '50.0%' },
            { label: 'Ventas Confirmadas', count: '28', rate: '14.3% conv. global', highlight: true }
          ].map((step, idx) => (
            <div key={idx} style={{ background: step.highlight ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.06)', border: step.highlight ? '1px solid #34d399' : '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-xl)', padding: '1.25rem 0.75rem' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>{step.label}</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: step.highlight ? '#34d399' : '#ffffff' }}>{step.count}</div>
              <span style={{ fontSize: '0.7rem', color: step.highlight ? '#a7f3d0' : '#cbd5e1', fontWeight: 600 }}>{step.rate}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Breakdown by Sales Channel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem' }}>
        <div style={{ background: '#ffffff', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 800 }}>Rendimiento por Canal de Comercialización</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {channelData.map(ch => (
              <div key={ch.channel} style={{ background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-lg)', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <strong style={{ fontSize: '0.9rem' }}>{ch.channel}</strong>
                  <span style={{ fontWeight: 800, color: '#059669' }}>{ch.revenue}</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '9999px', overflow: 'hidden', marginBottom: '6px' }}>
                  <div style={{ width: `${ch.percentage}%`, height: '100%', background: 'var(--primary)', borderRadius: '9999px' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span>{ch.sellers} comerciales activos</span>
                  <span>{ch.percentage}% del total de ventas</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Territory Map Summary */}
        <div style={{ background: '#ffffff', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 800 }}>Zonas con Mayor Penetración</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { region: 'Cataluña (Barcelona)', share: '55%', sales: '23.375 €' },
              { region: 'Madrid Centro', share: '25%', sales: '10.625 €' },
              { region: 'Comunidad Valenciana', share: '15%', sales: '6.375 €' },
              { region: 'Andalucía', share: '5%', sales: '2.125 €' }
            ].map(z => (
              <div key={z.region} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', borderRadius: 'var(--radius-md)', background: '#f8fafc' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>📍 {z.region}</div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cuota: {z.share}</span>
                </div>
                <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{z.sales}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyAnalytics;
