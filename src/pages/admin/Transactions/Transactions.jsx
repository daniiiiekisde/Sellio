import React from 'react';
import { CreditCard, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';
import { DashboardHeader } from '../../../components/dashboard';

export const AdminTransactions = () => {
  const transactions = [
    { id: 'TX-901', client: 'Iberia Gourmet SL', plan: 'Plan Empresa Pro (Mensual)', amount: 49.00, date: '15 Ene 2026', status: 'Completado' },
    { id: 'TX-902', client: 'SolarTech Solutions', plan: 'Plan Empresa Enterprise', amount: 149.00, date: '01 Feb 2026', status: 'Completado' }
  ];

  return (
    <div className="admin-transactions-page">
      <DashboardHeader
        title="Transacciones y Planes de Suscripción"
        subtitle="Monetización del marketplace, cobros de suscripciones y facturación."
      />

      <div className="dash-card" style={{ marginTop: '1.5rem' }}>
        <table className="dash-table">
          <thead>
            <tr>
              <th>ID Factura</th>
              <th>Empresa / Cliente</th>
              <th>Suscripción</th>
              <th>Importe</th>
              <th>Fecha</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t.id}>
                <td><strong>{t.id}</strong></td>
                <td>{t.client}</td>
                <td>{t.plan}</td>
                <td><strong>{formatCurrency(t.amount)}</strong></td>
                <td>{t.date}</td>
                <td><span className="badge badge-success">{t.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTransactions;
