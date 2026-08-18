import React from 'react';
import { Users, Building2, Package, ShieldCheck, Sparkles, Activity } from 'lucide-react';
import { DashboardHeader, StatsCard } from '../../../components/dashboard';

export const AdminDashboard = () => {
  const stats = [
    { title: 'Total Usuarios', value: '570', change: '+45 este mes', icon: Users, color: 'primary' },
    { title: 'Empresas Registradas', value: '120', change: '+12 verificadas', icon: Building2, color: 'success' },
    { title: 'Comerciales Activos', value: '450', change: '+33 nuevos', icon: Users, color: 'info' },
    { title: 'Oportunidades Publicadas', value: '280', change: 'En 10 sectores', icon: Sparkles, color: 'violet' }
  ];

  return (
    <div className="admin-dashboard-page" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <DashboardHeader
        title="Panel de Administración Global"
        subtitle="Supervisión general del marketplace B2B, usuarios, empresas y moderación de contenido."
      />

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

      <div className="dash-card">
        <h3>Actividad Reciente del Sistema</h3>
        <p style={{ fontSize: 'var(--font-size-sm)', color: '#94a3b8', marginTop: '0.5rem' }}>
          Todo el sistema opera con normalidad. Los filtros de validación de empresas y comerciales están activos.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
