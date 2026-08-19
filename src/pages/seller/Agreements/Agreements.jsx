import React, { useState, useEffect } from 'react';
import { Handshake, ShieldCheck, CheckCircle2, Clock, Building2, Tag, ArrowUpRight } from 'lucide-react';
import { DashboardHeader, StatsCard } from '../../../components/dashboard';
import { agreementsService } from '../../../services/agreements';
import { formatCurrency } from '../../../utils/formatters';
import { CommissionBadge } from '../../../components/commissions';

export const SellerAgreements = () => {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgreements = async () => {
      try {
        const data = await agreementsService.getAll();
        setAgreements(data);
      } catch (err) {
        console.error('Error al cargar acuerdos del comercial:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAgreements();
  }, []);

  const activeAgreements = agreements.filter(a => a.status === 'active');

  return (
    <div className="seller-agreements-page">
      <DashboardHeader
        title="Mis Acuerdos Comerciales"
        subtitle="Empresas con las que tienes contrato comercial activo y comisiones garantizadas."
      />

      <div className="kpi-grid" style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        <StatsCard
          title="Acuerdos Activos"
          value={activeAgreements.length}
          change="Empresas representadas"
          icon={Handshake}
          color="success"
        />
        <StatsCard
          title="Garantía de Comisión"
          value="100% Íntegra"
          change="Sin deducciones Sellio"
          icon={ShieldCheck}
          color="primary"
        />
      </div>

      <div className="dash-card" style={{ marginTop: '1.5rem', background: '#fff', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-card)' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem' }}>
          Contratos y Condiciones Pactadas
        </h3>

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Cargando acuerdos...</div>
        ) : agreements.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Aún no tienes acuerdos comerciales activos. Postula a oportunidades en el Marketplace para conectar con empresas.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {agreements.map((agr) => (
              <div
                key={agr.id}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span className="badge badge-success">Activo</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Firmado: {agr.signed_at ? new Date(agr.signed_at).toLocaleDateString() : 'Reciente'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                    <Building2 size={16} color="var(--primary)" />
                    <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>{agr.company_name}</h4>
                  </div>

                  <p style={{ margin: '0 0 0.85rem 0', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Producto: <strong>{agr.product_name}</strong>
                  </p>

                  <div style={{
                    background: '#ffffff',
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tu comisión pactada:</span>
                    <CommissionBadge rate={agr.agreed_commission_rate} variant="emerald" />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.775rem', color: '#059669' }}>
                  <ShieldCheck size={14} />
                  <span>Condiciones inmutables registradas en Sellio.</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerAgreements;
