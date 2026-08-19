import React from 'react';
import {
  BadgePercent,
  TrendingUp,
  Euro,
  Building2,
  Users,
  Calendar,
  Download,
  CheckCircle2,
  FileCheck2
} from 'lucide-react';
import { DashboardHeader, StatsCard } from '../../../components/dashboard';
import { Button } from '../../../components/common';

export const AdminCommissions = () => {
  const globalTransactions = [
    { id: 'tx_801', date: '19/08/2026', company: 'Iberia Gourmet SL', seller: 'Carlos Mendoza (#A482)', grossAmount: 4500, commercialComm: 675, sellioFee: 90, status: 'Completado' },
    { id: 'tx_802', date: '18/08/2026', company: 'SolarTech Solutions', seller: 'Elena Ramos (#D409)', grossAmount: 9000, commercialComm: 900, sellioFee: 135, status: 'Completado' },
    { id: 'tx_803', date: '17/08/2026', company: 'NovaPharma Care', seller: 'Laura Gómez (#B193)', grossAmount: 1700, commercialComm: 340, sellioFee: 34, status: 'Completado' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <DashboardHeader
        title="Supervisión Global de Comisiones y Retenciones"
        subtitle="Monitorización en tiempo real de comisiones comerciales transferidas y fee Sellio recaudado."
        action={
          <Button variant="outline" icon={Download}>Exportar Libro Contable</Button>
        }
      />

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-xl)', padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Volumen Transaccionado</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '2px' }}>152.000 €</div>
          <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>+34% este mes</span>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-xl)', padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Comisiones a Comerciales</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#2563eb', marginTop: '2px' }}>22.800 €</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>100% transferidas a comerciales</span>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-xl)', padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Ingresos Sellio (Fee 2%)</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#059669', marginTop: '2px' }}>3.040 €</div>
          <span style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 700 }}>Margen neto de plataforma</span>
        </div>
      </div>

      {/* Global Transactions Table */}
      <div style={{ background: '#ffffff', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 800 }}>Registro Maestro de Liquidaciones Económicas</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 800 }}>ID / Fecha</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 800 }}>Empresa</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 800 }}>Comercial</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'right', fontSize: '0.8rem', fontWeight: 800 }}>Venta Bruta</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'right', fontSize: '0.8rem', fontWeight: 800 }}>Comisión Comercial</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'right', fontSize: '0.8rem', fontWeight: 800 }}>Fee Sellio</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'center', fontSize: '0.8rem', fontWeight: 800 }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {globalTransactions.map(tx => (
                <tr key={tx.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '1rem', fontWeight: 700 }}>
                    <div>{tx.id}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tx.date}</div>
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{tx.company}</td>
                  <td style={{ padding: '1rem', color: '#1d4ed8', fontWeight: 600 }}>{tx.seller}</td>
                  <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 700 }}>{tx.grossAmount.toLocaleString()} €</td>
                  <td style={{ padding: '1rem', textAlign: 'right', color: '#2563eb', fontWeight: 700 }}>{tx.commercialComm.toLocaleString()} €</td>
                  <td style={{ padding: '1rem', textAlign: 'right', color: '#059669', fontWeight: 900 }}>{tx.sellioFee.toLocaleString()} €</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <span style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '2px 8px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700 }}>
                      ✓ {tx.status}
                    </span>
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

export default AdminCommissions;
