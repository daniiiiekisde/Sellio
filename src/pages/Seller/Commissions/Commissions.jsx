import React from 'react';
import { BadgePercent, TrendingUp, CheckCircle2, Clock } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';
import { DashboardHeader, StatsCard } from '../../../components/dashboard';

export const SellerCommissions = () => {
  const commissions = [
    { id: 'COM-104', company: 'Iberia Gourmet SL', concept: 'Ventas Canal HORECA Enero', amount: 1240.00, rate: '15%', date: '31 Ene 2026', status: 'Liquidada' },
    { id: 'COM-105', company: 'SolarTech Solutions', concept: 'Comisión Instalación Industrial 50kW', amount: 1450.00, rate: '10%', date: '08 Feb 2026', status: 'Pendiente' }
  ];

  return (
    <div className="seller-commissions-page">
      <DashboardHeader
        title="Control de Comisiones"
        subtitle="Histórico y seguimiento de liquidaciones por acuerdos de representación comercial."
      />

      <div className="kpi-grid" style={{ marginTop: '1.5rem' }}>
        <StatsCard
          title="Comisiones Liquidadas"
          value={formatCurrency(1240.00)}
          change="Últimos 30 días"
          icon={CheckCircle2}
          color="success"
        />
        <StatsCard
          title="Comisiones Pendientes"
          value={formatCurrency(1450.00)}
          change="Próxima liquidación en 5 días"
          icon={Clock}
          color="warning"
        />
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
