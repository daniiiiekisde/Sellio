import React from 'react';
import { ShieldCheck, Clock, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { VerificationBadge } from './VerificationBadge';

export const VerificationStatus = ({
  status = 'verified',
  type = 'company',
  events = []
}) => {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid var(--border-card)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.25rem',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700 }}>
          Estado de Verificación de Identidad
        </h4>
        <VerificationBadge status={status} type={type} />
      </div>

      <p style={{ margin: '0 0 1rem 0', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
        La verificación aporta máxima confianza comercial y asegura el cumplimiento legal en contratos y liquidaciones.
      </p>

      {events.length > 0 && (
        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
            Historial de Verificación
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {events.map((evt, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={13} color="#059669" />
                <span>{evt.action || evt.event_name}</span>
                <span style={{ marginLeft: 'auto', color: 'var(--text-muted)', fontSize: '0.725rem' }}>
                  {new Date(evt.created_at || Date.now()).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VerificationStatus;
