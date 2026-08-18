import React, { useState } from 'react';
import { Building2, Sparkles, Clock, CheckCircle2, XCircle, MessageSquare, ArrowRight, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Modal } from '../../../components/common';
import { DashboardHeader } from '../../../components/dashboard';
import { useRequests } from '../../../hooks/useRequests';

export const SellerRequests = () => {
  const { requests } = useRequests();
  const [selectedRequest, setSelectedRequest] = useState(null);

  return (
    <div className="seller-requests-page">
      <DashboardHeader
        title="Mis Propuestas de Interés"
        subtitle="Seguimiento en tiempo real de las oportunidades comerciales a las que te has acercado."
      />

      <div className="dash-card" style={{ marginTop: '1.5rem' }}>
        {requests.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
            <p>Aún no has postulado interés en ninguna oportunidad.</p>
            <Link to="/products" style={{ marginTop: '1rem', display: 'inline-block' }}>
              <Button variant="primary" size="sm">Explorar Marketplace de Oportunidades</Button>
            </Link>
          </div>
        ) : (
          <table className="dash-table">
            <thead>
              <tr>
                <th>Empresa / Fabricante</th>
                <th>Oportunidad / Producto</th>
                <th>Territorio</th>
                <th>Perfil Enviado</th>
                <th>Fecha Envío</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(a => (
                <tr key={a.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Building2 size={14} color="#818cf8" />
                      <strong>{a.companyName || a.company}</strong>
                    </div>
                  </td>
                  <td>{a.opportunityTitle || a.productName || a.opportunity}</td>
                  <td>{a.sellerRegion || a.territory || 'Cataluña'}</td>
                  <td>
                    <span className="badge badge-secondary" style={{ fontSize: '11px' }}>
                      <Lock size={10} style={{ display: 'inline', marginRight: '3px' }} />
                      {a.sellerAnonymousId || 'COMERCIAL #A482'}
                    </span>
                  </td>
                  <td>{a.appliedDate}</td>
                  <td>
                    <span className={`badge badge-${a.status === 'Aceptada' ? 'success' : a.status === 'Descartada' ? 'danger' : 'warning'}`}>
                      {a.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <Button variant="outline" size="sm" onClick={() => setSelectedRequest(a)}>
                        Ver Propuesta
                      </Button>
                      {a.status === 'Aceptada' && (
                        <Link to="/seller/messages">
                          <Button variant="primary" size="sm" icon={MessageSquare}>
                            Chat
                          </Button>
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        title={`Detalle de Propuesta — ${selectedRequest?.companyName || selectedRequest?.company}`}
        footer={
          <Button variant="primary" size="sm" onClick={() => setSelectedRequest(null)}>Cerrar</Button>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Oportunidad</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
              {selectedRequest?.opportunityTitle || selectedRequest?.productName}
            </div>
          </div>

          <div style={{ background: 'rgba(6, 9, 14, 0.4)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div style={{ fontSize: '0.75rem', color: '#818cf8', fontWeight: 600 }}>Mensaje transmitido a la empresa:</div>
            <p style={{ fontSize: '0.875rem', color: '#e2e8f0', marginTop: '0.35rem', lineHeight: '1.5' }}>
              "{selectedRequest?.message || 'Interés en representar el catálogo y negociar comisión por venta.'}"
            </p>
          </div>

          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            🔒 <strong>Nivel de Privacidad:</strong> Perfil anónimo ({selectedRequest?.sellerAnonymousId || 'COMERCIAL #A482'}). La empresa no dispone de tu teléfono ni email privado hasta el acuerdo final.
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SellerRequests;
