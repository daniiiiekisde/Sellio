import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, CheckCircle2, ShieldCheck, Eye, Sparkles, TrendingUp, Calendar, AlertCircle } from 'lucide-react';
import { DashboardHeader, StatsCard } from '../../../components/dashboard';
import { salesService } from '../../../services/sales';
import { formatCurrency } from '../../../utils/formatters';
import { Button, Modal } from '../../../components/common';
import { CommissionBadge, CommissionBreakdown } from '../../../components/commissions';

export const CompanySales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSnapshot, setSelectedSnapshot] = useState(null);

  // Formulario de nueva venta
  const [saleForm, setSaleForm] = useState({
    product_name: 'Aceite de Oliva Virgen Extra Ecológico D.O. 500ml',
    seller_name: 'Carlos Mendoza (Comercial #A482)',
    client_name: '',
    unit_price: 120,
    quantity: 1,
    commercial_commission_rate: 15,
    sellio_commission_rate: 2
  });

  const fetchSales = async () => {
    try {
      setLoading(true);
      const data = await salesService.getAll();
      setSales(data);
    } catch (err) {
      console.error('Error al cargar ventas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const totalGMV = sales.reduce((acc, s) => acc + (s.sale_value || 0), 0);
  const totalCommercialCommissions = sales.reduce((acc, s) => acc + (s.commercial_commission_amount || 0), 0);
  const totalSellioFees = sales.reduce((acc, s) => acc + (s.sellio_commission_amount || 0), 0);
  const totalCompanyNet = sales.reduce((acc, s) => acc + (s.company_net_amount || 0), 0);

  const handleCreateSale = async (e) => {
    e.preventDefault();
    try {
      await salesService.createAndConfirmSale({
        company_name: 'Mi Empresa SL',
        seller_name: saleForm.seller_name,
        product_name: saleForm.product_name,
        client_name: saleForm.client_name || 'Cliente B2B',
        unit_price: Number(saleForm.unit_price),
        quantity: Number(saleForm.quantity),
        commercial_commission_rate: Number(saleForm.commercial_commission_rate),
        sellio_commission_rate: Number(saleForm.sellio_commission_rate)
      });
      setModalOpen(false);
      fetchSales();
    } catch (err) {
      console.error('Error al registrar venta:', err);
    }
  };

  return (
    <div className="company-sales-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <DashboardHeader
          title="Registro Oficial de Ventas y Liquidaciones"
          subtitle="Toda venta confirmada congela un snapshot inmutable de condiciones comerciales."
        />
        <Button variant="primary" icon={Plus} onClick={() => setModalOpen(true)}>
          Registrar Venta Confirmada
        </Button>
      </div>

      <div className="kpi-grid" style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
        <StatsCard
          title="Facturación Bruta (GMV)"
          value={formatCurrency(totalGMV)}
          change={`${sales.length} ventas confirmadas`}
          icon={TrendingUp}
          color="primary"
        />
        <StatsCard
          title="Comisiones Comerciales"
          value={formatCurrency(totalCommercialCommissions)}
          change="Transferidas íntegras"
          icon={CheckCircle2}
          color="success"
        />
        <StatsCard
          title="Comisión Sellio (2%)"
          value={formatCurrency(totalSellioFees)}
          change="Coste de servicio"
          icon={ShieldCheck}
          color="info"
        />
        <StatsCard
          title="Ingreso Neto Empresa"
          value={formatCurrency(totalCompanyNet)}
          change="Margen final consolidado"
          icon={ShoppingCart}
          color="warning"
        />
      </div>

      <div className="dash-card" style={{ marginTop: '1.5rem', background: '#fff', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-card)' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem' }}>
          Ventas Confirmadas e Inmutables
        </h3>

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Cargando ventas...</div>
        ) : sales.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No hay ventas registradas aún.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>ID / Fecha</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Comercial & Cliente</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Producto & Uds</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Importe Venta</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Comisión Comercial</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Comisión Sellio</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Neto Empresa</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Snapshot</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{sale.id}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {new Date(sale.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 600 }}>{sale.seller_name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Cliente: {sale.client_name}</div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 600 }}>{sale.product_name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {sale.quantity} ud. × {formatCurrency(sale.unit_price)}
                      </div>
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {formatCurrency(sale.sale_value)}
                    </td>
                    <td style={{ padding: '1rem', color: '#059669', fontWeight: 700 }}>
                      + {formatCurrency(sale.commercial_commission_amount)} ({sale.commercial_rate_applied}%)
                    </td>
                    <td style={{ padding: '1rem', color: '#2563eb', fontWeight: 600 }}>
                      - {formatCurrency(sale.sellio_commission_amount)} ({sale.sellio_rate_applied}%)
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {formatCurrency(sale.company_net_amount)}
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
                        <ShieldCheck size={13} color="#059669" /> Inmutable
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
        title="Snapshot Inmutable de Venta Confirmada"
      >
        {selectedSnapshot && (
          <div>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontSize: '0.85rem' }}>
              <ShieldCheck size={18} />
              <span>Condiciones económicas bloqueadas e inmutables al momento de la venta.</span>
            </div>

            <CommissionBreakdown
              price={selectedSnapshot.unit_price}
              quantity={selectedSnapshot.quantity}
              commercialCommissionRate={selectedSnapshot.commercial_rate || selectedSnapshot.commercial_rate_applied}
              sellioCommissionRate={selectedSnapshot.sellio_rate || selectedSnapshot.sellio_rate_applied}
            />

            <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
              <Button variant="secondary" onClick={() => setSelectedSnapshot(null)}>
                Cerrar Visor
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Registrar Venta */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Registrar y Confirmar Venta Comercial"
      >
        <form onSubmit={handleCreateSale} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              Nombre del Cliente / Empresa Compradora
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Restaurante El Celler SL"
              value={saleForm.client_name}
              onChange={(e) => setSaleForm({ ...saleForm, client_name: e.target.value })}
              style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Precio Unitario (€)
              </label>
              <input
                type="number"
                min="1"
                step="0.5"
                value={saleForm.unit_price}
                onChange={(e) => setSaleForm({ ...saleForm, unit_price: e.target.value })}
                style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Cantidad de Unidades
              </label>
              <input
                type="number"
                min="1"
                value={saleForm.quantity}
                onChange={(e) => setSaleForm({ ...saleForm, quantity: e.target.value })}
                style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1' }}
              />
            </div>
          </div>

          <CommissionBreakdown
            price={saleForm.unit_price}
            quantity={saleForm.quantity}
            commercialCommissionRate={saleForm.commercial_commission_rate}
            sellioCommissionRate={saleForm.sellio_commission_rate}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
            <Button variant="secondary" type="button" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Confirmar y Crear Snapshot
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CompanySales;
