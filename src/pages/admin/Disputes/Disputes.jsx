import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle2, ShieldCheck, Clock, FileText, ArrowUpRight } from 'lucide-react';
import { DashboardHeader, StatsCard } from '../../../components/dashboard';
import { disputesService } from '../../../services/disputes';
import { formatCurrency } from '../../../utils/formatters';
import { Button, Modal } from '../../../components/common';

export const AdminDisputes = () => {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [resolutionNotes, setResolutionNotes] = useState('');

  const fetchDisputes = async () => {
    try {
      setLoading(true);
      const data = await disputesService.getAll();
      setDisputes(data);
    } catch (err) {
      console.error('Error al cargar disputas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisputes();
  }, []);

  const handleResolve = async (id, status) => {
    await disputesService.resolve(id, { status, resolution_notes: resolutionNotes });
    setSelectedDispute(null);
    setResolutionNotes('');
    fetchDisputes();
  };

  return (
    <div className="admin-disputes-page">
      <DashboardHeader
        title="Centro de Resolución de Disputas"
        subtitle="Supervisión neutral de incidencias entre empresas y comerciales sobre ventas y liquidaciones."
      />

      <div className="kpi-grid" style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        <StatsCard
          title="Disputas Abiertas / En Revisión"
          value={disputes.filter(d => d.status !== 'resolved').length}
          change="Requieren intervención"
          icon={AlertTriangle}
          color="warning"
        />
        <StatsCard
          title="Disputas Resueltas"
          value={disputes.filter(d => d.status === 'resolved').length}
          change="Casos cerrados con éxito"
          icon={CheckCircle2}
          color="success"
        />
      </div>

      <div className="dash-card" style={{ marginTop: '1.5rem', background: '#fff', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-card)' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem' }}>
          Expedientes de Disputa
        </h3>

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Cargando disputas...</div>
        ) : disputes.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No hay disputas activas.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>ID</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Empresa</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Comercial</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Motivo</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Importe en Disputa</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Estado</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {disputes.map((d) => (
                  <tr key={d.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '1rem', fontWeight: 700 }}>{d.id}</td>
                    <td style={{ padding: '1rem', fontWeight: 600 }}>{d.company_name}</td>
                    <td style={{ padding: '1rem' }}>{d.seller_name}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{d.reason}</td>
                    <td style={{ padding: '1rem', fontWeight: 700, color: '#dc2626' }}>
                      {formatCurrency(d.amount_disputed)}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span className={`badge badge-${d.status === 'resolved' ? 'success' : 'warning'}`}>
                        {d.status === 'resolved' ? 'Resuelta' : 'En Revisión'}
                      </span>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <Button variant="secondary" size="sm" onClick={() => setSelectedDispute(d)}>
                        Gestionar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Resolver Disputa */}
      <Modal
        isOpen={!!selectedDispute}
        onClose={() => setSelectedDispute(null)}
        title="Gestionar y Resolver Disputa"
      >
        {selectedDispute && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #e2e8f0' }}>
              <div><strong>Empresa:</strong> {selectedDispute.company_name}</div>
              <div><strong>Comercial:</strong> {selectedDispute.seller_name}</div>
              <div><strong>Importe:</strong> {formatCurrency(selectedDispute.amount_disputed)}</div>
              <div><strong>Motivo:</strong> {selectedDispute.reason}</div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                Dictamen y Notas de Resolución del Administrador
              </label>
              <textarea
                rows={4}
                value={resolutionNotes}
                onChange={(e) => setResolutionNotes(e.target.value)}
                placeholder="Escribe la resolución vinculante..."
                style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-md)', border: '1px solid #cbd5e1' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <Button variant="secondary" onClick={() => setSelectedDispute(null)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => handleResolve(selectedDispute.id, 'resolved')}>
                Aprobar Resolución y Notificar
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminDisputes;
