import React from 'react';
import Companies from '../../Companies';

export const AdminCompanies = () => {
  return (
    <div className="admin-companies-view">
      <div className="dash-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="dash-title">Empresas Registradas (Admin)</h1>
          <p className="dash-subtitle">Verificación y gestión de perfiles empresariales.</p>
        </div>
      </div>
      <Companies />
    </div>
  );
};

export default AdminCompanies;
