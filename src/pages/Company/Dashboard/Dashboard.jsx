import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Inbox, Users, TrendingUp, Plus, ArrowRight, Check, X } from 'lucide-react';
import Button from '../../../components/Button';
import './Dashboard.css';

export const CompanyDashboard = () => {
  const stats = [
    { title: 'Productos Publicados', value: '12', change: '+2 este mes', icon: Package, color: 'primary' },
    { title: 'Solicitudes Comerciales', value: '7', change: '3 pendientes', icon: Inbox, color: 'warning' },
    { title: 'Comerciales Activos', value: '4', change: 'En 3 regiones', icon: Users, color: 'success' },
    { title: 'Expansión de Red', value: '85%', change: '+15% alcance', icon: TrendingUp, color: 'info' }
  ];

  const recentRequests = [
    { id: 1, agentName: 'Carlos Méndez', product: 'Aceite de Oliva Ecológico 500ml', region: 'Cataluña', date: 'Hoy, 11:20', matchScore: 94 },
    { id: 2, agentName: 'Marta Soler', product: 'Conservas Gourmet Selección', region: 'Madrid', date: 'Ayer', matchScore: 88 }
  ];

  return (
    <div className="company-dashboard">
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Panel de Empresa</h1>
          <p className="dash-subtitle">Gestiona tus productos y expande tu red de ventas con comerciales independientes.</p>
        </div>
        <div className="dash-cta">
          <Link to="/company/products">
            <Button variant="primary" icon={Plus}>Publicar Nuevo Producto</Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
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
                <th>Producto de Interés</th>
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
