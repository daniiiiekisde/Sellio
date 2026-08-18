import React from 'react';
import { Users, Building2, Package, ShieldCheck, Activity, TrendingUp } from 'lucide-react';

export const AdminDashboard = () => {
  const stats = [
    { title: 'Total Usuarios', value: '570', change: '+45 este mes', icon: Users, color: 'primary' },
    { title: 'Empresas Registradas', value: '120', change: '+12 verificadas', icon: Building2, color: 'success' },
    { title: 'Comerciales Registrados', value: '450', change: '+33 nuevos', icon: Users, color: 'info' },
    { title: 'Oportunidades Publicadas', value: '280', change: 'En 10 sectores', icon: Package, color: 'warning' }
  ];

  return (
    <div className="admin-dashboard-page" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Panel de Administración Global</h1>
          <p className="dash-subtitle">Supervisión general del marketplace B2B, usuarios, empresas y moderación de contenido.</p>
        </div>
      </div>

      <div className="kpi-grid">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="kpi-card">
              <div className="kpi-top">
                <span className="kpi-title">{s.title}</span>
                <div className={`kpi-icon-box kpi-${s.color}`}>
                  <Icon size={18} />
                </div>
              </div>
              <div className="kpi-value">{s.value}</div>
              <span className="kpi-change">{s.change}</span>
            </div>
          );
        })}
      </div>

      <div className="dash-card">
        <h3>Actividad Reciente del Sistema</h3>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
          Todo el sistema funciona con normalidad. Los filtros de validación de empresas y comerciales están activos.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
