import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Inbox, Users, TrendingUp, Plus, ArrowRight, Check, X, Sparkles } from 'lucide-react';
import { Button } from '../../../components/common';
import { StatsCard, DashboardHeader } from '../../../components/dashboard';
import './Dashboard.css';

export const CompanyDashboard = () => {
  const stats = [
    { title: 'Productos en Catálogo', value: '12', change: '+2 este mes', icon: Package, color: 'primary' },
    { title: 'Oportunidades Activas', value: '5', change: 'En 4 territorios', icon: Sparkles, color: 'violet' },
    { title: 'Solicitudes Pendientes', value: '7', change: '3 sin revisar', icon: Inbox, color: 'warning' },
    { title: 'Comerciales Conectados', value: '4', change: 'Red activa', icon: Users, color: 'success' }
  ];

  const recentRequests = [
    { id: 1, agentName: 'Carlos Méndez', product: 'Aceite de Oliva Ecológico 500ml', region: 'Cataluña', date: 'Hoy, 11:20', matchScore: 94 },
    { id: 2, agentName: 'Marta Soler', product: 'Conservas Gourmet Selección', region: 'Madrid', date: 'Ayer', matchScore: 88 }
  ];

  return (
    <div className="company-dashboard">
      <DashboardHeader
        title="Panel de Empresa"
        subtitle="Gestiona tu catálogo, publica oportunidades y expande tu red de ventas con comerciales independientes."
        action={
          <Link to="/company/opportunities">
            <Button variant="primary" icon={Plus}>Publicar Oportunidad</Button>
          </Link>
        }
      />

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

      {/* Recent requests */}
      <div className="dash-card">
        <div className="dash-card-header">
          <h3>Solicitudes Recientes de Comerciales</h3>
          <Link to="/company/requests" className="view-all-link">
            Ver todas <ArrowRight size={14} />
          </Link>
        </div>

        <div className="requests-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Comercial</th>
                <th>Producto / Oportunidad</th>
                <th>Zona</th>
                <th>Afinidad</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map(r => (
                <tr key={r.id}>
                  <td><strong>{r.agentName}</strong></td>
                  <td>{r.product}</td>
                  <td>{r.region}</td>
                  <td><span className="badge badge-success">Match {r.matchScore}%</span></td>
                  <td>{r.date}</td>
                  <td>
                    <div className="table-actions">
                      <Button variant="primary" size="sm" icon={Check}>Aceptar</Button>
                      <Button variant="outline" size="sm" icon={X}>Descartar</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
