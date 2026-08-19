import React from 'react';
import { Link } from 'react-router-dom';
import {
  BadgePercent,
  TrendingUp,
  Download,
  Calendar,
  Building2,
  CheckCircle2,
  Euro,
  FileCheck2,
  Clock
} from 'lucide-react';
import { DashboardHeader, StatsCard } from '../../../components/dashboard';
import { Button } from '../../../components/common';

export const CompanyCommissions = () => {
  const settlements = [
    { id: 'liq_101', month: 'Abril 2026', totalSales: 42500, commercialCommissions: 6250, sellioCost: 850, netRevenue: 35400, status: 'Liquidado', invoice: 'FAC-2026-04' },
    { id: 'liq_102', month: 'Marzo 2026', totalSales: 31200, commercialCommissions: 4680, sellioCost: 624, netRevenue: 25896, status: 'Liquidado', invoice: 'FAC-2026-03' },
    { id: 'liq_103', month: 'Febrero 2026', totalSales: 22000, commercialCommissions: 3300, sellioCost: 440, netRevenue: 18260, status: 'Liquidado', invoice: 'FAC-2026-02' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <DashboardHeader
        title="Centro de Comisiones y Liquidaciones (Empresa)"
        subtitle="Auditoría transparente de comisiones pagadas a comerciales y costes de plataforma Sellio (2%)."
        action={
          <Button variant="outline" icon={Download}>Descargar Informe Fiscal</Button>
        }
      />

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-xl)', padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Ventas Totales Brutas</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-primary)', marginTop: '2px' }}>95.700 €</div>
          <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>En 3 meses de actividad</span>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-xl)', padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Comisiones Comerciales</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#2563eb', marginTop: '2px' }}>14.230 €</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>100% íntegras transferidas</span>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-xl)', padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Coste Plataforma Sellio</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#6366f1', marginTop: '2px' }}>1.914 €</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tarifa fija 2% tras cobro</span>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 'var(--radius-xl)', padding: '1.25rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Margen Neto Empresa</span>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#059669', marginTop: '2px' }}>79.556 €</div>
          <span style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 700 }}>83.1% margen retenido</span>
        </div>
      </div>

      {/* Settlements Table */}
      <div style={{ background: '#ffffff', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 800 }}>Historial de Liquidaciones Mensuales</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 800 }}>Período</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'right', fontSize: '0.8rem', fontWeight: 800 }}>Venta Bruta</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'right', fontSize: '0.8rem', fontWeight: 800 }}>Comisión Comercial</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'right', fontSize: '0.8rem', fontWeight: 800 }}>Coste Sellio (2%)</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'right', fontSize: '0.8rem', fontWeight: 800 }}>Ingreso Neto</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'center', fontSize: '0.8rem', fontWeight: 800 }}>Estado</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'center', fontSize: '0.8rem', fontWeight: 800 }}>Factura</th>
              </tr>
            </thead>
            <tbody>
              {settlements.map(s => (
                <tr key={s.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '1rem', fontWeight: 700 }}>{s.month}</td>
                  <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 700 }}>{s.totalSales.toLocaleString()} €</td>
                  <td style={{ padding: '1rem', textAlign: 'right', color: '#2563eb', fontWeight: 700 }}>{s.commercialCommissions.toLocaleString()} €</td>
                  <td style={{ padding: '1rem', textAlign: 'right', color: '#6366f1', fontWeight: 700 }}>{s.sellioCost.toLocaleString()} €</td>
                  <td style={{ padding: '1rem', textAlign: 'right', color: '#059669', fontWeight: 900 }}>{s.netRevenue.toLocaleString()} €</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <span style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0', padding: '2px 8px', borderRadius: '9999px', fontSize: '11px', fontWeight: 700 }}>
                      ✓ {s.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <Button variant="outline" size="sm">
                      {s.invoice}
                    </Button>
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

export default CompanyCommissions;
