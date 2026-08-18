import React from 'react';
import Companies from '../../marketplace/Companies';
import { DashboardHeader } from '../../../components/dashboard';

export const AdminCompanies = () => {
  return (
    <div className="admin-companies-view">
      <DashboardHeader
        title="Empresas Registradas (Admin)"
        subtitle="Verificación y gestión de perfiles empresariales y fabricantes."
      />
      <Companies />
    </div>
  );
};

export default AdminCompanies;
