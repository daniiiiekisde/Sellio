import React, { useState } from 'react';
import {
  ShieldCheck,
  Check,
  X,
  Building2,
  User,
  Search,
  Filter,
  FileText,
  AlertCircle,
  Clock
} from 'lucide-react';
import { DashboardHeader, StatsCard } from '../../../components/dashboard';
import { Button } from '../../../components/common';

export const AdminVerification = () => {
  const [requests, setRequests] = useState([
    { id: 'ver_1', entityName: 'Iberia Gourmet SL', type: 'Empresa', cif: 'B-67891234', submittedAt: 'Hoy, 09:30', documents: ['Escrituras CIF', 'Certificado Bancario'], status: 'pending' },
    { id: 'ver_2', entityName: 'Carlos Mendoza (Comercial #A482)', type: 'Comercial', cif: '47891234X', submittedAt: 'Ayer', documents: ['DNI/NIE', 'Colegiado Agentes Comerciales'], status: 'verified' },
    { id: 'ver_3', entityName: 'NovaPharma Care SL', type: 'Empresa', cif: 'B-89123456', submittedAt: 'Hace 2 días', documents: ['Poderes Notariales', 'Registro Mercantil'], status: 'pending' }
  ]);

  const handleApprove = (id) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'verified' } : r));
  };

  const handleReject = (id) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <DashboardHeader
        title="Centro de Verificación y Compliance B2B"
        subtitle="Auditoría de solvencia, NIF/CIF y legitimidad de empresas y agentes comerciales."
      />

      {/* Verification Queue */}
      <div style={{ background: '#ffffff', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-xl)', padding: '1.5rem', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', fontWeight: 800 }}>Solicitudes de Verificación de Identidad</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 800 }}>Entidad / Usuario</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 800 }}>Tipo</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 800 }}>Identificación</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'left', fontSize: '0.8rem', fontWeight: 800 }}>Documentación</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'center', fontSize: '0.8rem', fontWeight: 800 }}>Estado</th>
                <th style={{ padding: '0.85rem 1rem', textAlign: 'center', fontSize: '0.8rem', fontWeight: 800 }}>Resolución</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '1rem', fontWeight: 700 }}>{r.entityName}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, background: r.type === 'Empresa' ? '#eff6ff' : '#f0fdf4', color: r.type === 'Empresa' ? '#1d4ed8' : '#15803d', padding: '2px 8px', borderRadius: '4px' }}>
                      {r.type}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{r.cif}</td>
                  <td style={{ padding: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {r.documents.join(' · ')}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <span style={{
                      background: r.status === 'verified' ? '#ecfdf5' : r.status === 'rejected' ? '#fee2e2' : '#fef3c7',
                      color: r.status === 'verified' ? '#047857' : r.status === 'rejected' ? '#b91c1c' : '#b45309',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      fontSize: '11px',
                      fontWeight: 700
                    }}>
                      {r.status === 'verified' ? '✓ Verificado' : r.status === 'rejected' ? '✗ Rechazado' : '⏳ Pendiente'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    {r.status === 'pending' ? (
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                        <Button variant="primary" size="sm" icon={Check} onClick={() => handleApprove(r.id)}>Aprobar</Button>
                        <Button variant="outline" size="sm" icon={X} onClick={() => handleReject(r.id)}>Rechazar</Button>
                      </div>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Procesado</span>
                    )}
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

export default AdminVerification;
