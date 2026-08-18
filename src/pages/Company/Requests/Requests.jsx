import React, { useState } from 'react';
import { Check, X, User, MapPin, Sparkles, MessageSquare } from 'lucide-react';
import { Button } from '../../../components/common';
import { DashboardHeader } from '../../../components/dashboard';

export const CompanyRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      sellerName: 'Carlos Méndez',
      experience: '12 años',
      product: 'Aceite de Oliva Virgen Extra Ecológico',
      region: 'Cataluña (Barcelona)',
      message: 'Dispongo de cartera directa con más de 80 restaurantes y tiendas gourmet en Barcelona.',
      matchScore: 94,
      status: 'Pendiente'
    },
    {
      id: 2,
      sellerName: 'Marta Soler',
      experience: '8 años',
      product: 'Conservas Artesanales Gourmet',
      region: 'Comunidad de Madrid',
      message: 'Interesada en incorporar vuestra línea a mi cartera de distribución en zona centro.',
      matchScore: 88,
      status: 'Pendiente'
    }
  ]);

  const handleAction = (id, status) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  return (
    <div className="company-requests-page">
      <DashboardHeader
        title="Solicitudes de Comerciales"
        subtitle="Revisa las candidaturas de agentes que han solicitado representar tus productos y oportunidades."
      />

      <div className="dash-card" style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {requests.map(r => (
          <div key={r.id} style={{ border: '1px solid var(--border-card)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'rgba(6, 9, 14, 0.4)' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div className="user-avatar-circle" style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={22} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <strong>{r.sellerName}</strong>
                  <span className="badge badge-success"><Sparkles size={12} /> Match {r.matchScore}%</span>
                  <span className="badge badge-primary">{r.status}</span>
                </div>
                <p style={{ fontSize: 'var(--font-size-xs)', color: '#94a3b8', marginTop: '0.2rem' }}>
                  Oportunidad: <strong>{r.product}</strong> &bull; Zona: {r.region} &bull; Exp: {r.experience}
                </p>
                <p style={{ fontSize: 'var(--font-size-sm)', color: '#cbd5e1', marginTop: '0.5rem' }}>
                  "{r.message}"
                </p>
              </div>
            </div>

            {r.status === 'Pendiente' ? (
              <div className="table-actions">
                <Button variant="primary" size="sm" icon={Check} onClick={() => handleAction(r.id, 'Aceptada')}>
                  Aceptar y Contactar
                </Button>
                <Button variant="outline" size="sm" icon={X} onClick={() => handleAction(r.id, 'Descartada')}>
                  Descartar
                </Button>
              </div>
            ) : (
              <span className="badge badge-success">Estado: {r.status}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyRequests;
