import React from 'react';
import { Building2, Sparkles, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '../../../components/common';
import { DashboardHeader } from '../../../components/dashboard';

export const SellerRequests = () => {
  const applications = [
    {
      id: 1,
      company: 'Iberia Gourmet SL',
      opportunity: 'Búsqueda de Comerciales HORECA para Distribución de Aceite Gourmet',
      territory: 'Cataluña / Baleares',
      appliedDate: '12/02/2026',
      status: 'Aceptada',
      statusType: 'success'
    },
    {
      id: 2,
      company: 'Cosmética Natural Mediterránea',
      opportunity: 'Representante para Farmacias y Centros Estéticos',
      territory: 'Barcelona y Tarragona',
      appliedDate: '17/02/2026',
      status: 'En Revisión',
      statusType: 'warning'
    },
    {
      id: 3,
      company: 'SolarTech Soluciones',
      opportunity: 'Agente Comercial para Instalaciones Fotovoltaicas B2B',
      territory: 'Cataluña',
      appliedDate: '01/02/2026',
      status: 'Finalizada',
      statusType: 'secondary'
    }
  ];

  return (
    <div className="seller-requests-page">
      <DashboardHeader
        title="Mis Candidaturas Enviadas"
        subtitle="Seguimiento del estado de las propuestas de representación que has enviado a empresas."
      />

      <div className="dash-card" style={{ marginTop: '1.5rem' }}>
        <table className="dash-table">
          <thead>
            <tr>
              <th>Empresa</th>
              <th>Oportunidad / Producto</th>
              <th>Territorio</th>
              <th>Fecha Envío</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(a => (
              <tr key={a.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Building2 size={14} color="#818cf8" />
                    <strong>{a.company}</strong>
                  </div>
                </td>
                <td>{a.opportunity}</td>
                <td>{a.territory}</td>
                <td>{a.appliedDate}</td>
                <td>
                  <span className={`badge badge-${a.statusType}`}>{a.status}</span>
                </td>
                <td>
                  <Button variant="outline" size="sm">Ver Detalles</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerRequests;
