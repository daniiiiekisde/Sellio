import React, { useState, useEffect } from 'react';
import { Handshake, Plus, CheckCircle2, Clock, XCircle, ShieldCheck, FileText, ArrowUpRight, User } from 'lucide-react';
import { DashboardHeader, StatsCard } from '../../../components/dashboard';
import { agreementsService } from '../../../services/agreements';
import { formatCurrency } from '../../../utils/formatters';
import { CommissionBadge } from '../../../components/commissions';

export const CompanyAgreements = () => {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgreements = async () => {
      try {
        const data = await agreementsService.getAll();
        setAgreements(data);
      } catch (err) {
        console.error('Error al cargar acuerdos:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAgreements();
  }, []);

  const activeCount = agreements.filter(a => a.status === 'active').length;
  const pendingCount = agreements.filter(a => a.status === 'pending').length;

  return (
    <div className="company-agreements-page">
      <DashboardHeader
        title="Acuerdos Comerciales Activos"
        subtitle="Contratos digitales y condiciones pactadas con tu red de comerciales independientes."
      />

      <div className="kpi-grid" style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        <StatsCard
          title="Acuerdos Activos"
          value={activeCount}
          change="Comerciales en activo"
          icon={Handshake}
          color="success"
        />
        <StatsCard
          title="Propuestas en Trámite"
          value={pendingCount}
          change="Pendientes de firma"
          icon={Clock}
          color="warning"
        />
      </div>

      <div className="dash-card" style={{ marginTop: '1.5rem', background: '#fff', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-card)' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem' }}>
          Registro de Acuerdos
        </h3>

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Cargando acuerdos...</div>
        ) : agreements.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No hay acuerdos comerciales registrados actualmente.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Comercial</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Producto / Oportunidad</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Zona</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Comisión Pactada</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Estado</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Fecha Firma</th>
                </tr>
              </thead>
              <tbody>
                {agreements.map((agr) => (
                  <tr key={agr.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <User size={16} color="var(--primary)" />
                        <span>{agr.seller_name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{agr.product_name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Base: {formatCurrency(agr.agreed_price)}</div>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{agr.target_region}</td>
                    <td style={{ padding: '1rem' }}>
                      <CommissionBadge rate={agr.agreed_commission_rate} variant="emerald" />
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span className={`badge badge-${agr.status === 'active' ? 'success' : 'warning'}`}>
                        {agr.status === 'active' ? 'Activo' : 'Pendiente'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.825rem' }}>
                      {agr.signed_at ? new Date(agr.signed_at).toLocaleDateString() : 'Pendiente'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyAgreements;
