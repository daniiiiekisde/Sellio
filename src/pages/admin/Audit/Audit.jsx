import React, { useState, useEffect } from 'react';
import { ShieldCheck, History, UserCheck, ShoppingCart, RefreshCw, Key, Filter } from 'lucide-react';
import { DashboardHeader, StatsCard } from '../../../components/dashboard';
import { auditService } from '../../../services/audit';

export const AdminAudit = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const data = await auditService.getAll();
        setLogs(data);
      } catch (err) {
        console.error('Error al cargar logs de auditoría:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="admin-audit-page">
      <DashboardHeader
        title="Libro de Auditoría y Trazabilidad Inmutable"
        subtitle="Registro estricto de eventos críticos, autorizaciones, confirmaciones de venta y cambios de estado."
      />

      <div className="kpi-grid" style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        <StatsCard
          title="Eventos Registrados"
          value={logs.length}
          change="Trazabilidad 100% persistida"
          icon={History}
          color="primary"
        />
        <StatsCard
          title="Garantía de Integridad"
          value="Inalterable"
          change="Sin modificación permitida"
          icon={ShieldCheck}
          color="success"
        />
      </div>

      <div className="dash-card" style={{ marginTop: '1.5rem', background: '#fff', padding: '1.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-card)' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem' }}>
          Registro Histórico de Auditoría
        </h3>

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Cargando logs...</div>
        ) : logs.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No hay eventos de auditoría registrados.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ padding: '0.75rem 1rem' }}>Marca Temporal</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Actor & Rol</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Acción</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Entidad / ID</th>
                  <th style={{ padding: '0.75rem 1rem' }}>Metadatos</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.85rem 1rem', color: 'var(--text-muted)' }}>
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ fontWeight: 600 }}>{log.actor_id}</div>
                      <span className="badge badge-secondary" style={{ fontSize: '10px' }}>
                        {log.actor_role}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span className="badge badge-primary" style={{ fontWeight: 800 }}>
                        {log.action}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', color: 'var(--text-secondary)' }}>
                      <strong>{log.entity_type}</strong>: {log.entity_id}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', fontFamily: 'monospace', fontSize: '0.775rem', color: '#475569' }}>
                      {JSON.stringify(log.metadata)}
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

export default AdminAudit;
