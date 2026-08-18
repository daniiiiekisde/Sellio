import React from 'react';
import Sellers from '../../marketplace/Sellers';
import { DashboardHeader } from '../../../components/dashboard';

export const AdminSellers = () => {
  return (
    <div className="admin-sellers-view">
      <DashboardHeader
        title="Comerciales Registrados (Admin)"
        subtitle="Verificación de experiencia y carteras de agentes comerciales."
      />
      <Sellers />
    </div>
  );
};

export default AdminSellers;
