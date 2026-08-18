import React from 'react';
import { User, MapPin, Award, Mail, MessageSquare, Phone } from 'lucide-react';
import { Button } from '../../../components/common';
import { DashboardHeader } from '../../../components/dashboard';

export const CompanyContacts = () => {
  const activeSellers = [
    {
      id: 'sell_1',
      name: 'Carlos Méndez',
      headline: 'Agente Comercial Senior HORECA',
      region: 'Cataluña (Barcelona)',
      assignedProducts: 'Aceite de Oliva Ecológico (500ml)',
      agreementDate: '15/01/2026',
      status: 'Activo'
    },
    {
      id: 'sell_2',
      name: 'Marta Soler',
      headline: 'Especialista en Gran Distribución & Gourmet',
      region: 'Comunidad de Madrid',
      assignedProducts: 'Conservas Gourmet Bonito del Norte',
      agreementDate: '02/02/2026',
      status: 'Activo'
    }
  ];

  return (
    <div className="company-contacts-page">
      <DashboardHeader
        title="Red de Comerciales Conectados"
        subtitle="Agentes independientes que representan activamente tus productos y marcas."
      />

      <div className="dash-card" style={{ marginTop: '1.5rem' }}>
        <table className="dash-table">
          <thead>
            <tr>
              <th>Comercial</th>
              <th>Zona Asignada</th>
              <th>Productos Representados</th>
              <th>Fecha Acuerdo</th>
              <th>Estado</th>
              <th>Contacto</th>
            </tr>
          </thead>
          <tbody>
            {activeSellers.map(s => (
              <tr key={s.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User size={18} />
                    </div>
                    <div>
                      <strong>{s.name}</strong>
                      <div style={{ fontSize: 'var(--font-size-xs)', color: '#94a3b8' }}>{s.headline}</div>
                    </div>
                  </div>
                </td>
                <td><MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />{s.region}</td>
                <td>{s.assignedProducts}</td>
                <td>{s.agreementDate}</td>
                <td><span className="badge badge-success">{s.status}</span></td>
                <td>
                  <div className="table-actions">
                    <Button variant="outline" size="sm" icon={MessageSquare}>Mensaje</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyContacts;
