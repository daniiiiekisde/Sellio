import React from 'react';
import { Building2, Mail, Phone, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';

export const SellerContacts = () => {
  const contacts = [
    { id: 1, company: 'Iberia Gourmet SL', person: 'Laura Sánchez (Dir. Comercial)', phone: '+34 932 110 099', email: 'laura@iberiagourmet.com', status: 'En negociación' },
    { id: 2, company: 'SolarTech Solutions', person: 'Marcos Riera (Expansión)', phone: '+34 914 556 788', email: 'marcos@solartech.com', status: 'Acuerdo firmado' }
  ];

  return (
    <div className="seller-contacts-page">
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Mis Contactos y Empresas</h1>
          <p className="dash-subtitle">Empresas con las que has establecido contacto o acuerdos de representación.</p>
        </div>
      </div>

      <div className="dash-card" style={{ marginTop: '1.5rem' }}>
        <table className="dash-table">
          <thead>
            <tr>
              <th>Empresa</th>
              <th>Persona de Contacto</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(c => (
              <tr key={c.id}>
                <td><strong>{c.company}</strong></td>
                <td>{c.person}</td>
                <td>{c.phone}</td>
                <td>{c.email}</td>
                <td><span className="badge badge-primary">{c.status}</span></td>
                <td>
                  <Link to="/messages">
                    <Button variant="outline" size="sm" icon={MessageSquare}>Mensaje</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerContacts;
