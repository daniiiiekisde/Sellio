import React from 'react';
import { BadgePercent, TrendingUp, CheckCircle2, Clock } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

export const SellerCommissions = () => {
  const commissions = [
    { id: 'COM-104', company: 'Iberia Gourmet SL', concept: 'Ventas Canal HORECA Enero', amount: 1240.00, rate: '15%', date: '31 Ene 2026', status: 'Liquidada' },
    { id: 'COM-105', company: 'SolarTech Solutions', concept: 'Comisión Instalación Industrial 50kW', amount: 1450.00, rate: '10%', date: '08 Feb 2026', status: 'Pendiente' }
  ];

  return (
    <div className="seller-commissions-page">
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Control de Comisiones</h1>
          <p className="dash-subtitle">Histórico y seguimiento de liquidaciones por acuerdos de representación.</p>
        </div>
      </div>

      <div className="kpi-grid" style={{ marginTop: '1.5rem' }}>
        <div className="kpi-card">
          <span className="kpi-title">Comisiones Liquidadas</span>
          <div className="kpi-value">{formatCurrency(1240.00)}</div>
          <span className="kpi-change">Últimos 30 días</span>
        </div>
        <div className="kpi-card">
          <span className="kpi-title">Comisiones Pendientes</span>
          <div className="kpi-value">{formatCurrency(1450.00)}</div>
          <span className="kpi-change">Próxima liquidación</span>
        </div>
      </div>

      <div className="dash-card" style={{ marginTop: '1.5rem' }}>
        <table className="dash-table">
          <thead>
            <tr>
              <th>Ref.</th>
              <th>Empresa</th>
              <th>Concepto</th>
              <th>Tipo Comisión</th>
              <th>Importe</th>
              <th>Fecha</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {commissions.map(c => (
              <tr key={c.id}>
                <td><strong>{c.id}</strong></td>
                <td>{c.company}</td>
                <td>{c.concept}</td>
                <td>{c.rate}</td>
                <td><strong>{formatCurrency(c.amount)}</strong></td>
                <td>{c.date}</td>
                <td>
                  <span className={`badge ${c.status === 'Liquidada' ? 'badge-success' : 'badge-warning'}`}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerCommissions;
