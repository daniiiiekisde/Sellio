import React from 'react';
import { Check, X, ShieldCheck, MapPin, Sparkles, MessageSquare, Lock, Briefcase, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/common';
import { DashboardHeader } from '../../../components/dashboard';
import { useRequests } from '../../../hooks/useRequests';

export const CompanyRequests = () => {
  const { requests, updateStatus } = useRequests();

  const handleAction = (id, status) => {
    updateStatus(id, status);
  };

  return (
    <div className="company-requests-page">
      <DashboardHeader
        title="Comerciales Interesados"
        subtitle="Revisa las propuestas de representación de comerciales independientes que quieren vender tus productos y oportunidades."
      />

      <div className="dash-card" style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {requests.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#94a3b8' }}>
            <Briefcase size={40} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
            <h3 style={{ color: '#ffffff', fontSize: '1.1rem' }}>Sin propuestas de interés pendientes</h3>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Los comerciales independientes descubrirán tus oportunidades en el Marketplace y enviarán sus solicitudes aquí.
            </p>
          </div>
        ) : (
          requests.map(r => (
            <div
              key={r.id}
              style={{
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '1.25rem',
                background: 'rgba(6, 9, 14, 0.4)',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', flex: 1, minWidth: '280px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(6, 182, 212, 0.15)',
                    color: '#38bdf8',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Lock size={22} />
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <strong style={{ fontSize: '1.05rem', color: '#ffffff' }}>
                      {r.sellerAnonymousId || 'COMERCIAL #A482'}
                    </strong>
                    <span className="badge badge-secondary" style={{ fontSize: '11px' }}>
                      🔒 Perfil Anónimo Verificado
                    </span>
                    <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      <Sparkles size={12} /> Match {r.sellerMatchScore || 94}%
                    </span>
                    <span className={`badge badge-${r.status === 'Aceptada' ? 'success' : r.status === 'Descartada' ? 'danger' : 'primary'}`}>
                      {r.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.35rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <span>Oportunidad: <strong style={{ color: '#cbd5e1' }}>{r.opportunityTitle || r.productName}</strong></span>
                    <span>&bull;</span>
                    <span>Zona: <strong style={{ color: '#cbd5e1' }}>{r.sellerRegion}</strong></span>
                    <span>&bull;</span>
                    <span>Exp: <strong style={{ color: '#cbd5e1' }}>{r.sellerExperience}</strong></span>
                  </div>

                  {r.sellerSpecialization && (
                    <div style={{ fontSize: '0.8rem', color: '#38bdf8', marginTop: '0.35rem' }}>
                      <Target size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      Especialidad: {r.sellerSpecialization}
                    </div>
                  )}

                  <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderLeft: '3px solid #6366f1', padding: '0.75rem', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', marginTop: '0.75rem', fontSize: '0.875rem', color: '#e2e8f0', lineHeight: '1.5' }}>
                    "{r.message}"
                  </div>

                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.5rem' }}>
                    Fecha de recepción: {r.appliedDate} &bull; {r.companyName}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignSelf: 'center', minWidth: '180px' }}>
                {r.status === 'Pendiente' ? (
                  <>
                    <Button variant="primary" size="sm" icon={Check} fullWidth onClick={() => handleAction(r.id, 'Aceptada')}>
                      Aceptar y Abrir Contacto
                    </Button>
                    <Button variant="outline" size="sm" icon={X} fullWidth onClick={() => handleAction(r.id, 'Descartada')}>
                      Descartar
                    </Button>
                  </>
                ) : r.status === 'Aceptada' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <span className="badge badge-success" style={{ textAlign: 'center', padding: '6px 12px' }}>
                      ✓ Contacto Abierto
                    </span>
                    <Link to="/company/messages">
                      <Button variant="outline" size="sm" icon={MessageSquare} fullWidth>
                        Conversar en Chat
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <span className="badge badge-secondary" style={{ textAlign: 'center' }}>
                    Propuesta Descartada
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CompanyRequests;
