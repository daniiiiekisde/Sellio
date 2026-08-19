import React, { useState, useEffect } from 'react';
import { ShoppingCart, CheckCircle2, ShieldCheck, Eye, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';
import { DashboardHeader, StatsCard } from '../../../components/dashboard';
import { salesService } from '../../../services/sales';
import { formatCurrency } from '../../../utils/formatters';
import { CommissionBadge, CommissionBreakdown } from '../../../components/commissions';
import { Modal, Button } from '../../../components/common';

export const SellerSales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSnapshot, setSelectedSnapshot] = useState(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const data = await salesService.getAll();
        setSales(data);
      } catch (err) {
        console.error('Error al cargar ventas del comercial:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSales();
  }, []);

  const totalEarnings = sales.reduce((acc, s) => acc + (s.commercial_commission_amount || 0), 0);
  const totalVolume = sales.reduce((acc, s) => acc + (s.sale_value || 0), 0);

  return (
    <div className="seller-sales-page">
      <DashboardHeader
        title="Mis Ventas y Comisiones Ganadas"
        subtitle="Registro oficial de operaciones cerradas y liquidaciones asignadas a tu cuenta."
      />

      <div className="kpi-grid" style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        <StatsCard
          title="Tus Ganancias Acumuladas"
          value={formatCurrency(totalEarnings)}
          change="100% íntegras para ti"
          icon={CheckCircle2}
          color="success"
        />
        <StatsCard
          title="Volumen de Ventas Cerrado"
          value={formatCurrency(totalVolume)}
          change={`${sales.length} ventas auditadas`}
          icon={TrendingUp}
          color="primary"
        />
      </div>

      <div className="dash-card" style={{ marginTop: '1.5rem', background: '#fff', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-card)' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem' }}>
          Historial de Operaciones Confirmadas
        </h3>

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Cargando ventas...</div>
        ) : sales.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No hay ventas registradas todavía.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Fecha</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Empresa</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Producto & Unidades</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Valor Venta</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Tu Comisión</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Estado</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Snapshot</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      {new Date(sale.created_at).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{sale.company_name}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 600 }}>{sale.product_name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{sale.quantity} ud.</div>
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 700 }}>
                      {formatCurrency(sale.sale_value)}
                    </td>
                    <td style={{ padding: '1rem', color: '#059669', fontWeight: 800, fontSize: '1rem' }}>
                      + {formatCurrency(sale.commercial_commission_amount)} ({sale.commercial_rate_applied}%)
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span className="badge badge-success">Confirmada</span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <button
                        type="button"
                        onClick={() => setSelectedSnapshot(sale.sale_snapshot || sale)}
                        style={{
                          padding: '0.35rem 0.65rem',
                          background: '#f8fafc',
                          border: '1px solid #cbd5e1',
                          borderRadius: '6px',
                          fontSize: '0.75rem',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: 'var(--primary)',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        <ShieldCheck size={13} color="#059669" /> Ver Snapshot
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Snapshot Inmutable */}
      <Modal
        isOpen={!!selectedSnapshot}
        onClose={() => setSelectedSnapshot(null)}
        title="Detalle Inmutable de tu Venta"
      >
        {selectedSnapshot && (
          <div>
            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#065f46', fontSize: '0.85rem' }}>
              <ShieldCheck size={18} />
              <span>Condiciones 100% protegidas e inalterables desde la confirmación de la venta.</span>
            </div>

            <CommissionBreakdown
              price={selectedSnapshot.unit_price}
              quantity={selectedSnapshot.quantity}
              commercialCommissionRate={selectedSnapshot.commercial_rate || selectedSnapshot.commercial_rate_applied}
              sellioCommissionRate={selectedSnapshot.sellio_rate || selectedSnapshot.sellio_rate_applied}
            />

            <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
              <Button variant="secondary" onClick={() => setSelectedSnapshot(null)}>
                Cerrar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SellerSales;
