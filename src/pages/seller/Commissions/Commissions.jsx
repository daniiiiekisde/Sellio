import React, { useState, useEffect } from 'react';
import { BadgePercent, TrendingUp, CheckCircle2, Clock, ShieldCheck, Wallet, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';
import { DashboardHeader, StatsCard } from '../../../components/dashboard';
import { commissionService } from '../../../services/commissionService';
import { CommissionBadge } from '../../../components/commissions';

export const SellerCommissions = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const data = await commissionService.getSellerSummary();
        setSummary(data);
      } catch (err) {
        console.error('Error al cargar comisiones:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCommissions();
  }, []);

  const transactions = summary?.transactions || [];

  return (
    <div className="seller-commissions-page">
      <DashboardHeader
        title="Mis Comisiones Ganadas"
        subtitle="Registro inmutable de liquidaciones y comisiones 100% íntegras generadas por tus ventas."
      />

      <div className="kpi-grid" style={{ marginTop: '1.5rem' }}>
        <StatsCard
          title="Total Comisiones Cobradas"
          value={formatCurrency(summary?.totalCommissionPaid || 0)}
          change="Liquidadas y transferidas"
          icon={CheckCircle2}
          color="success"
        />
        <StatsCard
          title="Comisiones en Trámite / Pendientes"
          value={formatCurrency(summary?.totalCommissionPending || 0)}
          change="Pendiente según ciclo de pago"
          icon={Clock}
          color="warning"
        />
        <StatsCard
          title="Volumen de Ventas Generado"
          value={formatCurrency(summary?.totalSalesGenerated || 0)}
          change={`${transactions.length} transacciones auditadas`}
          icon={TrendingUp}
          color="primary"
        />
      </div>

      <div className="dash-card" style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Histórico de Transacciones y Liquidaciones</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            <ShieldCheck size={14} className="text-primary" />
            <span>Condiciones blindadas al momento de confirmación de venta</span>
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Cargando histórico...</div>
        ) : transactions.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <Wallet size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
            <p>Aún no tienes comisiones registradas.</p>
          </div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr>
                <th>Ref. Transacción</th>
                <th>Producto / Oferta</th>
                <th>Empresa</th>
                <th>Venta Total</th>
                <th>Comisión Acordada</th>
                <th>Importe Ganado (100%)</th>
                <th>Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t.id}>
                  <td><strong>{t.id}</strong></td>
                  <td>
                    <strong>{t.product_name}</strong>
                    {t.units_sold && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {t.units_sold} uds x {formatCurrency(t.unit_price)}
                      </div>
                    )}
                  </td>
                  <td>{t.company_name}</td>
                  <td>{formatCurrency(t.sale_value)}</td>
                  <td>
                    <span className="badge badge-primary">{t.commercial_rate}%</span>
                  </td>
                  <td>
                    <strong style={{ color: 'var(--accent)', fontSize: '0.95rem' }}>
                      {formatCurrency(t.commercial_amount)}
                    </strong>
                  </td>
                  <td>{new Date(t.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                  <td>
                    <span className={`badge ${t.status === 'commission_paid' ? 'badge-success' : 'badge-warning'}`}>
                      {t.status === 'commission_paid' ? 'Liquidada' : 'Pendiente cobro'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SellerCommissions;
