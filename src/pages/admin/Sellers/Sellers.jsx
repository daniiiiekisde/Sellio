import React from 'react';
import Sellers from '../../Sellers';

export const AdminSellers = () => {
  return (
    <div className="admin-sellers-view">
      <div className="dash-header" style={{ marginBottom: '1.5rem' }}>
        <div>
          <h1 className="dash-title">Comerciales Registrados (Admin)</h1>
          <p className="dash-subtitle">Verificación de experiencia y carteras de agentes comerciales.</p>
        </div>
      </div>
      <Sellers />
    </div>
  );
};

export default AdminSellers;
